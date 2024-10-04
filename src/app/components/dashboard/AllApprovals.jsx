"use client";

import React, { useState, useEffect } from "react";
import Input from "../custom/Other/Input"; // Custom input component
import DropdownRegular from "../custom/Dropdowns/DropdownRegular";
import Button from "../custom/Other/Button";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import TablePagination from "../custom/Table/TablePagination";

const statusOptions = [
    { value: "All", label: "All" },
    { value: "upToDate", label: "Approved Up To Date" },
    { value: "outdatedPending", label: "Approved Outdated" },
    { value: "missingDays", label: "Missing Days" },
    { value: "pending", label: "Pending Approval" }, // New scenario for pending items
];

function AllApprovals({ approvals }) {
    const [filteredApprovals, setFilteredApprovals] = useState(approvals);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(statusOptions[0].value);
    const [disciplineFilter, setDisciplineFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Limit of approvals per page

    // Extract distinct disciplines for the discipline dropdown
    const disciplineOptions = [
        { value: "All", label: "All" },
        ...Array.from(new Set(approvals.map((approval) => approval.discipline_id))).map((id) => {
            const approval = approvals.find((a) => a.discipline_id === id);
            return { value: id, label: approval.discipline_name };
        })
    ];

    useEffect(() => {
        filterApprovals(searchTerm, statusFilter, disciplineFilter);
    }, [searchTerm, statusFilter, disciplineFilter, currentPage, pageSize]);

    // Handle search functionality
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Handle filtering by status
    const handleFilterChange = (selectedOption) => {
        setStatusFilter(selectedOption.value);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    // Handle filtering by discipline
    const handleDisciplineFilterChange = (selectedOption) => {
        setDisciplineFilter(selectedOption.value);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    // Filtering logic by name, status, and discipline
    const filterApprovals = (term, filter, discipline) => {
        const lowerCaseTerm = term.toLowerCase();
        const filtered = approvals.filter((approval) => {
            const matchesName =
                approval.first_name.toLowerCase().includes(lowerCaseTerm) ||
                approval.last_name.toLowerCase().includes(lowerCaseTerm);

            const final_date = approval.min_rejected_date && !approval.last_approved_before_rejected
                ? approval.min_rejected_date
                : approval.last_approved_before_rejected || approval.last_approved_date || approval.min_pending_date;

            const daysDifference = final_date ? differenceInDays(new Date(), new Date(final_date)) : null;

            let matchesStatus = false;

            // Logic to check the status based on the color logic
            switch (filter) {
                case "upToDate":
                    matchesStatus = approval.last_approved_date && daysDifference <= 2 && !approval.has_pending;
                    break;
                case "outdatedPending":
                    matchesStatus = approval.last_approved_date && daysDifference > 2 && approval.has_pending;
                    break;
                case "missingDays":
                    matchesStatus = approval.min_rejected_date && !approval.last_approved_before_rejected;
                    break;
                case "pending":
                    matchesStatus = approval.has_pending; // Scenario for pending status
                    break;
                case "All":
                    matchesStatus = true;
                    break;
                default:
                    matchesStatus = true;
            }

            const matchesDiscipline =
                discipline === "All" || approval.discipline_id === discipline;

            return matchesName && matchesStatus && matchesDiscipline;
        });
        setFilteredApprovals(filtered);
    };

    // Handle pagination
    const indexOfLastApproval = currentPage * pageSize;
    const indexOfFirstApproval = indexOfLastApproval - pageSize;
    const currentApprovals = filteredApprovals.slice(indexOfFirstApproval, indexOfLastApproval);

    const canPreviousPage = currentPage > 1;
    const canNextPage = currentPage < Math.ceil(filteredApprovals.length / pageSize);

    const handlePagination = (pageNumber, type) => {
        type === "navigation" ? setCurrentPage(pageNumber) : setCurrentPage(pageNumber + 1);
    };

    // Clear search and filter
    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter(statusOptions[0].value);
        setDisciplineFilter("All");
        setCurrentPage(1); // Reset to first page when clearing filters
        setFilteredApprovals(approvals);
    };

    return (
        <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="flex gap-3 justify-start w-fit mob:flex-col mob:flex-wrap tablet:flex-wrap">
                <Input
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name..."
                    className="flex-1 p-0 border rounded-md"
                    label="Search"
                />
                <DropdownRegular
                    options={statusOptions}
                    value={statusFilter}
                    onChange={handleFilterChange}
                    label="Filter by Status"
                    isSearchable={false}
                    isDisabled={false}
                    isLoading={false}
                />
                <DropdownRegular
                    options={disciplineOptions}
                    value={disciplineFilter}
                    onChange={handleDisciplineFilterChange}
                    label="Filter by Discipline"
                    isSearchable={false}
                    isDisabled={false}
                    isLoading={false}
                />
                <Button name="Clear" className="w-fit desk:self-center lap:self-center desk:mt-6 lap:mt-6" size="small" onClick={clearFilters} />
            </div>

            {/* Approval List */}
            <div className="bg-white shadow-md rounded-md space-y-4 overflow-hidden">
                {currentApprovals.length > 0 ? (
                    currentApprovals.map(({
                        employee_id,
                        first_name,
                        last_name,
                        discipline_name,
                        last_action_date,
                        has_pending,
                        last_approved_before_rejected,
                        min_rejected_date,
                        last_approved_date,
                        min_pending_date
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
                                if (daysDifference <= 2) {
                                    colorClass = "bg-green-500"; // Green for 0-2 days old
                                } else if (daysDifference >= 3) {
                                    colorClass = "bg-red-500"; // Red for 3+ days old
                                }
                            } else if (final_date === last_approved_date) {
                                if (has_pending) {
                                    colorClass = "bg-orange-400"; // Orange if there is pending
                                } else {
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
                                <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 mob:gap-3 tablet:gap-3">
                                            {/* Placeholder for employee avatar */}
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center">
                                                <svg className="h-10 w-10 text-red-400 mob:h-8 mob:w-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-base mob:text-sm">{first_name} {last_name}</p>
                                                <p className="text-sm text-gray-500">{discipline_name}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold mob:text-xs">
                                            <span className={`text-xs p-1 text-white rounded-md font-semibold ${colorClass}`}>
                                                {new Date(final_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className="p-5 text-pric">No results found.</p>
                )}
            </div>

            {/* Pagination Section */}
            <TablePagination
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
                previousPage={() => handlePagination(currentPage - 1, "navigation")}
                nextPage={() => handlePagination(currentPage + 1, "navigation")}
                pageCount={Math.ceil(filteredApprovals.length / pageSize)}
                pageOptions={Array.from({ length: Math.ceil(filteredApprovals.length / pageSize) }, (_, i) => i)}
                pageSizeOptions={[
                    { value: 5, label: "5" },
                    { value: 10, label: "10" },
                    { value: 20, label: "20" }
                ]}
                gotoPage={handlePagination}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageIndex={currentPage - 1} // zero-based page index
            />
        </div>
    );
}

export default AllApprovals;
