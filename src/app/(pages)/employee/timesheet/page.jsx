import StatTile from "@/app/components/StatTile"
import TimeSheet from "@/app/components/Timesheet/TimeSheet";
import RangePickerCalendar from "@/app/components/custom/RangePickerCalendar";

import { getEmployeeAssignments } from "@/utilities/employee/employee-utils"
import React from "react";


async function TimeSheetPage() {

    const timesheet_data = await getEmployeeAssignments()

    console.log(JSON.stringify(timesheet_data))
    // const timesheet_data = [
    //     {
    //         "project_id": 31,
    //         "code": "BASELINE_TEST_961_2024",
    //         "title": "BASELINE_TEST",
    //         "first_name": "Juliano",
    //         "last_name": "Gharzeddine",
    //         "position_name": "Software Developer",
    //         "phases": [
    //             {
    //                 "phase_id": 129,
    //                 "phase_name": "Planning",
    //                 "phase_assignee_id": 78,
    //                 "work_done_hrs": 0,
    //                 "expected_work_hrs": 60,
    //                 "assignments": [
    //                     {
    //                         "employee_work_day_id": 1,
    //                         "work_day": "2024-08-19",
    //                         "display_date": "19 August 2024",
    //                         "hours_worked": 5
    //                     },
    //                     {
    //                         "employee_work_day_id": 2,
    //                         "work_day": "2024-08-20",
    //                         "display_date": "20 August 2024",
    //                         "hours_worked": 4
    //                     },
    //                     {
    //                         "employee_work_day_id": 3,
    //                         "work_day": "2024-08-21",
    //                         "display_date": "21 August 2024",
    //                         "hours_worked": 3
    //                     },
    //                     {
    //                         "employee_work_day_id": 4,
    //                         "work_day": "2024-08-22",
    //                         "display_date": "22 August 2024",
    //                         "hours_worked": 2
    //                     },
    //                     {
    //                         "employee_work_day_id": 5,
    //                         "work_day": "2024-08-23",
    //                         "display_date": "23 August 2024",
    //                         "hours_worked": 1
    //                     }
    //                 ]
    //             },
    //             {
    //                 "phase_id": 130,
    //                 "phase_name": "Design",
    //                 "phase_assignee_id": 79,
    //                 "work_done_hrs": 0,
    //                 "expected_work_hrs": 40,
    //                 "assignments": [
    //                     {
    //                         "employee_work_day_id": 6,
    //                         "work_day": "2024-08-19",
    //                         "display_date": "19 August 2024",
    //                         "hours_worked": 6
    //                     },
    //                     {
    //                         "employee_work_day_id": 7,
    //                         "work_day": "2024-08-21",
    //                         "display_date": "21 August 2024",
    //                         "hours_worked": 7
    //                     },
    //                     {
    //                         "employee_work_day_id": 8,
    //                         "work_day": "2024-08-23",
    //                         "display_date": "23 August 2024",
    //                         "hours_worked": 8
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "project_id": 32,
    //         "code": "DEVOPS_MIGRATION_2024",
    //         "title": "DEVOPS MIGRATION",
    //         "first_name": "Juliano",
    //         "last_name": "Gharzeddine",
    //         "position_name": "Software Developer",
    //         "phases": [
    //             {
    //                 "phase_id": 131,
    //                 "phase_name": "Implementation",
    //                 "phase_assignee_id": 80,
    //                 "work_done_hrs": 0,
    //                 "expected_work_hrs": 50,
    //                 "assignments": [
    //                     {
    //                         "employee_work_day_id": 9,
    //                         "work_day": "2024-08-19",
    //                         "display_date": "19 August 2024",
    //                         "hours_worked": 4
    //                     },
    //                     {
    //                         "employee_work_day_id": 10,
    //                         "work_day": "2024-08-20",
    //                         "display_date": "20 August 2024",
    //                         "hours_worked": 5
    //                     },
    //                     {
    //                         "employee_work_day_id": 11,
    //                         "work_day": "2024-08-22",
    //                         "display_date": "22 August 2024",
    //                         "hours_worked": 6
    //                     }
    //                 ]
    //             },
    //             {
    //                 "phase_id": 132,
    //                 "phase_name": "Testing",
    //                 "phase_assignee_id": 81,
    //                 "work_done_hrs": 0,
    //                 "expected_work_hrs": 20,
    //                 "assignments": [
    //                     {
    //                         "employee_work_day_id": 12,
    //                         "work_day": "2024-08-20",
    //                         "display_date": "20 August 2024",
    //                         "hours_worked": 2
    //                     },
    //                     {
    //                         "employee_work_day_id": 13,
    //                         "work_day": "2024-08-21",
    //                         "display_date": "21 August 2024",
    //                         "hours_worked": 3
    //                     },
    //                     {
    //                         "employee_work_day_id": 14,
    //                         "work_day": "2024-08-23",
    //                         "display_date": "23 August 2024",
    //                         "hours_worked": 4
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "project_id": 33,
    //         "code": "AI_INTEGRATION_2024",
    //         "title": "AI INTEGRATION",
    //         "first_name": "Juliano",
    //         "last_name": "Gharzeddine",
    //         "position_name": "Software Developer",
    //         "phases": [
    //             {
    //                 "phase_id": 133,
    //                 "phase_name": "Prototyping",
    //                 "phase_assignee_id": 82,
    //                 "work_done_hrs": 0,
    //                 "expected_work_hrs": 30,
    //                 "assignments": [
    //                     {
    //                         "employee_work_day_id": 15,
    //                         "work_day": "2024-08-19",
    //                         "display_date": "19 August 2024",
    //                         "hours_worked": 3
    //                     },
    //                     {
    //                         "employee_work_day_id": 16,
    //                         "work_day": "2024-08-21",
    //                         "display_date": "21 August 2024",
    //                         "hours_worked": 4
    //                     },
    //                     {
    //                         "employee_work_day_id": 17,
    //                         "work_day": "2024-08-22",
    //                         "display_date": "22 August 2024",
    //                         "hours_worked": 5
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];


    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3"> Timesheet</div>
            <div className="flex w-full gap-4 select-none mob:flex-col mob:items-center tab:flex-col tab:items-center">
                <div className="flex gap-x-4">
                    <RangePickerCalendar />
                </div>
                <TimeSheet timesheet_data={timesheet_data} />
            </div>
        </div>

    )
}

export default TimeSheetPage
