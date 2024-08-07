import { getLoggedInId } from "./auth/auth-utils";
import { dynamicQuery, execute, getTableFields, renameAmbiguousColumns } from "./db/db-utils";
import * as res from "./response-utils"

export function nullifyEmpty(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] === '') {
            data[key] = null;
        }
    }
    return data;
}

// Function to log errors
export async function logError(error, custom_message = null) {


    console.error(custom_message + " :", error)

    const initiatorId = await getLoggedInId();
    const query = 'INSERT INTO error_log (error_name, error_message, error_stack, custom_message , created_by) VALUES (?, ?, ?, ?, ?)';

    try {
        await execute(query, [error.name, error.message, error.stack, custom_message, initiatorId ?? null]);
    } catch (err) {
        console.error('Failed to log error:', err);
    }
}


export async function getErrorLog(qs = {}) {
    const tables = [
        { name: 'error_log', alias: 'err' },
        { name: 'employee', alias: 'e' }
    ];

    const resp = await getTableFields(tables);
    const allowedKeys = resp.res ? new Set(resp.data.map(field => `${field.tableAlias}.${field.columnName} `)) : new Set([]);

    try {

        const selectClause = await renameAmbiguousColumns(resp.data)

        // Base query
        let query = `SELECT ${selectClause.slice(2)} 
                     FROM error_log err
                     JOIN employee e ON err.created_by = e.employee_id
                    `;

        const result = await dynamicQuery(qs, query, allowedKeys);


        return result;

    } catch (error) {
        await logError(error, 'Error fetching errors list')
        return res.failed();
    }
}