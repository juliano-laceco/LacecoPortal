import { getAllEmployees } from "@/utilities/employee/employee-utils";
import TableWrapper from "../../../../components/custom/TableWrappers/TableWrapper"
import getDropdownData from "@/data/dynamic/EmployeeFilterDDOptions";
import { formatDate } from "@/utilities/date/date-utils";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/app/components/custom/Modals/Modal";
import LeaveForm from "@/app/components/forms/Leave/LeaveForm";
import { getLeaveTypes } from "@/utilities/lookups/lookup-utils";

async function TablePage({ searchParams }) {

    const results = await getAllEmployees(searchParams);

    // Query String Parameters
    const discipline = searchParams.discipline_id;
    const division = searchParams.division_id;
    const employee_status = searchParams.employee_status_id;
    const keyword = searchParams.keyword;
    const identifier = searchParams.identifier;
    const modalIsOpen = searchParams.showModal;

    // Fetching dropdown data for the filters
    const optionsData = await getDropdownData();
    const data = results.data;


    const filterItems = [
        {
            type: "keyword",
            filterKey: "keyword",
            filterLabel: "Search",
            filterValue: keyword ?? ""
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
            filterKey: "discipline_id",
            filterLabel: "Department",
            filterDataKey: "discipline_name",
            filterOptions: optionsData.disciplines,
            filterValue: discipline ?? ""
        },
        {
            type: "dd",
            filterKey: "employee_status_id",
            filterLabel: "Status",
            filterDataKey: "employee_status_name",
            filterOptions: optionsData.statuses,
            filterValue: employee_status ?? ""
        }
    ];

    const preprocessData = (data) => {
        return data.map(row => ({
            ...row,
            employee_status: createStatusDiv(row.employee_status_name),
            fullName: `${row.first_name} ${row.last_name}`,
            created_on: formatDate(row.created_on),
            actions: (
                <div className="flex justify-center items-center gap-2">
                    <Link title="Edit Employee" href={`/hr/employee/${row.employee_id}`}>
                        <Image
                            src="/resources/icons/edit.svg"
                            height="25"
                            width="25"
                            alt="edit"
                        />
                    </Link>
                    <Link title="New Leave" href={`/hr/employee/all?${new URLSearchParams({ ...searchParams, identifier: row.employee_id, showModal: 'true' })}`}>
                        <Image
                            src="/resources/icons/leave.svg"
                            height="28"
                            width="28"
                            alt="leave"
                            className="mt-1"
                        />
                    </Link>


                </div>
            ),
        }));
    };

    function createStatusDiv(status) {
        let bg;
        switch (status) {
            case "Active":
                bg = "bg-active";
                break;
            case "Inactive":
                bg = "bg-inactive";
                break;

        }
        return (<div className={`p-2 w-32 rounded-md text-xs text-center text-white ${bg}`}>{status}</div>)

    }

    const tableHeaders = [
        { Header: 'Name', accessor: 'fullName', mobile: true, tablet: true },
        { Header: 'Division', accessor: 'division_name', tablet: true },
        { Header: 'Department', accessor: 'discipline_name', tablet: true },
        { Header: 'Position', accessor: 'position_name', mobile: true, tablet: true },
        { Header: 'Grade', accessor: 'grade_code' },
        { Header: 'Joined On', accessor: 'created_on' },
        { Header: 'Status', accessor: 'employee_status' },
        { Header: 'Actions', accessor: 'actions', mobile: true, tablet: true },
    ];

    const constructNewPath = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("showModal");
        params.delete("identifier");
        return `/hr/employee/all?${params.toString()}`;
    };

    let leaveTypesOptions;

    if (identifier && modalIsOpen) {
        const leaveTypesRes = await getLeaveTypes()
        leaveTypesOptions = leaveTypesRes.data
    }

    return (
        <>
            <TableWrapper
                data={preprocessData(data)}
                title="Employee List"
                subTitle="Displays all employee information"
                searchParams={searchParams}
                filterItems={filterItems}
                tableHeaders={tableHeaders}
                minPageSize={5}
                maxPageSize={20}
                pageSizeStep={5}
                isPaginated
                isFilterable
            />
            {identifier && modalIsOpen == "true" &&
                (<Modal title="Leave Request" open={true} type="server" newPath={constructNewPath()}>
                    <LeaveForm leaveTypesOptions={leaveTypesOptions} employee_id={identifier} newPath={constructNewPath()} />
                </Modal>)
            }
        </>
    );
}

export default TablePage;
