"use server"

import db from '../../config/db';
import { logError } from '../misc-utils';
import * as res from '../response-utils'

export async function execute(query, values = []) {
    try {
        const [res] = await db.execute(query, [...values])
        return res;
    } catch (error) {
        await logError(error , "Error in executing SQL query")
        throw error;
    }
}

export async function getTableFields(tables) {
    try {
        let queries = tables.map(table => `
            SELECT '${table.alias}' AS tableAlias, COLUMN_NAME AS columnName , '${table.name}' AS tableName
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = '${table.name}'
              AND TABLE_SCHEMA = (SELECT DATABASE())
        `);

        const query = queries.join(' UNION ');
        const results = await execute(query);
        const fieldNames = results.map(row => ({ tableAlias: row.tableAlias, columnName: row.columnName, tableName: row.tableName }));

        return res.success_data(fieldNames);
    } catch (error) {
        await logError(error , 'Error fetching field names' )
        return res.failed();
    }
}

export async function dynamicQuery(qs, query, allowedKeys) {
    try {
        let whereConditions = [];
        let queryParams = [];
        let keywordConditions = [];

        // Function to prefix keys with alias if they exist in allowedKeys
        const prefixKeyWithAlias = (key) => {
            for (const allowedKey of allowedKeys) {
                if (allowedKey.endsWith(`.${key}`)) {
                    return allowedKey;
                }
            }
            return key; // Return the original key if no alias match is found
        };

        // Function to determine if a column exists in multiple tables
        const columnExistsInMultipleTables = (columnName) => {
            const columnKeys = [...allowedKeys].filter(key => key.endsWith(`.${columnName}`));
            return columnKeys.length > 1;
        };

        // Loop through the query string parameters and build the WHERE clause
        for (const [key, value] of Object.entries(qs)) {
            if (allowedKeys.has(prefixKeyWithAlias(key)) && value && key !== "keyword") { // Only add conditions for allowed parameters with values
                const prefixedKey = prefixKeyWithAlias(key);
                whereConditions.push(`${prefixedKey} = ?`);
                queryParams.push(value);
            }
        }

        // If we have any WHERE conditions, append them to the query
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }

        // Handle the "keyword" parameter
        if (qs.hasOwnProperty("keyword")) {
            [...allowedKeys].filter((item) => !item.endsWith("_id")).forEach((colName) => {
                keywordConditions.push(`LOWER(${colName}) LIKE LOWER(?)`);
                queryParams.push(`%${qs.keyword}%`);
            });

            query += ` ${whereConditions.length === 0 ? "WHERE " : "AND "}`;
            query += keywordConditions.join(' OR ');
        }

        // Rename columns found in multiple tables
        const prefixedColumns = [];
        for (const [key, alias] of allowedKeys) {
            const [tableName, columnName] = key.split('.');
            if (columnExistsInMultipleTables(columnName)) {
                prefixedColumns.push(`${tableName}_${columnName} AS ${alias}`);
            }
        }

        // Append renamed columns to the SELECT statement
        if (prefixedColumns.length > 0) {
            query = query.replace('*', [...prefixedColumns, '*'].join(', '));
        }

        // Execute the query with the parameter values
        const results = await execute(query, queryParams);
        return res.success_data(results);

    } catch (error) {
        await logError(error , 'Error fetching project details')
        return res.failed();
    }
}


export async function renameAmbiguousColumns(columns) {
    // Constructing the SELECT clause with column renaming
    let selectClause = '';
    const duplicates = {};

    try {
        columns.forEach(field => {
            const { tableAlias, columnName, tableName } = field;
            const key = `${columnName}`;
            if (duplicates[key]) {
                // Prefix the column name with the table name
                selectClause += `, ${tableAlias}.${columnName} AS ${tableName}_${columnName}`;
            } else {
                // Check if the column exists in multiple tables
                const duplicateColumn = columns.some(f => f.columnName === columnName && f.tableName !== tableName);
                if (duplicateColumn) {
                    // Prefix the column name with the table name
                    selectClause += `, ${tableAlias}.${columnName} AS ${tableName}_${columnName}`;
                } else {
                    // Use the column name as is
                    selectClause += `, ${tableAlias}.${columnName}`;
                }
                duplicates[key] = true;
            }
        });
    } catch (error) {
        await logError(error , 'Error renaming ambiguous columns')
        return "*";
    }

    return selectClause;

}

// Utility functions for transaction management
export const startTransaction = async () => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    return connection;
};

export const executeTrans = async (query, params, connection) => {
    const [results] = await connection.execute(query, params);
    return results;
};

export const commitTransaction = async (connection) => {
    await connection.commit();
    connection.release();
};

export const rollbackTransaction = async (connection) => {
    await connection.rollback();
    connection.release();
};