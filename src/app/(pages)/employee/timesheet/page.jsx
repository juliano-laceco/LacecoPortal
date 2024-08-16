import StatTile from "@/app/components/StatTile"
import TimeSheet from "@/app/components/Timesheet/TimeSheet";
import RangePickerCalendar from "@/app/components/custom/RangePickerCalendar";

import { getEmployeeAssignments } from "@/utilities/employee/employee-utils"
import React from "react";


async function TimeSheetPage() {

    // const timesheet_data = await getEmployeeAssignments()
    const timesheet_data = [
        {
            "project_id": 31,
            "code": "BASELINE_TEST_961_2024",
            "title": "BASELINE_TEST",
            "first_name": "Juliano",
            "last_name": "Gharzeddine",
            "position_name": "Software Developer",
            "phases": [
                {
                    "phase_id": 129,
                    "phase_name": "Building Permit",
                    "phase_assignee_id": 78,
                    "work_done_hrs": 0,
                    "expected_work_hrs": 60,
                    "assignments": [
                        {
                            "employee_work_day_id": 1,
                            "work_day": "2024-08-07",
                            "display_date": "07 August 2024",
                            "hours_worked": 5
                        }
                    ]
                }
            ]
        },
        {
            "project_id": 32,
            "code": "BASELINE_TEST_961_2024",
            "title": "BASELINE_TEST",
            "first_name": "Juliano",
            "last_name": "Gharzeddine",
            "position_name": "Software Developer",
            "phases": [
                {
                    "phase_id": 129,
                    "phase_name": "Building Permit",
                    "phase_assignee_id": 78,
                    "work_done_hrs": 0,
                    "expected_work_hrs": 60,
                    "assignments": [
                        {
                            "employee_work_day_id": 1,
                            "work_day": "2024-08-07",
                            "display_date": "07 August 2024",
                            "hours_worked": 5
                        }
                    ]
                }
            ]
        }
    ]
    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3"> Timesheet</div>
            <div className="flex w-full gap-4 select-none">
                <div className="flex gap-x-4">
                    <RangePickerCalendar />
                </div>
                <TimeSheet timesheet_data={timesheet_data} />
            </div>
        </div>

    )
}

export default TimeSheetPage
