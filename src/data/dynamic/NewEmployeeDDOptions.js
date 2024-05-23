import { getPositions, getGrades, getRoles, getEmployeeStatuses, getContractTypes, getDivisions } from '@/utilities/lookups/lookup-utils'

export default async function getDropdownData() {
    const positionsRes = await getPositions()
    const positions = positionsRes.data

    const gradesRes = await getGrades()
    const grades = gradesRes.data

    const rolesRes = await getRoles()
    const roles = rolesRes.data

    const statusesRes = await getEmployeeStatuses()
    const statuses = statusesRes.data
    

    const contractTypesRes = await getContractTypes();
    const contractTypes = contractTypesRes.data

    const divisionsRes = await getDivisions()
    const divisions = divisionsRes.data

    return { positions, grades, roles, statuses, contractTypes, divisions }
}

