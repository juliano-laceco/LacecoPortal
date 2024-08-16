"use client"

import Image from "next/image"
import React from "react"
import { format, startOfWeek, endOfWeek, addDays } from "date-fns"
import { formatDate } from "@/utilities/date/date-utils"

function TimeSheet({ timesheet_data }) {
    const today = new Date()

    // Calculate the start and end of the current week (Monday as the first day of the week)
    const startDate = startOfWeek(today, { weekStartsOn: 1 })
    const endDate = endOfWeek(today, { weekStartsOn: 1 })

    // Generate the days of the current week
    const weekDays = []
    for (let i = 0; i < 7; i++) {
        const day = addDays(startDate, i)
        weekDays.push({
            day: format(day, 'd'), // Date of the day (e.g., 01, 02)
            dayOfWeek: format(day, 'E'), // Day of the week (e.g., M, T)
            fullDate: formatDate(day), // Day of the week (e.g., M, T)
        })
    }

    return (
        <div className="w-full">
            {timesheet_data.map((project) => {

                const { project_id, code, title, first_name, last_name, phases } = project

                const phase = phases[0]

                const { phase_id, phase_name, phase_assignee_id, assignments } = phase

                return (
                    <div className="w-fit" key={project_id}>
                        <div className="project-container bg-white">
                            <div className="project-header bg-red-500 flex items-center justify-between p-4">
                                <div className="project-details flex items-center gap-10">
                                    <div>
                                        <p className="text-red-300">Code</p>
                                        <p className="text-white">{code}</p>
                                    </div>
                                    <div>
                                        <p className="text-red-300">Name</p>
                                        <p className="text-white">{title}</p>
                                    </div>
                                    <div>
                                        <p className="text-red-300">PM</p>
                                        <p className="text-white">{first_name} {last_name}</p>
                                    </div>
                                </div>
                                <div className="expand-collapse-buttons">
                                    <p className="collapseProject cursor-pointer bg-red-400 px-3 py-2 rounded-lg border border-red-300 hidden" onClick={(e) => null}>
                                        <Image src="/resources/icons/arrow-up.svg" height="12" width="12" alt="collapse" />
                                    </p>
                                    <p className="expandProject cursor-pointer bg-red-400 px-3 py-2 rounded-lg border border-red-300" onClick={(e) => null}>
                                        <Image src="/resources/icons/arrow-down.svg" height="12" width="12" alt="expand" />
                                    </p>
                                </div>
                            </div>
                            <div className="date-header flex border-b border-gray-300">
                                <div className="flex flex-1 justify-between items-center">
                                    <p className="text-gray-500 w-[300px] px-4 flex justify-center items-center">Phase Name</p>
                                    <div className="week-days flex items-center">
                                        {weekDays.map((day, index) => (
                                            <div key={index} className="text-center p-2 w-16">
                                                <p className="text-gray-600">{day.day}</p>
                                                <p className="text-gray-400">{day.dayOfWeek}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-header flex border-b border-gray-300">
                                <div>
                                    <p className="w-[300px] h-12 flex justify-center items-center px-4">{phase_name}</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    {[...Array(7)].map((_, i) => (
                                        <div className="w-16 h-full border-none" key={i}>
                                            <input
                                                className="arrowless-input text-center w-full h-full border-l border-r border-b-0 border-t-0 border-gray-300 focus:border-t focus:border-b focus:ring-0 focus:outline-none focus:border-red-400"
                                                type="number"
                                                min="0"
                                                max="24"
                                                onInput={(e) => {
                                                    if (e.target.value.length > 2) {
                                                        e.target.value = e.target.value.slice(0, 2);
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TimeSheet
