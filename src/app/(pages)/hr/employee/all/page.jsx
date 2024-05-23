import { getAllEmployees } from "@/utilities/employee/employee-utils"
import EmployeeTableWrapper from "../../../../components/custom/TableWrappers/EmployeeTableWrapper"
import getDropdownData from "@/data/dynamic/EmployeeFilterDDOptions"
import { formatDate } from "@/utilities/date/date-utils"
import Image from "next/image"
import Link from "next/link"



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
            employee_status: createStatusDiv(row.employee_status_name),
            fullName: `${row.first_name} ${row.last_name}`,
            created_on: formatDate(row.created_on),
            actions: (
                <Link href={`/hr/employee/${row.employee_id}`}>
                    <Image
                        src="/resources/icons/edit.svg"
                        height="25"
                        width="25"
                        alt="Search"
                    />
                </Link>
            ),
        }));
    };

    function createStatusDiv(status) {

        let bg;

        switch (status) {
            case "Active":
                bg = "bg-active"
                break;
            case "On Temporary Leave":
                bg = "bg-probation"
                break;
            case "Suspended" || "Terminated":
                bg = "bg-terminated"
                break;
        }


        return (<div className={`p-2 w-32 rounded-md text-xs text-center text-white ${bg}`}>{status}</div>)

    }

    const tableHeaders = [
        { Header: 'Name', accessor: 'fullName', mobile: true },
        { Header: 'Division', accessor: 'division_name' },
        { Header: 'Department', accessor: 'discipline_name' },
        { Header: 'Position', accessor: 'position_name', mobile: true },
        { Header: 'Grade', accessor: 'grade_code' },
        { Header: 'Joined On', accessor: 'created_on' },
        { Header: 'Status', accessor: 'employee_status' },
        { Header: 'Actions', accessor: 'actions', mobile: true },
    ];

    return (
        <>
            <EmployeeTableWrapper data={preprocessData(data)} searchParams={searchParams} filterItems={filterItems} tableHeaders={tableHeaders} minPageSize={2} maxPageSize={10} pageSizeStep={2} isPaginated isFilterable />
        </>
    )
}


export default TablePage
