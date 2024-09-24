// DayType.js
import React, { useContext } from "react";
import { TimeSheetContext } from "./TimeSheetContext";

function DayType() {
    const { weekDays, getStatusForDay } = useContext(TimeSheetContext);

    return (
        <div className="flex font-bold mob:flex-col tablet:flex-col w-full">
            <div className="p-1 border-t flex justify-center items-start desk:min-w-[26rem] desk:max-w-[26rem] lap:min-w-[18rem] lap:max-w-[18rem] mob:bg-pric tablet:bg-pric mob:justify-start tablet:justify-start mob:text-white tablet:text-white mob:p-4 tablet:p-4 desk:invisible lap:invisible">
                Day Type
            </div>
            <div className="flex lap:hidden desk:hidden bg-gray-200">
                {weekDays.map((day, i) => (
                    <div
                        key={i}
                        className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm"
                    >
                        {day.dayOfWeek}
                    </div>
                ))}
            </div>
            <div className="flex flex-1 w-full">
                {weekDays.map((day, i) => {
                    const { status, non_working } = getStatusForDay(day.fullDate);

                    const displayText =
                        non_working === true || status === "New Non Working"
                            ? "OFF"
                            : "";

                    return (
                        <div
                            key={i}
                            className="w-full flex flex-col items-center justify-center "
                        >
                            <div className={`text-center text-white text-xs flex justify-center font-normal items-center p-1 h-full w-full ${non_working === true || status === "New Non Working" ? "bg-gray-400" : ""}`}>{displayText}</div>
                        </div>
                    );
                })}
            </div>
            <div className="text-center p-4 flex-1 desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28"></div>
        </div>
    );
}

export default DayType;
