import TimeSheet from "@/app/components/timesheet/TimeSheet";
import RangePickerCalendar from "@/app/components/custom/Other/RangePickerCalendar";
import { getEmployeeAssignments, getRejectedAndFinalizedDates } from "@/utilities/timesheet/timesheet-utils";
import { endOfWeek, startOfWeek } from "date-fns";
import React from "react";
import { getLoggedInId } from "@/utilities/auth/auth-utils";
import { formatDate } from "@/utilities/date/date-utils";
import { redirect } from 'next/navigation';

function getWeekStartEnd(date) {
    const week_start = startOfWeek(date, { weekStartsOn: 1 });
    const week_end = endOfWeek(date, { weekStartsOn: 1 });

    return { week_start, week_end };
}

async function TimeSheetPage({ searchParams }) {
    const initiatorId = await getLoggedInId();
    const { start, end } = searchParams;
    const today = new Date();

    let dates_data;
    let allowed_range;

    let start_date;
    let end_date;

    let end_of_current_week = endOfWeek(today, { weekStartsOn: 1 })

    const rejectedAndFinalizedDatesRes = await getRejectedAndFinalizedDates(initiatorId);

    if (rejectedAndFinalizedDatesRes.res) {
        dates_data = rejectedAndFinalizedDatesRes.data;
    }

    const { min_rejected_date, max_finalized_date } = dates_data;
    const first_rejection_range = getWeekStartEnd(min_rejected_date);
    const max_finalized_range = getWeekStartEnd(max_finalized_date);
    const this_week_range = getWeekStartEnd(today);

    allowed_range = first_rejection_range

    if (!!start) {
        start_date = new Date(start);
    } else if (!!min_rejected_date) {
        const { week_start, week_end } = first_rejection_range
        start_date = week_start;
        end_date = week_end;

    } else if (!!max_finalized_date) {
        const { week_start, week_end } = max_finalized_range
        start_date = week_start;
        end_date = week_end;
    } else {
        const { week_start, week_end } = this_week_range
        start_date = week_start;
        end_date = week_end;
    }

    // If end is not provided, use the determined week end
    if (!end) {
        end_date = end_date ?? endOfWeek(start_date, { weekStartsOn: 1 });
    } else {
        end_date = new Date(end);
    }

    // Redirect with computed start and end if not provided in the query string
    if (!start || !end) {
        const redirectUrl = new URL(`http://localhost:3000/employee/timesheet`);
        redirectUrl.searchParams.set("start", formatDate(start_date, "YYYY-MM-DD"));
        redirectUrl.searchParams.set("end", formatDate(end_date, "YYYY-MM-DD"));
        redirect(redirectUrl.toString());
    }

    const timesheet_data = await getEmployeeAssignments(
        formatDate(start_date),
        formatDate(end_date),
        initiatorId
    );


    console.log("ALLOWED RANGE", allowed_range)
    
    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3">
                Timesheet
            </div>
            <div className="flex w-full gap-4 h-fit select-none mob:flex-col mob:items-center tab:flex-col tab:items-center">
                <div className="flex gap-x-4">
                    <RangePickerCalendar
                        maxDate={end_of_current_week}
                        start={start_date}
                        appendToQS
                    />
                </div>
                <TimeSheet
                    timesheet_data={timesheet_data}
                    start={start_date}
                    allowed_range={allowed_range}
                />
            </div>
        </div>
    );
}

export default TimeSheetPage;
