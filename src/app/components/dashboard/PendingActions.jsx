"use client";

import Link from "next/link";
import React from "react";
import Button from "../custom/Other/Button";
import { differenceInDays } from "date-fns";

function PendingActions({ approvals }) {
    return (
        <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-sm mob:max-w-full lap:max-w-md desk:max-w-md select-none">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Timesheet Approvals</h2>
            </div>
            <div className="mt-4">
                <h3 className="text-sm font-semibold mb-4">Most Relevant</h3>
                <div>
                    {approvals.map(({
                        employee_id,
                        first_name,
                        last_name,
                        discipline_name,
                        has_pending,
                        min_pending_date,
                        last_approved_before_rejected,
                        last_approved_date,
                        min_rejected_date
                    }) => {
                        // Determine the final date based on the conditions
                        const final_date = min_rejected_date && !last_approved_before_rejected
                            ? min_rejected_date
                            : last_approved_before_rejected || last_approved_date || min_pending_date;

                        const formattedStartDate = final_date
                            ? new Date(final_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            : null;

                        // Color logic based on date and conditions
                        let colorClass = "bg-orange-500"; // Default color for 'No action yet' or 'N/A'

                        if (final_date) {
                            const daysDifference = differenceInDays(new Date(), new Date(final_date));

                            if (final_date === last_approved_before_rejected || final_date === min_rejected_date) {
                                // Color based on elapsed time for last_approved_before_rejected or min_rejected_date
                                if (daysDifference <= 2) {
                                    colorClass = "bg-green-500"; // Green for 0-2 days old
                                } else if (daysDifference >= 3) {
                                    colorClass = "bg-red-500"; // Red for 3+ days old
                                }
                            } else if (final_date === last_approved_date) {
                                // Color based on pending state
                                if (has_pending) {
                                    colorClass = "bg-orange-400"; // Orange if there is pending
                                } else {
                                    // Standard color logic for last_approved_date
                                    if (daysDifference <= 2) {
                                        colorClass = "bg-green-500"; // Green for 0-2 days old
                                    } else if (daysDifference >= 3) {
                                        colorClass = "bg-red-500"; // Red for 3+ days old
                                    }
                                }
                            }
                        }

                        return (
                            <Link href={`/timesheet/approvals?employee_id=${employee_id}&start=${formattedStartDate}`} key={employee_id}>
                                <div className="flex items-center justify-between gap-3 mob:gap-1 border-b border-gray-200 pb-2 pt-2 px-1 hover:bg-gray-50 duration-300 ease">
                                    <div className="flex items-center gap-4 mob:gap-3 tablet:gap-3">
                                        {/* Placeholder for employee avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center">
                                            <svg className="h-10 w-10 text-red-400 mob:h-8 mob:w-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base mob:text-sm">{first_name} {last_name}</p>
                                            <p className="text-sm text-gray-500 mob:text-xs">{discipline_name}</p>
                                        </div>
                                    </div>
                                    {/* Display approval status with color coding */}
                                    <div className="text-sm font-semibold mob:text-xs">
                                        <span className={`text-xs p-1 text-white rounded-md font-semibold ${colorClass}`}>
                                            {new Date(final_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-4">
                    <Link href="/timesheet/approvals/all">
                        <Button name="View All" size="small" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PendingActions;
