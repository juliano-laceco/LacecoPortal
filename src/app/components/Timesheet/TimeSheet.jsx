"use client"

import React, { useEffect, useState } from "react"
import { startOfWeek, addDays, format } from "date-fns"
import ProjectSection from "./ProjectSection"
import TimeSheetHeader from "./TimeSheetHeader"
import TimeSheetFooter from "./TimeSheetFooter"
import DayStatus from "./DayStatus"

function TimeSheet({ timesheet_data }) {

    const [timesheetData, setTimesheetData] = useState(timesheet_data);


    useEffect(() => {
        console.log(timesheetData)
    }, [timesheetData])
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

    const handleInputChange = (e, projectIndex, phaseIndex, date) => {
        const { value } = e.target;
        const newTimesheetData = [...timesheetData];

        const assignment = newTimesheetData[projectIndex].phases[phaseIndex].assignments.find(assignment => assignment.work_day === date);

        if (assignment) {
            assignment.hours_worked = value;
        } else {
            newTimesheetData[projectIndex].phases[phaseIndex].assignments.push({
                employee_work_day_id: crypto.randomUUID(),
                work_day: date,
                display_date: date,
                hours_worked: value
            });
        }

        setTimesheetData(newTimesheetData);
    };

    const calculateTotalHours = (date) => {
        return timesheetData.reduce((total, project) => {
            return total + project.phases.reduce((phaseTotal, phase) => {
                const assignment = phase.assignments.find(assignment => assignment.work_day === date);
                return phaseTotal + (assignment ? parseFloat(assignment.hours_worked || 0) : 0);
            }, 0);
        }, 0);
    };

    const calculateTotalWeekHours = () => {
        return weekDays.reduce((total, day) => {
            return total + calculateTotalHours(day.fullDate);
        }, 0);
    };

    const getStatusForDay = (date) => {
        let status = null; // Default to no status
        let rejectionReason = null;

        timesheet_data.forEach((project) => {
            project.phases.forEach((phase) => {
                phase.assignments.forEach((assignment) => {
                    if (assignment.work_day === date) {
                        if (assignment.status === "Rejected") {
                            status = "Rejected"; // Highest priority
                            rejectionReason = assignment.rejection_reason
                        } else if (assignment.status === "Pending" && status !== "Rejected") {
                            status = "Pending"; // Medium priority
                        } else {
                            status = assignment.status; // Low priority
                        }
                    }
                });
            });
        });

        return { status, rejectionReason };
    };

    return (
        <div className="w-fit mob:w-full tablet:w-full mob:space-y-7 tablet:space-y-7 lap:text-sm overflow-hidden desk:border lap:border rounded-lg">
            <TimeSheetHeader weekDays={weekDays} />
            {timesheetData.map((project, projectIndex) => (
                <ProjectSection
                    key={project.project_id}
                    project={project}
                    projectIndex={projectIndex}
                    weekDays={weekDays}
                    handleInputChange={handleInputChange}
                    getStatusForDay={getStatusForDay}
                />
            ))}
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
