import Image from "next/image"
import React, { useState } from "react"
import WeekDaysHeader from "./WeekDaysHeader"

function DevelopmentSection({ weekDays }) {
    // State to manage the collapsed/expanded state
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="project-container w-fit bg-white">
            <div className="project-header bg-red-500 flex items-center justify-between p-4">
                <div className="project-details flex items-center gap-10">
                    <div>
                        <p className="text-red-300">Name</p>
                        <p className="text-white">Development</p>
                    </div>
                </div>
                <div className="expand-collapse-buttons">
                    <p
                        className="collapseProject cursor-pointer bg-red-400 px-3 py-2 rounded-lg border border-red-300"
                        onClick={toggleCollapse}
                    >
                        <Image
                            src={isCollapsed ? "/resources/icons/arrow-down.svg" : "/resources/icons/arrow-up.svg"}
                            height="12"
                            width="12"
                            alt={isCollapsed ? "expand" : "collapse"}
                        />
                    </p>
                </div>
            </div>
            {/* Conditionally render the project-phase-body based on isCollapsed state */}
            {!isCollapsed && (
                <div className="project-phase-body">
                    <WeekDaysHeader phase_name="Development" weekDays={weekDays} />
                    <div className="inputs-header flex border-b border-gray-300">
                        <div>
                            <p className="w-[300px] h-12 flex justify-center items-center px-4">Development</p>
                        </div>
                        <div className="flex justify-center items-center">
                            {weekDays.map((day, i) => (
                                <div className="w-16 h-full border-none" key={i}>
                                    <input
                                        className="arrowless-input text-center w-full h-full border-l border-r border-b-0 border-t-0 border-gray-300 focus:border-t focus:border-b focus:ring-0 focus:outline-none focus:border-red-400"
                                        type="number"
                                        min="0"
                                        max="24"
                                        data-date={day.fullDate}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DevelopmentSection;
