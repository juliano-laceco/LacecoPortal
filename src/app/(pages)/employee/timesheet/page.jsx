
import RangePickerCalendar from "@/app/components/custom/Other/RangePickerCalendar";
import { getEmployeeAssignments, getRejectedAndFinalizedDates } from "@/utilities/timesheet-utils";
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

function determineAllowedRange(min_rejected_date, max_finalized_date, is_week_finalized) {
    if (min_rejected_date) {
        return getWeekStartEnd(min_rejected_date);
    } else if (max_finalized_date) {
        const max_finalized_range = getWeekStartEnd(max_finalized_date);
        if (is_week_finalized) {
            const next_week_start_date = new Date(max_finalized_range.week_start);
            next_week_start_date.setDate(next_week_start_date.getDate() + 7); // Push by one week
            return getWeekStartEnd(next_week_start_date);
        } else {
            return max_finalized_range;
        }
    }
    return null;
}

async function TimeSheetPage({ searchParams }) {
    const initiatorId = await getLoggedInId();
    const today = new Date();

    const { start, end } = searchParams;
    const rejectedAndFinalizedDatesRes = await getRejectedAndFinalizedDates(initiatorId);
    const dates_data = rejectedAndFinalizedDatesRes?.data || {};

    const { min_rejected_date, max_finalized_date, is_week_finalized } = dates_data;

    const this_week_range = getWeekStartEnd(today);
    const start_date = start ? new Date(start) : min_rejected_date ? min_rejected_date : max_finalized_date || this_week_range.week_start;
    const end_date = end ? new Date(end) : endOfWeek(start_date, { weekStartsOn: 1 });

    if (!start || !end) {
        const redirectUrl = new URL("http://localhost:3000/employee/timesheet");
        redirectUrl.searchParams.set("start", formatDate(start_date));
        redirectUrl.searchParams.set("end", formatDate(end_date));
        redirect(redirectUrl.toString());
    }

    const timesheet_data = await getEmployeeAssignments(
        formatDate(start_date),
        formatDate(end_date),
        initiatorId
    );

    const allowed_range = determineAllowedRange(min_rejected_date, max_finalized_date, is_week_finalized);

    const isWeekFinalized = determineWeekStatus(start_date, end_date, timesheet_data);

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
                        isWeekFinalized={isWeekFinalized}
                        appendToQS
                    />
                </div>
                    <TimeSheet
                        timesheet_data={timesheet_data}
                        start={start_date}
                        end={end_date}
                        allowed_range={allowed_range}
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

export default TimeSheetPage;
