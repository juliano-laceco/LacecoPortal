"use server"

import { isUUID } from "@/app/components/sheet/SheetUtils";
import { getLoggedInId } from "./auth/auth-utils";
import { commitTransaction, execute, executeTrans, rollbackTransaction, startTransaction } from "../utilities/db/db-utils"
import { logError } from "../utilities/misc-utils"
import * as res from "../utilities/response-utils"
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { formatDate } from "./date/date-utils";



export async function getRejectedAndFinalizedDates(assignee) {

    try {
        // First Rejected Day
        const firstRejectedQuery = `
SELECT DATE_FORMAT(
    COALESCE(
        (SELECT LEAST(
            (SELECT MIN(ewd.work_day) 
             FROM employee_work_day ewd
             JOIN phase_assignee pa 
             ON ewd.phase_assignee_id = pa.phase_assignee_id
             WHERE pa.assignee_id = ?
             AND ewd.status = 'Rejected'),
            (SELECT MIN(dh.work_day) 
             FROM development_hour dh
             WHERE dh.employee_id = ?
             AND dh.status = 'Rejected'),
            (SELECT MIN(nwd.date) 
             FROM non_working_day nwd
             WHERE nwd.employee_id = ?
             AND nwd.status = 'Rejected')
        )),
        (SELECT MIN(ewd.work_day) 
         FROM employee_work_day ewd
         JOIN phase_assignee pa 
         ON ewd.phase_assignee_id = pa.phase_assignee_id
         WHERE pa.assignee_id = ?
         AND ewd.status = 'Rejected'),
        (SELECT MIN(dh.work_day) 
         FROM development_hour dh
         WHERE dh.employee_id = ?
         AND dh.status = 'Rejected'),
        (SELECT MIN(nwd.date) 
         FROM non_working_day nwd
         WHERE nwd.employee_id = ?
         AND nwd.status = 'Rejected')
    ),
    '%Y-%m-%d'
) AS min_rejected_date;
`;

        const min_rejected_date = await execute(firstRejectedQuery, [assignee, assignee, assignee, assignee, assignee, assignee]);

        // Last Finalized Day
        const maxFinalizedDayQuery = `
SELECT DATE_FORMAT(
    COALESCE(
        GREATEST(
            (SELECT MAX(ewd.work_day) 
             FROM employee_work_day ewd
             JOIN phase_assignee pa 
             ON ewd.phase_assignee_id = pa.phase_assignee_id
             WHERE pa.assignee_id = ?
             AND ewd.status != 'Rejected'
            ),
            (SELECT MAX(nwd.date) 
             FROM non_working_day nwd
             WHERE nwd.employee_id = ?
             AND nwd.status != 'Rejected'
            ),
            (SELECT MAX(dh.work_day) 
             FROM development_hour dh
             WHERE dh.employee_id = ?
             AND dh.status != 'Rejected'
            )
        ),
        (SELECT MAX(ewd.work_day) 
         FROM employee_work_day ewd
         JOIN phase_assignee pa 
         ON ewd.phase_assignee_id = pa.phase_assignee_id
         WHERE pa.assignee_id = ?
         AND ewd.status != 'Rejected'
        ),
        (SELECT MAX(nwd.date) 
         FROM non_working_day nwd
         WHERE nwd.employee_id = ?
         AND nwd.status != 'Rejected'
        ),
        (SELECT MAX(dh.work_day) 
         FROM development_hour dh
         WHERE dh.employee_id = ?
         AND dh.status != 'Rejected'
        )
    ), 
    '%Y-%m-%d'
) AS max_finalized_date;
`;

        const max_finalized_date_result = await execute(maxFinalizedDayQuery, [assignee, assignee, assignee, assignee, assignee, assignee]);
        const max_finalized_date = max_finalized_date_result[0]?.max_finalized_date ? new Date(max_finalized_date_result[0].max_finalized_date) : null;


        let isWeekFinalized = false;
        if (max_finalized_date) {
            const week_start = startOfWeek(max_finalized_date, { weekStartsOn: 1 });
            const week_end = endOfWeek(max_finalized_date, { weekStartsOn: 1 });

            // Check the status of each day in the week
            const days = eachDayOfInterval({ start: week_start, end: week_end });

            const checkWeekStatusQuery = `
                SELECT ewd.status, ewd.work_day AS date
                FROM employee_work_day ewd
                JOIN phase_assignee pa ON ewd.phase_assignee_id = pa.phase_assignee_id
                WHERE pa.assignee_id = ?
                AND ewd.work_day BETWEEN ? AND ?
                UNION
                SELECT 'Non Working' AS status, nwd.date
                FROM non_working_day nwd
                WHERE nwd.employee_id = ?
                AND nwd.date BETWEEN ? AND ?;
            `;

            const statusResults = await execute(checkWeekStatusQuery, [assignee, formatDate(week_start), formatDate(week_end), assignee, formatDate(week_start), formatDate(week_end)]);

            const statusMap = new Map();
            statusResults.forEach(row => {
                statusMap.set(formatDate(new Date(row.date)), row.status);
            });

            // Check if all days in the week are finalized
            isWeekFinalized = days.every(day => {
                const formattedDate = formatDate(day);
                const status = statusMap.get(formattedDate);
                return status === 'Pending' || status === 'Approved' || status === 'Non Working';
            });
        }

        return res.success_data({
            min_rejected_date: min_rejected_date[0]?.min_rejected_date ? new Date(min_rejected_date[0].min_rejected_date) : null,
            max_finalized_date: max_finalized_date,
            is_week_finalized: isWeekFinalized
        });

    } catch (error) {
        await logError(error, "Error fetching first rejected day or finalized day");
        console.error("Error fetching first rejected day or finalized day", error);
        return res.failed();
    }
}

