import { getEmployeeStatuses, getDivisions, getDisciplines } from '@/utilities/lookups/lookup-utils'

export default async function getDropdownData() {


    const statusesRes = await getEmployeeStatuses("all")
    const statuses = statusesRes.data

    const disciplinesRes = await getDisciplines()
    const disciplines = disciplinesRes.data


    const divisionsRes = await getDivisions()
    const divisions = divisionsRes.data

    return { statuses, disciplines, divisions }
}

