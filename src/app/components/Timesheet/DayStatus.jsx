import React, { useState } from "react";
import Modal from "../custom/Modals/Modal";
import Image from "next/image";
import Button from "../custom/Button";

function DayStatus({ weekDays, getStatusForDay }) {
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [currentReason, setCurrentReason] = useState("");

    const toggleReasonModal = (reason) => {
        setCurrentReason(reason);
        setShowReasonModal(true);
    };

    return (
        <div className="flex font-bold mob:flex-col tablet:flex-col w-full">
            <div className="p-4 border-t flex justify-center items-center desk:min-w-[22rem] desk:max-w-[22rem] lap:min-w-[18rem] lap:max-w-[18rem] mob:bg-pric tablet:bg-pric mob:justify-start tablet:justify-start mob:text-white tablet:text-white">
                Day Approval Status
            </div>
            <div className="flex lap:hidden desk:hidden bg-gray-200">
                {weekDays.map((day, i) => {
                    return (
                        <div key={i} className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm">
                            {day.dayOfWeek}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-1 w-full">
                {weekDays.map((day, i) => {
                    const { status, rejectionReason } = getStatusForDay(day.fullDate);
                    let statusClass;
                    let statusText;
                    let statusImg;

                    if (status === "Rejected") {
                        statusClass = "bg-red-100 border border-red-400 text-red-400";
                        statusText = "Rejected";
                    } else if (status === "Pending") {
                        statusClass = "bg-orange-100 border border-orange-400 text-orange-400";
                        statusText = "Pending";
                    } else if (status === "Approved") {
                        statusClass = "bg-green-100 border border-green-400 text-green-400";
                        statusText = "Approved";
                    }
                    statusImg = statusText && statusText.toLowerCase() + "-icon.svg"

                    return (
                        <div
                            key={i}
                            className="text-center border-t flex-1 flex flex-col justify-center items-center relative group mob:p-1 tablet:p-1"
                        >

                            <>
                                <div className={`rounded-md font-normal px-2 py-1 w-[90%] text-xs ${statusClass} mob:hidden tablet:hidden`}>
                                    {statusText}
                                </div>
                                {rejectionReason && (
                                    <div
                                        className="absolute bottom-0 h-0 flex justify-center items-center w-full transform bg-red-200 border border-gray-200 p-1 text-[12px] font-normal shadow-lg opacity-0 transition-all duration-200 ease-in-out cursor-pointer text-red-500 lap:group-hover:opacity-100 lap:group-hover:h-full lap:group-hover:translate-y-0 desk:group-hover:opacity-100 desk:group-hover:h-full desk:group-hover:translate-y-0 mob:hidden tablet:hidden"
                                        onClick={() => toggleReasonModal(rejectionReason)}
                                    >
                                        Show Reason
                                    </div>
                                )}
                                <div className={`flex justify-center items-center rounded-md font-normal px-2 py-1 w-[90%]  text-center text-xs ${statusClass} desk:hidden lap:hidden`} onClick={() => toggleReasonModal(rejectionReason)}>
                                    {!!statusImg && <Image height="20" width="20" src={`/resources/icons/${statusImg}`} alt="status-icon" />}
                                </div>
                            </>
                        </div>


                    );
                })}
            </div>
            <div className="text-center p-4 border-t flex-1 desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">
                {/* You can put something here if needed */}
            </div>

            {showReasonModal && (
                <Modal open={showReasonModal}
                    onClose={() => setShowReasonModal(false)}
                    title="Submission Rejected"
                >
                    <div className="flex flex-col items-center pb-2">
                        <p className="p-2 mb-2">{currentReason}</p>
                        <Button
                            onClick={() => setShowReasonModal(false)}
                            variant="primary"
                            name="Close"
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default DayStatus;
