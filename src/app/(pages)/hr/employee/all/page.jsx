import { getAllEmployees } from "@/utilities/employee/employee-utils"
import EmployeeTableWrapper from "./EmployeeTableWrapper"
import getDropdownData from "@/data/dynamic/EmployeeFilterDDOptions"
import { formatDate } from "@/utilities/date/date-utils"



async function TablePage({ searchParams }) {

    const results = await getAllEmployees(searchParams)

    // Query String Parameters
    const discipline = searchParams.discipline_id
    const division = searchParams.division_id
    const employee_status = searchParams.employee_status_id
    const keyword = searchParams.keyword

    const optionsData = await getDropdownData()

    const data = results.data

    const filterItems = [
        {
            type: "keyword",
            filterKey: "keyword",
            filterLabel: "Search",
            filterValue: keyword ?? ""
        }, {
            type: "dd",
            filterKey: "discipline_id",
            filterLabel: "Department",
            filterDataKey: "discipline_name",
            filterOptions: optionsData.disciplines,
            filterValue: discipline ?? ""
        },
        {
            type: "dd",
            filterKey: "division_id",
            filterLabel: "Division",
            filterDataKey: "division_name",
            filterOptions: optionsData.divisions,
            filterValue: division ?? ""
        },
        {
            type: "dd",
            filterKey: "employee_status_id",
            filterLabel: "Status",
            filterDataKey: "employee_status_name",
            filterOptions: optionsData.statuses,
            filterValue: employee_status ?? ""
        }]

    const preprocessData = (data) => {
        return data.map(row => ({
            ...row,
            fullName: `${row.first_name} ${row.last_name}`,
            created_on: formatDate(row.created_on),
        }));
    };

    const tableHeaders = [
        { Header: 'Name', accessor: 'fullName', mobile: true },
        { Header: 'Email', accessor: 'work_email' }, 
        { Header: 'Division', accessor: 'division_name', mobile: true },
        { Header: 'Discipline', accessor: 'discipline_name' },
        { Header: 'Position', accessor: 'position_name', mobile: true },
        { Header: 'Grade', accessor: 'grade_code' },
        { Header: 'Created On', accessor: 'created_on' },
        { Header: 'Status', accessor: 'employee_status_name' },
    ];

    return (
        <>
            <EmployeeTableWrapper data={preprocessData(data)} searchParams={searchParams} filterItems={filterItems} tableHeaders={tableHeaders} />
        </>
    )
}


export default TablePage
