import React from "react";
import Image from "next/image";
import { isBefore, isToday } from "date-fns";

function DayStatus({ weekDays, getStatusForDay, openModal, addNonWorkingDay, removeNonWorkingDay, allowed_range }) {
    const today = new Date();

    return (
        <div className="flex font-bold mob:flex-col tablet:flex-col w-full">
            <div className="p-4 border-t flex justify-center items-center desk:min-w-[26rem] desk:max-w-[26rem] lap:min-w-[18rem] lap:max-w-[18rem] mob:bg-pric tablet:bg-pric mob:justify-start tablet:justify-start mob:text-white tablet:text-white">
                Day Approval Status
            </div>
            <div className="flex lap:hidden desk:hidden bg-gray-200">
                {weekDays.map((day, i) => (
                    <div key={i} className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm">
                        {day.dayOfWeek}
                    </div>
                ))}
            </div>
            <div className="flex flex-1 w-full">
                {weekDays.map((day, i) => {
                    const { status, rejectionReason, has_data } = getStatusForDay(day.fullDate);
                    let statusClass;
                    let statusText;
                    let statusImg;

                    const dayDate = new Date(day.fullDate);
                    const isPastOrToday = isBefore(dayDate, today) || isToday(dayDate);

                    // Determine if the day is within the allowed range
                    const isWithinAllowedRange = allowed_range && allowed_range.week_start && allowed_range.week_end
                        ? dayDate >= new Date(allowed_range.week_start) && dayDate <= new Date(allowed_range.week_end)
                        : true;
                    const isButtonDisabled = !isPastOrToday || !isWithinAllowedRange;

                    switch (status) {
                        case "Rejected":
                            statusClass = "bg-red-100 border border-red-400 text-red-400";
                            statusText = "Rejected";
                            break;
                        case "Pending":
                            statusClass = "bg-orange-100 border border-orange-400 text-orange-400";
                            statusText = "Pending";
                            break;
                        case "Approved":
                            statusClass = "bg-green-100 border border-green-400 text-green-400";
                            statusText = "Approved";
                            break;
                        case "Non Working":
                            statusClass = "bg-red-100 border border-red-400 text-red-400";
                            statusText = "OFF";
                            break;
                        case "New Non Working":
                            statusClass = "bg-red-100 border border-red-400 text-red-400";
                            statusText = (
                                <button
                                    onClick={() => removeNonWorkingDay(day.fullDate)}
                                >
                                    Unset OFF
                                </button>
                            );
                            break;
                        default:
                            statusClass = `bg-pric border border-red-500 text-white ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-pri-hovc duration-200 ease"}`;

                            statusText = (
                                !has_data && isPastOrToday ?
                                    <button
                                        onClick={() => addNonWorkingDay(day.fullDate)}
                                        disabled={isButtonDisabled}
                                        className="h-full w-full"
                                    >
                                        Set OFF
                                    </button>
                                    :
                                    ""
                            );
                            break;
                    }

                    statusImg = statusText && typeof statusText === 'string' ? statusText.toLowerCase() + "-icon.svg" : null;

                    return (
                        <div className="w-full">

                            <div
                                key={i}
                                className={`text-center border-t flex-1 flex flex-col justify-center items-center relative group mob:p-1 tablet:p-1 ${!statusText ? "p-0 border-t" : ""}`}
                            >
                                <>
                                    {statusText && (
                                        <div className={`rounded-md font-normal px-2 py-1 w-[95%] text-xs ${statusClass} mob:hidden tablet:hidden`}>
                                            {statusText}
                                        </div>
                                    )}
                                    {!!rejectionReason && rejectionReason !== "" && (
                                        <div
                                            className="absolute bottom-0 h-0 flex justify-center items-center w-full transform bg-red-200 border border-gray-200 p-1 text-[12px] font-normal shadow-lg opacity-0 transition-all duration-200 ease-in-out cursor-pointer text-red-500 lap:group-hover:opacity-100 lap:group-hover:h-full lap:group-hover:translate-y-0 desk:group-hover:opacity-100 desk:group-hover:h-full desk:group-hover:translate-y-0 mob:hidden tablet:hidden"
                                            onClick={() => openModal(rejectionReason, "Rejection Reason")}
                                        >
                                            Reason
                                        </div>
                                    )}
                                    <div className={`flex justify-center items-center rounded-md font-normal px-2 py-1 w-[90%] text-center text-xs ${statusClass} desk:hidden lap:hidden ${!statusText ? "p-0 border-none" : ""}`} onClick={() => (!!rejectionReason && rejectionReason !== "") ? openModal(rejectionReason, "Rejection Reason") : null}>
                                        {!!statusImg && <Image height="20" width="20" src={`/resources/icons/${statusImg}`} alt="status-icon" />}
                                        {!statusImg && statusText}
                                    </div>
                                </>
                            </div>
                            {status === "Rejected" && !has_data && <button
                                onClick={() => addNonWorkingDay(day.fullDate)}
                                disabled={isButtonDisabled}
                                className="w-full text-xs"
                            >
                                Set OFF
                            </button>
                            }
                        </div>
                    );
                })}
            </div>
            <div className="text-center p-4 border-t flex-1 desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">
                {/* You can put something here if needed */}
            </div>
        </div>
    );
}

export default DayStatus;
