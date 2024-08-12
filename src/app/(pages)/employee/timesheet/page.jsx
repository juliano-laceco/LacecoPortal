import StatTile from "@/app/components/StatTile"
import RangePickerCalendar from "@/app/components/custom/RangePickerCalendar";

import { getEmployeeAssignments } from "@/utilities/employee/employee-utils"
import React from "react";


async function TimeSheetPage() {

    const timesheet_data = await getEmployeeAssignments()

    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3"> Timesheet</div>
            <div className="flex flex-wrap gap-4 select-none">
                <div className="flex gap-x-4">
                    <RangePickerCalendar />
                </div>
                <StatTile data={{ val: 3, label: "Projects" }} shadow />
                <StatTile data={{ val: 190, label: "Required Hrs" }} shadow />
                <StatTile data={{ val: 81, label: "Worked Hrs" }} shadow />

            </div>
        </div>

    )
}

export default TimeSheetPage
