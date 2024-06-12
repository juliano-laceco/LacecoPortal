import TableWrapper from "../../../../components/custom/TableWrappers/TableWrapper"
import getDropdownData from "@/data/dynamic/EmployeeFilterDDOptions";
import { formatDate } from "@/utilities/date/date-utils";
import Image from "next/image";
import Link from "next/link";
import { getLeaveTypes } from "@/utilities/lookups/lookup-utils";
import { getAllProjects } from "@/utilities/project/project-utils";
import project_statuses from "@/data/static/project-statuses";

async function TablePage({ searchParams }) {

    const results = await getAllProjects(searchParams);

    // Query String Parameters
    const project_status = searchParams.project_status;
    const keyword = searchParams.keyword;

    const filterItems = [
        {
            type: "keyword",
            filterKey: "keyword",
            filterLabel: "Search",
            filterValue: keyword ?? ""
        },
        {
            type: "dd",
            filterKey: "project_status",
            filterLabel: "Status",
            filterDataKey: "project_status",
            filterOptions: project_statuses,
            filterValue: project_status ?? ""
        }
    ];

    const preprocessData = (data) => {
        return data.map(row => ({
            ...row,
            created_on: formatDate(row.created_on),
            actions: (
                <div className="flex justify-center items-center gap-2">
                    <Link title="Edit Project" href={`/planning/project/${row.project_id}`}>
                        <Image
                            src="/resources/icons/edit.svg"
                            height="25"
                            width="25"
                            alt="edit"
                        />
                    </Link>
                    <Link title="Deployment" href={`/planning/project/deployment/${row.project_id}`}>
                        <Image
                            src="/resources/icons/leave.svg"
                            height="28"
                            width="28"
                            alt="deployment"
                            className="mt-1"
                        />
                    </Link>
                </div>
            ),
        }));
    };

    const tableHeaders = [
        { Header: 'Name', accessor: 'title', mobile: true, tablet: true },
       
    ];


    return (
        <>
            <TableWrapper
                data={preprocessData(results.data)}
                title="Project List"
                subTitle="Displays all project information"
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

export default TablePage;
