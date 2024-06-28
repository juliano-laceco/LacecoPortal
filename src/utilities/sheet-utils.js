export const generateHeaderDates = (numWeeks) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < numWeeks; i++) {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + i * 7);
        const formattedDate = nextWeek.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
        dates.push(formattedDate);
    }
    return dates;
};

export const generateMockData = (numPhases, assigneesPerPhase) => {
    const phases = [];
    let counter = 1;

    for (let i = 1; i <= numPhases; i++) {
        const assignees = [];
        for (let j = 1; j <= assigneesPerPhase; j++) {
            assignees.push({
                phase_assignee_id: `${i}-${j}`,
                discipline: `Discipline ${i}`,
                assignee: `User ${j % 10 + 1}`, // Cycle through 10 users
                projected_work_weeks: {
                    "28 June 2024": counter++,
                    "05 July 2024": counter++,
                    "12 July 2024": counter++,
                    "19 July 2024": counter++,
                    "26 July 2024": counter++,
                    "02 August 2024": counter++
                }
            });
        }
        phases.push({
            phase_id: `${i}`,
            phase: `Phase ${i}`,
            assignees: assignees
        });
    }
    return phases;
};

export const initializeCellContents = (initialData, headerDates) => {
    const cellContents = {};
    let rowCounter = 0;
    initialData.forEach((phase) => {
        phase.assignees.forEach((assignee) => {
            headerDates.forEach((date, colIndex) => {
                const cellIndex = colIndex + 5; // Adjust for the discipline and user columns
                cellContents[`${rowCounter}-${cellIndex}`] = assignee.projected_work_weeks[date] || '';
            });
            rowCounter++;
        });
    });
    return cellContents;
};

export const getBudgetHoursCells = (cellContents, row, numCols) => {
    let total = 0;
    for (let i = 5; i < numCols; i++) {
        let content = cellContents[`${row}-${i}`] === "" || cellContents[`${row}-${i}`] === undefined || cellContents[`${row}-${i}`] === null ? 0 : cellContents[`${row}-${i}`];
        total += parseInt(content);
    }
    return total;
};

export const getPhaseBudgetHours = (cellContents, initialData, numCols) => {
    return initialData.map((phase, phaseIndex) => {
        let total = 0;
        let rowCounter = 0;

        // Calculate the starting row for the phase
        for (let i = 0; i < phaseIndex; i++) {
            rowCounter += initialData[i].assignees.length;
        }

        // Calculate the budget hours for each assignee in the phase
        for (let row = rowCounter; row < rowCounter + phase.assignees.length; row++) {
            total += getBudgetHoursCells(cellContents, row, numCols);
        }

        return total;
    });
};
