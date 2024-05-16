"use server"

import db from '../config/db';
import * as res from './response-utils';
import { getSession } from "../utilities/auth-utils";
import { unstable_cache } from 'next/cache';

async function execute(query, values = []) {

    try {
        const [res] = await db.execute(query, [...values])
        return res;
    } catch (error) {
        console.error("Error in executing SQL query:", error)
    }
}

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

export async function getClients() {

    try {
        const query = "SELECT client_id as value, client_name as label FROM client"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return res.failed()
    }

}

export async function getDisciplines(division_id = null) {

    try {
        const query = !!division_id ? "SELECT discipline_id as value, discipline_name as label FROM discipline WHERE division_id = ?" : "SELECT discipline_id as value, discipline_name as label FROM discipline"
        const results = !!division_id ? await execute(query, [division_id]) : await execute(query)
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching disciplines:', error);
        return res.failed()
    }
}

export async function getDivisions() {

    try {
        const query = "SELECT division_id as value, division_name as label FROM division"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching divisions:', error);
        return res.failed()
    }
}

export async function getContractTypes() {

    try {
        const query = "SELECT contract_type_id as value, contract_type_name as label FROM contract_type"
        const results = await execute(query)

        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching contract types:', error);
        return res.failed()
    }
}

export async function getPositions() {

    try {
        const query = "SELECT position_id as value, position_name as label FROM position"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching positions:', error);
        return res.failed()
    }

}

export async function getGrades() {

    try {
        const query = "SELECT grade_id as value, grade_code as label FROM grade"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching grades:', error);
        return res.failed()
    }

}

export async function getRoles() {

    try {
        const query = "SELECT role_id as value, role_name as label FROM role"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching roles:', error);
        return res.failed()
    }

}

const getRolesCache = async () => {
    try {
        const query = "SELECT role_id as value, role_name as label FROM role";
        const results = await execute(query);
        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching roles:', error);
        return res.failed();
    }
}

export async function getEmployeeStatuses(type = null) {

    try {
        const query = type === "all" ? "SELECT employee_status_id as value, employee_status_name as label FROM employee_status" : "SELECT employee_status_id as value, employee_status_name as label FROM employee_status WHERE employee_status_name IN ('Active','On Probation')"
        const results = await execute(query)

        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching employee statuses:', error);
        return res.failed()
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
      discipline_id,  
      employee_hourly_cost,  
      major, 
      years_of_experience, 
      contract_type_id, 
      contract_valid_till, 
      position_id,  
      grade_id, 
      country, 
      status_id,  
      created_on,
      role_id
    )
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , CURRENT_TIMESTAMP, ?)`;

        const {
            first_name,
            last_name,
            work_email,
            date_of_birth,
            nationality,
            marital_status,
            discipline_id,
            employee_hourly_cost,
            major,
            years_of_experience,
            contract_type_id,
            contract_valid_till,
            position_id,
            grade_id,
            country,
            status_id,
            role_id
        } = data;

        const result = await execute(sql, [first_name, last_name, work_email, date_of_birth, nationality, marital_status, discipline_id, employee_hourly_cost, major, years_of_experience, contract_type_id, contract_valid_till ?? null, position_id, grade_id, country, status_id, role_id])

        if (result.affectedRows > 0) {
            let insertedId = result.insertId;
            const history_result = await createPositionHistoryRecord({ ...data, insertedId })
            if (history_result.res) {
                return res.success()
            }
        }

        return res.failed()

    } catch (error) {
        console.error('Error creating employee:', error);
        return res.failed()
    }
}

export async function createPositionHistoryRecord(data) {

    try {

        const session = await getSession()
        const loggedInEmployee = session?.user?.employee_id

        const sql = `
    INSERT INTO lacecodb.position_history (
        employee_id,
        position_change_type,
        old_position_id,
        new_position_id,
        old_employee_hourly_cost,
        new_employee_hourly_cost,
        changed_on,
        changed_by
    )
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
`;

        const {
            employee_hourly_cost,
            position_id,
            insertedId
        } = data;

        const result = await execute(sql, [insertedId, "New Employee", position_id, position_id, employee_hourly_cost, employee_hourly_cost, loggedInEmployee])

        if (result.affectedRows > 0) {
            return res.success()
        }

        return res.failed()

    } catch (error) {
        console.error('Error creating position history record:', error);
        return res.failed()
    }
}

export default getRolesCache ;