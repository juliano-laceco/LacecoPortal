import TableWrapper from '@/app/components/custom/TableWrappers/TableWrapper';
import { getAllProjects } from '@/utilities/project/project-utils';
import { getAssignmentsForTransfer } from '@/utilities/timesheet-utils';
import TitleComponent from '@/app/components/custom/Other/TitleComponent';
import { formatDate } from '@/utilities/date/date-utils';
import { getFiltersForTransfer } from '@/utilities/lookups/lookup-utils';

async function TransferPage({ searchParams }) {
    // Fetch project dropdown data
    const { projects, disciplines, employees, phases } = await getFiltersForTransfer();

    // Extract date_range if present and split into start_date and end_date
    let start_date = null;
    let end_date = null;

    if (searchParams.date_range) {
        // Use a regular expression to match two consecutive date strings
        const dateRangeRegex = /^(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})$/;
        const match = searchParams.date_range.match(dateRangeRegex);
        
        if (match) {
            start_date = match[1];  // The first captured date
            end_date = match[2];    // The second captured date
        }
    }

    // Fetch assignment data with the parsed or existing start and end date
    const assignments = await getAssignmentsForTransfer({
        ...searchParams,
        start_date: start_date || null, // Use parsed start date or null
        end_date: end_date || null      // Use parsed end date or null
    });

    // Set up filter items with date range
    const filterItems = [
        {
            type: 'dd',
            filterKey: 'project_id',
            filterLabel: 'Project',
            filterOptions: projects,
            filterValue: searchParams.project_id || '',
        },
        {
            type: 'dd',
            filterKey: 'discipline_id',
            filterLabel: 'Discipline',
            filterOptions: disciplines,
            filterValue: searchParams.discipline_id || '',
        },
        {
            type: 'dd',
            filterKey: 'employee_id',
            filterLabel: 'Employee',
            filterOptions: employees,
            filterValue: searchParams.employee_id || '',
        },
        {
            type: 'dd',
            filterKey: 'phase_id',
            filterLabel: 'Phase',
            filterOptions: phases,
            filterValue: searchParams.phase_id || '',
        },
        {
            type: 'date-range',
            filterLabel: 'Date Range',
            filterValue: {start_date , end_date} || '', // Pass date_range as it is
        },
    ];

    // Preprocess the data to format the work_day field
    const preprocessData = (data) => {
        return data.map((row) => ({
            ...row,
            work_day: formatDate(row.work_day),
        }));
    };

    const tableHeaders = [
        { Header: 'Name', accessor: 'name', mobile: true, tablet: true },
        { Header: 'Project Title', accessor: 'title', tablet: true },
        { Header: 'Phase Name', accessor: 'phase_name', mobile: true, tablet: true },
        { Header: 'Work Day', accessor: 'work_day' },
        { Header: 'Hours Worked', accessor: 'hours_worked' },
    ];

    return (
        <>
            <TitleComponent>
                Transfer Data
            </TitleComponent>
            <TableWrapper
                data={preprocessData(assignments)}
                title="Assignment Transfers"
                subTitle="Displays all employee assignment transfers"
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

export default TransferPage;
