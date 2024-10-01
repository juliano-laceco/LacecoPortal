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
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
];

function AllApprovals({ approvals }) {
    const [filteredApprovals, setFilteredApprovals] = useState(approvals);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(statusOptions[0].value); // Store the entire object, not just the value
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Limit of approvals per page

    useEffect(() => {
        filterApprovals(searchTerm, statusFilter);
    }, [searchTerm, statusFilter, currentPage, pageSize]);

    // Handle search functionality
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Handle filtering by status (Pending, Approved, Rejected)
    const handleFilterChange = (selectedOption) => {
        setStatusFilter(selectedOption.value); // Now storing the selected object
        setCurrentPage(1); // Reset to the first page when filtering
    };

    // Filtering logic by name and status
    const filterApprovals = (term, filter) => {
        const lowerCaseTerm = term.toLowerCase();
        const filtered = approvals.filter((approval) => {
            const matchesName =
                approval.first_name.toLowerCase().includes(lowerCaseTerm) ||
                approval.last_name.toLowerCase().includes(lowerCaseTerm);
            const matchesStatus =
                filter === "All" ||
                (approval.last_action_status &&
                    approval.last_action_status.toLowerCase() === filter.toLowerCase());
            return matchesName && matchesStatus;
        });
        setFilteredApprovals(filtered);
    };

    // Handle pagination
    const indexOfLastApproval = currentPage * pageSize;
    const indexOfFirstApproval = indexOfLastApproval - pageSize;
    const currentApprovals = filteredApprovals.slice(indexOfFirstApproval, indexOfLastApproval);

    const canPreviousPage = currentPage > 1;
    const canNextPage = currentPage < Math.ceil(filteredApprovals.length / pageSize);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber+1);
    };

    // Calculate days since the last action and apply color coding based on days passed
    const getDaysSinceLastAction = (lastActionDate) => {
        if (!lastActionDate) return null;
        const days = differenceInDays(new Date(), new Date(lastActionDate));

        let colorClass;
        if (days <= 2) {
            colorClass = "text-green-500";
        } else if (days <= 4) {
            colorClass = "text-orange-500";
        } else {
            colorClass = "text-red-500";
        }

        return (
            <span className={`font-semibold ${colorClass}`}>
                {days} day{days !== 1 ? "s" : ""} ago
            </span>
        );
    };

    // Clear search and filter
    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter(statusOptions[0].value);
        setCurrentPage(1); // Reset to first page when clearing filters
        setFilteredApprovals(approvals);
    };

    return (
        <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="flex gap-1 justify-start w-fit mob:flex-wrap mob:gap-0 tablet:flex-wrap tablet:gap-0">
                <Input
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name..."
                    className="flex-1 p-2 border rounded-md"
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
                <Button name="Clear" className=" w-fit self-center" size="small" onClick={clearFilters} />
            </div>

            {/* Approval List */}
            <div className="bg-white shadow-md rounded-md space-y-4 overflow-hidden">
                {currentApprovals.length > 0 ? (
                    currentApprovals.map(({ employee_id, first_name, last_name, work_email, last_action_status, last_action_date, first_pending_date }) => {
                        const startDate = first_pending_date || last_action_date;
                        const formattedStartDate = startDate
                            ? new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            : "N/A";

                        return (
                            <Link href={`/hod/approvals?employee_id=${employee_id}&start=${formattedStartDate}`} key={employee_id}>
                                <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{first_name} {last_name}</p>
                                            <p className="text-sm text-gray-500">{work_email}</p>
                                            {last_action_status === "Pending" && last_action_date && (
                                                <p className="text-sm text-gray-500">
                                                    {getDaysSinceLastAction(last_action_date)} since last action
                                                </p>
                                            )}
                                        </div>
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
                previousPage={() => handlePagination(currentPage - 1)}
                nextPage={() => handlePagination(currentPage + 1)}
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
