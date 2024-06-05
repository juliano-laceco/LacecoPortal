"use server"

import { execute } from "@/config/db";
import * as res from "../response-utils"

export async function checkProjectCodeExists(code) {

    try {
        const countProjectCodesSQL = 'SELECT project_id FROM projects WHERE code = ?';
        const countProjectCodes = await execute(countProjectCodesSQL, [code]);

        if (countProjectCodes.length > 0 && countProjectCodes[0].code) {
            return res.failed()
        }

        return res.success()

    } catch (error) {
        console.error('Error checking project code availability:', error);
        return res.success()
    }

}