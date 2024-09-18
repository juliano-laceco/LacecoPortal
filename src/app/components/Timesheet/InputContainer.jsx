import React from "react";
import { startOfWeek } from "date-fns";

function InputContainer({ day, assignment, handleInputChange, projectIndex, phaseIndex, dayStatus, isDevelopment, developmentId, type, isActive, allowed_range }) {

    const hoursWorked = assignment ? assignment.hours_worked : '';

    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Start of this week
    const dayDate = new Date(day.fullDate);

    // Determine if the day is within the allowed range
    const isWithinAllowedRange = allowed_range && allowed_range.week_start && allowed_range.week_end
        ? dayDate >= new Date(allowed_range.week_start) && dayDate <= new Date(allowed_range.week_end)
        : true;

    // Determine if the date is enabled (not a future date and within allowed range)
    let isDateEnabled = isWithinAllowedRange && dayDate <= today;

    // Additional check if the date is in the current week, only enable days from the start of this week until today
    if (isWithinAllowedRange && dayDate >= startOfCurrentWeek && dayDate <= today) {
        isDateEnabled = true;
    } else if (dayDate > today) {
        isDateEnabled = false; // Disable future dates
    }

    // Determine if the input should be disabled based on the status and whether it's within the allowed range
    const shouldDisableInput =
        (dayStatus !== "Rejected") &&
        (!isDateEnabled || (!isDevelopment && !isActive) || dayStatus === "Approved" || dayStatus === "Pending" || dayStatus === "Non Working" || dayStatus === "New Non Working");

    const handleChange = (e) => {
        const { value } = e.target;

        // Allow empty value and reset the input
        if (value === "" || (/^[1-9]\d*$/.test(value) && parseInt(value, 10) <= 16)) {
            handleInputChange(e, projectIndex, phaseIndex, day.fullDate, isDevelopment, developmentId, type);
        }
    };

    return (
        <div
            className={`relative flex-1 text-center h-full border border-gray-200 mob:p-0 tablet:p-0 bg-white`}
            title={shouldDisableInput ? (dayStatus === "Approved" ? "Submission for this day is approved. Unable to modify." : dayStatus === "Pending" ? "You have already made a submission for this day and you must await your HoD's response." : (dayStatus === "New Non Working") ? "This is a non working day." : "Not Allowed.") : ""}
        >
            <input
                className={`arrowless-input text-center w-full h-full border-0 focus:border focus:border-pric focus:ring-0 disabled:bg-zinc-100 disabled:cursor-not-allowed ${dayStatus === "Rejected" ? "bg-red-100" : ""}`}
                type="number"
                disabled={shouldDisableInput}
                min="0"
                max="24"
                value={hoursWorked}
                onChange={handleChange}
                data-date={day.fullDate}
            />
        </div>
    );
}

export default InputContainer;
