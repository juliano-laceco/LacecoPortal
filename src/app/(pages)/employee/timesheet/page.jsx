import StatTile from "@/app/components/StatTile"
import TimeSheet from "@/app/components/Timesheet/TimeSheet";
import RangePickerCalendar from "@/app/components/custom/RangePickerCalendar";

import { getEmployeeAssignments } from "@/utilities/employee/employee-utils"
import React from "react";


async function TimeSheetPage() {

    const timesheet_data = await getEmployeeAssignments()

    console.log(JSON.stringify(timesheet_data))


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