export async function getEmployeeAssignments(start, end, employee_id) {

    let transaction;

    const initiatorId = await getLoggedInId()

    let assignee = employee_id ?? initiatorId

    try {
        transaction = await startTransaction();

        //  ------------------ Fetch Project Timesheet Data ------------------- //
        const projectQuery = `
            SELECT DISTINCT proj.project_id, 
                   proj.code, 
                   proj.title, 
                   e.first_name, 
                   e.last_name, 
                   pos.position_name
            FROM project proj
            JOIN phase ph ON ph.project_id = proj.project_id
            JOIN phase_assignee pa ON pa.phase_id = ph.phase_id
            JOIN employee e ON pa.assignee_id = e.employee_id
            JOIN position pos ON e.position_id = pos.position_id
            WHERE pa.assignee_id = ?
              AND proj.project_status = 'Active'
              AND EXISTS (
                  SELECT 1 
                  FROM projected_work_week pww 
                  WHERE pww.phase_assignee_id = pa.phase_assignee_id
              )
        `;
        const projects = await executeTrans(projectQuery, [assignee], transaction);

        const validProjects = []; // Array to hold projects with valid phases

        for (const project of projects) {
            const { project_id } = project;

            const phasesQuery = `
                             SELECT 
                                 p.phase_id, 
                                 p.phase_name,
                                 (
                                     SELECT COUNT(*)
                                     FROM projected_work_week pww_sub
                                     JOIN phase_assignee pa_sub ON pww_sub.phase_assignee_id = pa_sub.phase_assignee_id
                                     WHERE pa_sub.phase_id = p.phase_id
                                     AND NOW() BETWEEN (
                                         SELECT MIN(pww_inner.week_start)
                                         FROM projected_work_week pww_inner
                                         JOIN phase_assignee pa_inner ON pww_inner.phase_assignee_id = pa_inner.phase_assignee_id
                                         WHERE pa_inner.phase_id = p.phase_id
                                     ) AND (
                                         SELECT MAX(pww_inner.week_start)
                                         FROM projected_work_week pww_inner
                                         JOIN phase_assignee pa_inner ON pww_inner.phase_assignee_id = pa_inner.phase_assignee_id
                                         WHERE pa_inner.phase_id = p.phase_id
                                     )
                                 ) > 0 AS isActive,
                                 (
                                     EXISTS (
                                         SELECT 1
                                         FROM employee_work_day ewd
                                         JOIN phase_assignee pa_ewd ON ewd.phase_assignee_id = pa_ewd.phase_assignee_id
                                         WHERE pa_ewd.phase_id = p.phase_id
                                         AND ewd.work_day BETWEEN ? AND ?
                                     ) OR 
                                      EXISTS (
                                      SELECT 1 
                                      FROM non_working_day 
                                      WHERE employee_id = ?
                                      AND date BETWEEN ? AND ?
                                     )
                                 ) AS timesheet_exists
                             FROM 
                                 phase p
                             JOIN 
                                 phase_assignee pa ON pa.phase_id = p.phase_id
                             WHERE 
                                 project_id = ? 
                                 AND pa.assignee_id = ?
                                 AND EXISTS (
                                     SELECT 1
                                     FROM projected_work_week pww
                                     WHERE pww.phase_assignee_id = pa.phase_assignee_id
                                 ) `;


            const phases = await executeTrans(phasesQuery, [start, end, initiatorId, start, end, project_id, assignee], transaction);

            if (phases.length > 0) { // Only proceed if phases are found
                for (const phase of phases) {
                    const { phase_id } = phase;

                    const phaseAssigneesQuery = `
                        SELECT pa.phase_assignee_id, pa.work_done_hrs, pa.expected_work_hrs
                        FROM phase_assignee pa
                        WHERE pa.assignee_id = ? 
                        AND pa.phase_id = ?
                    `;
                    const phaseAssignees = await executeTrans(phaseAssigneesQuery, [assignee, phase_id], transaction);

                    if (phaseAssignees.length > 0) {
                        const assignee = phaseAssignees[0];
                        const { phase_assignee_id } = assignee;

                        const filledWeeksQuery = `
                            SELECT employee_work_day_id, phase_assignee_id, DATE_FORMAT(work_day, '%Y-%m-%d') AS work_day, 
                                   DATE_FORMAT(work_day, '%d %M %Y') AS display_date, hours_worked, 
                                   hours_worked AS initial_hours_worked, status, rejection_reason
                            FROM employee_work_day
                            WHERE phase_assignee_id = ?
                            AND work_day BETWEEN ? AND ?
                        `;
                        const filledWeeks = await executeTrans(filledWeeksQuery, [phase_assignee_id, start, end], transaction);

                        assignee.assignments = filledWeeks;
                        Object.assign(phase, assignee);
                    }

                    // Add the isActive property to the phase
                    phase.isActive = !!phase.isActive; // Convert to boolean
                }

                // Assign phases to the project and add to the validProjects array
                project.phases = phases;
                validProjects.push(project);
            }
        }



        //  ------------------ Fetch Development Timesheet Data ------------------- //
        const developmentQuery = `
            SELECT development_hour_day_id, DATE_FORMAT(work_day, '%Y-%m-%d') AS work_day,  
                   DATE_FORMAT(work_day, '%d %M %Y') AS display_date, hours_worked, 
                   hours_worked AS initial_hours_worked, status, type, rejection_reason
            FROM development_hour
            WHERE employee_id = ?
            AND work_day BETWEEN ? AND ?
        `;

        const developmentTimesheet = await executeTrans(developmentQuery, [assignee, start, end], transaction);


        //  ------------------ Non Working Days ------------------------------------ //
        const nonWorkingQuery = `
         SELECT non_working_day_id , DATE_FORMAT(date, '%Y-%m-%d') AS date , status , rejection_reason
         FROM non_working_day
         WHERE employee_id = ?
         AND date BETWEEN ? and ?
     `;
        const non_working = await executeTrans(nonWorkingQuery, [assignee, start, end], transaction);


        // Commit transaction and return both project and development timesheet data
        await commitTransaction(transaction);

        return {
            project_timesheet: validProjects, // Return only the valid projects
            development_timesheet: developmentTimesheet,
            non_working
        };

    } catch (error) {
        console.error("Transaction failed:", error);
        await logError(error, "Error fetching employee timesheet assignments");
        await rollbackTransaction(transaction);
        return null; // Explicitly return null on error
    } finally {
        if (transaction) {
            transaction.release();
        }
    }
}

