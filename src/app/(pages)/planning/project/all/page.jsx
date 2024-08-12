import TableWrapper from "../../../../components/custom/TableWrappers/TableWrapper"
import { formatDate } from "@/utilities/date/date-utils";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/utilities/project/project-utils";
import project_statuses from "@/data/static/project-statuses";


export const metadata = {
    title: "All Projects",
    description: "Displays all projects",
};

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
            created_on: formatDate(row.project_created_on),
            project_manager: (
                <p className="font-bold">{row.first_name} {row.last_name}</p>
            ),
            progress: (
                <div className="w-full bg-gray-300 rounded-full">
                    <div className="bg-pric text-xs text-white text-center p-1 leading-none rounded-full w-[60%]"> 60%</div>
                </div>
            ),
            status: createStatusDiv(row.project_status),
            actions: (
                <div className="flex justify-center items-center gap-2">
                    <Link title="Edit Project" href={`/planning/project/${row.project_id}`}>
                        <Image
                            src="/resources/icons/edit.svg"
                            height="25"
                            width="25"
                            alt="edit"
                            className="mob:h-[18px] mob:w-[18px]"
                        />
                    </Link>
                    <Link title="Deployment" href={`/planning/project/deployment/${row.project_id}`}>
                        <Image
                            src="/resources/icons/deployment.png"
                            height="28"
                            width="28"
                            alt="deployment"
                            className="mob:h-[18px] mob:w-[18px]"
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
            case "On Hold":
                bg = "bg-on-hold";
                break;
            case "Highly Probable":
                bg = "bg-highly-probable";
                break;

        }
        return (<div className={`p-2 w-32 rounded-md text-xs text-center text-white ${bg}`}>{status}</div>)

    }

    const tableHeaders = [
        { Header: 'Name', accessor: 'title', tablet: true },
        { Header: 'Code', accessor: 'code', mobile: true, tablet: true },
        { Header: 'Client', accessor: 'client_name', tablet: true },
        { Header: 'PM', accessor: 'project_manager' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Progress', accessor: 'progress' },
        { Header: 'Created On', accessor: 'created_on' },
        { Header: 'Actions', accessor: 'actions', mobile: true, tablet: true }
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
