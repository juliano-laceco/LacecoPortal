import TableWrapper from '@/app/components/custom/TableWrappers/TableWrapper';
import { getAssignmentsForTransfer } from '@/utilities/timesheet-utils';
import TitleComponent from '@/app/components/custom/Other/TitleComponent';
import { formatDate } from '@/utilities/date/date-utils';
import { getFiltersForTransfer } from '@/utilities/lookups/lookup-utils';
import { development_options } from '@/data/static/development-options'; // Import development options for D2P
import Link from 'next/link';
import TransferComponent from './TransferComponent';

// Valid types for the page
const VALID_TYPES = ["P2P", "D2P"];

// Helper to extract and format date range from searchParams
const extractDateRange = (date_range) => {
    if (!date_range) return { start_date: null, end_date: null };

    const dateRangeRegex = /^(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})$/;
    const match = date_range.match(dateRangeRegex);

    if (match) {
        return { start_date: match[1], end_date: match[2] };
    }

    return { start_date: null, end_date: null };
};

// Helper to preprocess the assignment data
const preprocessData = (data) => {
    return data.map((row) => ({
        ...row,
        work_day: formatDate(row.work_day),
    }));
};

async function TransferPage({ searchParams }) {
    // Destructure the relevant searchParams
    const { type, date_range, project_id, discipline_id, employee_id, phase_id, dev_type } = searchParams;

    // Check if 'type' is valid or display an error message
    if (!VALID_TYPES.includes(type)) {
        return (
            <>
                <TitleComponent>
                    Hours Transfer
                </TitleComponent>
                <p className="text-red-500">Invalid type specified. Please use "P2P" or "D2P".</p>
            </>
        );
    }

    // Extract date range from searchParams
    const { start_date, end_date } = extractDateRange(date_range);

    let filterItems = [];
    let assignments = [];

    const { projects, disciplines, employees, phases } = await getFiltersForTransfer("P2P");

    // Fetch data and set up filters based on type
    if (type === "P2P") {
        // Fetch assignment data for P2P
        assignments = await getAssignmentsForTransfer({
            ...searchParams,
            start_date: start_date || null,
            end_date: end_date || null,
        }, type);

        // P2P filter items
        filterItems = [
            { type: 'dd', filterKey: 'project_id', filterLabel: 'Project', filterOptions: projects, filterValue: project_id || '' },
            { type: 'dd', filterKey: 'discipline_id', filterLabel: 'Discipline', filterOptions: disciplines, filterValue: discipline_id || '' },
            { type: 'dd', filterKey: 'employee_id', filterLabel: 'Employee', filterOptions: employees, filterValue: employee_id || '' },
            { type: 'dd', filterKey: 'phase_id', filterLabel: 'Phase', filterOptions: phases, filterValue: phase_id || '' },
            { type: 'date-range', filterLabel: 'Date Range', filterKey: "date_range", filterValue: { start_date, end_date } },
        ];
    } else if (type === "D2P") {
        const { disciplines, employees } = await getFiltersForTransfer("D2P");

        // Fetch assignment data for D2P
        assignments = await getAssignmentsForTransfer({
            ...searchParams,
            start_date: start_date || null,
            end_date: end_date || null,
        }, type);

        // D2P filter items
        filterItems = [
            { type: 'dd', filterKey: 'dev_type', filterLabel: 'Type', filterOptions: development_options, filterValue: dev_type || '' },
            { type: 'dd', filterKey: 'discipline_id', filterLabel: 'Discipline', filterOptions: disciplines, filterValue: discipline_id || '' },
            { type: 'dd', filterKey: 'employee_id', filterLabel: 'Employee', filterOptions: employees, filterValue: employee_id || '' },
            { type: 'date-range', filterLabel: 'Date Range', filterKey: "date_range", filterValue: { start_date, end_date } },
        ];
    }

    // Define the table headers conditionally based on type
    const tableHeaders = [
        { Header: 'Name', accessor: 'name', mobile: true, tablet: true },
        { Header: 'Discipline', accessor: 'discipline_name' },
        ...(type === "P2P" ? [
            { Header: 'Project Title', accessor: 'title' },
            { Header: 'Phase Name', accessor: 'phase_name', mobile: true, tablet: true },
            { Header: 'EWD', accessor: 'employee_work_day_id' },

        ] : [
            { Header: 'Type', accessor: 'type' },
            { Header: 'DH', accessor: 'development_hour_day_id', hidden: true },
        ]),
        { Header: 'Work Day', accessor: 'work_day' },
        { Header: 'Hours Worked', accessor: 'hours_worked', mobile: true, tablet: true },

    ];

    return (
        <>
            <TitleComponent>
                {type === "P2P" ? "Phase Hours Transfer" : "Development Hours Transfer"}
            </TitleComponent>
            {/* Add two clickable cards for Project to Phase and Development to Phase */}
            <div className="flex justify-start gap-3 my-3 mb-6">
                <Link href="/planning/transfer?type=P2P">
                    <div
                        className={`flex-1 block max-w-xs p-4 border border-gray-200 rounded-lg shadow duration-300 ease ${type === "P2P" ? "bg-pric text-white" : "bg-white text-gray-900 hover:bg-gray-100"
                            }`}
                    >
                        <h5 className="mb-2 text-xl font-bold tracking-tight">Phase {"->"} Phase</h5>
                        <p className="font-normal text-sm">Transfer hours from phase to phase</p>
                    </div>
                </Link>
                <Link href="/planning/transfer?type=D2P">
                    <div
                        className={`flex-1 block max-w-xs p-4 border border-gray-200 rounded-lg shadow duration-300 ease  ${type === "D2P" ? "bg-pric text-white" : "bg-white text-gray-900 hover:bg-gray-100"
                            }`}
                    >
                        <h5 className="mb-2 text-xl font-bold tracking-tight">Dev {"->"} Phase</h5>
                        <p className="font-normal text-sm">Transfer development hours to phase</p>
                    </div>
                </Link>
            </div>


            <TableWrapper
                data={preprocessData(assignments)}
                title="Filter"
                searchParams={searchParams}
                filterItems={filterItems}
                tableHeaders={tableHeaders}
                minPageSize={5}
                maxPageSize={20}
                nonClearableQS={["type"]}
                pageSizeStep={5}
                isPaginated
                isFilterable
            >
                <TransferComponent move_type={type} assignments={assignments} projects={projects} nonClearableQS={["type"]} />
            </TableWrapper>

        </>
    );

}

export default TransferPage;
