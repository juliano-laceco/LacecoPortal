"use server"

import db from "@/config/db";
import { execute } from "../db/db-utils";
import * as res from "../response-utils"
import { getLoggedInId } from "../auth/auth-utils";

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
            // Check if the trimmed phase_name exists in the phase_name table
            const trimmedPhaseName = phase.phase_name.trim();
            const [existingPhaseName] = await connection.query(`
                SELECT phase_name 
                FROM lacecodb.phase_name 
                WHERE phase_name = ?`,
                [trimmedPhaseName]
            );

            // If the phase_name doesn't exist, insert it
            if (existingPhaseName.length === 0) {
                await connection.query(`
                    INSERT INTO lacecodb.phase_name 
                    (phase_name) 
                    VALUES (?)`,
                    [trimmedPhaseName]
                );
            }

            // Insert the phase into the phase table
            await connection.query(`
                INSERT INTO phase
                (phase_name, planned_startdate, planned_enddate, project_id , actioned_by) 
                VALUES (?, ?, ?, ? , ?)`,
                [trimmedPhaseName, phase.planned_startdate, phase.planned_enddate, projectId, initiatorId]
            );
        }

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

        console.log('Transaction successful');

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

export async function getProjectData(project_id) {
    try {
        // Query to get the project data with formatted dates, handling NULLs
        const projectRows = await execute(`
            SELECT 
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
                employee_id, 
                project_status, 
                DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on,
                created_by
            FROM project 
            WHERE project_id = ?
        `, [project_id]);

        // If no project is found, return null
        if (projectRows.length === 0) {
            return res.failed('Project not found');
        }

        let projectData = { projectInfo: projectRows[0] };

        // Query to get the phases associated with the project with formatted dates, handling NULLs
        const phaseRows = await execute(`
            SELECT 
                phase_id,
                phase_name, 
                CASE WHEN planned_startdate IS NULL THEN NULL ELSE DATE_FORMAT(planned_startdate, '%Y-%m-%d') END AS planned_startdate,
                CASE WHEN planned_enddate IS NULL THEN NULL ELSE DATE_FORMAT(planned_enddate, '%Y-%m-%d') END AS planned_enddate,
                project_id, 
                actioned_by 
            FROM phase 
            WHERE project_id = ?
        `, [project_id]);


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
        projectData.projectInfo.disciplines = selectedDisciplines

        return res.success_data(projectData);
    } catch (error) {
        console.error('Error fetching project data:', error);
        return res.failed();
    }
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
