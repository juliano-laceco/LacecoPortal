"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useSheet from "./useSheet";
import Image from "next/image";

const generateHeaderDates = (numWeeks) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < numWeeks; i++) {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + i * 7);
        const formattedDate = nextWeek.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
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
                    "01 July 2024": counter++,
                    "08 July 2024": counter++,
                    "15 July 2024": counter++,
                    "22 July 2024": counter++,
                    "29 July 2024": counter++
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



const initializeCellContents = (initialData, headerDates) => {
    const cellContents = {};
    let rowCounter = 0;
    initialData.forEach((phase) => {
        phase.assignees.forEach((assignee) => {
            headerDates.forEach((date, colIndex) => {
                const cellIndex = colIndex + 5; // Adjust for the discipline and user columns
                cellContents[`${rowCounter}-${cellIndex}`] = assignee.projected_work_weeks[date] || "";
            });
            rowCounter++;
        });
    });
    return cellContents;
};

const Sheet = () => {
    const initialWeeks = 30;
    const [headerDates, setHeaderDates] = useState(() => generateHeaderDates(initialWeeks));
    const numCols = useMemo(() => headerDates.length + 5, [headerDates]);
    const disciplines = useMemo(() => ["Discipline 1", "Discipline 2"], []);
    const users = useMemo(() => ["User 1", "User 2"], []);
    const [deletedPhaseAssignees, setDeletedPhaseAssignees] = useState([]);
    const [initialData, setInitialData] = useState(() => generateMockData(3, 10));
    const initialCellContents = useMemo(() => initializeCellContents(initialData, headerDates), [initialData, headerDates]);
    const [headerDatesUpdated, setHeaderDatesUpdated] = useState(false);
    const [initialHeaderDates, setInitialHeaderDates] = useState([])

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
        setHistory,
    } = useSheet(
        initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0),
        numCols,
        initialCellContents
    );

    useEffect(() => {
        const newCellContents = initializeCellContents(initialData, headerDates);
        setCellContents(newCellContents);
        setHistory([newCellContents]);
    }, [initialData, headerDates]);

    useEffect(() => {
        setInitialHeaderDates(headerDates)
    }, []);



    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {

                    // Check horizontal visibility
                    const isVisibleHorizontally = entry.isIntersecting && entry.intersectionRatio === 1

                    document.querySelectorAll(".assignee-label").forEach(assignee_label_div => {
                        if (!isVisibleHorizontally) {
                            assignee_label_div.classList.remove('hidden');
                            document.querySelector(".user-tracker-visible").innerHTML = "visible"
                        } else {
                            assignee_label_div.classList.add('hidden');
                            document.querySelector(".user-tracker-visible").innerHTML = "hidden"
                        }
                    });
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
    }, []); // Empty dependency array ensures this effect runs only once

    const addNewWeek = useCallback(() => {

        console.log("Added new Week")
        setHeaderDates((prevDates) => {
            const newDates = generateHeaderDates(prevDates.length + 1);
            return newDates;
        });

        setCellContents((prevContents) => {
            const newContents = { ...prevContents };
            const newColIndex = headerDates.length + 5; // New column index

            for (let row = 0; row < initialData.reduce((acc, phase) => acc + phase.assignees?.length, 0); row++) {
                newContents[`${row}-${newColIndex}`] = "";
            }

            // const user_trackers = document.querySelectorAll(".assignee-label")
            // const user_tracker_visible = document.querySelector(".user-tracker-visible").innerHTML;

            // if (user_tracker_visible == "visible") {
            //     user_trackers.forEach(element => {
            //         element.style.paddingLeft = parseInt(element.style.paddingLeft) + 18 + "pt"
            //     });
            // }
            return newContents;
        });

        setHeaderDatesUpdated(true); // Set the flag to true

    }, [headerDates.length, initialData, setCellContents]);


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


    const removeLastWeek = useCallback(() => {
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

            // const user_trackers = document.querySelectorAll(".assignee-label")
            // const user_tracker_visible = document.querySelector(".user-tracker-visible").innerHTML;

            // if (user_tracker_visible == "visible") {
            //     user_trackers.forEach(element => {
            //         element.style.paddingLeft = parseInt(element.style.paddingLeft) - 18 + "pt"
            //     });
            // }
            return newContents;
        });
    }, [headerDates.length, initialData, setCellContents]);

    const getBudgetHoursCells = useCallback(
        (row) => {
            let total = 0;
            for (let i = 5; i < numCols; i++) {
                let content =
                    cellContents[`${row}-${i}`] === "" || cellContents[`${row}-${i}`] === undefined || cellContents[`${row}-${i}`] === null
                        ? 0
                        : cellContents[`${row}-${i}`];
                total += parseInt(content);
            }
            return total;
        },
        [cellContents, numCols]
    );

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
    }, [cellContents, initialData, getBudgetHoursCells]);

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

            // Add new assignee's cell contents to cellContents
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
        },
        [headerDates, cellContents, setCellContents, setHistory, numCols]
    );

    const deleteAssignee = useCallback(
        (row) => {
            const phaseIndex = findPhaseIndex(row);
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

    const updateAssigneeDiscipline = useCallback(
        (row, value) => {
            const newInitialData = [...initialData];
            const phaseIndex = findPhaseIndex(row);
            const assigneeIndex = findAssigneeIndex(row, phaseIndex);
            newInitialData[phaseIndex].assignees[assigneeIndex].discipline = value;
            setInitialData(newInitialData);
        },
        [initialData]
    );

    const updateAssigneeUser = useCallback(
        (row, value) => {
            const newInitialData = [...initialData];
            const phaseIndex = findPhaseIndex(row);
            const assigneeIndex = findAssigneeIndex(row, phaseIndex);
            newInitialData[phaseIndex].assignees[assigneeIndex].assignee = value;
            setInitialData(newInitialData);
        },
        [initialData]
    );

    const findPhaseIndex = useCallback(
        (row) => {
            let phaseIndex = 0;
            let currentRow = 0;

            while (phaseIndex < initialData.length && currentRow + initialData[phaseIndex].assignees.length <= row) {
                currentRow += initialData[phaseIndex].assignees.length;
                phaseIndex += 1;
            }

            return phaseIndex;
        },
        [initialData]
    );

    const findAssigneeIndex = useCallback(
        (row, phaseIndex) => {
            let assigneeIndex = row;
            for (let i = 0; i < phaseIndex; i++) {
                assigneeIndex -= initialData[i].assignees.length;
            }
            return assigneeIndex;
        },
        [initialData]
    );

    const isUUID = useCallback((id) => {
        const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        return regexExp.test(id);
    }, []);

    const handleSelectChange = useCallback(
        (e, row, col) => {
            const value = e.target.value;
            if (col === 1) {
                updateAssigneeDiscipline(row, value);
            } else if (col === 2) {
                updateAssigneeUser(row, value);
            }
        },
        [updateAssigneeDiscipline, updateAssigneeUser]
    );

    const getUpdatedData = useCallback(() => {
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
    }, [initialData, cellRefs, findPhaseIndex, findAssigneeIndex, isUUID, deletedPhaseAssignees]);

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
        console.log("Deleted Phase Assignees:", deletedPhaseAssignees);
    }, [getUpdatedData, deletedPhaseAssignees]);

    const colors = useMemo(
        () => [
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
        ],
        []
    );

    const getColorForMonth = useCallback(
        (date) => {
            const month = new Date(date).getMonth(); // Get month index (0-11)
            return colors[month];
        },
        [colors]
    );

    const renderGrid = useCallback(() => {
        const rows = [];

        // Add header row
        const headerCols = [
            <div
                key={`action`}
                className="border border-gray-300 flex justify-center  min-w-16 max-w-16 items-center p-1 box-border bg-gray-200 font-bold"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
                Action
            </div>,
            <div key="discipline-header" className="discipline-header border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold min-w-[130pt] max-w-[130pt]">
                Discipline
            </div>,
            <div key="user-header" className="user-header border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold min-w-[130pt] max-w-[130pt]">
                User
            </div>,
            <div key="grade-header" className="grade-header border border-gray-300 p-1  flex justify-center items-center bg-gray-200 font-semibold min-w-24 max-w-24">
                Grade
            </div>,
            <div key="bh-header" className="bh-header border border-gray-300 p-1  flex justify-center items-center text-center bg-gray-200 font-semibold min-w-24 max-w-24">
                Budget Hours
            </div>,
            ...headerDates.map((date, index) => {
                const color = getColorForMonth(date)
                return <div
                    key={`header-${index}`}
                    className={"border border-gray-300 min-w-12 max-w-12 flex justify-center items-center px-1 py-4  font-semibold"}
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
            <div key="header" className="flex select-none rounded-lg  sticky top-0 z-50">
                {headerCols}
            </div>
        );

        let rowCounter = 0;

        // Add data rows
        initialData.forEach((phase, phaseIndex) => {
            rows.push(
                <div key={`phase-${phaseIndex}`} className="sticky left-0 flex-1 font-bold bg-gray-100 text-left text-xl px-2 py-3 select-none">
                    {phase.phase} - {" "}
                    <span className="text-red-400 text-lg">
                        {" "}
                        {getPhaseBudgetHours[phaseIndex]} hrs
                    </span>
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
                                    <Image src="/resources/icons/delete.png" height="20" width="20" className alt="x" />
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
                                    className="border border-gray-300 p-1 box-border text-center  bg-gray-100 select-none w-full"
                                >
                                    {users.map((user) => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))}
                                </select>
                            );
                        } else if (col === 3) {
                            content = <div className="select-none font-semibold min-w-24">G5+</div>;
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

                        cols.push(
                            <div
                                key={`${row}-${col}`}
                                ref={(el) => {
                                    cellRefs.current[row][col] = el;
                                }}
                                className={`border border-gray-300 flex h-12 ${col === 0 ? "min-w-16 max-w-16" : col < 3 ? "min-w-[130pt] max-w-[130pt]" : col < 5 ? " min-w-24 max-w-24" : "min-w-12 max-w-12 cursor-cell focus:cursor-auto"} justify-center items-center p-1 box-border text-center select-none ${isSelected ? "outline-none border-red-500 border-1" : ""}`}
                                style={getCellStyle(row, col)}
                                onMouseDown={col > 4 ? () => handleMouseDown(row, col) : undefined}
                                onMouseEnter={col > 4 ? () => handleMouseEnter(row, col) : undefined}
                                onMouseUp={col > 4 ? handleMouseUp : undefined}
                                data-date={col > 4 ? headerDates[col - 5] : ""}
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
                        <>
                            <div className="assignee-label hidden  w-full text-center bg-gray-300 text-gray-600 p-1 rounded-tl-lg mt-3 sticky left-1" >
                                {assignee.assignee} - G5+ - {getBudgetHoursCells(row)} hrs
                            </div>
                            <div key={`assignee-${phaseIndex}-${assigneeIndex}`} className={`flex relative`} >
                                {cols}
                            </div>
                        </>
                    );
                });
            }

            rows.push(
                <div
                    key={`add-assignee-${phaseIndex}`}
                    className={`p-2 text-white flex-1 sticky left-0 text-lg text-center w-full cursor-pointer select-none bg-gray-400 hover:bg-gray-500 transition duration-200 ease`}
                    onClick={() => handleAddAssignee(phaseIndex)}

                >
                    + Add New
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
        disciplines,
        users,
        getColorForMonth,
    ]);

    return (
        <>
            <div className="flex items-start gap-3 w-full">
                <div className="sheet-container flex-1 outline-none border border-gray-300 rounded-lg user-select-none h-[750px] relative overflow-scroll" tabIndex={0}>
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

            <button onClick={handleSave} className="px-8 py-3 bg-pric text-white rounded-lg mt-2">
                Save
            </button>
            <p className="row-variance hidden">
                {headerDates.length - initialHeaderDates.length}
            </p>
            <p className="user-tracker-visible hidden"></p>
            <p className="first-expand hidden">0</p>
        </>
    );
};

export default React.memo(Sheet);
