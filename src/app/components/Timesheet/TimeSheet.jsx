"use client"

import React, { useEffect, useState } from "react"
import { startOfWeek, addDays, format } from "date-fns"
import ProjectSection from "./ProjectSection"
import TimeSheetHeader from "./TimeSheetHeader"
import TimeSheetFooter from "./TimeSheetFooter"
import DayStatus from "./DayStatus"
import { isUUID } from "../Sheet/SheetUtils"
import DevelopmentSection from "./DevelopmentSection"

function TimeSheet({ timesheet_data }) {

    const [projectTimeSheet, setProjectTimeSheet] = useState(timesheet_data.project_timesheet);
    const [developmentTimeSheet, setDevelopmentTimeSheet] = useState(timesheet_data.development_timesheet);

    useEffect(() => {
        console.log(projectTimeSheet)
    }, [projectTimeSheet])

    useEffect(() => {
        console.log(developmentTimeSheet)
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

    const handleInputChange = (e, projectIndex, phaseIndex, date, isDevelopment = false) => {
        const { value } = e.target;

        if (isDevelopment) {
            // Handle changes for development_timesheet
            const newDevelopmentTimesheet = [...developmentTimeSheet];

            const assignmentIndex = newDevelopmentTimesheet.findIndex(
                assignment => assignment.work_day === date
            );

            if (assignmentIndex !== -1) {
                // If the assignment exists
                if (value) {
                    // Update the hours worked if the value is not empty
                    newDevelopmentTimesheet[assignmentIndex].hours_worked = value;
                } else {
                    // Remove the assignment if the value is empty
                    newDevelopmentTimesheet.splice(assignmentIndex, 1);
                }
            } else {
                // If the assignment does not exist and value is not empty, add a new assignment
                if (value) {
                    newDevelopmentTimesheet.push({
                        development_hour_day_id: crypto.randomUUID(),
                        work_day: date,
                        display_date: date,
                        hours_worked: value,
                        status: "Submitted", // Add status for new entries
                        rejection_reason: null
                    });
                }
            }

            setDevelopmentTimeSheet(newDevelopmentTimesheet);
        } else {
            // Handle changes for project_timesheet
            const newprojectTimeSheet = [...projectTimeSheet];

            const assignmentIndex = newprojectTimeSheet[projectIndex].phases[phaseIndex].assignments.findIndex(
                assignment => assignment.work_day === date
            );

            if (assignmentIndex !== -1) {
                // If the assignment exists
                if (value) {
                    // Update the hours worked if the value is not empty
                    newprojectTimeSheet[projectIndex].phases[phaseIndex].assignments[assignmentIndex].hours_worked = value;
                } else {
                    // Remove the assignment if the value is empty
                    newprojectTimeSheet[projectIndex].phases[phaseIndex].assignments.splice(assignmentIndex, 1);
                }
            } else {
                // If the assignment does not exist and value is not empty, add a new assignment
                if (value) {
                    newprojectTimeSheet[projectIndex].phases[phaseIndex].assignments.push({
                        employee_work_day_id: crypto.randomUUID(),
                        work_day: date,
                        display_date: date,
                        hours_worked: value
                    });
                }
            }

            setProjectTimeSheet(newprojectTimeSheet);
        }
    };


    const calculateTotalHours = (date) => {
        // Calculate total hours from projectTimeSheet
        const projectHours = projectTimeSheet.reduce((total, project) => {
            return total + project.phases.reduce((phaseTotal, phase) => {
                const assignment = phase.assignments.find(assignment => assignment.work_day === date);
                return phaseTotal + (assignment ? parseFloat(assignment.hours_worked || 0) : 0);
            }, 0);
        }, 0);

        // Calculate total hours from developmentTimesheet
        const developmentHours = developmentTimeSheet.reduce((total, assignment) => {
            return total + (assignment.work_day === date ? parseFloat(assignment.hours_worked || 0) : 0);
        }, 0);

        // Return the sum of both
        return projectHours + developmentHours;
    };

    const calculateTotalWeekHours = () => {
        return weekDays.reduce((total, day) => {
            return total + calculateTotalHours(day.fullDate);
        }, 0);
    };

    const handleTypeChange = (newType, developmentHourDayId) => {
        const newDevelopmentTimesheet = developmentTimeSheet.map(item => {
            if (item.development_hour_day_id === developmentHourDayId) {
                return { ...item, type: newType };
            }
            return item;
        });

        setDevelopmentTimeSheet(newDevelopmentTimesheet);
    };



    const getStatusForDay = (date) => {
        let status = null; // Default to no status
        let rejectionReason = null;

        // Check project_timesheet
        timesheet_data.project_timesheet.forEach((project) => {
            project.phases.forEach((phase) => {
                phase.assignments.forEach((assignment) => {
                    if (assignment.work_day === date) {
                        if (assignment.status === "Rejected") {
                            status = "Rejected"; // Highest priority
                            rejectionReason = assignment.rejection_reason;
                        } else if (assignment.status === "Pending" && status !== "Rejected") {
                            status = "Pending"; // Medium priority
                        } else if (!status || status === "Approved") {
                            status = assignment.status; // Low priority
                        }
                    }
                });
            });
        });

        // Check development_timesheet
        timesheet_data.development_timesheet.forEach((assignment) => {
            if (assignment.work_day === date) {
                if (assignment.status === "Rejected") {
                    status = "Rejected"; // Highest priority
                    rejectionReason = assignment.rejection_reason;
                } else if (assignment.status === "Pending" && status !== "Rejected") {
                    status = "Pending"; // Medium priority
                } else if (!status || status === "Approved") {
                    status = assignment.status; // Low priority
                }
            }
        });

        return { status, rejectionReason };
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
            <DevelopmentSection
                developmentTimesheet={developmentTimeSheet}
                weekDays={weekDays}
                handleInputChange={handleInputChange}
                getStatusForDay={getStatusForDay}
                handleTypeChange={handleTypeChange}
            />
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
