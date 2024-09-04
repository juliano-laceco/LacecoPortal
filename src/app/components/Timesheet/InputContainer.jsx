import React from "react";
import { differenceInCalendarDays } from "date-fns";

function InputContainer({ day, assignment, handleInputChange, projectIndex, phaseIndex, dayStatus, isDevelopment, developmentId, type, isActive }) {
    const hoursWorked = assignment ? assignment.hours_worked : '';
    const statusDisabled = dayStatus === "Approved" || dayStatus === "Pending";

    const today = new Date();
    const dayDate = new Date(day.fullDate);
    const daysDifference = differenceInCalendarDays(today, dayDate);

    const isDateEnabled = daysDifference <= 1; // Enabled if today or yesterday

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
            title={statusDisabled ? (dayStatus === "Approved" ? "Submission for this day is approved. Unable to modify." : "You have already made a submission for this day and you must await your HoD's response.") : ""}
        >
            <input
                className={`arrowless-input text-center w-full h-full border-0 focus:border focus:border-pric focus:ring-0 disabled:bg-zinc-100 disabled:cursor-not-allowed ${dayStatus === "Rejected" ? "bg-red-100" : ""}`}
                type="number"
                disabled={!isDateEnabled || !isActive || statusDisabled }
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
