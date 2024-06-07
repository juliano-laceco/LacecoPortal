"use server"


import * as res from '../response-utils';
import { getLoggedInId, getSession } from "../auth/auth-utils";
import { nullifyEmpty } from '../misc-utils';
import { dynamicQuery, execute, getTableFields } from '../db/db-utils';




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
        console.error('Error executing query:', error);
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
        console.error('Error fetching employee role:', error);
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
        console.error('Error checking email availability:', error);
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const {
            first_name,
            last_name,
            work_email,
            date_of_birth,
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
            created_on
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
        console.error('Error creating employee:', error);
        return res.failed();
    }
}

export async function updateEmployee(data) {
    try {

        const sql = `
            UPDATE lacecodb.employee
            SET
                first_name = ?,
                last_name = ?,
                date_of_birth = ?,  
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
                role_id = ?
            WHERE employee_id = ?`;

        const {
            employee_id,
            first_name,
            last_name,
            date_of_birth,
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
            status_changed,
            position_changed,
            work_end_date
        } = nullifyEmpty(data);

        const result = await execute(sql, [
            first_name,
            last_name,
            date_of_birth,
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
            employee_id
        ]);

        if (result.affectedRows === 0) {
            return res.failed();
        }

        if (position_changed) {
            const positionRecord = await createPositionHistoryRecord({
                employee_hourly_cost: employee_hourly_cost ?? null,
                position_id,
                employee_id
            });

            if (!positionRecord.res) {
                return res.failed();
            }
        }

        if (status_changed) {

            const statusRecord = await createStatusHistoryRecord({ employee_id: employee_id, status_id: 1 })

            if (!statusRecord.res) {
                return res.failed();
            }
        }

        return res.success();
    } catch (error) {
        console.error('Error updating employee:', error);
        return res.failed();
    }
}

export async function createPositionHistoryRecord(data) {

    try {

        const initiatorId = await getLoggedInId()

        const sql = `
    INSERT INTO lacecodb.position_history (
        employee_id,
        new_position_id,
        new_employee_hourly_cost,
        changed_by
    )
    VALUES (?, ?, ?, ?)
`;

        const {
            employee_hourly_cost,
            position_id,
            employee_id
        } = data;

        const result = await execute(sql, [employee_id, position_id, employee_hourly_cost ?? null, initiatorId])

        if (result.affectedRows > 0) {
            return res.success()
        }

        return res.failed()

    } catch (error) {
        console.error('Error creating position history record:', error);
        return res.failed()
    }
}

export async function createStatusHistoryRecord(data) {

    try {

        const initiatorId = await getLoggedInId()

        const sql = `
    INSERT INTO lacecodb.employee_status_history (
        employee_id,
        new_status_id,
        changed_by
    )
    VALUES (?, ? , ?)
`;

        const {
            status_id,
            employee_id
        } = data;

        const result = await execute(sql, [employee_id, status_id, initiatorId])

        if (result.affectedRows > 0) {
            return res.success()
        }

        return res.failed()

    } catch (error) {
        console.error('Error creating employee status history record:', error);
        return res.failed()
    }
}

export async function getEmployeeData(employee_id) {
    try {
        const query = `SELECT employee_id, first_name, last_name, work_email, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth, nationality, marital_status, employee_hourly_cost, major, years_of_experience, contract_type_id, CASE WHEN contract_valid_till IS NULL THEN NULL ELSE DATE_FORMAT(contract_valid_till, '%Y-%m-%d') END AS contract_valid_till, CASE WHEN work_end_date IS NULL THEN NULL ELSE DATE_FORMAT(work_end_date, '%Y-%m-%d') END AS work_end_date ,  position_id, country, division_id , discipline_id ,  employee_status_id, role_id, DATE_FORMAT(created_on, '%Y-%m-%d') AS created_on 
                       FROM employee
                       NATURAL JOIN position
                       NATURAL JOIN discipline
                       NATURAL JOIN division
                       NATURAL JOIN grade
                       NATURAL JOIN level_of_management
                       WHERE employee_id = ?`;

        const results = await execute(query, [employee_id])

        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching employee details:', error);
        return res.failed()
    }
}

export async function getAllEmployees(qs = {}) {

    const resp = await getTableFields("employee", ["employee_status", "role", "position", "grade", "discipline", "division"])

    const allowedKeys = resp.res ? new Set(resp.data) : new Set([])

    try {
        // Base query
        let query = `SELECT * 
                     FROM employee
                     NATURAL JOIN employee_status
                     NATURAL JOIN role
                     NATURAL JOIN position
                     NATURAL JOIN grade
                     NATURAL JOIN discipline
                     NATURAL JOIN division`;

        const result = await dynamicQuery(qs, query, allowedKeys)

        return result

    } catch (error) {
        console.error('Error fetching employee details:', error);
        return res.failed();
    }
}

