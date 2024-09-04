"use client"

import React, { useEffect, useState } from "react"
import { startOfWeek, addDays, format } from "date-fns"
import ProjectSection from "./ProjectSection"
import TimeSheetHeader from "./TimeSheetHeader"
import TimeSheetFooter from "./TimeSheetFooter"
import DayStatus from "./DayStatus"
import DevelopmentSection from "./DevelopmentSection"
import { development_options } from "@/data/static/development-options"
import Button from "../custom/Other/Button"
import DropdownRegular from "../custom/Dropdowns/DropdownRegular"
import Image from "next/image"
import { isUUID } from "../sheet/SheetUtils"
import { saveTimeSheet } from "@/utilities/timesheet/timesheet-utils"
import Modal from "../custom/Modals/Modal"
import { usePathname, useRouter } from "next/navigation"
import { showToast } from "@/utilities/toast-utils"


function TimeSheet({ timesheet_data, start }) {

    const [projectTimeSheet, setProjectTimeSheet] = useState(timesheet_data?.project_timesheet ?? []);
    const [developmentTimeSheet, setDevelopmentTimeSheet] = useState(timesheet_data?.development_timesheet ?? []);
    const [nonWorkingDays, setNonWorkingDays] = useState(timesheet_data?.non_working ?? []);
    const [selectedType, setSelectedType] = useState(""); // State to store selected type for new rows
    const [isDevelopmentSectionCollapsed, setIsDevelopmentSectionCollapsed] = useState(false); // State to manage collapse/expand of the section
    const [initialDevelopmentTypes, setInitialDevelopmentTypes] = useState([])
    const [min_rejected_date, setMinRejectedDate] = useState(timesheet_data?.min_rejected_date)
    const [max_finalized_date, setMaxFinalizedDate] = useState(timesheet_data?.max_finalized_date)

    const today = new Date();

    // const [startDate, setStartDate] = useState(startOfWeek(min_rejected_date ? min_rejected_date : (start ?? today), { weekStartsOn: 1 }))
    const [startDate, setStartDate] = useState(startOfWeek((start ?? today), { weekStartsOn: 1 }))

    const generateWeekDays = () => {
        return Array.from({ length: 7 }, (_, i) => {
            const day = addDays(startDate, i);
            return {
                day: format(day, 'd'),
                dayOfWeek:
                    (
                        <div className='flex flex-col justify-center items-center'>
                            <span>{format(day, 'EEE')}</span>
                            <span>{format(day, 'd')}</span>
                        </div>
                    ),
                fullDate: format(day, 'yyyy-MM-dd'),
            };
        });
    }

    const [weekDays, setWeekDays] = useState(generateWeekDays())
    const [edited, setEdited] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const router = useRouter()
    const pathname = usePathname()

    // Combined state for modal visibility and content
    const [modal, setModal] = useState(null);

    useEffect(() => {
        // console.log("PROJECT SHEET", projectTimeSheet)
        setWeekDays(weekDays)
    }, [projectTimeSheet])


    useEffect(() => {
        // console.log("DEVELOPMENT SHEET", developmentTimeSheet)
    }, [developmentTimeSheet])

    useEffect(() => {
        const types = Object.keys(organizeTimesheetByType(developmentTimeSheet, development_options))
        setInitialDevelopmentTypes(types)
    }, [])

    useEffect(() => {
        !edited && setEdited(true)
    }, [projectTimeSheet, developmentTimeSheet])

    // Sync the internal state with the props whenever timesheet_data changes
    useEffect(() => {
        setProjectTimeSheet(timesheet_data?.project_timesheet ?? []);
        setDevelopmentTimeSheet(timesheet_data?.development_timesheet ?? []);
        setNonWorkingDays(timesheet_data?.non_working ?? []);
    }, [timesheet_data]);

    useEffect(() => {
        setWeekDays(generateWeekDays())
        console.log("Start Date", startDate)
    }, [startDate]);

    useEffect(() => {
        setStartDate(startOfWeek((start ?? today), { weekStartsOn: 1 }))
        // setStartDate(startOfWeek(min_rejected_date ? min_rejected_date : (start ?? today), { weekStartsOn: 1 }))
    }, [start]);

    useEffect(() => {
        console.log("Week Days", weekDays)
    }, [weekDays])



    const handleInputChange = (e, projectIndex, phaseIndex, date, isDevelopment = false, developmentId = null, type = null) => {
        const { value } = e.target;
        const updatedValue = value ? parseFloat(value) : ""; // Set to "" if value is empty

        if (isDevelopment) {
            let newDevelopmentTimesheet = developmentTimeSheet.map(item => {
                if (item.development_hour_day_id === developmentId && item.work_day === date) {
                    // If the input is empty and it's a UUID, remove the record
                    if (!updatedValue && developmentId && isUUID(developmentId)) {
                        return null;
                    }
                    return {
                        ...item,
                        hours_worked: updatedValue,
                    };
                }
                return item;
            }).filter(item => item !== null); // Filter out the null values (deleted items)

            // If no existing record matches, create a new one
            if (developmentId === null && updatedValue !== "") {
                newDevelopmentTimesheet.push({
                    development_hour_day_id: crypto.randomUUID(),
                    work_day: date,
                    display_date: date,
                    hours_worked: updatedValue,
                    status: "Submitted", // Default status for new entries
                    rejection_reason: null,
                    type // Set any default or null type
                });
            }

            setDevelopmentTimeSheet(newDevelopmentTimesheet);
        } else {
            const newProjectTimeSheet = [...projectTimeSheet];
            const assignmentIndex = newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.findIndex(
                assignment => assignment.work_day === date
            );

            if (assignmentIndex !== -1) {
                // If the input is empty and it's a UUID, remove the record
                if (!updatedValue && isUUID(newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments[assignmentIndex].employee_work_day_id)) {
                    newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.splice(assignmentIndex, 1);
                } else {
                    // If assignment exists, update the hours worked
                    newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments[assignmentIndex].hours_worked = updatedValue;
                }
            } else if (updatedValue !== "") {
                // Add new assignment if value is not empty
                newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.push({
                    employee_work_day_id: crypto.randomUUID(),
                    work_day: date,
                    display_date: format(new Date(date), 'dd MMMM yyyy'),
                    hours_worked: updatedValue
                });
            }

            setProjectTimeSheet(newProjectTimeSheet);
        }
    };

    const calculateTotalHours = (date) => {
        const projectHours = projectTimeSheet.reduce((total, project) => {
            return total + project.phases.reduce((phaseTotal, phase) => {
                const assignment = phase.assignments.find(assignment => assignment.work_day === date);
                return phaseTotal + (assignment ? parseFloat(assignment.hours_worked || 0) : 0);
            }, 0);
        }, 0);

        const developmentHours = developmentTimeSheet.reduce((total, assignment) => {
            return total + (assignment.work_day === date ? parseFloat(assignment.hours_worked || 0) : 0);
        }, 0);

        return projectHours + developmentHours;
    };

    const calculateTotalWeekHours = () => {
        return weekDays.reduce((total, day) => {
            return total + calculateTotalHours(day.fullDate);
        }, 0);
    };

    // Function to delete a development row
    const deleteDevelopmentRow = (type) => {
        setDevelopmentTimeSheet(prevState =>
            prevState.filter(item => item.type !== type)
        );
    };

    const getStatusForDay = (date) => {
        let status = null;
        let rejectionReason = null;
        let hasData = false;

        // Check if the date is a non-working day
        const nonWorkingDay = nonWorkingDays.find(nwd => nwd.date === date);

        if (nonWorkingDay) {
            if (isUUID(nonWorkingDay.non_working_day_id)) {
                status = "New Non Working";
            } else {
                status = "Non Working";
            }
        } else {
            projectTimeSheet.forEach((project) => {
                project.phases.forEach((phase) => {
                    phase.assignments.forEach((assignment) => {
                        if (assignment.work_day === date) {
                            hasData = true; // We have data in the project timesheet
                            if (assignment.status === "Rejected") {
                                status = "Rejected";
                                rejectionReason = assignment.rejection_reason;
                            } else if (assignment.status === "Pending" && status !== "Rejected") {
                                status = "Pending";
                            } else if (!status) {
                                status = assignment.status;
                            }
                        }
                    });
                });
            });

            developmentTimeSheet.forEach((development) => {
                if (development.work_day === date) {
                    hasData = true; // We have data in the development timesheet
                    if (development.status === "Rejected") {
                        status = "Rejected";
                        rejectionReason = development.rejection_reason;
                    } else if (development.status === "Pending" && status !== "Rejected") {
                        status = "Pending";
                    } else if (!status) {
                        status = development.status;
                    }
                }
            });
        }

        return { status, rejectionReason, has_data: hasData };
    };



    const addNonWorkingDay = (date) => {
        // Check if there is any project data on this day
        const hasProjectData = projectTimeSheet.some(project =>
            project.phases.some(phase =>
                phase.assignments.some(assignment => assignment.work_day === date)
            )
        );

        // Check if there is any development data on this day
        const hasDevelopmentData = developmentTimeSheet.some(development => development.work_day === date);

        if (hasProjectData || hasDevelopmentData) {
            // If there is data, do not allow adding the non-working day and show an alert or modal
            openModal(
                <>
                    <div>Cannot add non-working day while having hours filled.</div>
                    <div> Date : <span className="font-bold">{date}</span></div>
                </>
                , "Addition Error");
        } else {
            // If no data, proceed with adding the non-working day
            let newDay = { non_working_day_id: crypto.randomUUID(), date };
            setNonWorkingDays((prev) => [...prev, newDay]);
        }
    };


    const removeNonWorkingDay = (date) => {
        setNonWorkingDays((prev) => prev.filter((day) => day.date != date))
    }


    // Function to organize timesheet data by type
    const organizeTimesheetByType = (timesheet, options) => {
        return timesheet.reduce((acc, current) => {
            const { type } = current;
            if (type) {
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(current);
            }
            return acc;
        }, {});
    };

    const addNewDevelopmentRow = () => {
        if (selectedType) {
            setDevelopmentTimeSheet(prevState => [
                ...prevState,
                {
                    development_hour_day_id: crypto.randomUUID(),
                    work_day: null, // This will be filled later by the user
                    display_date: null,
                    hours_worked: 0,
                    status: "Submitted",
                    rejection_reason: null,
                    type: selectedType
                }
            ]);
            setSelectedType(""); // Reset the selected type after adding
        }
    };

    // Handle collapse and expand actions for the whole section
    const toggleDevelopmentSection = () => {
        setIsDevelopmentSectionCollapsed(prevState => !prevState);
    };

    const organizedTimesheet = organizeTimesheetByType(developmentTimeSheet, development_options);

    // Filter out already used types for the new row dropdown
    const availableTypesForNewRow = development_options.filter(option => {
        return !Object.keys(organizedTimesheet).includes(option.value);
    });


    // Function to sanitize development data
    const sanitizeDevelopmentData = () => {
        return developmentTimeSheet.filter((developmentItem) => {
            if (!isUUID(developmentItem.development_hour_day_id)) {
                // Include if hours_worked is different from initial_hours_worked
                return developmentItem.hours_worked !== developmentItem.initial_hours_worked;
            }
            // Keep if display_date is not null
            return developmentItem.display_date != null;
        });
    };

    // Function to sanitize assignments
    const sanitizeAssignments = (assignments) => {
        return assignments.filter((assignment) => {
            if (!isUUID(assignment.employee_work_day_id)) {
                // Include if hours_worked is different from initial_hours_worked
                return assignment.hours_worked !== assignment.initial_hours_worked;
            }
            return true; // Exclude if not a UUID
        });
    };

    // Function to sanitize phases
    const sanitizePhases = (phases) => {
        return phases
            .map((phase) => {
                const sanitizedAssignments = sanitizeAssignments(phase.assignments);

                // Only include phases with updated assignments
                if (sanitizedAssignments.length > 0) {
                    return {
                        ...phase,
                        assignments: sanitizedAssignments,
                    };
                }
                return null; // Exclude phases without updated assignments
            })
            .filter((phase) => phase !== null); // Remove null phases
    };

    // Function to sanitize projects
    const sanitizeProjects = () => {
        return projectTimeSheet.map((project) => {
            const sanitizedPhases = sanitizePhases(project.phases);

            // Only include projects with updated phases
            if (sanitizedPhases.length > 0) {
                return {
                    ...project,
                    phases: sanitizedPhases,
                };
            }
            return null; // Exclude projects without updated phases
        }).filter((project) => project !== null); // Remove null projects

    };

    const renderModalContent = (message, buttons, title = "") => (
        <Modal open={true}
            onClose={() => {
                setModal(null)
            }}
            title={title}
        >
            <div className="flex items-center gap-4">
                <Image src="/resources/icons/warning.png" height="50" width="50" alt="warning-icon" className="mob:w-12 mob:h-12" />
                <div className="mob:text-xs">
                    <div>{message}</div>
                </div>
            </div>
            <div className="flex justify-center gap-4 mb-4 mt-5">
                {buttons.map((button, index) => (
                    <Button
                        key={crypto.randomUUID()}
                        {...button}
                    />
                ))}
            </div>
        </Modal>
    );

    const openModal = (data = null, type) => {

        let modalContent;

        switch (type) {
            case "Confirm Deletion":
                modalContent = renderModalContent(
                    "Are you sure you would like to delete this record and all filled information ?",
                    [
                        {
                            variant: "primary",
                            name: "Proceed",
                            onClick: () => {
                                deleteDevelopmentRow(data)
                                setModal(null);

                            },
                        },
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ],
                    "Confirmation"
                );
                break;
            case "Confirm Save":
                modalContent = renderModalContent(
                    "Are you sure you would like to submit the currently submitted information? This is operation is not reversible.",
                    [
                        {
                            variant: "primary",
                            name: "Proceed",
                            onClick: async () => {
                                setIsSaving(true)
                                await submitTimeSheet()
                                setIsSaving(false)
                                router.refresh()
                                setModal(null)

                            },
                            isDisabled: isSaving,
                            loading: isSaving
                        },
                        {
                            variant: "secondary",
                            name: "Close",
                            onClick: () => setModal(null),
                        },
                    ],
                    "Confirmation"
                );
                break;
            case "Rejection Reason":
                modalContent = renderModalContent(
                    data,
                    [
                        {
                            variant: "primary",
                            name: "Close",
                            onClick: () => {
                                setModal(null)
                            },
                        }
                    ],
                    "Submission Rejected"
                );
                break;
            case "Addition Error":
                modalContent = renderModalContent(
                    data,
                    [
                        {
                            variant: "primary",
                            name: "Close",
                            onClick: () => setModal(null),
                        }
                    ],
                    "Error"
                );
                break;
        }
        setModal(modalContent);
    };

    // Main function to sanitize all data
    const submitTimeSheet = async () => {

        const sanitizedDevelopmentData = sanitizeDevelopmentData();
        const sanitizedProjectData = sanitizeProjects();

        try {

            await saveTimeSheet({
                project_timesheet: sanitizedProjectData,
                development_timesheet: sanitizedDevelopmentData,
                non_working: nonWorkingDays.filter((day) => isUUID(day.non_working_day_id))

            })

            showToast("success", "Successfully updated timesheet")
        } catch (error) {
            showToast("failed", "Error occured while saving timesheet")
        }
    };

    return (
        <div className="w-fit mob:w-full tablet:w-full mob:space-y-7 tablet:space-y-7 lap:text-sm overflow-hidden desk:border lap:border rounded-lg">
            <h1 className="font-bold text-2xl mt-5 desk:hidden lap:hidden">Projects</h1>
            <TimeSheetHeader weekDays={weekDays} />
            {projectTimeSheet.map((project, projectIndex) => (
                <ProjectSection
                    key={project.project_id}
                    project={project}
                    projectIndex={projectIndex}
                    weekDays={weekDays}
                    handleInputChange={handleInputChange}
                    getStatusForDay={getStatusForDay}
                />
            ))}
            <h1 className="font-bold text-2xl mt-6 desk:hidden lap:hidden ">Non Billable Hours</h1>
            <div className="bg-pric text-white p-4 flex items-center justify-between">
                <span className="font-semibold">Non Billable Hours</span>
                <div className="mobile-version-collapse flex justify-center items-center">
                    <p
                        className="expand-collapse-dev-section cursor-pointer bg-red-400 px-3 py-2 rounded-lg border border-red-300"
                        onClick={toggleDevelopmentSection}
                    >
                        <Image
                            src={isDevelopmentSectionCollapsed ? "/resources/icons/arrow-down.svg" : "/resources/icons/arrow-up.svg"}
                            height="12"
                            width="12"
                            alt={isDevelopmentSectionCollapsed ? "expand" : "collapse"}
                        />
                    </p>
                </div>
            </div>
            {!isDevelopmentSectionCollapsed && (
                <>
                    <div className="development-section bg-gray-50 flex mob:flex-col tablet:flex-col">
                        <div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200 mob:hidden tablet:hidden ">
                            Non Billable Hours
                        </div>
                        <div className="flex flex-col">
                            {Object.keys(organizedTimesheet).map((key_name) => (
                                <DevelopmentSection
                                    key={key_name}
                                    development_items={organizedTimesheet[key_name]}
                                    type={key_name}
                                    weekDays={weekDays}
                                    handleInputChange={handleInputChange}
                                    getStatusForDay={getStatusForDay}
                                    handleDelete={deleteDevelopmentRow}
                                    initialDevelopmentTypes={initialDevelopmentTypes}
                                    openModal={openModal}
                                    setEdited={setEdited}
                                />
                            ))}
                            {availableTypesForNewRow.length > 0 && (
                                <div className="flex items-center gap-3 p-2 w-fit">
                                    <DropdownRegular
                                        options={availableTypesForNewRow}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(selectedOption) => setSelectedType(selectedOption.value)}
                                        value={selectedType}
                                    />

                                    <Button
                                        onClick={addNewDevelopmentRow}
                                        isDisabled={isSaving}
                                        variant="primary"
                                        name="Add"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            <DayStatus
                weekDays={weekDays}
                getStatusForDay={getStatusForDay}
                openModal={openModal}
                addNonWorkingDay={addNonWorkingDay}
                removeNonWorkingDay={removeNonWorkingDay}
            />
            <TimeSheetFooter
                weekDays={weekDays}
                calculateTotalHours={calculateTotalHours}
                calculateTotalWeekHours={calculateTotalWeekHours}
            />
            <Button
                variant="primary"
                name="Save"
                onClick={() => openModal(null, "Confirm Save")}
            />
            {modal}
        </div>
    );
}

export default TimeSheet;
