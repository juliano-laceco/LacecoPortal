import db from '../config/db';
import * as res from './response-utils';


async function execute(query, values = []) {
    const [res] = await db.execute(query, [...values])
    return res;
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

    const getRoleSQL = 'SELECT role_name , role_id  FROM employee_roles WHERE google_sub = ? '
    const roleRes = await execute(getRoleSQL, [google_sub])
    const { role_id, role_name } = roleRes[0]

    return { role_id, role_name }
}

export async function getClients() {
    try {
        const clientsSQL = "SELECT client_id as value, client_name as label FROM client"
        const results = await execute(clientsSQL)
        return res.success_data(results);
    } catch (ex) {
        return res.failed()
    }

}

export async function getDisciplines() {
    try {
        const clientsSQL = "SELECT discipline_id as value, discipline_name as label FROM discipline"
        const results = await execute(clientsSQL)
        return res.success_data(results);
    } catch (ex) {
        return res.failed()
    }

}