"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import useSheet from "./useSheet";
import Image from "next/image";
import { add } from "date-fns";
import DateRangePicker from "../custom/Pickers/DateRangePicker";
import {
    getThisMondayDate,
    generateHeaderDates,
    getMonthNameFromDate,
    generateMockData,
    initializeCellContents,
    calculateTotalAssignees,
    isUUID,
    getGradeName,
    getEmployeeName,
    navigateRight,
    getColorForMonth,
    getPhaseStateFromLocalStorage,
    handleCollapseClick,
    handleExpandClick
} from './SheetUtils';


const Sheet = ({ employee_data, discipline_data, project_start_date, project_end_date, start_date, end_date }) => {

    // Memoized Employee and Discipline Data
    const memoizedEmployeeData = useMemo(() => employee_data, [employee_data])
    const memoizedDisciplineData = useMemo(() => discipline_data, [discipline_data])

    // Header Dates Variables
    const [headerDates, setHeaderDates] = useState(() => generateHeaderDates(start_date, end_date));
    const [headerDatesUpdated, setHeaderDatesUpdated] = useState(false); // Flags if the headers are changed
    const [initialHeaderDates, setInitialHeaderDates] = useState([]); // Initial Persisting Copy of initialHeader dates

    // Deleted phase assignee tracking
    const [deletedPhaseAssignees, setDeletedPhaseAssignees] = useState([]);

    // Initial Data
    const numCols = headerDates.length + 5;
    const [initialData, setInitialData] = useState(() => generateMockData(3, 10))
    const initial_assignee_count = calculateTotalAssignees(initialData)
    const initialCellContents = useMemo(() => initializeCellContents(initialData, headerDates), [initializeCellContents, initialData, headerDates])

    // Date Variables
    const currentMonday = getThisMondayDate()
    const [currentEndDate, setCurrentEndDate] = useState(end_date)

    // Flag inbdicates whether the page has been edited 
    const [edited, setEdited] = useState(false)
    const uneditableCellCount = headerDates.filter((headerDate) => new Date(headerDate) < currentMonday).length

    // Setting up using useSheet
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
    } = useSheet(
        initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0),
        numCols,
        initialCellContents,
        uneditableCellCount,
        edited,
        setEdited
    );

    // Sets the cell contents whenever the data is updated
    useEffect(() => {
        const newCellContents = initializeCellContents(initialData, headerDates);
        setCellContents(newCellContents);
        setHistory([newCellContents]);
    }, [initialData, headerDates, setCellContents, setHistory]);

    // Sets the initial unmutated data of the cells once on load
    useEffect(() => {
        cellRefs.current.forEach((rowRefs) => {
            rowRefs.forEach((cell) => {
                cell.setAttribute("data-initial", cell.textContent)
            });
        });
    }, [])

    // Saves a copy of the initial headerDates
    useEffect(() => {
        setInitialHeaderDates(headerDates);
    }, []);

    // Triggers a change event as soon as the page loads
    useEffect(() => {
        const selectElements = document.querySelectorAll('select');

        selectElements.forEach(select => {
            // Create and dispatch a change event
            const event = new Event('change', { bubbles: true });
            select.dispatchEvent(event);
        });
    }, []);

    // Scroll to the end when headerDates is updated
    useEffect(() => {
        if (headerDatesUpdated) {
            const el = document.querySelector(".sheet-container");

            // Scroll to the farthest right after headerDates is updated
            el.scrollTo({
                left: el.scrollWidth,
                behavior: "smooth"
            });
            setHeaderDatesUpdated(false); // Reset the flag
        }
    }, [headerDatesUpdated]);

    // Checks whether the assignee labels should appear (meaning the user is out of the viewport)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Check horizontal visibility
                    const isVisibleHorizontally = entry.isIntersecting;

                    document.querySelectorAll(".assignee-label").forEach(assignee_label_div => {
                        if (!isVisibleHorizontally) {
                            assignee_label_div.classList.remove('hidden');
                            document.querySelector(".user-tracker-visible").innerHTML = "visible";
                        } else {
                            assignee_label_div.classList.add('hidden');
                            document.querySelector(".user-tracker-visible").innerHTML = "hidden";
                        }
                    });

                    if (!isVisibleHorizontally) {
                        document.querySelector(".arrow-left")?.classList.remove("hidden");
                    } else {
                        document.querySelector(".arrow-left")?.classList.add("hidden");
                    }
                });
            },
            {
                threshold: [0, 1] // Trigger when completely out of view horizontally
            }
        );

        const elements = document.querySelectorAll('.user-header');
        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            elements.forEach((element) => {
                observer.unobserve(element);
            });
        };
    }, [initial_assignee_count]);


    // Function that loops over the cells to update the current data so it persists across re-renders
    const getUpdatedData = () => {
        const updatedData = initialData.map((phase) => ({
            phase_id: phase.phase_id,
            phase: phase.phase,
            assignees: phase.assignees.map((assignee) => ({
                phase_assignee_id: assignee.phase_assignee_id,
                discipline: assignee.discipline,
                assignee: assignee.assignee,
                projected_work_weeks: {},
                updated_projected_work_weeks: {},
            })),
        }));

        cellRefs.current.forEach((rowRefs, rowIndex) => {
            rowRefs.forEach((cell, colIndex) => {
                if (cell) {
                    const phaseIndex = findPhaseIndex(rowIndex);
                    const assigneeIndex = findAssigneeIndex(rowIndex, phaseIndex);
                    const phaseAssigneeId = initialData[phaseIndex].assignees[assigneeIndex].phase_assignee_id;
                    const date = cell.getAttribute("data-date");
                    const selectElement = cell.querySelector("select");
                    const newValue = selectElement ? selectElement.value : cell.textContent;

                    if (isUUID(phaseAssigneeId)) {
                        // Append all cells for rows with UUIDs
                        if (colIndex === 1) {
                            updatedData[phaseIndex].assignees[assigneeIndex].discipline = newValue;
                        } else if (colIndex === 2) {
                            updatedData[phaseIndex].assignees[assigneeIndex].assignee = newValue;
                        } else if (colIndex > 4) {
                            newValue != "" && (updatedData[phaseIndex].assignees[assigneeIndex].projected_work_weeks[date] = newValue);
                        }
                    } else {

                        // Only check for changed cells for rows with non-UUIDs
                        const dataChanged = cell.getAttribute("data-initial") != cell.textContent;

                        if (colIndex === 1) {
                            updatedData[phaseIndex].assignees[assigneeIndex].discipline = newValue;
                        } else if (colIndex === 2) {
                            updatedData[phaseIndex].assignees[assigneeIndex].assignee = newValue;
                        } else if (colIndex > 4) {
                            updatedData[phaseIndex].assignees[assigneeIndex].projected_work_weeks[date] = newValue;
                            dataChanged && (updatedData[phaseIndex].assignees[assigneeIndex].updated_projected_work_weeks[date] = newValue);
                        }
                    }
                }
            });
        });

        updatedData.deletedAssignees = deletedPhaseAssignees;
        return updatedData;
    }

    // Function that adds a new month to the headerDates
    const addNewMonth = () => {

        setHeaderDates(() => {

            const lastDateHeader = headerDates[headerDates.length - 1]

            const newEndDate = add(new Date(lastDateHeader), { months: 1 }).toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric"
            });


            // Generate new header dates
            const newDates = generateHeaderDates(start_date, newEndDate);

            // Update the end date
            setCurrentEndDate(newEndDate);

            // Saving the current data to avoid losing it on rerender
            const newInitialData = [...getUpdatedData()];
            setInitialData(newInitialData)

            return newDates;
        });

        setHeaderDatesUpdated(true); // Set the flag to true
        !edited && setEdited(true)

    }

    // Function that removes the last week of the headerDates
    const removeLastWeek = () => {
        let weekContainsData = false;
        const lastColumnIndex = headerDates.length + 4;
        const lastColumnCells = document.querySelectorAll(`[data-col="${lastColumnIndex}"]`);

        lastColumnCells.forEach((lastColumnCell) => {
            if (lastColumnCell.textContent?.trim() !== "") {
                weekContainsData = true;
            }
        });

        const updateState = () => {
            setHeaderDates((prevDates) => {
                if (prevDates.length > 1) {
                    return prevDates.slice(0, -1);
                }
                return prevDates;
            });

            setCellContents((prevContents) => {
                const newContents = { ...prevContents };
                const lastColIndex = lastColumnIndex; // Last column index

                for (let row = 0; row < initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0); row++) {
                    delete newContents[`${row}-${lastColIndex}`];
                }

                return newContents;
            });

            !edited && setEdited(true);
        };

        if (weekContainsData) {
            const confirmDelete = window.confirm("The week you are deleting contains data. Are you sure you would like to proceed?");
            if (confirmDelete) {
                updateState();
            }
        } else {
            updateState();
        }
    }

    // Calculate the budget hours for the cumulative phases
    const getBudgetHoursCells = (row) => {
        let total = 0;
        for (let i = 5; i < numCols; i++) {
            let content =
                cellContents[`${row}-${i}`] === "" || cellContents[`${row}-${i}`] === undefined || cellContents[`${row}-${i}`] === null
                    ? 0
                    : cellContents[`${row}-${i}`];
            total += parseInt(content);
        }
        return total;
    }

    // Calculate budget hours for each phase
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
    }, [initialData, getBudgetHoursCells]);

    // Handles assignee addition
    const handleAddAssignee = useCallback(
        (phaseIndex) => {
            const newAssignee = {
                phase_assignee_id: crypto.randomUUID(),
                discipline: "",
                assignee: "",
                projected_work_weeks: {},
                updated_projected_work_weeks: {},
            };

            headerDates.forEach((date) => {
                newAssignee.projected_work_weeks[date] = "";
            });

            const updatedData = [...getUpdatedData()];
            updatedData[phaseIndex] = {
                ...updatedData[phaseIndex],
                assignees: [...updatedData[phaseIndex]?.assignees, newAssignee],
            };

            setInitialData(updatedData);

            const newRowIndex =
                updatedData.reduce((acc, phase, idx) => {
                    return idx < phaseIndex ? acc + phase.assignees.length : acc;
                }, 0) + updatedData[phaseIndex].assignees.length - 1;

            setCellContents((prevContents) => {
                const newContents = { ...prevContents };
                for (let col = 5; col < numCols; col++) {
                    newContents[`${newRowIndex}-${col}`] = "";
                }
                return newContents;
            });

            setHistory([cellContents]);

            // Trigger change event on the newly added select element
            setTimeout(() => {
                const selectElement = document.getElementById(`select-${newRowIndex}-1`);
                if (selectElement) {
                    const event = new Event('change', { bubbles: true });
                    selectElement.dispatchEvent(event);
                }
            }, 0);
        },
        [headerDates, numCols, setCellContents, cellContents, setHistory]
    );

    // Handles assignee deletion
    const deleteAssignee = useCallback(
        (row) => {
            const phaseIndex = findPhaseIndex(row, initialData);
            const assigneeIndex = findAssigneeIndex(row, phaseIndex);
            const assigneeId = initialData[phaseIndex].assignees[assigneeIndex].phase_assignee_id;

            if (!isUUID(assigneeId)) {
                setDeletedPhaseAssignees((prev) => [...prev, assigneeId]);
            }

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
        },
        [initialData]
    );

    // Handles saving to the DB
    const handleSave = useCallback(() => {
        const updatedData = getUpdatedData();

        // Validation logic
        let isValid = true;
        let noticeMessage = "";

        updatedData.forEach((phase) => {
            phase.assignees.forEach((assignee) => {
                if (assignee.discipline == "Select..." || assignee.assignee == "Select...") {
                    isValid = false;
                    noticeMessage = "All assignees must have a discipline and a user.";
                }

                let hasDateFilled = false;
                for (const date in assignee.projected_work_weeks) {
                    if (assignee.projected_work_weeks[date] !== "") {
                        hasDateFilled = true;
                        break;
                    }
                }

                if (!hasDateFilled) {
                    isValid = false;
                    noticeMessage = "At least one date cell must be filled for each assignee.";
                }
            });
        });

        if (!isValid) {
            alert(noticeMessage);
            return;
        }

        console.log("Updated Data:", updatedData);
    }, [getUpdatedData, deletedPhaseAssignees]);


    const findPhaseIndex = (row) => {
        let phaseIndex = 0;
        let currentRow = 0;

        while (phaseIndex < initialData.length && currentRow + initialData[phaseIndex].assignees.length <= row) {
            currentRow += initialData[phaseIndex].assignees.length;
            phaseIndex += 1;
        }

        return phaseIndex;
    }

    const findAssigneeIndex = (row, phaseIndex) => {
        let assigneeIndex = row;
        for (let i = 0; i < phaseIndex; i++) {
            assigneeIndex -= initialData[i].assignees.length;
        }
        return assigneeIndex;
    }

    const updateAssigneeDiscipline = (row, value) => {
        const newInitialData = [...getUpdatedData()];
        const phaseIndex = findPhaseIndex(row);
        const assigneeIndex = findAssigneeIndex(row, phaseIndex);
        newInitialData[phaseIndex].assignees[assigneeIndex].discipline = value;
        setInitialData(newInitialData);

        document.querySelector(`#select-${row}-2`).value = "Select...";
        const event = new Event('change', { bubbles: true });
        document.querySelector(`#select-${row}-2`).dispatchEvent(event);
    }

    const updateAssigneeUser = (row, value) => {
        const newInitialData = [...getUpdatedData()];
        const phaseIndex = findPhaseIndex(row);
        const assigneeIndex = findAssigneeIndex(row, phaseIndex);
        newInitialData[phaseIndex].assignees[assigneeIndex].assignee = value;
        setInitialData(newInitialData);
    }

    const handleSelectChange = (e, row, col) => {
        const value = e.target.value;
        if (col === 1) {
            updateAssigneeDiscipline(row, value);
        } else if (col === 2) {
            updateAssigneeUser(row, value);
        }
    }

    const renderGrid = useCallback(() => {

        const rows = [];

        // Add header row
        const headerCols = [
            <div
                key={`action`}
                className="border border-gray-300 flex justify-center  min-w-16 max-w-16 items-center p-1 box-border bg-gray-200 text-gray-600 font-bold"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
                Action
            </div>,
            <div key="discipline-header" className="discipline-header border border-gray-300 p-1 flex justify-center items-center bg-gray-200 text-gray-600 font-semibold min-w-[160pt] max-w-[160pt]">
                Discipline
            </div>,
            <div key="user-header" className="user-header border border-gray-300 p-1  flex justify-center items-center bg-gray-200 text-gray-600 font-semibold min-w-[160pt] max-w-[160pt]">
                User
            </div>,
            <div key="grade-header" className="grade-header border border-gray-300 p-1  flex justify-center items-center bg-gray-200 text-gray-600 font-semibold min-w-24 max-w-24">
                Grade
            </div>,
            <div key="bh-header" className="bh-header border border-gray-300 p-1  flex justify-center items-center text-center bg-gray-200 text-gray-600 font-semibold min-w-24 max-w-24">
                Budget Hours
            </div>,
            ...headerDates.map((date, index) => {
                const color = getColorForMonth(date)
                return <div
                    key={`header-${index}-${crypto.randomUUID()}`}
                    className={"border border-gray-300 min-w-12 max-w-12 flex justify-center items-center px-1 py-4 text-gray-600 font-semibold"}
                    style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        background: color,
                        "--tw-bg-opacity": 1
                    }}
                >
                    {date}
                </div>
            }),
        ];
        rows.push(
            <div key="header" className="flex select-none rounded-lg sticky top-0 z-30 w-fit">
                {headerCols}
            </div>
        );

        let rowCounter = 0;

        // Add data rows
        initialData.forEach((phase, phaseIndex) => {

            const phase_display = getPhaseStateFromLocalStorage(phase.phase_id)

            rows.push(
                <div key={`phase-${phaseIndex}-${crypto.randomUUID()}`} className={`phase-header flex border-b border-gray-300 items-center sticky left-0 flex-1 font-bold bg-gray-100 text-left text-xl px-2 py-3 select-none ${phase_display}`}>
                    {phase.phase} - {" "}
                    <span className="text-red-400 text-lg mr-4">
                        {" "}
                        {getPhaseBudgetHours[phaseIndex]} hrs
                    </span>
                    <p className="collapsePhase cursor-pointer" onClick={(e) => handleCollapseClick(e, phase.phase_id)}>
                        <Image src="/resources/icons/arrow-up.png" height="20" width="20" alt="collapse" />
                    </p>
                    <p className="expandPhase cursor-pointer" onClick={(e) => handleExpandClick(e, phase.phase_id)}>
                        <Image src="/resources/icons/arrow-down.png" height="20" width="20" alt="expand" />
                    </p>
                </div>
            );

            const assigneeRows = [];

            if (phase?.assignees) {
                phase.assignees.forEach((assignee, assigneeIndex) => {
                    const assignee_grade = getGradeName(assignee.assignee, employee_data);
                    const assignee_name = getEmployeeName(assignee.assignee, employee_data);

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
                                    id={`select-${row}-${col}`}
                                    value={assignee.discipline || 1}
                                    onChange={(e) => handleSelectChange(e, row, col)}
                                    className="native-select border border-gray-300 rounded-md px-3 py-1 box-border text-center text-ellipsis focus:ring-gray-500 focus:ring-[1.5px] cursor-pointer select-none w-full  focus:border-none"
                                >
                                    <option key={crypto.randomUUID()} value="Select...">Select...</option>
                                    {memoizedDisciplineData.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            );
                        } else if (col === 2) {
                            content = (
                                <>
                                    <select
                                        id={`select-${row}-${col}`}
                                        value={assignee.assignee}
                                        onChange={(e) => handleSelectChange(e, row, col)}
                                        className="native-select border border-gray-300 rounded-md px-3 py-1 box-border text-center text-ellipsis cursor-pointer select-none w-full focus:ring-gray-500 focus:ring-[1.5px] focus:border-none"
                                    >
                                        <option key={crypto.randomUUID()} value="Select...">Select...</option>
                                        {memoizedEmployeeData
                                            .filter(option => option.discipline_id === parseInt(assignee.discipline))
                                            .map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                    </select>
                                </>
                            );
                        } else if (col === 3) {
                            content = <div className="select-none font-semibold min-w-24">{assignee_grade}</div>;
                        } else if (col === 4) {
                            content = (
                                <>
                                    <div className="select-none font-semibold min-w-24 budget-hour-cell">
                                        {getBudgetHoursCells(row)}
                                    </div>
                                </>
                            );
                        } else {
                            colDate = headerDates[col - 5];
                            initialContent = assignee.projected_work_weeks[colDate] || "";
                            content = cellContents[`${row}-${col}`] !== undefined ? cellContents[`${row}-${col}`] : assignee.projected_work_weeks[colDate] || null;
                        }

                        if (!cellRefs.current[row]) {
                            cellRefs.current[row] = [];
                        }

                        const isContentEditable = col > 4 + uneditableCellCount && editableCell?.row === row && editableCell?.col === col;

                        cols.push(
                            <div
                                key={`${row}-${col}`}
                                ref={(el) => {
                                    cellRefs.current[row][col] = el;
                                }}
                                className={`border border-gray-300 flex h-12 ${col === 0 ? "min-w-16 max-w-16" : col < 3 ? "min-w-[160pt] max-w-[160pt]" : col < 5 ? " min-w-24 max-w-24" : `min-w-12 max-w-12 cursor-cell focus:cursor-auto ${col >= 5 && col < 5 + uneditableCellCount ? "bg-gray-200 cursor-not-allowed" : ""}`} justify-center items-center p-1 box-border text-center z-0 select-none ${isSelected ? "outline-none border-red-500 border-1" : ""}`}
                                style={getCellStyle(row, col)}
                                onMouseDown={col > 4 + uneditableCellCount ? () => handleMouseDown(row, col) : undefined}
                                onMouseEnter={col > 4 + uneditableCellCount ? () => handleMouseEnter(row, col) : undefined}
                                onMouseUp={col > 4 + uneditableCellCount ? handleMouseUp : undefined}
                                data-date={col > 4 ? headerDates[col - 5] : ""}
                                data-col={col}
                                data-row={row}
                                data-phase-id={phase.phase_id}
                                data-phase-assignee-id={assignee.phase_assignee_id}
                                onClick={col > 4 + uneditableCellCount ? () => handleClick(row, col) : undefined}
                                onDoubleClick={col > 4 + uneditableCellCount ? () => handleDoubleClick(row, col) : undefined}
                                onBlur={col > 4 + uneditableCellCount ? (e) => handleCellBlur(row, col, e) : undefined}
                                onKeyUp={col > 4 + uneditableCellCount ? (e) => !edited && setEdited(true) : undefined}
                                contentEditable={isContentEditable}
                                suppressContentEditableWarning
                                suppressHydrationWarning
                            >
                                {content}
                            </div>
                        );
                    }

                    assigneeRows.push(
                        <>
                            <div className="assignee-label hidden select-none text-center bg-gray-300 text-gray-600 p-1 mt-3 sticky left-0" key={`assignee-label-${phaseIndex}-${assigneeIndex}`}>
                                {assignee.assignee === "Select..." ? "Unassigned" : assignee_name} - {assignee_grade} - {getBudgetHoursCells(row)} hrs
                            </div>
                            <div key={`assignee-${phaseIndex}-${assigneeIndex}`} className={`flex relative bg-white`}>
                                {cols}
                            </div>
                        </>
                    );
                });

                assigneeRows.push(
                    <div
                        key={`add-assignee-${crypto.randomUUID()}`}
                        className={`p-2 text-white flex-1 sticky text-lg text-center w-full cursor-pointer select-none bg-gray-400 hover:bg-gray-500 transition duration-200 ease`}
                        onClick={() => handleAddAssignee(phaseIndex)}
                    >
                        + Add New
                    </div>
                );
            }

            rows.push(
                <div key={`assignee-wrapper-${crypto.randomUUID()}`} className={`assignee-wrapper min-w-max relative ${phase_display == "collapsed" ? "hidden" : ""}`}>
                    {assigneeRows}
                </div>
            );
        });

        return rows;
    }, [
        headerDates,
        numCols,
        initialData,
        selectedCells,
        cellContents,
        getCellStyle,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        handleClick,
        handleDoubleClick,
        handleCellBlur,
        editableCell,
        getBudgetHoursCells,
        getPhaseBudgetHours,
        deleteAssignee,
        handleSelectChange,
        handleAddAssignee,
        cellRefs,
        getColorForMonth,
        memoizedDisciplineData,
        memoizedEmployeeData,
        getGradeName,
        getEmployeeName,
    ]);

    return (
        <>
            <div className="flex items-start max-w-full w-fit">
                <div className="space-y-5">
                    <DateRangePicker project_start_date={project_start_date} project_end_date={project_end_date} start={start_date} end={end_date} edited={edited} />
                    <div className="flex gap-2">
                        <div className="sheet-container flex-1 outline-none border h-[750px] border-gray-300 rounded-lg user-select-none relative overflow-scroll w-fit bg-white z-0" tabIndex={0}>
                            {renderGrid()}
                            <div className="arrow-left sticky bottom-[50%] z-50 left-8 p-3 flex justify-center items-center w-fit cursor-pointer hidden">
                                <div className="relative flex justify-center items-center">
                                    <div className="absolute w-12 h-12 rounded-full bg-lightRed animate-pulseRing"></div>
                                    <div className="absolute w-16 h-16 rounded-full bg-red-400 animate-pulseRing"></div>
                                    <div className="absolute w-20 h-20 rounded-full animate-pulseRing"></div>
                                    <div className="relative z-10 flex justify-center items-center bg-transparent rounded-full p-2">
                                        <Image src="/resources/icons/arrow.png" height="20" width="20" className="select-none" alt="arrow" onClick={navigateRight} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        {getMonthNameFromDate(end_date) == getMonthNameFromDate(project_end_date) &&
                            <div className="space-y-1">
                                <button
                                    key="add-week-button"
                                    className="rounded-lg p-1 w-8 h-8 flex text-white justify-center items-center bg-green-500 font-bold"
                                    onClick={addNewMonth}
                                >
                                    +
                                </button>
                                {initialHeaderDates.length < headerDates.length && <button
                                    key="remove-week-button"
                                    className="rounded-lg p-1 w-8 h-8 flex text-white justify-center items-center bg-red-500 font-bold"
                                    onClick={removeLastWeek}
                                >
                                    -
                                </button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            <button onClick={handleSave} className="px-8 py-3 bg-pric text-white rounded-lg mt-2">
                Save
            </button>
            <p className="user-tracker-visible hidden"></p>
        </>
    );
};

export default React.memo(Sheet);
