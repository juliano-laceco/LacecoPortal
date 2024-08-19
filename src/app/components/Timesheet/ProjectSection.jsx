import useScreenSize from "@/app/hooks/UseScreenSize";
import Image from "next/image";
import { useEffect } from "react";

function ProjectSection({ project, projectIndex, weekDays, handleInputChange }) {
    const { title, phases } = project;

    const screenSize = useScreenSize()

    useEffect(() => {
        // Add event listeners for collapse and expand buttons
        const collapseButtons = document.querySelectorAll('.collapsePhase');
        const expandButtons = document.querySelectorAll('.expandPhase');

        collapseButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const phaseWrapper = button.closest('.phase-name-cell');
                phaseWrapper.classList.add("collapsed")
                phaseWrapper.classList.remove("expanded")
            });
        });

        expandButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const phaseWrapper = button.closest('.phase-name-cell');
                phaseWrapper.classList.add("expanded")
                phaseWrapper.classList.remove("collapsed")
            });
        });

        // Cleanup event listeners on component unmount
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
        if (screenSize == "lap" || screenSize == "desk") { // Adjust the breakpoint according to your needs
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
            {/* Project Title */}
            <div className="project-title-cell flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-44 desk:max-w-44 lap:min-w-36 lap:max-w-36 mob:bg-pric tab:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200">
                {title}
            </div>
            <div className="phase-stacker flex flex-col flex-grow">
                {phases.map((phase, phaseIndex) => {
                    const { phase_name, assignments } = phase;

                    return (
                        <div key={phase.phase_id} className="outer-phase-wrapper flex w-full mob:flex-col tablet:flex-col">
                            {/* Phase Name */}
                            <div className="phase-name-cell text-sm expanded p-2 border flex font-semibold justify-center mob:justify-between tablet:justify-between items-center text-center desk:min-w-44 desk:max-w-44 lap:min-w-36 lap:max-w-36 mob:bg-red-200 tablet:bg-red-200 border-r border-gray-200">
                                {phase_name}
                                <div className="flex justify-center items-center lap:hidden desk:hidden">
                                    <p
                                        className="collapsePhase cursor-pointer bg-pric p-[3px] rounded-full border border-red-300"
                                    >
                                        <Image src="/resources/icons/arrow-up.svg" height="10" width="10" alt="collapse" />
                                    </p>
                                    <p
                                        className="expandPhase cursor-pointer bg-pric p-[3px] rounded-full border border-red-300"
                                    >
                                        <Image src="/resources/icons/arrow-down.svg" height="10" width="10" alt="expand" />
                                    </p>
                                </div>
                            </div>
                            {/* Inputs Row */}
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
                                            const hoursWorked = assignment ? assignment.hours_worked : '';
                                            const status = assignment ? assignment.status : '';

                                            // Determine the background color based on status
                                            const color = status === "Approved" ? "bg-green-400 cursor-not-allowed" : status === "Rejected" ? "bg-red-400 cursor-not-allowed" : "";

                                            // Determine if the input should be disabled based on status
                                            const isDisabled = !!status && status !== "Pending";

                                            return (
                                                <div key={i} className={`flex-1 text-center h-full border border-gray-200 mob:p-0 tablet:p-0 bg-white`}>
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
                                                </div>
                                            );
                                        })}


                                    </div>
                                </div>
                            </div>
                            {/* Total Hours */}
                            <div className="phase-hours-cell flex justify-center items-center p-4 border-b border-l border-gray-200 bg-gray-100 font-bold  desk:min-w-32 desk:max-w-32 lap:min-w-28 lap:max-w-28 ">
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