export async function saveTimeSheet(timesheet_data) {
    let transaction;
    let clearedDates = [];

    try {
        transaction = await startTransaction();

        const { project_timesheet, development_timesheet, non_working } = timesheet_data;

        // Check if data has changed for each rejected date
        const changesPerRejectedDate = checkIfDataChangedPerRejectedDate(timesheet_data);

        const initiatorId = await getLoggedInId();

        // Loop through changesPerRejectedDate to remove non-working days if the data has changed for that day
        for (const dateChangeInfo of changesPerRejectedDate) {
            const date = Object.keys(dateChangeInfo)[0];
            const hasChanged = dateChangeInfo[date];

            if (hasChanged) {
                // If data for this day has changed, remove it from non_working_day
                const deleteNonWorkingDayQuery = `
                    DELETE FROM non_working_day
                    WHERE employee_id = ? 
                    AND date = ?
                `;
                await executeTrans(deleteNonWorkingDayQuery, [initiatorId, date], transaction);
            }
        }

        // Process non-working days
        non_working.map(async (non_working_day) => {
            const { date, newNonWorking, non_working_day_id } = non_working_day;

            let nwd_query;

            if (!newNonWorking) {
                nwd_query = `INSERT INTO non_working_day (date , employee_id)  VALUES (? , ?)`;
                await executeTrans(nwd_query, [date, initiatorId], transaction);
                clearedDates.push(date);

                // Delete from employee_work_day
                const deleteEmployeeWorkDayQuery = `
                    DELETE ewd
                    FROM employee_work_day ewd
                    JOIN phase_assignee pa ON ewd.phase_assignee_id = pa.phase_assignee_id
                    WHERE pa.assignee_id = ?
                    AND ewd.work_day = ?
                    AND ewd.status = 'Rejected'
                `;
                await executeTrans(deleteEmployeeWorkDayQuery, [initiatorId, date], transaction);

                // Delete from development_hour
                const deleteDevelopmentHourQuery = `
                    DELETE FROM development_hour
                    WHERE work_day = ?
                    AND employee_id = ?
                    AND status = 'Rejected'
                `;
                await executeTrans(deleteDevelopmentHourQuery, [date, initiatorId], transaction);
            } else {
                nwd_query = `UPDATE non_working_day SET status = 'Pending' , actioned_by = ? , rejection_reason = ? WHERE non_working_day_id = ? `;
                await executeTrans(nwd_query, [initiatorId, non_working_day_id], transaction);
            }
        });

        // Process project_timesheet records
        project_timesheet.map(async (project) => {
            project?.phases.map(async (phase) => {
                const { phase_id } = phase;

                phase?.assignments.map(async (assignment) => {
                    const { employee_work_day_id, hours_worked, work_day } = assignment;

                    // Check if data for the specific rejected date has changed
                    const dateChangeInfo = changesPerRejectedDate.find(item => Object.keys(item)[0] === work_day);
                    const hasChanged = dateChangeInfo ? dateChangeInfo[work_day] : false;

                    if (isUUID(employee_work_day_id)) {
                        const query = `
                            INSERT INTO employee_work_day (phase_assignee_id, work_day, hours_worked)
                            VALUES (
                              (SELECT phase_assignee_id FROM phase_assignee WHERE phase_id = ? AND assignee_id = ?), 
                              ?, 
                              ?
                            )`;
                        await executeTrans(query, [phase_id, initiatorId, work_day, hours_worked], transaction);
                    } else {
                        if (hours_worked !== "") {
                            const query = `
                                UPDATE employee_work_day 
                                SET hours_worked = ? ${hasChanged ? ", status = 'Pending'" : ""}
                                WHERE employee_work_day_id = ?
                            `;
                            await executeTrans(query, [hours_worked, employee_work_day_id], transaction);
                        } else {
                            const query = `
                                DELETE FROM employee_work_day 
                                WHERE employee_work_day_id = ?
                            `;
                            await executeTrans(query, [employee_work_day_id], transaction);
                        }
                    }
                });
            });
        });

        // Process development_timesheet records
        development_timesheet.map(async (development_item) => {
            const { development_hour_day_id, type, hours_worked, work_day } = development_item;

            // Check if data for the specific rejected date has changed
            const dateChangeInfo = changesPerRejectedDate.find(item => Object.keys(item)[0] === work_day);
            const hasChanged = dateChangeInfo ? dateChangeInfo[work_day] : false;

            if (isUUID(development_hour_day_id)) {
                const query = `
                    INSERT INTO development_hour(employee_id , work_day , hours_worked , type)
                    VALUES ( ? , ? , ? , ?)
                `;
                await executeTrans(query, [initiatorId, work_day, hours_worked, type], transaction);
            } else {
                if (hours_worked !== "") {
                    const query = `
                        UPDATE development_hour 
                        SET hours_worked = ? ${hasChanged ? ", status = 'Pending'" : ""}
                        WHERE development_hour_day_id = ?
                    `;
                    await executeTrans(query, [hours_worked, development_hour_day_id], transaction);
                } else {
                    const query = `
                        DELETE FROM development_hour 
                        WHERE development_hour_day_id = ?
                    `;
                    await executeTrans(query, [development_hour_day_id], transaction);
                }
            }
        });

        await commitTransaction(transaction);

    } catch (error) {
        await logError(error, "Transaction failed. Cannot save timesheet");
        await rollbackTransaction(transaction);
    } finally {
        if (transaction) {
            transaction.release();
        }
    }
}

