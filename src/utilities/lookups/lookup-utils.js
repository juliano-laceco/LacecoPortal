"use server"


import * as res from '../response-utils';
import { execute } from '../db/db-utils';

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

export async function getEmployeeStatuses() {

    try {
        const query =  "SELECT employee_status_id as value, employee_status_name as label FROM employee_status"
        const results = await execute(query)

        return res.success_data(results);
    } catch (error) {
        console.error('Error fetching employee statuses:', error);
        return res.failed()
    }
}