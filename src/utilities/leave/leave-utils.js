"use server"

import * as res from '../response-utils';
import { dynamicQuery, execute, getTableFields } from '../db/db-utils';

export async function createLeave(leaves) {

    const sql = `
        INSERT INTO lacecodb.leave (
            employee_id,
            leave_type_id,
            leave_date,
            no_of_hours
        ) VALUES (?, ?, ?, ?)`;

    try {
        for (const leave of leaves) {
            const { employee_id, leave_type_id, leave_date, no_of_hours } = leave;
            await execute(sql, [employee_id, leave_type_id, leave_date, no_of_hours]);
        }
        return res.success();
    } catch (error) {
        return res.failed();
    }
}

export async function getAllLeaves(qs = {}) {

    const resp = await getTableFields("lacecodb.leave", ["employee", "leave_type"])

    const allowedKeys = resp.res ? new Set(resp.data) : new Set([])

    try {
        // Base query
        let query = `SELECT * 
                     FROM lacecodb.leave
                     NATURAL JOIN employee
                     NATURAL JOIN leave_type
                     `;

        const result = await dynamicQuery(qs, query, allowedKeys)

        return result

    } catch (error) {
        console.error('Error fetching leave details:', error);
        return res.failed();
    }
}