export async function actionTimesheet(timesheet_data, dateActions) {
    let transaction;
    const initiatorId = await getLoggedInId()

    try {
        // Start a new transaction
        transaction = await startTransaction();

        const { project_timesheet, development_timesheet, non_working } = timesheet_data;

        // Process project_timesheet records
        for (const project of project_timesheet) {
            for (const phase of project.phases) {
                for (const assignment of phase.assignments) {
                    const { work_day, employee_work_day_id } = assignment;

                    // Find if there's an action for the current work_day
                    const dayAction = dateActions.find(action => action.date === work_day);

                    if (dayAction) {
                        const { action_status, rejection_reason } = dayAction;

                        if (action_status === "Approved") {
                            // Update employee_work_day status to "Approved"
                            const query = `
                                UPDATE employee_work_day 
                                SET status = 'Approved', rejection_reason = NULL , actioned_by = ?
                                WHERE employee_work_day_id = ?
                            `;
                            await executeTrans(query, [initiatorId, employee_work_day_id], transaction);

                        } else if (action_status === "Rejected") {
                            // Update employee_work_day status to "Rejected" with rejection reason
                            const query = `
                                UPDATE employee_work_day 
                                SET status = 'Rejected', rejection_reason = ? , actioned_by = ?
                                WHERE employee_work_day_id = ? 
                            `;
                            await executeTrans(query, [rejection_reason ?? "", initiatorId, employee_work_day_id], transaction);
                        }
                    }
                }
            }
        }

        // Commit the transaction after all updates are successful
        await commitTransaction(transaction);


        // Process development_timesheet records
        for (const development of development_timesheet) {
            const { work_day, development_hour_day_id } = development;

            // Find if there's an action for the current work_day
            const dayAction = dateActions.find(action => action.date === work_day);

            if (dayAction) {
                const { action_status, rejection_reason } = dayAction;

                if (action_status === "Approved") {
                    // Update development_hour status to "Approved"
                    const query = `
                        UPDATE development_hour 
                        SET status = 'Approved', rejection_reason = NULL , actioned_by = ?
                        WHERE development_hour_day_id = ? 
                    `;
                    await executeTrans(query, [initiatorId, development_hour_day_id], transaction);

                } else if (action_status === "Rejected") {
                    // Update development_hour status to "Rejected" with rejection reason
                    const query = `
                        UPDATE development_hour 
                        SET status = 'Rejected', rejection_reason = ? , actioned_by = ?
                        WHERE development_hour_day_id = ? 
                    `;
                    await executeTrans(query, [initiatorId, rejection_reason, development_hour_day_id], transaction);
                }
            }
        }

        // Process non-working days
        for (const nonWorkingDay of non_working) {
            const { date, non_working_day_id } = nonWorkingDay;

            // Find if there's an action for the current date
            const dayAction = dateActions.find(action => action.date === date);

            if (dayAction) {
                const { status, rejection_reason } = dayAction;

                if (status === "Approved") {
                    // Update non_working_day status to "Approved"
                    const query = `
                        UPDATE non_working_day 
                        SET status = 'Approved', rejection_reason = NULL , actioned_by = ?
                        WHERE non_working_day_id = ?
                    `;
                    await executeTrans(query, [initiatorId, non_working_day_id], transaction);

                } else if (status === "Rejected") {
                    // Update non_working_day status to "Rejected" with rejection reason
                    const query = `
                        UPDATE non_working_day 
                        SET status = 'Rejected', rejection_reason = ? , actioned_by = ?
                        WHERE non_working_day_id = ? 
                    `;
                    await executeTrans(query, [initiatorId, rejection_reason, non_working_day_id], transaction);
                }
            }
        }

        // Commit the transaction after all updates are successful
        await commitTransaction(transaction);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Transaction failed. Cannot action timesheet:", error);
        await rollbackTransaction(transaction);
        throw error; // Re-throw the error after rollback
    } finally {
        // Release the transaction if it exists
        if (transaction) {
            transaction.release();
        }
    }
}


