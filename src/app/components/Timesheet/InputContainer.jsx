function InputContainer({ day, assignment, handleInputChange, projectIndex, phaseIndex, dayStatus }) {

    const hoursWorked = assignment ? assignment.hours_worked : '';


    const isDisabled = dayStatus === "Approved" || dayStatus === "Pending";



    return (
        <div
            className={`relative flex-1 text-center h-full border border-gray-200 mob:p-0 tablet:p-0 bg-white`}
            title={isDisabled ? (dayStatus === "Approved" ? "Submission for this day is approved. Unable to modify." : "You have already made a submission for this day and you must await your HoD's response.") : ""}
        >
            <input
                className={`arrowless-input text-center w-full h-full border-0 focus:border focus:border-pric focus:ring-0 disabled:bg-zinc-100 disabled:cursor-not-allowed ${dayStatus === "Rejected" ? "bg-red-100" : ""}`}
                type="number"
                disabled={isDisabled}
                min="0"
                max="24"
                value={hoursWorked}
                onChange={(e) => {
                    const { value } = e.target;

                    // Allow empty value
                    if (value === "") {
                        handleInputChange(e, projectIndex, phaseIndex, day.fullDate);
                    }

                    // Ensure the value is a number and does not start with 0
                    if (/^[1-9]\d*$/.test(value) && parseInt(value, 10) <= 12) {
                        handleInputChange(e, projectIndex, phaseIndex, day.fullDate);
                    }
                }}
                data-date={day.fullDate}
            />



        </div>
    );
}

export default InputContainer;
