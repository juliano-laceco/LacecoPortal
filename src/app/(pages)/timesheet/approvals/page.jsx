import RangePickerCalendar from "@/app/components/custom/Other/RangePickerCalendar";
import { getEmployeeAssignments, getRejectedAndFinalizedDates } from "@/utilities/timesheet-utils";
import { endOfWeek, startOfWeek } from "date-fns";
import React from "react";
import { formatDate } from "@/utilities/date/date-utils";
import { redirect } from 'next/navigation';
import TimeSheet from "@/app/components/timesheet/TimeSheet";
import { getSession } from "@/utilities/auth/auth-utils";
import { checkEmployeeDiscipline } from "@/utilities/employee/employee-utils";
import { headers } from 'next/headers'; // Import headers from Next.js
import TitleComponent from "@/app/components/custom/Other/TitleComponent";

// Helper to get start and end dates of a week
function getWeekStartEnd(date) {
    return {
        week_start: startOfWeek(date, { weekStartsOn: 1 }),
        week_end: endOfWeek(date, { weekStartsOn: 1 })
    };
}

// Handle cases when employee is not provided or user doesn't have access
function renderError(message) {
    return (
        <div className="space-y-4">
            <div className="w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3">
                Timesheet
            </div>
            <div className="p-5 text-lg text-red-500">{message}</div>
        </div>
    );
}

// Redirect to the given start/end and employee_id in the query params
function redirectToWeek(start_date, end_date, employee_id) {
    // Get the current headers to extract the host and protocol
    const currentHeaders = headers();
    const host = currentHeaders.get('host');
    const protocol = currentHeaders.get('x-forwarded-proto') || 'http'; // Fallback to 'http' if protocol is not provided

    // Build the base URL pointing directly to `/timesheet/approvals`
    const baseUrl = `${protocol}://${host}/timesheet/approvals`; // Always redirect to /hod/approvals

    // Build the redirect URL with query parameters
    const redirectUrl = new URL(baseUrl);
    redirectUrl.searchParams.set("start", formatDate(start_date));
    redirectUrl.searchParams.set("end", formatDate(end_date));
    redirectUrl.searchParams.set("employee_id", employee_id);

    redirect(redirectUrl.toString()); // Perform the redirection
}


// Fetch week range based on finalized or current week
function getStartEndDates(max_finalized_date, today) {
    if (max_finalized_date) {
        const maxFinalizedWeek = getWeekStartEnd(new Date(max_finalized_date));
        return [maxFinalizedWeek.week_start, maxFinalizedWeek.week_end];
    }
    const currentWeek = getWeekStartEnd(today);
    return [currentWeek.week_start, currentWeek.week_end];
}

async function TimeSheetViewPage({ searchParams }) {
    const today = new Date();
    const { start, end, employee_id } = searchParams;

    // Step 1: Validate if employee_id is provided
    if (!employee_id) {
        return renderError("Missing Employee ID parameter");
    }

    // Step 2: Get session and check if user is HoD with the correct discipline access
    const session = await getSession();
    const role = session?.user?.role_name;


    if (role === "HoD") {
        const disciplines = role === "HoD" ? session?.user?.disciplines : [];
        const { belongsToDiscipline } = await checkEmployeeDiscipline(disciplines);
        if (!belongsToDiscipline) {
            return renderError("You do not have the right to edit or view this employee's timesheet");
        }
    }


    // Step 3: Handle start and end date based on query params or max_finalized_date
    let start_date, end_date;
    const rejectedAndFinalizedDatesRes = await getRejectedAndFinalizedDates(employee_id);
    const { max_finalized_date } = rejectedAndFinalizedDatesRes?.data || {};

    if (start && end) {
        // Use the provided start and end dates from query parameters
        start_date = new Date(start);
        end_date = new Date(end);
    } else {
        // If no start/end, use max_finalized_date or current week as fallback
        [start_date, end_date] = getStartEndDates(max_finalized_date, today);
        redirectToWeek(start_date, end_date, employee_id);
    }

    // Step 4: Fetch timesheet data
    const timesheet_data = await getEmployeeAssignments(formatDate(start_date), formatDate(end_date), employee_id);

    // Step 5: Render Timesheet Page
    return (
        <div className="space-y-4">
            <TitleComponent>
                Timesheet - {timesheet_data.employee.first_name} {timesheet_data.employee.last_name}
            </TitleComponent>
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

export default TimeSheetViewPage;