const checkIfDataChangedPerRejectedDate = (timesheet_data) => {
    const { project_timesheet, development_timesheet } = timesheet_data;
    const rejected_dates = {};

    // Helper function to check if data has changed for a given day
    const checkDataChangedForDay = (day, isUUID, initial_hours_worked, hours_worked) => {
        if (!rejected_dates[day]) {
            rejected_dates[day] = false; // Initialize as false (no changes by default)
        }
        // If the assignment/development is new (UUID) or data has changed (hours mismatch)
        if (isUUID || initial_hours_worked != hours_worked) {
            rejected_dates[day] = true; // Mark as changed
        }
    };

    // Check project_timesheet records
    for (const project of project_timesheet) {
        for (const phase of project.phases) {
            for (const assignment of phase.assignments) {
                // Only consider records with status 'Rejected'
                if (assignment.status === "Rejected") {
                    checkDataChangedForDay(
                        assignment.work_day,
                        isUUID(assignment.employee_work_day_id),
                        assignment.initial_hours_worked,
                        assignment.hours_worked
                    );
                }
            }
        }
    }

    // Check development_timesheet records
    for (const development of development_timesheet) {
        // Only consider records with status 'Rejected'
        if (development.status === "Rejected") {
            checkDataChangedForDay(
                development.work_day,
                isUUID(development.development_hour_day_id),
                development.initial_hours_worked,
                development.hours_worked
            );
        }
    }

    // Convert the result object to an array of key-value pairs
    return Object.entries(rejected_dates).map(([date, changed]) => ({ [date]: changed }));
};


