import TableWrapper from "../../../../components/custom/TableWrappers/TableWrapper"
import { getLeaveTypes } from "@/utilities/lookups/lookup-utils";
import { getAllLeaves } from "@/utilities/leave/leave-utils";
import { formatDate } from "@/utilities/date/date-utils";

async function LeavesPage({ searchParams }) {

    const results = await getAllLeaves(searchParams);

    // Query String Parameters
    const leave_type_id = searchParams.leave_type_id;
    const keyword = searchParams.keyword;

    // Fetching dropdown data for the filters
    const optionsData = await getLeaveTypes();
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
            filterKey: "leave_type_id",
            filterLabel: "Leave Type",
            filterDataKey: "leave_type_name",
            filterOptions: optionsData.data,
            filterValue: leave_type_id ?? ""
        }
    ];

    const preprocessData = (data) => {
        return data.map(row => ({
            ...row,
            leave_type_name: row.leave_type_name,
            fullName: `${row.first_name} ${row.last_name}`,
            leave_date : formatDate(row.leave_date)
        }));
    };


    const tableHeaders = [
        { Header: 'Name', accessor: 'fullName', mobile: true, tablet: true },
        { Header: 'Leave Type', accessor: 'leave_type_name', tablet: true },
        { Header: 'Leave Date', accessor: 'leave_date', mobile: true, tablet: true },
        { Header: 'Hours', accessor: 'no_of_hours', mobile: true, tablet: true }
    ];

    return (
        <>
            <TableWrapper
                data={preprocessData(data)}
                title="Employee Leaves"
                subTitle="Displays all leave information"
                searchParams={searchParams}
                filterItems={filterItems}
                tableHeaders={tableHeaders}
                minPageSize={5}
                maxPageSize={30}
                pageSizeStep={5}
                isPaginated
                isFilterable
            />
        </>
    );
}

export default LeavesPage;
