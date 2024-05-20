"use server"

import db from '../../config/db';

export async function execute(query, values = []) {

    try {
        const [res] = await db.execute(query, [...values])
        return res;
    } catch (error) {
        console.error("Error in executing SQL query:", error)
    }
}


