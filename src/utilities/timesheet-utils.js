"use server"

import { isUUID } from "@/app/components/Sheet/SheetUtils";
import { getLoggedInId } from "./auth/auth-utils";
import { commitTransaction, executeTrans, rollbackTransaction, startTransaction } from "./db/db-utils";
import { logError } from "./misc-utils";

export async function getEmployeeAssignments(start, end, employee_id = 1) {
    let transaction;

    try {
        transaction = await startTransaction();

        // Fetch Project Timesheet Data
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
        const projects = await executeTrans(projectQuery, [employee_id], transaction);

        const validProjects = []; // Array to hold projects with valid phases

        for (const project of projects) {
            const { project_id } = project;

            const phasesQuery = `
              SELECT p.phase_id, p.phase_name,
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
                ) > 0 AS isActive
              FROM phase p
              JOIN phase_assignee pa ON pa.phase_id = p.phase_id
              WHERE project_id = ? 
              AND pa.assignee_id = ?
              AND EXISTS (
                  SELECT 1
                  FROM projected_work_week pww
                  WHERE pww.phase_assignee_id = pa.phase_assignee_id
              )
            `;
            const phases = await executeTrans(phasesQuery, [project_id, employee_id], transaction);

            if (phases.length > 0) { // Only proceed if phases are found
                for (const phase of phases) {
                    const { phase_id } = phase;

                    const phaseAssigneesQuery = `
                        SELECT pa.phase_assignee_id, pa.work_done_hrs, pa.expected_work_hrs
                        FROM phase_assignee pa
                        WHERE pa.assignee_id = ? 
                        AND pa.phase_id = ?
                    `;
                    const phaseAssignees = await executeTrans(phaseAssigneesQuery, [employee_id, phase_id], transaction);

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

        // Fetch Development Timesheet Data
        const developmentQuery = `
            SELECT development_hour_day_id, DATE_FORMAT(work_day, '%Y-%m-%d') AS work_day,  
                   DATE_FORMAT(work_day, '%d %M %Y') AS display_date, hours_worked, 
                   hours_worked AS initial_hours_worked, status, type, rejection_reason
            FROM development_hour
            WHERE employee_id = ?
            AND work_day BETWEEN ? AND ?
        `;
        const developmentTimesheet = await executeTrans(developmentQuery, [employee_id , start , end], transaction);

        // Commit transaction and return both project and development timesheet data
        await commitTransaction(transaction);

        return {
            project_timesheet: validProjects, // Return only the valid projects
            development_timesheet: developmentTimesheet
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

    try {
        transaction = await startTransaction()

        const { project_timesheet, development_timesheet } = timesheet_data
        const initiatorId = await getLoggedInId()

        project_timesheet.map(async (project) => {
            project?.phases.map(async (phase) => {

                const { phase_id } = phase

                phase?.assignments.map(async (assignment) => {
                    const { employee_work_day_id, hours_worked, display_date, work_day, phase_assignee_id } = assignment

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

                            const query = `UPDATE employee_work_day 
                                               SET hours_worked = ?
                                               WHERE employee_work_day_id = ?
                                               `;

                            await executeTrans(query, [hours_worked, employee_work_day_id], transaction)
                        } else {

                            const query = `DELETE FROM employee_work_day 
                                               WHERE employee_work_day_id = ?
                                               `;
                            await executeTrans(query, [employee_work_day_id], transaction)

                        }
                    }
                })
            })
        })

        development_timesheet.map(async (development_item) => {
            const { development_hour_day_id, type, hours_worked, display_date, work_day } = development_item

            if (isUUID(development_hour_day_id)) {
                const query = `INSERT INTO development_hour(employee_id , work_day , hours_worked , type)
                               VALUES ( ? , ? , ? , ?)
                               `;

                await executeTrans(query, [initiatorId, work_day, hours_worked, type], transaction)
            } else {
                if (hours_worked !== "") {
                    const query = `UPDATE development_hour 
                    SET hours_worked = ?
                    WHERE development_hour_day_id = ?
                    `;

                    await executeTrans(query, [hours_worked, development_hour_day_id], transaction)
                } else {
                    const query = `DELETE FROM development_hour 
                    WHERE development_hour_day_id = ?
                    `;
                    await executeTrans(query, [development_hour_day_id], transaction)

                }
            }
        })

        await commitTransaction(transaction)


    } catch (error) {
        await logError(error, "Transaction failed. Cannot save timesheet")
        await rollbackTransaction(transaction)
    } finally {
        if (transaction) {
            transaction.release()
        }
    }


}
