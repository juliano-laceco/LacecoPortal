import RangePickerCalendar from "@/app/components/custom/Other/RangePickerCalendar";
import { getEmployeeAssignments, getRejectedAndFinalizedDates } from "@/utilities/timesheet/timesheet-utils";
import { endOfWeek, startOfWeek, eachDayOfInterval, format } from "date-fns";
import React from "react";
import { getLoggedInId } from "@/utilities/auth/auth-utils";
import { formatDate } from "@/utilities/date/date-utils";
import { redirect } from 'next/navigation';
import TimeSheet from "@/app/components/timesheet/TimeSheet";

function getWeekStartEnd(date) {
    return {
        week_start: startOfWeek(date, { weekStartsOn: 1 }),
        week_end: endOfWeek(date, { weekStartsOn: 1 })
    };
}

async function TimeSheetViewPage({ searchParams }) {
    const initiatorId = await getLoggedInId();
    const today = new Date();

    const { start, end } = searchParams;
    const rejectedAndFinalizedDatesRes = await getRejectedAndFinalizedDates(initiatorId);
    const dates_data = rejectedAndFinalizedDatesRes?.data || {};

    const { max_finalized_date } = dates_data;

    let start_date;
    let end_date;

    if (start && end) {
        // Use the provided start and end dates from query parameters
        start_date = new Date(start);
        end_date = new Date(end);
    } else if (max_finalized_date) {
        // If max_finalized_date is available, set start and end to its week
        const maxFinalizedWeek = getWeekStartEnd(new Date(max_finalized_date));
        start_date = maxFinalizedWeek.week_start;
        end_date = maxFinalizedWeek.week_end;

        // Redirect to include start and end in the query parameters
        const redirectUrl = new URL("http://localhost:3000/hod");
        redirectUrl.searchParams.set("start", formatDate(start_date));
        redirectUrl.searchParams.set("end", formatDate(end_date));
        redirect(redirectUrl.toString());
    } else {
        // If no start/end and no max_finalized_date, do nothing (or handle as needed)
        return (
            <div className="space-y-4">
                <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3">
                    Timesheet
                </div>
                <div className="p-5 text-lg">
                    No date range specified and no finalized date available.
                </div>
            </div>
        );
    }

    // Fetch timesheet data
    const timesheet_data = await getEmployeeAssignments(
        formatDate(start_date),
        formatDate(end_date),
        1
    );

    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3">
                Timesheet
            </div>
            <div className="flex w-full gap-4 h-fit select-none mob:flex-col mob:items-center tab:flex-col tab:items-center">
                <div className="flex gap-x-4">
                    <RangePickerCalendar
                        maxDate={endOfWeek(today, { weekStartsOn: 1 })}
                        start={start_date}
                        appendToQS
                    />
                </div>
                <TimeSheet
                    timesheet_data={timesheet_data}
                    start={start_date}
                    end={end_date}
                    allowed_range={null}
                    is_readonly
                />
            </div>
        </div>
    );
}

function determineWeekStatus(start, end, timesheet_data) {
    const days = eachDayOfInterval({ start, end });

    const isDayFinalized = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        const nonWorkingDay = timesheet_data.non_working.find(nwd => nwd.date === formattedDate);
        if (nonWorkingDay) return true;

        return timesheet_data.project_timesheet.some(project =>
            project.phases.some(phase =>
                phase.assignments.some(assignment =>
                    assignment.work_day === formattedDate && ["Pending", "Approved", "Non Working"].includes(assignment.status)
                )
            )
        ) || timesheet_data.development_timesheet.some(development =>
            development.work_day === formattedDate && ["Pending", "Approved", "Non Working"].includes(development.status)
        );
    };

    return days.every(isDayFinalized);
}

export default TimeSheetViewPage;
