"use server"


import * as res from '../response-utils';
import { getLoggedInId } from "../auth/auth-utils";
import { logError, nullifyEmpty } from '../misc-utils';
import { commitTransaction, dynamicQuery, execute, executeTrans, getTableFields, rollbackTransaction, startTransaction } from '../db/db-utils';
import { formatDate } from '../date/date-utils';

export async function handleEmployeeLogin(email, sub) {

    try {

        // Check if the user already has a google_sub associated with their email
        const countEmployeeSQL = 'SELECT google_sub FROM employee WHERE work_email = ?';
        const countEmployee = await execute(countEmployeeSQL, [email]);

        if (countEmployee.length > 0 && countEmployee[0].google_sub) {
            // User already has a google_sub associated with their email
            return res.success()
        }

        // Update the google_sub for the user
        const updateSql = 'UPDATE employee SET google_sub = ? WHERE work_email = ? AND (google_sub IS NULL) || (google_sub = "") ';
        const updateResult = await execute(updateSql, [sub, email]);

        // Extract the number of affected rows from the update result
        const affectedRows = updateResult.affectedRows;

        if (affectedRows === 1) {
            return res.success()
        } else {
            return res.failed()
        }

    } catch (error) {
        await logError(error, 'Error logging in employee')
        return res.failed()
    }
}

export async function getLoggedInRole(google_sub) {

    try {
        const query = 'SELECT role_name, role_id , employee_id FROM employee_roles WHERE google_sub = ?';
        const roleRes = await execute(query, [google_sub]);

        // Check if any roles were found for the provided google_sub
        if (roleRes.length === 0) {
            return res.failed();
        }

        // Extract role_id and role_name from the first row of the result
        const { role_id, role_name, employee_id } = roleRes[0];

        return res.success_data({ role_id, role_name, employee_id });

    } catch (error) {
        await logError(error, 'Error fetching employee role')
        return res.failed();
    }
}

export async function checkEmailExists(email) {

    try {
        // Check if the user already has a google_sub associated with their email
        const countEmployeeSQL = 'SELECT work_email FROM employee WHERE work_email = ?';
        const countEmployee = await execute(countEmployeeSQL, [email]);

        if (countEmployee.length > 0 && countEmployee[0].work_email) {
            // User already has a google_sub associated with their email
            return res.failed()
        }

        return res.success()

    } catch (error) {
        await logError(error, 'Error checking email availability')
        return res.success()
    }

}

