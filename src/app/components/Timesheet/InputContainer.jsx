import React from "react";
import { differenceInCalendarDays } from "date-fns";

function InputContainer({ day, assignment, handleInputChange, projectIndex, phaseIndex, dayStatus, isDevelopment, developmentId, type, isActive }) {
    const hoursWorked = assignment ? assignment.hours_worked : '';

    const today = new Date();
    const dayDate = new Date(day.fullDate);
    const daysDifference = differenceInCalendarDays(today, dayDate);

    // Enabled if today or yesterday and not a future date
    const isDateEnabled = daysDifference <= 1 && daysDifference >= 0;

    // Determine if the input should be disabled, except when the dayStatus is "Rejected"
    const shouldDisableInput =
        dayStatus !== "Rejected" &&
        (!isDateEnabled || !isActive || dayStatus === "Approved" || dayStatus === "Pending" || dayStatus === "Non Working" || dayStatus === "New Non Working");

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
            title={shouldDisableInput ? (dayStatus === "Approved" ? "Submission for this day is approved. Unable to modify." : dayStatus === "Pending" ? "You have already made a submission for this day and you must await your HoD's response." : "") : ""}
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
