import Image from "next/image";
import { useState } from "react";
import Modal from "../custom/Modals/Modal";
import Button from "../custom/Button";

function InputContainer({ day, assignment, handleInputChange, projectIndex, phaseIndex }) {
    const [showReason, setShowReason] = useState(false);

    const hoursWorked = assignment ? assignment.hours_worked : '';
    const status = assignment ? assignment.status : '';
    const rejection_reason = assignment ? assignment.rejection_reason : null;

    const color = status === "Approved" ? "bg-green-400 cursor-not-allowed" : status === "Rejected" ? "bg-red-400" : status === "Submitted" ? "bg-orange-400 cursor-not-allowed" : "";
    const isDisabled = !!status && (status === "Submitted" || status === "Approved")

    const toggleReasonVisibility = () => {
        setShowReason((prev) => !prev);
    };

    const handleBlur = () => {
        setShowReason(false);
    };

    return (
        <div
            className={`relative flex-1 text-center h-full border border-gray-200 mob:p-0 tablet:p-0 bg-white`}
            title={status === "Approved" ? "Submission for this day is appproved. Unable to modify." : status === "Submitted" ? "You have already made a submission for this day and you must await your HoD's response." : ""}
        >
            <input
                className={`arrowless-input text-center w-full h-full border-0 focus:border focus:border-pric focus:ring-0 ${color}`}
                type="number"
                disabled={isDisabled}
                min="0"
                max="24"
                value={hoursWorked}
                onChange={(e) => handleInputChange(e, projectIndex, phaseIndex, day.fullDate)}
                data-date={day.fullDate}
            />
            {!!rejection_reason && (
                <>
                    <div className="absolute top-[3px] mob:top-0 tablet:top-0 right-0 z-50">
                        <Image
                            className="cursor-pointer info-icon"
                            src="/resources/icons/info.svg"
                            height="15"
                            width="15"
                            alt="i."
                            tabIndex={0}
                            onClick={toggleReasonVisibility}
                            onBlur={handleBlur}
                        />
                    </div>
                    <Modal open={showReason}
                        onClose={() => {
                            setModal(null);
                        }}
                        title="Submission Rejected"
                    >
                        <div className="flex flex-col items-center pb-2">
                            <p className="p-2 mb-2">{rejection_reason}</p>
                            <Button name="Close" variant="secondary" />
                        </div>
                    </Modal>

                </>
            )}
        </div>
    );
}

export default InputContainer;
