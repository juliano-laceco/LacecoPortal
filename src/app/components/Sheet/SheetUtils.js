"use client"

import { formatDate } from "@/utilities/date/date-utils";

export const getThisMondayDate = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is Sunday 
    const fullFormatMonday = new Date(today.setDate(diff));
    const formattedMonday = formatDate(fullFormatMonday, 'd-m-y')
    const monday = new Date(formattedMonday)
    return monday
};

export const generateHeaderDates = (start_month_year = null, end_month_year = null) => {
    const dates = [];

    const parseMonthYear = (monthYear) => {
        const [month, year] = monthYear.split(' ');
        return new Date(Date.parse(`${month} 1, ${year}`));
    };

    let startDate, endDate;

    if (start_month_year && end_month_year) {
        startDate = parseMonthYear(start_month_year);
        endDate = parseMonthYear(end_month_year);

        // Ensure endDate is the last day of the end month
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);

    } else {
        const today = new Date();

        // Calculate start date as the first day of the previous month
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

        // Calculate end date as the last day of the month three months after the current month
        endDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
    }

    let currentDate = new Date(startDate);

    // Ensure currentDate is the first Monday within the range
    while (currentDate.getDay() !== 1) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    while (currentDate <= endDate) {
        const formattedDate = formatDate(currentDate, "d-m-y")
        dates.push(formattedDate);

        // Move to the next Monday
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return dates;
};

export const getMonthNameFromDate = (date) => {
    let initialDate = new Date(date);
    return formatDate(initialDate, "m")
};

export const generateMockData = (numPhases, assigneesPerPhase) => {
    const phases = [];
    let counter = 1;

    for (let i = 1; i <= numPhases; i++) {
        const assignees = [];
        for (let j = 1; j <= assigneesPerPhase; j++) {
            assignees.push({
                phase_assignee_id: `${i}-${j}`,
                discipline: `66`,
                assignee: `390`, // Cycle through 10 users
                projected_work_weeks: {
                    "01 July 2024": counter++,
                    "08 July 2024": counter++,
                    "15 July 2024": counter++,
                    "22 July 2024": counter++,
                },
            });
        }
        phases.push({
            phase_id: `${i}`,
            phase: `Phase ${i}`,
            assignees: assignees,
        });
    }
    return phases;
};


export const scrollToFirstWarning = () => {
    const firstWarningElement = document.querySelector('select.border-pric');
    if (firstWarningElement) {
        firstWarningElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
export const initializeCellContents = (initialData, headerDates) => {
    const cellContents = {};
    let rowCounter = 0;
    initialData?.forEach((phase) => {
        phase.assignees?.forEach((assignee) => {
            headerDates.forEach((date, colIndex) => {
                const cellIndex = colIndex + 5; // Adjust for the discipline and user columns
                cellContents[`${rowCounter}-${cellIndex}`] = assignee.projected_work_weeks[date] || "";
            });
            rowCounter++;
        });
    });
    return cellContents;
};

export const calculateTotalAssignees = (data) => {
    return data.reduce((total, phase) => total + phase?.assignees?.length, 0);
};

export const getGradeName = (employeeId, employee_data) => {
    const employee = employee_data.find(emp => emp.value == employeeId);
    return employee ? employee.grade_code : "N/A";
};

export const getEmployeeName = (employeeId, employee_data) => {
    const employee = employee_data.find(emp => emp.value == employeeId);
    return employee ? employee.label : "N/A";
};

export const navigateRight = () => {
    const el = document.querySelector(".sheet-container");

    // Scroll to the beginning
    el.scrollTo({
        left: 0,
        behavior: "smooth"
    });
};

export const isUUID = (id) => {
    const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regexExp.test(id ?? "");
}

export const colors = [
    "#86cead",
    "#80c6f7",
    "#ffe6a1",
    "#a6ecec",
    "#d1b3ff",
    "#ffce99",
    "#e5c7eb",
    "#f29b9b",
    "#99e699",
    "#d1a3ff",
    "#b3ffff",
    "#fff3b3"
]

export const getColorForMonth = (date) => {
    const month = new Date(date).getMonth(); // Get month index (0-11)
    return colors[month];
}

export const savePhaseStateToLocalStorage = (phaseId, state) => {

    // Initialize local storage if it doesn't exist
    if (!localStorage.getItem("phaseStates")) {
        localStorage.setItem("phaseStates", JSON.stringify([]));
    }

    let phaseStates = JSON.parse(localStorage.getItem('phaseStates')) || [];

    // Check if the phase already exists
    const phaseIndex = phaseStates.findIndex(phase => phase.id == phaseId);

    if (phaseIndex != -1) {
        // Update the existing phase state
        phaseStates[phaseIndex].state = state;
    } else {
        // Add the new phase state
        phaseStates.push({ id: phaseId, state: state });
    }

    localStorage.setItem('phaseStates', JSON.stringify(phaseStates));

};

export const getPhaseStateFromLocalStorage = (phaseId) => {
    const phaseStates = JSON.parse(localStorage.getItem('phaseStates')) || [];
    const phase = phaseStates.find(phase => phase.id == phaseId);
    return phase ? phase.state : 'expanded'; // Default to expanded
};

export const handleCollapseClick = (e, phaseId) => {
    const phaseHeader = e.target.closest('.phase-header');
    const assigneeWrapper = phaseHeader.nextElementSibling;


    if (assigneeWrapper && assigneeWrapper.classList.contains('assignee-wrapper')) {
        assigneeWrapper.classList.add('hidden');
        phaseHeader.classList.remove('expanded');
        phaseHeader.classList.add('collapsed');
        savePhaseStateToLocalStorage(phaseId, 'collapsed');
    }
};

export const handleExpandClick = (e, phaseId) => {
    const phaseHeader = e.target.closest('.phase-header');
    const assigneeWrapper = phaseHeader.nextElementSibling;

    if (assigneeWrapper && assigneeWrapper.classList.contains('assignee-wrapper')) {
        assigneeWrapper.classList.remove('hidden');
        phaseHeader.classList.remove('collapsed');
        phaseHeader.classList.add('expanded');
        savePhaseStateToLocalStorage(phaseId, 'expanded');
    }
};
