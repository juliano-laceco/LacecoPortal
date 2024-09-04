import TimeSheet from "@/app/components/Timesheet/TimeSheet";
import RangePickerCalendar from "@/app/components/custom/RangePickerCalendar";
import { getEmployeeAssignments } from "@/utilities/timesheet-utils";
import { endOfWeek, startOfWeek } from "date-fns";
import React from "react";

async function TimeSheetPage({ searchParams }) {
    const { start, end } = searchParams;
    const timesheet_data = await getEmployeeAssignments(start, end);

    // If start is not provided, default to the current week
    const parsedStart = start ? new Date(start) : new Date();
    const startWeek = startOfWeek(parsedStart, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3">
                Timesheet
            </div>
            <div className="flex w-full gap-4 h-fit select-none mob:flex-col mob:items-center tab:flex-col tab:items-center">
                <div className="flex gap-x-4">
                    <RangePickerCalendar maxDate={endOfCurrentWeek} start={startWeek} appendToQS />
                </div>
                <TimeSheet timesheet_data={timesheet_data} />
            </div>
        </div>
    );
}

export default TimeSheetPage;
