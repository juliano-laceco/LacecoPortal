"use server"


import * as res from '../response-utils';
import { execute } from '../db/db-utils';
import { logError } from '../misc-utils';

export async function getClients() {

    try {
        const query = "SELECT client_id as value, client_name as label FROM client"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching clients')
        return res.failed()
    }

}

export async function getDisciplines(division_id = null) {

    try {
        const query = !!division_id ? "SELECT discipline_id as value, discipline_name as label FROM discipline WHERE division_id = ?" : "SELECT discipline_id as value, discipline_name as label FROM discipline"
        const results = !!division_id ? await execute(query, [division_id]) : await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching disciplines')
        return res.failed()
    }
}

export async function getDivisions() {

    try {
        const query = "SELECT division_id as value, division_name as label FROM division"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching divisions')
        return res.failed()
    }
}

export async function getContractTypes() {

    try {
        const query = "SELECT contract_type_id as value, contract_type_name as label FROM contract_type"
        const results = await execute(query)

        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching contract types')
        return res.failed()
    }
}

export async function getPositions() {

    try {
        const query = "SELECT position_id as value, position_name as label FROM position"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching positions')
        return res.failed()
    }

}

export async function getPositionDetails(position_id) {
    try {
        const query = "SELECT level_of_management_name , grade_code  FROM position NATURAL JOIN level_of_management NATURAL JOIN grade where position_id = ?"
        const results = await execute(query, [position_id])
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching position details')
        return res.failed()
    }
}

export async function getGrades() {

    try {
        const query = "SELECT grade_id as value, grade_code as label FROM grade"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching grades')
        return res.failed()
    }

}

export async function getLeaveTypes() {

    try {
        const query = "SELECT leave_type_id as value, leave_type_name as label FROM leave_type"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching leave types')
        return res.failed()
    }

}

export async function getRoles() {

    try {
        const query = "SELECT role_id as value, role_name as label FROM role"
        const results = await execute(query)
        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching roles')
        return res.failed()
    }

}

export async function getEmployeeStatuses() {

    try {
        const query = "SELECT employee_status_id as value, employee_status_name as label FROM employee_status"
        const results = await execute(query)

        return res.success_data(results);
    } catch (error) {
        await logError(error, 'Error fetching employee statuses')
        return res.failed()
    }
}

export async function getEmployees() {
    try {
        let query = `SELECT employee_id as value, CONCAT(first_name, ' ', last_name) as label FROM employee`;
        const result = await execute(query);
        return res.success_data(result);
    } catch (error) {
        await logError(error, 'Error fetching employees')
        return res.failed();
    }
}

export async function getPhaseNames() {
    try {
        let query = `SELECT phase_name as value , phase_name as label FROM phase_name`;
        const result = await execute(query);
        return res.success_data(result);
    } catch (error) {
        await logError(error, 'Error fetching phase names')
        return res.failed();
    }
}

export async function getFiltersForTransfer() {
    // SQL queries for different filters

    // Projects filter
    const projectsQuery = `
        SELECT 
            proj.title AS label, 
            proj.project_id AS value
        FROM 
            project proj;
    `;

    // Discipline filter (excluding "Proposals" and limited to division_id = 8)
    const disciplinesQuery = `
        SELECT 
           discipline_id AS value, 
           discipline_name AS label
        FROM 
            discipline
        WHERE 
            division_id = 8 
            AND discipline_name != "Proposals";
    `;

    // Employees with assignments filter (joined with employee_work_day)
    const employeesQuery = `
        SELECT 
            DISTINCT(e.employee_id) AS value, 
            CONCAT(e.first_name, ' ', e.last_name) AS label
        FROM 
            employee e
        JOIN 
            phase_assignee pa ON e.employee_id = pa.assignee_id
        JOIN 
            employee_work_day ewd ON ewd.phase_assignee_id = pa.phase_assignee_id;
    `;

    // Phases with assignments linked to phase_assignee and employee_work_day
    const phasesQuery = `
        SELECT 
            DISTINCT(p.phase_id) AS value, 
            p.phase_name AS label
        FROM 
            phase p
        JOIN 
            phase_assignee pa ON pa.phase_id = p.phase_id
        JOIN 
            employee_work_day ewd ON ewd.phase_assignee_id = pa.phase_assignee_id;
    `;

    // Execute the queries sequentially
    const projects = await execute(projectsQuery);
    const disciplines = await execute(disciplinesQuery);
    const employees = await execute(employeesQuery);
    const phases = await execute(phasesQuery);

    // Return the result as an object with the filter data
    return {
        projects: projects,
        disciplines: disciplines,
        employees: employees,
        phases: phases,
    };
}
