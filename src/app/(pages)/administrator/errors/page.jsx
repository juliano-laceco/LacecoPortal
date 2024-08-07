import TableWrapper from "@/app/components/custom/TableWrappers/TableWrapper";
import { formatDate } from "@/utilities/date/date-utils";
import { getErrorLog } from "@/utilities/misc-utils";

async function ErrorLogPage({ searchParams }) {

    const results = await getErrorLog(searchParams);

    // Query String Parameters
    const keyword = searchParams.keyword;

    const filterItems = [
        {
            type: "keyword",
            filterKey: "keyword",
            filterLabel: "Search",
            filterValue: keyword ?? ""
        }
    ];

    const preprocessData = (data) => {
        return data.map(row => ({
            ...row,
            created_on: formatDate(row.error_log_created_on, 'friendly'),
            triggered_by: row.first_name + " " + row.last_name
        }));
    };


    const tableHeaders = [
        { Header: 'Error Name', accessor: 'error_name', mobile: true, tablet: true },
        { Header: 'Error Message', accessor: 'error_message', mobile: true, tablet: true },
        { Header: 'Error Descriptor', accessor: 'custom_message', tablet: true },
        { Header: 'Error Stack', accessor: 'error_stack', lap: false },
        { Header: 'Trigger By', accessor: 'triggered_by', tablet: true },
        { Header: 'Created On', accessor: 'created_on', mobile: true }
    ];


    return (
        <>
            <TableWrapper
                data={preprocessData(results.data)}
                title="Errors List"
                subTitle="Displays all error information"
                searchParams={searchParams}
                filterItems={filterItems}
                tableHeaders={tableHeaders}
                minPageSize={5}
                maxPageSize={20}
                pageSizeStep={5}
                isPaginated
                isFilterable
            />
        </>
    );
}
export default ErrorLogPage

