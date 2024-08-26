import React, { useEffect } from "react";
import InputContainer from "./InputContainer";
import useScreenSize from "@/app/hooks/UseScreenSize";
import { development_options } from "@/data/static/development-options";

function DevelopmentSection({ development_items, weekDays, handleInputChange, getStatusForDay, handleTypeChange, type , isNewRow }) {
    const screenSize = useScreenSize();

    useEffect(() => {
        const collapseButtons = document.querySelectorAll('.collapsePhase');
        const expandButtons = document.querySelectorAll('.expandPhase');

        collapseButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const phaseWrapper = button.closest('.phase-name-cell');
                phaseWrapper.classList.add("collapsed");
                phaseWrapper.classList.remove("expanded");
            });
        });

        expandButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const phaseWrapper = button.closest('.phase-name-cell');
                phaseWrapper.classList.add("expanded");
                phaseWrapper.classList.remove("collapsed");
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
            const phaseNameCells = document.querySelectorAll('.phase-name-cell');

            phaseNameCells.forEach((phaseNameCell) => {
                phaseNameCell.classList.remove("collapsed");
                phaseNameCell.classList.add("expanded");
            });
        }
    }, [screenSize]);

    const handleSelectChange = (e) => {
        const newValue = e.target.value;
        handleTypeChange(newValue, development_items[0]?.development_hour_day_id);
    };

    return (
        <div className="project-wrapper flex bg-gray-50 w-full mob:flex-col tablet:flex-col mob:bg-gray-300">
            <div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200">
                {

                    !!isNewRow ? (<select
                        value={type}
                        onChange={handleSelectChange}
                        className="border border-gray-300 rounded max-w-full text-sm text-black"
                    >
                        <option value="" disabled>Select Type</option>
                        {development_options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>) :
                        type
                }

            </div>
            <div className="weekdays-outer-wrapper flex justify-evenly w-full mob:flex-col tablet:flex-col">
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
