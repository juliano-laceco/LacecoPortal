import React, { useEffect } from "react";
import InputContainer from "./InputContainer";
import useScreenSize from "@/app/hooks/UseScreenSize";
import Image from "next/image";

function DevelopmentSection({ development_items, weekDays, handleInputChange, getStatusForDay, type, openModal, initialDevelopmentTypes, setIsEdited, allowed_range }) {
    const screenSize = useScreenSize();

    useEffect(() => {
        // Handle collapse and expand functionality for development cells
        const collapseButtons = document.querySelectorAll('.collapseDev');
        const expandButtons = document.querySelectorAll('.expandDev');

        collapseButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const developmentWrapper = button.closest('.development-type-cell');
                developmentWrapper.classList.add("collapsed");
                developmentWrapper.classList.remove("expanded");
            });
        });

        expandButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const developmentWrapper = button.closest('.development-type-cell');
                developmentWrapper.classList.add("expanded");
                developmentWrapper.classList.remove("collapsed");
            });
        });

        return () => {
            collapseButtons.forEach((button) => {
                button.removeEventListener('click', () => { });
            });

            expandButtons.forEach((button) => {
                button.removeEventListener('click', () => { });
            });
        };
    }, []);

    useEffect(() => {
        if (screenSize === "lap" || screenSize === "desk") {
            const developmentTypeCells = document.querySelectorAll('.development-type-cell');

            developmentTypeCells.forEach((developmentTypeCell) => {
                developmentTypeCell.classList.remove("collapsed");
                developmentTypeCell.classList.add("expanded");
            });
        }
    }, [screenSize]);

    return (
        <div className="development-wrapper flex bg-gray-50 w-full mob:flex-col tablet:flex-col mob:bg-gray-300">
            <div className="development-type-cell phase-name-cell text-sm expanded p-2 border flex font-semibold justify-between mob:justify-between tablet:justify-between items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-red-200 tablet:bg-red-200 border-r border-gray-200">
                <p>
                    {type}
                </p>
                {
                    !initialDevelopmentTypes.some((item) => item === type) ? (
                        <div className="cursor-pointer" onClick={() => openModal(type, "Confirm Deletion")}>
                            <Image src="/resources/icons/delete.png" height="20" width="20" alt="x" className="mx-1" />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center lap:hidden desk:hidden">
                            <p className="collapseDev cursor-pointer bg-pric p-[3px] rounded-full border border-red-300">
                                <Image src="/resources/icons/arrow-up.svg" height="10" width="10" alt="collapse" />
                            </p>
                            <p className="expandDev cursor-pointer bg-pric p-[3px] rounded-full border border-red-300">
                                <Image src="/resources/icons/arrow-down.svg" height="10" width="10" alt="expand" />
                            </p>
                        </div>
                    )
                }
            </div>
            <div className={`weekdays-outer-wrapper flex justify-evenly w-full mob:flex-col tablet:flex-col ${!screenSize && "collapsed"}`}>
                <div className="weekdays-inner-wrapper flex flex-col justify-evenly w-full">
                    <div className="flex lap:hidden desk:hidden bg-gray-200">
                        {weekDays.map((day, i) => (
                            <div key={i} className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm">
                                {day.dayOfWeek}
                            </div>
                        ))}
                    </div>
                    <div className="flex h-full">
                        {weekDays.map((day, i) => {
                            const assignment = development_items.find(item => item.work_day === day.fullDate);
                            const { status } = getStatusForDay(day.fullDate);
                           
                            return (
                                <InputContainer
                                    key={`${type}-${i}`}
                                    day={day}
                                    type={type}
                                    assignment={assignment}
                                    handleInputChange={handleInputChange}
                                    projectIndex={null}
                                    phaseIndex={null}
                                    dayStatus={status}
                                    isDevelopment={true}
                                    developmentId={!!assignment ? assignment.development_hour_day_id : null}
                                    allowed_range={allowed_range}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="phase-hours-cell flex justify-center items-center p-4 border-b border-l border-gray-200 bg-gray-100 font-bold desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">
                <span className="lap:hidden desk:hidden">Total: &nbsp;</span>
                {development_items.reduce((total, item) => total + (parseFloat(item.hours_worked) || 0), 0)} <span className="lap:hidden desk:hidden ml-1">hrs</span>
            </div>
        </div>
    );
}

export default DevelopmentSection;
