"use client"

import React, { useEffect, useState } from "react"
import { startOfWeek, addDays, format } from "date-fns"
import ProjectSection from "./ProjectSection"
import TimeSheetHeader from "./TimeSheetHeader"
import TimeSheetFooter from "./TimeSheetFooter"
import DayStatus from "./DayStatus"
import DevelopmentSection from "./DevelopmentSection"
import { development_options } from "@/data/static/development-options"

function TimeSheet({ timesheet_data }) {

    const [projectTimeSheet, setProjectTimeSheet] = useState(timesheet_data.project_timesheet);
    const [developmentTimeSheet, setDevelopmentTimeSheet] = useState(timesheet_data.development_timesheet);
    const [selectedType, setSelectedType] = useState(""); // State to store selected type for new rows

    useEffect(() => {
        console.log("PROJECT SHEET", projectTimeSheet)
    }, [projectTimeSheet])

    useEffect(() => {
        console.log("DEVELOPMENT SHEET", developmentTimeSheet)
    }, [developmentTimeSheet])

    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 });

    const weekDays = Array.from({ length: 7 }, (_, i) => {
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

    const handleInputChange = (e, projectIndex, phaseIndex, date, isDevelopment = false, developmentId = null, type = null) => {
        const { value } = e.target;

        const updatedValue = value ? parseFloat(value) : '';

        if (isDevelopment) {
            const newDevelopmentTimesheet = developmentTimeSheet.map(item => {
                if (item.development_hour_day_id === developmentId && item.work_day === date) {
                    return {
                        ...item,
                        hours_worked: updatedValue,
                    };
                }
                return item;
            });

            // If no existing record matches, create a new one
            if (developmentId === null) {
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
                if (updatedValue) {
                    newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments[assignmentIndex].hours_worked = updatedValue;
                } else {
                    newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.splice(assignmentIndex, 1);
                }
            } else if (updatedValue) {
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

    const handleTypeChange = (newType, developmentHourDayId) => {
        const newDevelopmentTimesheet = developmentTimeSheet.map(item => {
            if (item.development_hour_day_id == developmentHourDayId) {
                return { ...item, type: newType };
            }
            return item;
        });

        setDevelopmentTimeSheet(newDevelopmentTimesheet);
    };

    const getStatusForDay = (date) => {
        let status = null;
        let rejectionReason = null;

        projectTimeSheet.forEach((project) => {
            project.phases.forEach((phase) => {
                phase.assignments.forEach((assignment) => {
                    if (assignment.work_day === date) {
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

        return { status, rejectionReason };
    };

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

    const organizedTimesheet = organizeTimesheetByType(developmentTimeSheet, development_options);

    // Filter out already used types for the new row dropdown
    const availableTypesForNewRow = development_options.filter(option => {
        return !Object.keys(organizedTimesheet).includes(option.value);
    });

    const addNewDevelopmentRow = () => {
        if (selectedType) {
            setDevelopmentTimeSheet(prevState => [
                ...prevState,
                {
                    development_hour_day_id: crypto.randomUUID(),
                    work_day: "", // This will be filled later by the user
                    display_date: "",
                    hours_worked: 0,
                    status: "Submitted",
                    rejection_reason: null,
                    type: selectedType
                }
            ]);
            setSelectedType(""); // Reset the selected type after adding
        }
    };

    return (
        <div className="w-fit mob:w-full tablet:w-full mob:space-y-7 tablet:space-y-7 lap:text-sm overflow-hidden desk:border lap:border rounded-lg">
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
            <div className="flex">
                <div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200">
                    Non Billable Hours
                </div>
                <div className="flex flex-col">
                    {Object.keys(organizedTimesheet).map((key_name) => (
                        <DevelopmentSection
                            key={key_name}
                            development_items={organizedTimesheet[key_name]}
                            type={key_name}
                            isNewRow={false}
                            weekDays={weekDays}
                            handleInputChange={handleInputChange}
                            getStatusForDay={getStatusForDay}
                            handleTypeChange={handleTypeChange}
                        />
                    ))}
                    {/* Add Button */}
                    <div className="mt-2">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="" disabled>Select Type</option>
                            {availableTypesForNewRow.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => addNewDevelopmentRow("Research")}
                            className="p-2 mt-2 bg-blue-500 text-white rounded"
                        >
                            Add Proposals Row
                        </button>
                    </div>
                </div>
            </div>
            <DayStatus
                weekDays={weekDays}
                getStatusForDay={getStatusForDay}
            />
            <TimeSheetFooter
                weekDays={weekDays}
                calculateTotalHours={calculateTotalHours}
                calculateTotalWeekHours={calculateTotalWeekHours}
            />
        </div>
    );
}

export default TimeSheet;
