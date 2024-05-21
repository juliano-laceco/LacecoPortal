"use server"

import db from '../../config/db';
import * as res from '../response-utils'

export async function execute(query, values = []) {
    try {
        const [res] = await db.execute(query, [...values])
        return res;
    } catch (error) {
        console.error("Error in executing SQL query:", error)
    }
}

export async function getTableFields(tableName, joinTables = []) {
    try {
        let query;

        if (joinTables.length === 0) {
            // If no join tables are provided, retrieve fields from the single table
            query = `SHOW COLUMNS FROM ${tableName}`;
        } else {

            // If join tables are provided, perform a NATURAL JOIN and retrieve fields from the combined result set
            query = `
          SELECT COLUMN_NAME
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = '${tableName}'
            AND TABLE_SCHEMA = (SELECT DATABASE())
          UNION
          SELECT COLUMN_NAME
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME IN (${joinTables.map(table => `'${table}'`).join(',')})
            AND TABLE_SCHEMA = (SELECT DATABASE())
        `;
        }

        const results = await execute(query);
        const fieldNames = results.map(row => (joinTables == [] ? row.Field : row.COLUMN_NAME));

        return res.success_data(fieldNames);
    } catch (error) {
        console.error('Error fetching field names:', error);
        return res.failed();
    }
}

export async function dynamicQuery(qs, query, allowedKeys) {

    try {

        let whereConditions = [];
        let queryParams = [];
        let keywordConditions = [];

        // Loop through the query string parameters and build the WHERE clause
        for (const [key, value] of Object.entries(qs)) {
            if (allowedKeys.has(key) && value && key != "keyword") { // Only add conditions for allowed parameters with values
                whereConditions.push(`${key} = ?`);
                queryParams.push(value);
            }
        }

        // If we have any WHERE conditions, append them to the query
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }

        if (qs.hasOwnProperty("keyword")) {
            [...allowedKeys].filter((item) => !item.endsWith("_id")).map((colName) => {
                keywordConditions.push(`LOWER(${colName}) LIKE LOWER('%${qs.keyword}%')`)
            })


            query += ` ${whereConditions.length === 0 ? "WHERE " : "AND "}`
            query += keywordConditions.join(' OR ');
        }

        console.log(query)

        // Execute the query with the parameter values
        const results = await execute(query, queryParams);
        return res.success_data(results);

    } catch (error) {
        console.error('Error fetching employee details:', error);
        return res.failed();
    }

}