export async function createEmployee(data) {
    try {
        const sql = `
            INSERT INTO lacecodb.employee (
                first_name,
                last_name,
                work_email,
                date_of_birth,
                discipline_id, 
                nationality,  
                marital_status,
                employee_hourly_cost,  
                major, 
                years_of_experience, 
                contract_type_id, 
                contract_valid_till, 
                position_id,  
                country, 
                role_id,
                created_on,
                created_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;


        const initiatorId = await getLoggedInId()

        const {
            first_name,
            last_name,
            work_email,
            date_of_birth,
            discipline_id,
            nationality,
            marital_status,
            employee_hourly_cost,
            major,
            years_of_experience,
            contract_type_id,
            contract_valid_till,
            position_id,
            country,
            role_id,
            created_on
        } = nullifyEmpty(data);

        const result = await execute(sql, [
            first_name,
            last_name,
            work_email,
            date_of_birth,
            discipline_id,
            nationality,
            marital_status,
            employee_hourly_cost ?? null,
            major,
            years_of_experience,
            contract_type_id,
            contract_valid_till ?? null,
            position_id,
            country,
            role_id,
            created_on,
            initiatorId
        ]);

        if (result.affectedRows > 0) {
            const insertId = result.insertId; // Get the inserted employee ID

            // Assuming createPositionHistoryRecord is a function that takes employee_hourly_cost, position_id, and employee_id
            const positionRecord = await createPositionHistoryRecord({ employee_hourly_cost: employee_hourly_cost ?? null, position_id, employee_id: insertId });
            const statusRecord = await createStatusHistoryRecord({ employee_id: insertId, status_id: 1 })
            return (positionRecord.res && statusRecord.res);
        }

        return res.failed();
    } catch (error) {
        await logError(error, 'Error creating employee')
        return res.failed();
    }
}

export async function updateEmployee(data) {

    try {

        const initiatorId = await getLoggedInId()

        const sql = `
            UPDATE lacecodb.employee
            SET
                first_name = ?,
                last_name = ?,
                date_of_birth = ?,
                discipline_id = ?,
                nationality = ?,  
                marital_status = ?,   
                employee_hourly_cost = ?,  
                major = ?, 
                years_of_experience = ?, 
                contract_type_id = ?, 
                contract_valid_till = ?, 
                position_id = ?,  
                country = ?, 
                employee_status_id = ?,  
                work_end_date = ? ,
                role_id = ?,
                changed_on = ?,
                changed_by = ?
            WHERE employee_id = ?`;

        const {
            employee_id,
            first_name,
            last_name,
            date_of_birth,
            discipline_id,
            nationality,
            marital_status,
            employee_hourly_cost,
            major,
            years_of_experience,
            contract_type_id,
            contract_valid_till,
            position_id,
            country,
            employee_status_id,
            role_id,
            work_end_date
        } = nullifyEmpty(data);

        const result = await execute(sql, [
            first_name,
            last_name,
            date_of_birth,
            discipline_id,
            nationality,
            marital_status,
            employee_hourly_cost ?? null,
            major,
            years_of_experience,
            contract_type_id,
            contract_valid_till ?? null,
            position_id,
            country,
            employee_status_id,
            work_end_date ?? null,
            role_id,
            formatDate(new Date(), "sql-datetime"),
            initiatorId,
            employee_id
        ]);

        if (result.affectedRows === 0) {
            return res.failed();
        }

        return res.success();
    } catch (error) {
        await logError(error, 'Error updating employee')
        return res.failed();
    }
}

export async function getEmployeeData(employee_id) {
    try {
        const query = `SELECT 
                       employee_id, 
                       first_name, 
                       last_name, 
                       work_email, 
                       DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth, 
                       nationality, 
                       marital_status, 
                       employee_hourly_cost, 
                       major, 
                       ROUND(years_of_experience) AS years_of_experience, 
                       contract_type_id, 
                       CASE 
                           WHEN contract_valid_till IS NULL THEN NULL 
                           ELSE DATE_FORMAT(contract_valid_till, '%Y-%m-%d') 
                       END AS contract_valid_till, 
                       CASE 
                           WHEN work_end_date IS NULL THEN NULL 
                           ELSE DATE_FORMAT(work_end_date, '%Y-%m-%d') 
                       END AS work_end_date, 
                       p.position_id, 
                       country, 
                       d.division_id, 
                       e.discipline_id,  
                       employee_status_id, 
                       role_id, 
                       DATE_FORMAT(created_on, '%Y-%m-%d') AS created_on 
                   FROM 
                       employee e
                   JOIN 
                       position p ON e.position_id = p.position_id
                   JOIN 
                       discipline d ON e.discipline_id = d.discipline_id
                   JOIN 
                       division dv ON d.division_id = dv.division_id
                   JOIN 
                       grade g ON p.grade_id = g.grade_id
                   JOIN 
                       level_of_management lom ON p.level_of_management_id = lom.level_of_management_id
                   WHERE 
                       employee_id = ?`;

        const results = await execute(query, [employee_id])

        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching employee details')
        return res.failed()
    }
}

export async function getAllEmployees(qs = {}) {
    const tables = [
        { name: 'employee', alias: 'e' },
        { name: 'employee_status', alias: 'es' },
        { name: 'role', alias: 'r' },
        { name: 'position', alias: 'p' },
        { name: 'grade', alias: 'g' },
        { name: 'discipline', alias: 'd' },
        { name: 'division', alias: 'dv' }
    ];

    const resp = await getTableFields(tables);
    const allowedKeys = resp.res ? new Set(resp.data.map(field => `${field.tableAlias}.${field.columnName}`)) : new Set([]);

    try {
        // Base query
        let query = `SELECT * 
                     FROM employee e 
                     JOIN employee_status es ON e.employee_status_id = es.employee_status_id
                     JOIN role r ON e.role_id = r.role_id
                     JOIN position p ON e.position_id = p.position_id
                     JOIN grade g ON p.grade_id = g.grade_id 
                     JOIN discipline d ON e.discipline_id = d.discipline_id
                     JOIN division dv ON d.division_id = dv.division_id
                     `

        const result = await dynamicQuery(qs, query, allowedKeys);

        return result;

    } catch (error) {
        await logError(error, 'Error fetching employee details')
        return res.failed();
    }
}


export async function getEmployeeLinkOptions(role_id) {


    try {
        const commonLinksQuery = `SELECT *
                              FROM sidebar_link
                              WHERE isCommon = 'Yes'                   
                              `
        const commonLinks = await execute(commonLinksQuery)

        const specificLinksQuery = `SELECT * 
                     FROM sidebar_link sl 
                     JOIN sidebar_link_role slr ON slr.sidebar_link_id = sl.sidebar_link_id 
                     WHERE slr.role_id = ? `

        const specificLinks = await execute(specificLinksQuery, [role_id])

        return res.success_data([...commonLinks, ...specificLinks])
    } catch (error) {
        await logError(error, "Error fetching employee link options")
        return res.failed()
    }

}

export async function getEmployeeAssignments(employee_id = 1) {
    let transaction;

    try {
        transaction = await startTransaction();

        const query = `
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

        const projects = await executeTrans(query, [employee_id], transaction);

        for (const project of projects) {
            const { project_id } = project;

            const phasesQuery = `
                SELECT p.phase_id, p.phase_name
                FROM phase p
                JOIN phase_assignee pa ON pa.phase_id = p.phase_id
                WHERE project_id = ? AND pa.assignee_id = ?
                AND EXISTS(
                SELECT 1
                FROM projected_work_week pww
                WHERE pww.phase_assignee_id = pa.phase_assignee_id
                )
            `;
            const phases = await executeTrans(phasesQuery, [project_id, employee_id], transaction);

            for (var phase of phases) {
                const { phase_id } = phase;
                const phaseAssigneesQuery = `
                    SELECT pa.phase_assignee_id , pa.work_done_hrs , pa.expected_work_hrs
                    FROM phase_assignee pa
                    JOIN phase p ON pa.phase_id = p.phase_id
                    WHERE pa.assignee_id = ? AND pa.phase_id = ?
                `;
                const phase_assignees = await executeTrans(phaseAssigneesQuery, [employee_id, phase_id], transaction);
                const assignee = phase_assignees[0];

                // if (assignee.work_done_hrs == 0) {
                //     assignee.assignments = []
                // } else {

                // }

                if (phase_assignees.length > 0) {

                    const { phase_assignee_id } = assignee

                    // const filledWeeksQuery = `
                    // SELECT employee_work_day_id, DATE_FORMAT(work_day, '%Y-%m-%d') AS work_day,  DATE_FORMAT(work_day, '%d %M %Y') AS display_date, hours_worked , status
                    // FROM employee_work_day   
                    // WHERE phase_assignee_id = ? AND (status = 'Pending' OR status = 'Approved')
                    // `

                    
                    const filledWeeksQuery = `
                    SELECT employee_work_day_id, DATE_FORMAT(work_day, '%Y-%m-%d') AS work_day,  DATE_FORMAT(work_day, '%d %M %Y') AS display_date, hours_worked , status , rejection_reason
                    FROM employee_work_day   
                    WHERE phase_assignee_id = ?
                    `

                    const filledWeeks = await executeTrans(filledWeeksQuery, [phase_assignee_id], transaction)
                    assignee.assignments = filledWeeks

                    Object.assign(phase, assignee);
                }

            }

            project.phases = phases;
        }

        await commitTransaction(transaction);
        return projects;
    } catch (error) {
        console.error("Transaction failed:", error);
        await logError(error, "Error fetching employee timesheet assignments");
        await rollbackTransaction(transaction);
    } finally {
        if (transaction) {
            transaction.release();
        }
    }
}
