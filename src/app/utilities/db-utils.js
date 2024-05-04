import db from '../../config/db';
import * as res from './response-utils';

export async function handleEmployeeLogin(email, sub) {
    try {
        // Check if the user already has a google_sub associated with their email
        const checkSql = 'SELECT google_sub FROM employee WHERE work_email = ?';
        const [checkResult] = await db.execute(checkSql, [email]);

        if (checkResult.length > 0 && checkResult[0].google_sub) {
            // User already has a google_sub associated with their email
            return res.success()
        }

        // Update the google_sub for the user
        const updateSql = 'UPDATE employee SET google_sub = ? WHERE work_email = ? AND google_sub IS NULL';
        const values = [sub, email];
        const [updateResult] = await db.execute(updateSql, values);

        // Extract the number of affected rows from the update result
        const affectedRows = updateResult.affectedRows;
        console.log('Affected Rows', affectedRows);

        if (affectedRows === 1) {
            return res.success()
        } else {
            return res.failed()
        }
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // Rethrow the error to handle it at a higher level if needed
    }
}