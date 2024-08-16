"use client"

import React, { useEffect, useState } from "react"
import { startOfWeek, addDays, format } from "date-fns"
import { formatDate } from "@/utilities/date/date-utils"
import ProjectSection from "./ProjectSection"
import DevelopmentSection from "./DevelopmentSection"

function TimeSheet({ timesheet_data }) {
    const [timesheetData, setTimesheetData] = useState(timesheet_data);

    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 });

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = addDays(startDate, i);
        return {
            day: format(day, 'd'),
            dayOfWeek: format(day, 'E'),
            fullDate: formatDate(day),
        };
    });


    useEffect(() => {
        console.log(timesheetData)
    }, [timesheetData])
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

    return (
        <div className="w-full">
            
            {timesheetData.map((project, projectIndex) => (
                <ProjectSection
                    key={project.project_id}
                    project={project}
                    projectIndex={projectIndex}
                    weekDays={weekDays}
                    handleInputChange={handleInputChange}
                />
            ))}
            <DevelopmentSection weekDays={weekDays} />
        </div>
    );
}

export default TimeSheet;
