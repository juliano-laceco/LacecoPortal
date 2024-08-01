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
    initializeCellContents,
    calculateTotalAssignees,
    isUUID,
    getGradeName,
    getEmployeeName,
    navigateRight,
    getColorForMonth,
    getPhaseStateFromLocalStorage,
    handleCollapseClick,
    handleExpandClick,
    scrollToFirstWarning
} from './SheetUtils';

import { baselineProject, saveDeployment } from "@/utilities/project/project-utils";
import Modal from "../custom/Modals/Modal";
import Button from "../custom/Button";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/utilities/date/date-utils";

const Sheet = ({ employee_data, discipline_data, project_start_date, project_end_date, start_date, end_date, deployment_data, project_data }) => {

    // Memoized Employee and Discipline Data
    const memoizedEmployeeData = useMemo(() => employee_data, [employee_data])
    const memoizedDisciplineData = useMemo(() => discipline_data, [discipline_data])
    const [isLoading, setIsLoading] = useState(false);
    const [populated, setPopulated] = useState(false);

    // Router Utils
    const router = useRouter()
    const pathname = usePathname()

    // Combined state for modal visibility and content
    const [modal, setModal] = useState(null);

    // Header Dates Variables
    const [headerDates, setHeaderDates] = useState(() => generateHeaderDates(start_date, end_date));
    const [headerDatesUpdated, setHeaderDatesUpdated] = useState(false); // Flags if the headers are changed
    const [initialHeaderDates, setInitialHeaderDates] = useState([]);    // Initial Persisting Copy of initialHeader dates
    const [isFirstRender, setIsFirstRender] = useState(true)

    // Deleted phase assignee tracking
    const [deletedPhaseAssignees, setDeletedPhaseAssignees] = useState([]);

    // Initial Data
    const numCols = headerDates.length + 5;
    // const [initialData, setInitialData] = useState(() => generateMockData(3, 5))
    const [initialData, setInitialData] = useState(() => deployment_data)
    const initial_assignee_count = useMemo(() => calculateTotalAssignees(initialData), [initialData])
    const initialCellContents = useMemo(() => initializeCellContents(initialData, headerDates), [initialData, headerDates])

    // Date Variables
    const currentMonday = getThisMondayDate()
    const [currentEndDate, setCurrentEndDate] = useState(end_date)

    // Flag inbdicates whether the page has been edited 
    const [edited, setEdited] = useState(false)
    const uneditableCellCount = 0;

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

    useEffect(() => {
        setIsFirstRender(false)
    }, [])

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
                if (cell) { // Check if the cell is defined
                    cell.setAttribute("data-initial", cell.textContent);
                }
            });
        });
    }, []);

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

        setPopulated(true)

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

                    if (isVisibleHorizontally) {
                        document.querySelector(".sheet-container")?.classList?.add("out-of-view")
                    } else {
                        document.querySelector(".sheet-container")?.classList?.remove("out-of-view")
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
            phase_name: phase.phase_name,
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
                            if (newValue != "") {
                                updatedData[phaseIndex].assignees[assigneeIndex].projected_work_weeks[date] = newValue;
                            }
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
                            if (dataChanged) {
                                updatedData[phaseIndex].assignees[assigneeIndex].updated_projected_work_weeks[date] = newValue;
                            }
                        }
                    }
                }
            });
        });

        return updatedData;
    }

    // Function that adds a new month to the headerDates
    const addNewMonth = () => {

        setHeaderDates(() => {

            const lastDateHeader = headerDates[headerDates.length - 1]

            const newEndDate = formatDate(add(new Date(lastDateHeader), { months: 1 }), "m-y")


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
            openModal(updateState, "Cannot Delete Week");
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
            for (let row = rowCounter; row < rowCounter + phase.assignees?.length; row++) {
                total += getBudgetHoursCells(row);
            }

            return total;
        });

        return phaseBudgetHours;
    }, [initialData, getBudgetHoursCells]);


    const handleAddAssignee = useCallback(
        (phaseIndex) => {
            const newAssignee = {
                phase_assignee_id: crypto.randomUUID(),
                discipline: "",
                assignee: "",
                projected_work_weeks: {},
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
                    return idx < phaseIndex ? acc + phase.assignees?.length : acc;
                }, 0) + updatedData[phaseIndex].assignees.length - 1;

            // Adjust the indices of the cell contents for all subsequent rows
            setCellContents((prevContents) => {
                const newContents = {};
                Object.keys(prevContents).forEach(key => {
                    const [row, col] = key.split('-').map(Number);
                    if (row >= newRowIndex) {
                        newContents[`${row + 1}-${col}`] = prevContents[key];
                    } else {
                        newContents[key] = prevContents[key];
                    }
                });

                // Add the new row's cells
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
        [headerDates, numCols, setCellContents, cellContents, setHistory, getUpdatedData, setInitialData]
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
            // if (newInitialData[phaseIndex].assignees.length > 1) {
            //     openModal({ newInitialData, phaseIndex, assigneeIndex }, "Assignee Delete");
            // } else {
            //     openModal(null, "Cannot Delete Assignee")

            openModal({ newInitialData, phaseIndex, assigneeIndex }, "Assignee Delete");
            setEdited(true)

        },
        [initialData]
    );



    // Handles saving to the DB
    const handleSave = async (refresh = true) => {
        setIsLoading(true);

        const updatedData = getUpdatedData();

        // Validation logic
        let isValid = true;
        let noticeMessage = "";

        updatedData.forEach((phase) => {
            phase?.assignees?.forEach((assignee) => {
                if (assignee.discipline == "Select..." || assignee.assignee == "Select...") {
                    isValid = false;
                    noticeMessage = "All assignees must have a discipline and a user.";
                }

                // let hasDateFilled = false;
                // for (const date in assignee.projected_work_weeks) {
                //     if (assignee.projected_work_weeks[date] !== "") {
                //         hasDateFilled = true;
                //         break;
                //     }
                // }

                //  if (!hasDateFilled) {
                //      isValid = false;
                //      noticeMessage = "At least one date cell must be filled for each assignee.";
                //  }
            });
        });

        if (!isValid) {
            openModal(noticeMessage, "Missing Data");
            setIsLoading(false);
            return;
        }

        // console.log("Updated Data:", updatedData);
        await saveDeployment(updatedData, deletedPhaseAssignees);

        if (refresh) {
            clearPath();
        }

        setIsLoading(false);
    };


    const clearPath = () => {

        if (initialHeaderDates.length != headerDates.length) {
            router.push(`${pathname}`);
            router.refresh();
        } else {
            router.refresh();
        }

    }

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
        !edited && populated && setEdited(true)

    }

    const renderModalContent = (message, buttons) => (
        <Modal open={true} onClose={() => setModal(null)}>
            <div className="flex items-center gap-4">
                <Image src="/resources/icons/warning.png" height="50" width="50" alt="warning-icon" className="mob:w-12 mob:h-12" />
                <div className="mob:text-xs">
                    <p>{message}</p>
                </div>
            </div>
            <div className="flex justify-center gap-4 mb-4 mt-5">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        variant={button.variant}
                        small
                        name={button.name}
                        onClick={button.onClick}
                    >
                        {button.name}
                    </Button>
                ))}
            </div>
        </Modal>
    );


    const openModal = (data = null, type) => {

        let modalContent;

        switch (type) {
            case "Assignee Delete":
                const { newInitialData, phaseIndex, assigneeIndex } = data;
                modalContent = renderModalContent(
                    "Are you sure you would like to delete this assignee and all assigned weeks?",
                    [
                        {
                            variant: "primary",
                            name: "Proceed",
                            onClick: () => {
                                newInitialData[phaseIndex].assignees.splice(assigneeIndex, 1);
                                setInitialData(newInitialData);
                                setModal(null);
                            },
                        },
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ]
                );
                break;
            case "Cannot Delete Assignee":
                modalContent = renderModalContent(
                    "Unable to delete. Phase must contain at least one assignee.",
                    [
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ]
                );
                break;
            case "Cannot Delete Week":
                modalContent = renderModalContent(
                    "The week you are deleting contains data. Are you sure you would like to proceed?",
                    [
                        {
                            variant: "primary",
                            name: "Proceed",
                            onClick: () => {
                                data();
                                setModal(null);
                            },
                        },
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ]
                );
                break;
            case "Missing Data":
                modalContent = renderModalContent(
                    data,
                    [
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => {
                                setModal(null)
                                scrollToFirstWarning()
                            },
                        },
                    ]
                );
                break;
            case "Date Clear":
                modalContent = renderModalContent(
                    "Clearing date filters will discard all your updated data. Are you sure you wish to proceed?",
                    [
                        {
                            variant: "primary",
                            name: "Save & Proceed",
                            onClick: () => {
                                handleSave(false);
                                data();
                                setModal(null);
                            },
                        },
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ]
                )
                break;
            case "Date Change":
                modalContent = renderModalContent(
                    "Changing the date range will discard all your updated data. Are you sure you wish to proceed?",
                    [
                        {
                            variant: "primary",
                            name: "Save & Proceed",
                            onClick: () => {
                                handleSave(false);
                                data();
                                setModal(null);
                            },
                        },
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ]
                )
                break;
            case "Invalid Dates":
                modalContent = renderModalContent(
                    "Start date must be less than or equal to the end date.",
                    [
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ]
                )
                break;
        }
        setModal(modalContent);
    };


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
            <div key="header" className="flex rounded-lg sticky top-0 z-30 w-fit">
                {headerCols}
            </div>
        );

        let rowCounter = 0;

        // Add data rows
        initialData.forEach((phase, phaseIndex) => {

            const phase_display = getPhaseStateFromLocalStorage(phase.phase_id)

            rows.push(
                <div key={`phase-${phaseIndex}-${crypto.randomUUID()}`} className={`phase-header flex border-b border-gray-300 items-center sticky left-0 flex-1 font-bold bg-gray-100 text-left text-xl px-2 py-3  ${phase_display}`}>
                    {phase.phase_name} - {" "}
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
                phase?.assignees?.forEach((assignee, assigneeIndex) => {
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

                            const isEmpty = assignee.discipline == "Select..."
                            content = (
                                <div className="flex flex-col items-center">
                                    <select
                                        id={`select-${row}-${col}`}
                                        value={assignee.discipline || 1}
                                        onChange={(e) => handleSelectChange(e, row, col)}
                                        className={`native-select border ${!isEmpty ? "border-gray-300" : "border-pric"} rounded-sm px-3 py-1 box-border text-center text-ellipsis focus:ring-gray-500 focus:ring-[1.5px] cursor-pointer  w-full  focus:border-none`}
                                    >
                                        <option key={crypto.randomUUID()} value="Select...">Select...</option>
                                        {memoizedDisciplineData.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        } else if (col === 2) {

                            const isEmpty = assignee.assignee == "Select..."
                            content = (
                                <>
                                    <select
                                        id={`select-${row}-${col}`}
                                        value={assignee.assignee}
                                        onChange={(e) => handleSelectChange(e, row, col)}
                                        className={`native-select border ${!isEmpty ? "border-gray-300" : "border-pric"} rounded-sm px-3 py-1 box-border text-center text-ellipsis focus:ring-gray-500 focus:ring-[1.5px] cursor-pointer  w-full  focus:border-none`}
                                    >
                                        <option key={crypto.randomUUID()} value="Select...">Select...</option>
                                        {memoizedEmployeeData
                                            .filter(option => option.discipline_id === parseInt(assignee.discipline))
                                            .map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </>
                            );
                        } else if (col === 3) {
                            content = <div className=" font-semibold min-w-24">{assignee_grade}</div>;
                        } else if (col === 4) {
                            content = (
                                <>
                                    <div className=" font-semibold min-w-24 budget-hour-cell">
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
                                className={`border border-gray-300 flex h-12 ${col === 0 ? "min-w-16 max-w-16" : col < 3 ? "min-w-[160pt] max-w-[160pt]" : col < 5 ? " min-w-24 max-w-24" : `min-w-12 max-w-12 cursor-cell focus:cursor-auto ${col >= 5 && col < 5 + uneditableCellCount ? "bg-gray-200 cursor-not-allowed" : ""}`} justify-center items-center p-1 box-border text-center z-0  ${isSelected ? "outline-none border-red-500 border-1" : ""}`}
                                style={getCellStyle(row, col)}
                                onMouseDown={
                                    col > 4 + uneditableCellCount ?
                                        (e) => {
                                            handleMouseDown(row, col);
                                        }
                                        : undefined
                                }
                                onMouseEnter={col > 4 + uneditableCellCount ? () => handleMouseEnter(row, col) : undefined}
                                onMouseUp={col > 4 + uneditableCellCount ? handleMouseUp : undefined}
                                data-date={col > 4 ? headerDates[col - 5] : ""}
                                data-col={col}
                                data-row={row}
                                data-phase-id={phase.phase_id}
                                data-initial={isFirstRender ? content : cellRefs.current[row][col]?.getAttribute("data-initial")}
                                data-phase-assignee-id={assignee.phase_assignee_id}
                                onClick={col > 4 + uneditableCellCount ? () => handleClick(row, col) : undefined}
                                onDoubleClick={col > 4 + uneditableCellCount ? () => handleDoubleClick(row, col) : undefined}
                                onBlur={col > 4 + uneditableCellCount ? (e) => handleCellBlur(row, col, e) : undefined}
                                onKeyUp={col > 4 + uneditableCellCount ? (e) => !edited && setEdited(true) : undefined}
                                contentEditable={isContentEditable}
                                suppressContentEditableWarning
                            >
                                {content}
                            </div>
                        );
                    }



                    assigneeRows.push(
                        <>
                            <div className="assignee-label  text-center bg-gray-300 text-gray-600 p-1 mt-3 max-w-[100vw] sticky left-0" key={`assignee-label-${phaseIndex}-${assigneeIndex}`}>
                                {assignee.assignee === "Select..." ? "Unassigned" : assignee_name} - {assignee_grade} - {getBudgetHoursCells(row)} hrs
                            </div>
                            <div key={`assignee-${phaseIndex}-${assigneeIndex}`} className={`flex relative bg-white`}>
                                {cols}
                            </div>
                        </>
                    );


                });

                if (phase?.assignees?.length == 0) {
                    assigneeRows.push(
                        <div className="text-center max-w-[100vw] p-3 text-pric sticky left-0"> No assignees found </div>
                    )
                }
                assigneeRows.push(
                    <div
                        key={`add-assignee-${crypto.randomUUID()}`}
                        className={`p-2 text-white flex-1 text-lg text-center max-w-[100vw] cursor-pointer  bg-gray-400 hover:bg-gray-500 transition duration-200 ease sticky left-0`}
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
        memoizedDisciplineData,
        memoizedEmployeeData,
        edited,
        employee_data,
        isFirstRender
    ]);

    return (
        <>
            {modal}
            <div className="flex items-start max-w-full w-fit">
                <div className="space-y-5">
                    <DateRangePicker project_start_date={project_start_date} project_end_date={project_end_date} start={start_date} end={end_date} edited={edited} openModal={openModal} handleSave={handleSave} />
                    <div className="flex gap-2">
                        <div className="sheet-container flex-1 outline-none border h-[900px] border-gray-300 rounded-lg  select-none relative overflow-scroll w-fit bg-white z-0" tabIndex={0}>
                            {renderGrid()}
                            <div className="arrow-left sticky bottom-[50%] z-50 left-8 p-3 flex justify-center items-center w-fit cursor-pointer">
                                <div className="relative flex justify-center items-center">
                                    <div className="absolute w-12 h-12 rounded-full bg-lightRed animate-pulseRing"></div>
                                    <div className="absolute w-16 h-16 rounded-full bg-red-400 animate-pulseRing"></div>
                                    <div className="absolute w-20 h-20 rounded-full animate-pulseRing"></div>
                                    <div className="relative z-10 flex justify-center items-center bg-transparent rounded-full p-2">
                                        <Image src="/resources/icons/arrow.png" height="20" width="20" className="" alt="arrow" onClick={navigateRight} />

                                    </div>
                                </div>

                            </div>
                            <div className="flex gap-4 items-center justify-center bg-white sticky left-0 bottom-0 max-w-[100vw] z-50 p-3 border-t border-gray-300 shadow-top-only">
                                <Button
                                    onClick={handleSave}
                                    medium
                                    variant="primary"
                                    name="Save"
                                    isDisabled={!edited || isLoading}
                                    loading={isLoading}
                                >

                                    Save
                                </Button>
                                {project_data.isBaselined == 'No' &&
                                    <Button
                                        onClick={async (e) => {
                                            setIsLoading(true);
                                            await baselineProject(project_data.project_id);
                                            router.refresh();
                                            setIsLoading(false);
                                        }}
                                        medium
                                        variant="primary"
                                        name="Baseline Project"
                                        isDisabled={isLoading}
                                        loading={isLoading}
                                    >
                                        Baseline Project
                                    </Button>
                                }

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

            <p className="user-tracker-visible"></p>
        </>
    );
};

export default React.memo(Sheet);
