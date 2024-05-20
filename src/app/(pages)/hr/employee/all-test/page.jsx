import { getAllEmployees } from "@/utilities/employee/employee-utils"
import EmployeeTableWrapper from "./EmployeeTableWrapper"
import { getDisciplines, getDivisions, getEmployeeStatuses } from "@/utilities/lookups/lookup-utils"
import getDropdownData from "@/data/dynamic/EmployeeFilterDDOptions"



async function TablePage({ searchParams }) {

    const results = await getAllEmployees(searchParams)

    // Query String Parameters


    const department = searchParams.discipline
    const division = searchParams.division
    const status = searchParams.status

    const optionsData = await getDropdownData()

    const data = results.data
    console.log(data)


    const filterItems = [{
        filterKey: "discipline_id",
        filterLabel: "Department",
        filterDataKey: "discipline_name",
        filterOptions: optionsData.disciplines
    },
    {
        filterKey: "division_id",
        filterLabel: "Division",
        filterDataKey: "division_name",
        filterOptions: optionsData.divisions
    },
    {
        filterKey: "status_id",
        filterLabel: "Status",
        filterDataKey: "status_id",
        filterOptions: optionsData.statuses
    }]

    return (
        <>
            <EmployeeTableWrapper data={data} params={searchParams} filterItems={filterItems} />
        </>

    )
}

export default TablePage
