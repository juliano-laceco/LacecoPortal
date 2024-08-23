import React, { useEffect } from "react";
import Image from "next/image";
import InputContainer from "./InputContainer";
import useScreenSize from "@/app/hooks/UseScreenSize";

function ProjectSection({ project, projectIndex, weekDays, handleInputChange, getStatusForDay }) {
    const { title, phases } = project;

    const screenSize = useScreenSize()

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

    return (
        <div key={`${project.project_id}`} className="project-wrapper flex bg-gray-50 w-full mob:flex-col tablet:flex-col mob:bg-gray-300">
            <div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200">
                {title}
            </div>
            <div className="phase-stacker flex flex-col flex-grow">
                {phases.map((phase, phaseIndex) => {
                    const { phase_name, assignments } = phase;

                    return (
                        <div key={phase.phase_id} className="outer-phase-wrapper flex w-full mob:flex-col tablet:flex-col">
                            <div className="phase-name-cell text-sm expanded p-2 border flex font-semibold justify-center mob:justify-between tablet:justify-between items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-red-200 tablet:bg-red-200 border-r border-gray-200">
                                {phase_name}
                                <div className="flex justify-center items-center lap:hidden desk:hidden">
                                    <p className="collapsePhase cursor-pointer bg-pric p-[3px] rounded-full border border-red-300">
                                        <Image src="/resources/icons/arrow-up.svg" height="10" width="10" alt="collapse" />
                                    </p>
                                    <p className="expandPhase cursor-pointer bg-pric p-[3px] rounded-full border border-red-300">
                                        <Image src="/resources/icons/arrow-down.svg" height="10" width="10" alt="expand" />
                                    </p>
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
