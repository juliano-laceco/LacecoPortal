"use client"
import React, { useState, useEffect, useMemo } from 'react';
import useSheet from './useSheet';
import Image from 'next/image';

const generateHeaderDates = (numWeeks) => {
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

const generateMockData = (numPhases, assigneesPerPhase) => {
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
const initializeCellContents = (initialData, headerDates) => {
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

const Sheet = () => {
    const initialWeeks = 50;
    const [headerDates, setHeaderDates] = useState(generateHeaderDates(initialWeeks));
    const numCols = headerDates.length + 5; // Additional columns for discipline, user, add week and remove week buttons
    const disciplines = ["Discipline 1", "Discipline 2"];
    const users = ["User 1", "User 2"];

    const [initialData, setInitialData] = useState(() => (generateMockData(5, 2)));


    const initialCellContents = initializeCellContents(initialData, headerDates);

    const {
        cellRefs,
        selectedCells,
        cellContents,
        editableCell,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        handleClick,
        handleDoubleClick,
        handleCellBlur,
        getCellStyle,
        setCellContents,
        setHistory
    } = useSheet(initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0), numCols, initialCellContents);

    useEffect(() => {
        const newCellContents = initializeCellContents(initialData, headerDates);
        setCellContents(newCellContents);
        setHistory([newCellContents]);
    }, [initialData]);

    const addNewWeek = () => {
        setHeaderDates((prevDates) => {
            const newDates = generateHeaderDates(prevDates.length + 1);
            return newDates;
        });

        setCellContents((prevContents) => {
            const newContents = { ...prevContents };
            const newColIndex = headerDates.length + 5; // New column index

            for (let row = 0; row < initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0); row++) {
                newContents[`${row}-${newColIndex}`] = '';
            }

            return newContents;
        });
    };

    const removeLastWeek = () => {
        setHeaderDates((prevDates) => {
            if (prevDates.length > 1) {
                return prevDates.slice(0, -1);
            }
            return prevDates;
        });

        setCellContents((prevContents) => {
            const newContents = { ...prevContents };
            const lastColIndex = headerDates.length + 4; // Last column index

            for (let row = 0; row < initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0); row++) {
                delete newContents[`${row}-${lastColIndex}`];
            }

            return newContents;
        });
    };

    const getBudgetHoursCells = (row) => {
        let total = 0;
        for (let i = 5; i < numCols; i++) {
            let content = cellContents[`${row}-${i}`] === "" || cellContents[`${row}-${i}`] === undefined || cellContents[`${row}-${i}`] === null ? 0 : cellContents[`${row}-${i}`];
            total += parseInt(content);
        }
        return total;
    };

    const getPhaseBudgetHours = useMemo(() => {
        const phaseBudgetHours = initialData.map((phase, phaseIndex) => {
            let total = 0;
            let rowCounter = 0;

            // Calculate the starting row for the phase
            for (let i = 0; i < phaseIndex; i++) {
                rowCounter += initialData[i].assignees.length;
            }

            // Calculate the budget hours for each assignee in the phase
            for (let row = rowCounter; row < rowCounter + phase.assignees.length; row++) {
                total += getBudgetHoursCells(row);
            }

            return total;
        });

        return phaseBudgetHours;
    }, [cellContents, initialData]);

    const handleAddAssignee = (phaseIndex) => {
        const newAssignee = {
            phase_assignee_id: '',
            discipline: '',
            assignee: '',
            projected_work_weeks: {},
        };

        headerDates.forEach((date) => {
            newAssignee.projected_work_weeks[date] = '';
        });

        const updatedData = [...getUpdatedData()];
        updatedData[phaseIndex] = {
            ...updatedData[phaseIndex],
            assignees: [...updatedData[phaseIndex]?.assignees, newAssignee],
        };

        setInitialData(updatedData);

        // Add new assignee's cell contents to cellContents
        const newRowIndex = updatedData.reduce((acc, phase, idx) => {
            return idx < phaseIndex ? acc + phase.assignees.length : acc;
        }, 0) + updatedData[phaseIndex].assignees.length - 1;

        setCellContents((prevContents) => {
            const newContents = { ...prevContents };
            for (let col = 5; col < numCols; col++) {
                newContents[`${newRowIndex}-${col}`] = '';
            }
            return newContents;
        });

        setHistory([cellContents]);
    };

    const deleteAssignee = (row) => {
        const phaseIndex = findPhaseIndex(row);
        const assigneeIndex = findAssigneeIndex(row, phaseIndex);

        const newInitialData = [...getUpdatedData()];

        // Check if there is more than one assignee in the phase before deleting
        if (newInitialData[phaseIndex].assignees.length > 1) {
            const confirmDelete = window.confirm("Are you sure you want to delete this assignee?");
            if (confirmDelete) {
                newInitialData[phaseIndex].assignees.splice(assigneeIndex, 1);
                setInitialData(newInitialData);
            }
        } else {
            alert("Cannot delete the only assignee in the phase.");
        }
    };

    const updateAssigneeDiscipline = (row, value) => {
        const newInitialData = [...initialData];
        const phaseIndex = findPhaseIndex(row);
        const assigneeIndex = findAssigneeIndex(row, phaseIndex);
        newInitialData[phaseIndex].assignees[assigneeIndex].discipline = value;
        setInitialData(newInitialData);
    };

    const updateAssigneeUser = (row, value) => {
        const newInitialData = [...initialData];
        const phaseIndex = findPhaseIndex(row);
        const assigneeIndex = findAssigneeIndex(row, phaseIndex);
        newInitialData[phaseIndex].assignees[assigneeIndex].assignee = value;
        setInitialData(newInitialData);
    };

    const findPhaseIndex = (row) => {
        let phaseIndex = 0;
        let currentRow = 0;

        while (phaseIndex < initialData.length && currentRow + initialData[phaseIndex].assignees.length <= row) {
            currentRow += initialData[phaseIndex].assignees.length;
            phaseIndex += 1;
        }

        return phaseIndex;
    };

    const findAssigneeIndex = (row, phaseIndex) => {
        let assigneeIndex = row;
        for (let i = 0; i < phaseIndex; i++) {
            assigneeIndex -= initialData[i].assignees.length;
        }
        return assigneeIndex;
    };

    const handleSelectChange = (e, row, col) => {
        const value = e.target.value;
        if (col === 1) {
            updateAssigneeDiscipline(row, value);
        } else if (col === 2) {
            updateAssigneeUser(row, value);
        }
    };

    const handleSubmit = () => {
        getUpdatedData()
    }

    const getUpdatedData = () => {

        const updatedData = initialData.map((phase) => ({
            phase_id: phase.phase_id,
            phase: phase.phase,
            assignees: phase.assignees.map((assignee) => ({
                phase_assignee_id: assignee.phase_assignee_id,
                discipline: assignee.discipline,
                assignee: assignee.assignee,
                projected_work_weeks: {},
            })),
        }));

        cellRefs.current.forEach((rowRefs, rowIndex) => {
            rowRefs.forEach((cell, colIndex) => {
                if (cell) {
                    const phaseIndex = findPhaseIndex(rowIndex);
                    const assigneeIndex = findAssigneeIndex(rowIndex, phaseIndex);
                    const date = cell.getAttribute('data-date');
                    const selectElement = cell.querySelector('select');
                    const newValue = selectElement ? selectElement.value : cell.textContent;

                    if (colIndex === 1) {
                        updatedData[phaseIndex].assignees[assigneeIndex].discipline = newValue;
                    } else if (colIndex === 2) {
                        updatedData[phaseIndex].assignees[assigneeIndex].assignee = newValue;
                    } else if (colIndex > 4) {
                        updatedData[phaseIndex].assignees[assigneeIndex].projected_work_weeks[date] = newValue;
                    }
                }
            });
        });

        console.log(updatedData)
        return updatedData;
    };

    const colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(220, 20, 60, 0.2)',
        'rgba(50, 205, 50, 0.2)',
        'rgba(138, 43, 226, 0.2)',
        'rgba(0, 255, 255, 0.2)',
        'rgba(255, 215, 0, 0.2)'
    ];

    const getColorForMonth = (date) => {
        const month = new Date(date).getMonth(); // Get month index (0-11)
        return colors[month];
    };

    const renderGrid = () => {
        const rows = [];

        // Add header row
        const headerCols = [
            <div
                key={`action`}
                className="border border-gray-300 flex justify-center w-16 items-center p-1 box-border bg-gray-200 font-bold"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
                Action
            </div>,
            <div key="discipline-header" className="border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold w-[130pt]">
                Discipline
            </div>,
            <div key="user-header" className="border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold w-[130pt]">
                User
            </div>,
            <div key="grade-header" className="border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold w-24">
                Grade
            </div>,
            <div key="bh-header" className="border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold w-24">
                Budget Hours
            </div>,
            ...headerDates.map((date, index) => (
                <div
                    key={`header-${index}`}
                    className="border border-gray-300 flex justify-center items-center px-1 py-4 box-border font-semibold"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', backgroundColor: getColorForMonth(date) }}
                >
                    {date}
                </div>
            )),
        ];
        rows.push(
            <div key="header" className="grid select-none rounded-lg overflow-hidden" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
                {headerCols}
            </div>
        );

        let rowCounter = 0;

        // Add data rows
        initialData.forEach((phase, phaseIndex) => {
            rows.push(
                <div key={`phase-${phaseIndex}`} className="col-span-full font-bold bg-gray-100 text-left text-xl px-2 py-3 select-none">
                    {phase.phase} - <span className="text-red-400 text-lg"> {getPhaseBudgetHours[phaseIndex]} hrs</span>
                </div>
            );

            if (phase?.assignees) {
                phase.assignees.forEach((assignee, assigneeIndex) => {
                    const row = rowCounter;
                    rowCounter += 1;
                    const cols = [];

                    for (let col = 0; col < numCols; col++) {
                        let content, initialContent;
                        let isSelected = selectedCells.some((cell) => cell.row === row && cell.col === col);
                        let colDate;

                        if (col === 0) {
                            content = (
                                <div className="cursor-pointer" onClick={() => deleteAssignee(row)}>
                                    <Image src="/resources/icons/delete.png" height="20" width="20" alt="x" />
                                </div>
                            );
                        } else if (col === 1) {
                            content = (
                                <select
                                    value={assignee.discipline}
                                    onChange={(e) => handleSelectChange(e, row, col)}
                                    className="border border-gray-300 p-1 box-border text-center bg-gray-100 select-none w-full"
                                >
                                    {disciplines.map((discipline) => (
                                        <option key={discipline} value={discipline}>
                                            {discipline}
                                        </option>
                                    ))}
                                </select>
                            );
                        } else if (col === 2) {
                            content = (
                                <select
                                    value={assignee.assignee}
                                    onChange={(e) => handleSelectChange(e, row, col)}
                                    className="border border-gray-300 p-1 box-border text-center bg-gray-100 select-none w-full"
                                >
                                    {users.map((user) => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))}
                                </select>
                            );
                        } else if (col === 3) {
                            content = (
                                <div className="select-none font-semibold min-w-24">
                                    G5+
                                </div>
                            );
                        } else if (col === 4) {
                            content = (
                                <div className="select-none font-semibold min-w-24">
                                    {getBudgetHoursCells(row)}
                                </div>
                            );
                        } else {
                            colDate = headerDates[col - 5];
                            initialContent = assignee.projected_work_weeks[colDate] || '';
                            content = cellContents[`${row}-${col}`] !== undefined ? cellContents[`${row}-${col}`] : assignee.projected_work_weeks[colDate] || null;
                        }

                        if (!cellRefs.current[row]) {
                            cellRefs.current[row] = [];
                        }

                        cols.push(
                            <div
                                key={`${row}-${col}`}
                                ref={(el) => {
                                    cellRefs.current[row][col] = el;
                                }}
                                className={`border border-gray-300 flex h-12 ${col === 0 ? "w-16" : col < 3 ? "w-[130pt]" : col < 5 ? "w-24" : "min-w-12 cursor-cell focus:cursor-auto"} justify-center items-center p-1 box-border text-center select-none ${isSelected ? 'outline-none border-red-500 border-1' : ''}`}
                                style={getCellStyle(row, col)}
                                onMouseDown={col > 4 ? () => handleMouseDown(row, col) : undefined}
                                onMouseEnter={col > 4 ? () => handleMouseEnter(row, col) : undefined}
                                onMouseUp={col > 4 ? handleMouseUp : undefined}
                                data-date={col > 4 ? headerDates[col - 5] : ''}
                                data-col={col}
                                data-row={row}
                                data-phase-id={phase.phase_id}
                                data-phase-assignee-id={assignee.phase_assignee_id}
                                data-initial={initialContent}
                                onClick={col > 4 ? () => handleClick(row, col) : undefined}
                                onDoubleClick={col > 4 ? () => handleDoubleClick(row, col) : undefined}
                                onBlur={col > 4 ? (e) => handleCellBlur(row, col, e) : undefined}
                                contentEditable={col > 4 && editableCell?.row === row && editableCell?.col === col}
                                suppressContentEditableWarning
                                suppressHydrationWarning
                            >
                                {content}
                            </div>
                        );

                    }

                    rows.push(
                        <div key={`assignee-${phaseIndex}-${assigneeIndex}`} className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
                            {cols}
                        </div>
                    );
                });
            }

            rows.push(
                <div key={`add-assignee-${phaseIndex}`} className="col-span-full flex justify-center items-center p-[3px] text-white text-2xl cursor-pointer select-none bg-gray-400 hover:bg-gray-500  transition duration-200 ease" onClick={() => handleAddAssignee(phaseIndex)}>
                    +
                </div>
            );
        });

        return rows;
    };

    return (
        <>
            <div className="flex items-start gap-3">
                <div
                    className="outline-none w-fit border border-gray-300 rounded-lg user-select-none"
                    tabIndex={0}
                >
                    {renderGrid()}
                </div>
                <div className="space-y-1">
                    <button
                        key="add-week-button"
                        className="rounded-lg p-1 w-8 h-8 flex text-white justify-center items-center bg-green-500 font-bold"
                        onClick={addNewWeek}
                    >
                        +
                    </button>
                    <button
                        key="remove-week-button"
                        className="rounded-lg p-1 w-8 h-8 flex text-white justify-center items-center bg-red-500 font-bold "
                        onClick={removeLastWeek}
                    >
                        -
                    </button>
                </div>
            </div>

            <button onClick={handleSubmit} className="px-8 py-3 bg-pric text-white rounded-lg mt-2">Save</button>
        </>
    );
};

export default Sheet;