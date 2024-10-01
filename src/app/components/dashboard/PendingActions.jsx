"use client"

import Link from "next/link";
import React from "react";
import Button from "../custom/Other/Button";

function PendingActions({ approvals }) {
    return (
        <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-sm mob:max-w-full lap:max-w-md desk:max-w-md select-none">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Timesheet Approvals</h2>
            </div>
            <div className="mt-4">
                <h3 className="text-sm font-semibold mb-4">Most Relevant</h3>
                <div>
                    {approvals.map(({ employee_id, first_name, work_email, last_action_status, last_action_date, first_pending_date }) => {
                        // Determine the start date for the query string
                        const startDate = first_pending_date || last_action_date;
                        const formattedStartDate = startDate
                            ? new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            : null;

                        return (
                            <Link href={`/hod/approvals?employee_id=${employee_id}&start=${formattedStartDate}`} key={employee_id}>
                                <div className="flex items-center justify-between gap-3 mob:gap-1 border-b border-gray-200 pb-2 pt-2 px-1 hover:bg-gray-50 duration-300 ease">
                                    <div className="flex items-center gap-4 mob:gap-3 tablet:gap-3">
                                        {/* Placeholder for employee avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center">
                                            <svg className="h-10 w-10 text-red-400 mob:h-8 mob:w-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base mob:text-sm">{first_name}</p>
                                            <p className="text-sm text-gray-500 mob:text-xs">{work_email}</p>
                                        </div>
                                    </div>
                                    {/* Display approval status with priority for pending */}
                                    <div className="text-sm font-semibold mob:text-xs">
                                        {first_pending_date ? (
                                            <>
                                                <span className="text-xs mob:hidden tablet:hidden text-orange-400">
                                                    pending {new Date(first_pending_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                                </span>
                                                <span className="text-white p-1 text-[11px] rounded-md font-semibold desk:hidden lap:hidden bg-orange-500">
                                                    {new Date(first_pending_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                                </span>
                                            </>
                                        ) : last_action_date ? (
                                            <>
                                                <span className={`text-xs mob:hidden tablet:hidden ${last_action_status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {last_action_status.toLowerCase()} {new Date(last_action_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                                </span>
                                                <span className={`text-white p-1 text-[11px] rounded-md font-semibold desk:hidden lap:hidden ${last_action_status === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                                                    {new Date(last_action_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-xs mob:hidden tablet:hidden text-red-500">missing</span>
                                                <span className="text-white p-1 text-[11px] bg-gray-400 rounded-md font-semibold desk:hidden lap:hidden">N/A</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-4">
                    <Link href="/hod/approvals/all">
                        <Button name="View All" size="small" />
                    </Link>

                </div>
            </div>
        </div >
    );
}

export default PendingActions;
