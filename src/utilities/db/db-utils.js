"use server"

import db from '../../config/db';
import * as res from '../response-utils'

export async function execute(query, values = []) {
    try {
        const [res] = await db.execute(query, [...values])
        return res;
    } catch (error) {
        console.error("Error in executing SQL query:", error)
        throw error;
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

        // Detect alias in the query string
        const aliasRegex = /\b(\w+)\./g;
        const aliasMatches = [...query.matchAll(aliasRegex)];
        const aliases = aliasMatches.map(match => match[1]);
        const aliasMap = new Set(aliases);

        // Function to prefix keys with alias if they exist
        const prefixKeyWithAlias = (key) => {
            if (aliasMap.size > 0) {
                const tableAlias = Array.from(aliasMap).find(a => allowedKeys.has(`${a}.${key}`));
                return tableAlias ? `${tableAlias}.${key}` : key;
            }
            return key;
        };

        // Loop through the query string parameters and build the WHERE clause
        for (const [key, value] of Object.entries(qs)) {
            if (allowedKeys.has(key) && value && key != "keyword") { // Only add conditions for allowed parameters with values
                const prefixedKey = prefixKeyWithAlias(key);
                whereConditions.push(`${prefixedKey} = ?`);
                queryParams.push(value);
            }
        }

        // If we have any WHERE conditions, append them to the query
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }

        if (qs.hasOwnProperty("keyword")) {
            [...allowedKeys].filter((item) => !item.endsWith("_id")).map((colName) => {
                const prefixedColName = prefixKeyWithAlias(colName);
                keywordConditions.push(`LOWER(${prefixedColName}) LIKE LOWER('%${qs.keyword}%')`);
            });

            query += ` ${whereConditions.length === 0 ? "WHERE " : "AND "}`;
            query += keywordConditions.join(' OR ');
        }

        // Execute the query with the parameter values
        const results = await execute(query, queryParams);
        return res.success_data(results);

    } catch (error) {
        console.error('Error fetching project details:', error);
        return res.failed();
    }
}
