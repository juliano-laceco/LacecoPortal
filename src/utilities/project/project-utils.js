"use server"

import db from "@/config/db";
import { commitTransaction, dynamicQuery, execute, executeTrans, getTableFields, renameAmbiguousColumns, rollbackTransaction, startTransaction } from "../db/db-utils";
import * as res from "../response-utils"
import { getLoggedInId } from "../auth/auth-utils";
import { formatDate } from "../date/date-utils";

export async function checkProjectCodeExists(code) {

    try {

        const countProjectCodesSQL = 'SELECT project_id FROM project WHERE code = ?';
        const countProjectCodes = await execute(countProjectCodesSQL, [code]);

        if (countProjectCodes.length > 0 && countProjectCodes[0].code) {
            return res.failed()
        }

        return res.success()

    } catch (error) {
        console.error('Error checking project code availability:', error);
        return res.success()
    }

}

export async function createProject(projectData) {

    let connection;

    try {
        // Get a connection from the pool
        connection = await db.getConnection();
        // Start the transaction
        await connection.beginTransaction();

        const projectInfo = projectData.projectInfo;
        const phases = projectData.phases;
        const disciplines = projectInfo.disciplines
        const initiatorId = await getLoggedInId();

        // Insert project information into the project table
        const projectInsertResult = await connection.query(`
            INSERT INTO project 
            (employee_id, planned_enddate, planned_startdate, DesignArea, ParkingArea, Landscape, BUA, baseline_budget, intervention, sector, typology, client_id, city, geography, code, title, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                projectInfo.employee_id,
                projectInfo.planned_enddate,
                projectInfo.planned_startdate,
                projectInfo.DesignArea,
                projectInfo.ParkingArea,
                projectInfo.Landscape,
                projectInfo.BUA,
                projectInfo.baseline_budget,
                projectInfo.intervention,
                projectInfo.sector,
                projectInfo.typology,
                projectInfo.client_id,
                projectInfo.city,
                projectInfo.geography,
                projectInfo.code,
                projectInfo.title,
                initiatorId
            ]
        );

        const projectId = projectInsertResult[0].insertId;


        // Insert phases into the phases table
        for (const phase of phases) {
            await connection.query(`
                INSERT INTO phase
                (phase_name, planned_startdate, planned_enddate, project_id , actioned_by) 
                VALUES (?, ?, ?, ? , ?)`,
                [phase.phase_name, phase.planned_startdate, phase.planned_enddate, projectId, initiatorId]
            );
        }

        disciplines.push('78')

        // Insert project disciplines into the project_disciplines table
        for (const discipline of disciplines) {
            await connection.query(`
                    INSERT INTO project_disciplines
                    (project_id, discipline_id) 
                    VALUES (?, ?)`,
                [projectId, discipline]
            );
        }

        // Commit the transaction if all queries are successful
        await connection.commit();

        // Release the connection
        connection.release();

        return res.success();

    } catch (error) {
        // Rollback the transaction if any query fails
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Transaction failed:', error);
        return res.failed();
    }
}

export async function updateProject(projectData) {

    let transaction;
    const initiatorId = await getLoggedInId();

    try {
        // Start the transaction
        transaction = await startTransaction();

        const projectInfo = projectData?.projectInfo;
        const phases = projectData?.phases;
        const disciplines = projectInfo?.disciplines;
        const project_id = projectData?.project_id;

        // Update project information in the project table
        await executeTrans(`
            UPDATE project
            SET employee_id = ?, 
                planned_enddate = ?, 
                planned_startdate = ?, 
                DesignArea = ?, 
                ParkingArea = ?, 
                Landscape = ?, 
                BUA = ?, 
                baseline_budget = ?, 
                intervention = ?, 
                sector = ?, 
                typology = ?, 
                client_id = ?, 
                city = ?, 
                geography = ?, 
                code = ?, 
                title = ?
            WHERE project_id = ?`,
            [
                projectInfo.employee_id,
                projectInfo.planned_enddate,
                projectInfo.planned_startdate,
                projectInfo.DesignArea,
                projectInfo.ParkingArea,
                projectInfo.Landscape,
                projectInfo.BUA,
                projectInfo.baseline_budget,
                projectInfo.intervention,
                projectInfo.sector,
                projectInfo.typology,
                projectInfo.client_id,
                projectInfo.city,
                projectInfo.geography,
                projectInfo.code,
                projectInfo.title,
                project_id
            ],
            transaction
        );

        // Delete existing records related to disciplines for the project
        await executeTrans(`
            DELETE FROM project_disciplines
            WHERE project_id = ?`,
            [project_id],
            transaction
        );


        // Insert new discipline data into the project_disciplines table
        for (const discipline of disciplines) {
            await executeTrans(`
                INSERT INTO project_disciplines
                (project_id, discipline_id) 
                VALUES (?, ?)`,
                [project_id, discipline],
                transaction
            );
        }

        // Delete phases with no assignees from the database
        await executeTrans(`
             DELETE p
             FROM phase p
             LEFT JOIN phase_assignee pa ON p.phase_id = pa.phase_id
             WHERE pa.phase_id IS NULL
             AND p.project_id = ?`,
            [project_id],
            transaction
        );

        // Update data for phases with assignees
        const phasesToUpdate = phases.filter(phase => phase.hasAssignees == 1);
        for (const phase of phasesToUpdate) {
            await executeTrans(`
                UPDATE phase
                SET phase_name = ?, 
                    planned_startdate = ?, 
                    planned_enddate = ?
                WHERE project_id = ? AND phase_id = ?`,
                [phase.phase_name, phase.planned_startdate, phase.planned_enddate, project_id, phase.phase_id],
                transaction
            );
        }

        // Insert phases with no assignees into the database
        const phasesToInsert = phases.filter(phase => !phase.hasAssignees);
        for (const phase of phasesToInsert) {
            await executeTrans(`
                INSERT INTO phase
                (phase_name, planned_startdate, planned_enddate, project_id, actioned_by) 
                VALUES (?, ?, ?, ?, ?)`,
                [phase.phase_name, phase.planned_startdate, phase.planned_enddate, project_id, initiatorId],
                transaction
            );
        }

        // Commit the transaction if all queries are successful
        await commitTransaction(transaction);

        return res.success();

    } catch (error) {
        // Rollback the transaction if any query fails
        if (transaction) {
            await rollbackTransaction(transaction);
        }
        console.error('Transaction failed:', error);
        return res.failed();
    } finally {
        // Release the connection
        if (transaction) transaction.release();
    }
}



export async function getProjectData(project_id) {
    try {

        // Query to get the project data with formatted dates, handling NULLs
        const projectRows = await execute(`
            SELECT
                first_name,
                last_name,
                position_name,
                project_id, 
                title, 
                code, 
                geography, 
                city, 
                client_id, 
                typology, 
                sector, 
                intervention, 
                baseline_budget, 
                BUA, 
                Landscape, 
                ParkingArea, 
                DesignArea, 
                CASE WHEN planned_startdate IS NULL THEN NULL ELSE DATE_FORMAT(planned_startdate, '%Y-%m-%d') END AS planned_startdate,
                CASE WHEN planned_enddate IS NULL THEN NULL ELSE DATE_FORMAT(planned_enddate, '%Y-%m-%d') END AS planned_enddate,
                CASE WHEN start_date IS NULL THEN NULL ELSE DATE_FORMAT(start_date, '%Y-%m-%d') END AS start_date,
                CASE WHEN end_date IS NULL THEN NULL ELSE DATE_FORMAT(end_date, '%Y-%m-%d') END AS end_date,
                variance, 
                p.employee_id, 
                project_status, 
                DATE_FORMAT(p.created_on, '%Y-%m-%d %H:%i:%s') AS created_on,
                p.created_by,
                isBaselined
            FROM project p 
            JOIN employee e on p.employee_id = e.employee_id 
            JOIN position pos on e.position_id = pos.position_id
            WHERE project_id = ?
        `, [project_id]);

        // If no project is found, return null
        if (projectRows.length === 0) {
            return res.failed('Project not found');
        }


        // Project Info is populated as teh first property
        let projectData = { projectInfo: projectRows[0] };


        // Adding the phase rows
        let phaseRows = await execute(`
            SELECT 
                p.phase_id,
                p.phase_name, 
                CASE WHEN p.planned_startdate IS NULL THEN NULL ELSE DATE_FORMAT(p.planned_startdate, '%Y-%m-%d') END AS planned_startdate,
                CASE WHEN p.planned_enddate IS NULL THEN NULL ELSE DATE_FORMAT(p.planned_enddate, '%Y-%m-%d') END AS planned_enddate,
                p.project_id, 
                p.actioned_by,
                EXISTS (
                SELECT 1 
                FROM phase_assignee pa 
                WHERE pa.phase_id = p.phase_id
                ) AS hasAssignees
            FROM phase p
            WHERE p.project_id = ?
        `, [project_id]);

        // Fetching assignees for each phase and adding them to phaseRows
        for (let i = 0; i < phaseRows.length; i++) {
            const phase = phaseRows[i];
            const assigneeQuery = `
                SELECT 
                    pw.projected_work_week_id, 
                    pa.phase_assignee_id ,
                    e.discipline_id AS discipline,
                    e.employee_id AS assignee,
                    pw.hours_expected, 
                    pw.projected_work_week_id, 
                    DATE_FORMAT(pw.week_start, '%d %M %Y') AS week_start
                FROM phase_assignee pa
                JOIN projected_work_week pw ON pa.phase_assignee_id = pw.phase_assignee_id
                JOIN employee e ON pa.assignee_id = e.employee_id
                WHERE pa.phase_id = ?
            `;

            const assigneeRows = await execute(assigneeQuery, [phase.phase_id]);

            const assigneeMap = {};

            assigneeRows.forEach((row) => {

                if (!assigneeMap[row.phase_assignee_id]) {
                    assigneeMap[row.phase_assignee_id] = {
                        phase_assignee_id: row.phase_assignee_id,
                        discipline: row.discipline,
                        assignee: row.assignee,
                        projected_work_weeks: {}
                    };
                }
                assigneeMap[row.phase_assignee_id].projected_work_weeks[row.week_start] = row.hours_expected;
            });

            const assignees = Object.values(assigneeMap);
            phase.assignees = assignees;
        }

        let allDates = []

        if (phaseRows.some((phaseRow) => phaseRow.hasAssignees > 0)) {
            phaseRows.map((phaseRow) => {
                const assignees = phaseRow.assignees

                assignees.map((assignee) => {
                    allDates.push(...Object.keys(assignee.projected_work_weeks))
                })
            })

            allDates = new Set(allDates)

            const { minDate, maxDate } = getMinMaxDate(allDates)
            projectData.projectInfo = { ...(projectData.projectInfo), minDate, maxDate, initialDeployment: false }

        } else {

            projectData.projectInfo.initialDeployment = true
        }

        // Fetching Selected Disciplines
        const selectedDisciplines = await execute(`
            SELECT pd.discipline_id as value , d.discipline_name as label
            FROM project_disciplines as pd
            INNER JOIN discipline as d ON pd.discipline_id = d.discipline_id
            WHERE pd.project_id = ?
        `, [project_id]);

        // Add the phases to the project data
        projectData = { ...projectData, phases: phaseRows };

        // Add the disciplines
        projectData.projectInfo.disciplines = selectedDisciplines;

        return res.success_data(projectData);

    } catch (error) {
        console.error('Error fetching project data:', error);
        return res.failed();
    }
}


export async function saveDeployment(deployment_data, deletedAssignees) {
    const transaction = await startTransaction();

    try {
        for (const phase of deployment_data) {
            const { phase_id, phase_name, assignees } = phase;

            for (const assigneeItem of assignees) {
                const { phase_assignee_id, discipline, assignee, projected_work_weeks, updated_projected_work_weeks } = assigneeItem;

                const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
                const isNew = regexExp.test(phase_assignee_id ?? "");

                if (!isNew) {
                    const paQuery = "UPDATE phase_assignee SET assignee_id = ? WHERE phase_assignee_id = ?";
                    await executeTrans(paQuery, [assignee, phase_assignee_id], transaction);

                    for (const dateKey of Object.keys(updated_projected_work_weeks)) {
                        const newVal = updated_projected_work_weeks[dateKey];

                        if (newVal !== "") {
                            const weekExistsQuery = `
                                SELECT COUNT(pw.projected_work_week_id) AS count
                                FROM projected_work_week pw
                                JOIN phase_assignee pa ON pw.phase_assignee_id = pa.phase_assignee_id
                                JOIN phase p ON pa.phase_id = p.phase_id
                                WHERE pw.phase_assignee_id = ?
                                AND pw.week_start = ?
                            `;

                            const weekExists = await executeTrans(weekExistsQuery, [phase_assignee_id, formatDate(dateKey)], transaction);

                            if (weekExists[0].count > 0) {
                                const updatedWeekQuery = `
                                    UPDATE projected_work_week pw
                                    JOIN phase_assignee pa ON pw.phase_assignee_id = pa.phase_assignee_id
                                    JOIN phase p ON pa.phase_id = p.phase_id
                                    SET pw.hours_expected = ?
                                    WHERE pw.phase_assignee_id = ?
                                    AND pw.week_start = ?
                                    AND p.phase_id = ?;
                                `;
                                await executeTrans(updatedWeekQuery, [newVal, phase_assignee_id, formatDate(dateKey), phase_id], transaction);
                            } else {
                                const projectedQuery = "INSERT INTO projected_work_week (phase_assignee_id, week_start, hours_expected) VALUES (?, ?, ?)";
                                await executeTrans(projectedQuery, [phase_assignee_id, formatDate(dateKey), newVal], transaction);
                            }
                        } else {
                            const deleteWeekQuery = `
                                DELETE FROM projected_work_week 
                                WHERE phase_assignee_id = ?
                                AND week_start = ?
                                AND phase_assignee_id IN (
                                    SELECT pa.phase_assignee_id
                                    FROM phase_assignee pa
                                    JOIN phase p ON pa.phase_id = p.phase_id
                                    WHERE p.phase_id = ?
                                );
                            `;
                            await executeTrans(deleteWeekQuery, [phase_assignee_id, formatDate(dateKey), phase_id], transaction);
                        }
                    }
                } else {
                    const paQuery = "INSERT INTO phase_assignee (assignee_id, phase_id) VALUES (?, ?)";
                    const { insertId } = await executeTrans(paQuery, [assignee, phase_id], transaction);
                    // const insertedAssignee = paRes["insertId"];


                    for (const dateKey of Object.keys(projected_work_weeks)) {
                        const projectedQuery = "INSERT INTO projected_work_week (phase_assignee_id, week_start, hours_expected) VALUES (?, ?, ?)";
                        await executeTrans(projectedQuery, [insertId, formatDate(dateKey), projected_work_weeks[dateKey]], transaction);
                    }
                }
            }
        }

        if (deletedAssignees && deletedAssignees.length > 0) {
            for (const assignee_id of deletedAssignees) {
                const deleteAssigneeQuery = "DELETE FROM phase_assignee WHERE phase_assignee_id = ?";
                await execute(deleteAssigneeQuery, [assignee_id], transaction);
            }
        }

        await commitTransaction(transaction);
    } catch (error) {
        await rollbackTransaction(transaction);
        console.error("Transaction failed and rolled back:", error);
        throw error;
    }
}

function getMinMaxDate(dateSet) {

    // Convert dates to Date objects for comparison
    const dateObjects = Array.from(dateSet).map(dateStr => new Date(dateStr));

    // Find min and max dates using Date objects
    const minDate = new Date(Math.min(...dateObjects));
    const maxDate = new Date(Math.max(...dateObjects));

    // Format min and max dates back to strings
    const minDateString = minDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    const maxDateString = maxDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });

    return { minDate: minDateString, maxDate: maxDateString, initialDeployment: false };
}


export async function baselineProject(project_id) {
    // To be implemented
}

export async function checkDisciplineIsPhaseAssigned(disciplines, project_id) {
    const results = [];
    try {
        for (const discipline of disciplines) {
            const { value: discipline_id, label } = discipline;
            const rows = await execute(
                `SELECT COUNT(*)
                    FROM project pr
                    JOIN phase p ON pr.project_id = p.project_id
                    JOIN phase_assignee pa ON pa.phase_id = p.phase_id
                    JOIN employee e ON pa.assignee_id = e.employee_id
                    JOIN position pos ON e.position_id = pos.position_id
                    JOIN discipline d ON pos.discipline_id = d.discipline_id
                    WHERE pr.project_id = ? AND d.discipline_id = ?`,
                [project_id, discipline_id]
            );
            const count = rows[0]['COUNT(*)'];
            results.push({ discipline: label, isPhaseAssigned: count > 0 });
        }
    } catch (error) {
        console.error('Error checking disciplines:', error);
    }
    return results;
}

export async function getAllProjects(qs = {}) {
    const tables = [
        { name: 'project', alias: 'p' },
        { name: 'employee', alias: 'e' },
        { name: 'position', alias: 'pos' },
        { name: 'client', alias: 'c' }
    ];

    const resp = await getTableFields(tables);
    const allowedKeys = resp.res ? new Set(resp.data.map(field => `${field.tableAlias}.${field.columnName}`)) : new Set([]);

    try {

        const selectClause = await renameAmbiguousColumns(resp.data)

        // Base query
        let query = `SELECT ${selectClause.slice(2)} 
                     FROM project p 
                     JOIN employee e ON p.employee_id = e.employee_id
                     JOIN position pos ON e.position_id = pos.position_id
                     JOIN client c ON p.client_id = c.client_id
                     `;

        const result = await dynamicQuery(qs, query, allowedKeys);
        return result;

    } catch (error) {
        console.error('Error fetching project details:', error);
        return res.failed();
    }
}
