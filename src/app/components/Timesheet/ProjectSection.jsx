import React, { useEffect } from "react";
import Image from "next/image";
import InputContainer from "./InputContainer";
import useScreenSize from "@/app/hooks/UseScreenSize";

function ProjectSection({ project, projectIndex, weekDays, handleInputChange, getStatusForDay }) {
    const { title, phases } = project;

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

    const calculateTotalPhaseHours = (assignments) => {
        return assignments.reduce((total, assignment) => {
            return total + (parseInt(assignment.hours_worked || 0));
        }, 0);
    };

    const calculateProgressPercentage = (work_done_hrs, expected_work_hrs) => {
        if (expected_work_hrs === 0) return 0; // Avoid division by zero
        return (work_done_hrs / expected_work_hrs) * 100;
    };

    // Filter the phases to only include those that should be rendered
    const filteredPhases = phases.filter(phase => phase.isActive || phase.timesheet_exists);

    // Only render the project if there are phases to render
    if (filteredPhases.length === 0) {
        return null;
    }

    return (
        <div key={`${project.project_id}`} className="project-wrapper flex bg-gray-50 w-full mob:flex-col tablet:flex-col mob:bg-gray-300">
            <div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200">
                {title}
            </div>
            <div className="phase-stacker flex flex-col flex-grow">
                {filteredPhases.map((phase, phaseIndex) => {
                    const { phase_name, assignments, work_done_hrs, expected_work_hrs, isActive } = phase;
                    const progressPercentage = Math.ceil(calculateProgressPercentage(work_done_hrs, expected_work_hrs));

                    return (
                        <div key={phase.phase_id} className="outer-phase-wrapper flex w-full mob:flex-col tablet:flex-col">
                            <div className="phase-name-cell text-sm expanded border flex flex-col font-semibold justify-between mob:justify-between tablet:justify-between items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-red-200 tablet:bg-red-200 border-r border-gray-200">
                                <div className="flex justify-between w-full p-3 desk:p-2 lap:p-2">
                                    <span>{phase_name}</span>
                                    <div className="flex justify-center items-center lap:hidden desk:hidden">
                                        <p className="collapsePhase cursor-pointer bg-pric p-[3px] rounded-full border border-red-300">
                                            <Image src="/resources/icons/arrow-up.svg" height="10" width="10" alt="collapse" />
                                        </p>
                                        <p className="expandPhase cursor-pointer bg-pric p-[3px] rounded-full border border-red-300">
                                            <Image src="/resources/icons/arrow-down.svg" height="10" width="10" alt="expand" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 mob:bg-white tablet:bg-white p-3 desk:p-2 lap:p-2">
                                    <p className="text-xs">{progressPercentage}%</p>
                                    <div className="w-full flex items-center bg-gray-300 rounded-full overflow-hidden h-2.5 mt-[3px]">
                                        <div
                                            className={`rounded-full font-normal h-2.5 text-xs bg-gray-600`}
                                            style={{ width: `${progressPercentage}%` }}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="weekdays-outer-wrapper flex justify-evenly w-full mob:flex-col tablet:flex-col">
                                <div className="weekdays-inner-wrapper flex flex-col justify-evenly w-full">
                                    <div className="flex lap:hidden desk:hidden bg-gray-200">
                                        {weekDays.map((day, i) => {
                                            return (
                                                <div key={i} className="flex-1 text-center p-2 border border-gray-200 mob:text-sm tablet:text-sm">
                                                    {day.dayOfWeek}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex h-full">
                                        {weekDays.map((day, i) => {
                                            const assignment = assignments.find(assignment => assignment.work_day === day.fullDate);
                                            const { status } = getStatusForDay(day.fullDate);

                                            return (
                                                <InputContainer
                                                    key={i}
                                                    day={day}
                                                    assignment={assignment}
                                                    handleInputChange={handleInputChange}
                                                    projectIndex={projectIndex}
                                                    phaseIndex={phaseIndex}
                                                    isActive={isActive}
                                                    dayStatus={status}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="phase-hours-cell flex justify-center items-center p-4 border-b border-l border-gray-200 bg-gray-100 font-bold desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28">
                                <span className="lap:hidden desk:hidden">Total: &nbsp;</span>{calculateTotalPhaseHours(assignments)} <span className="lap:hidden desk:hidden ml-1">hrs</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectSection;
