"use client";

import React, { useState, useEffect } from "react";
import Input from "../../custom/Other/Input"; // Custom input component
import DropdownRegular from "../../custom/Dropdowns/DropdownRegular";
import Button from "../../custom/Other/Button";
import Link from "next/link";
import TablePagination from "../../custom/Table/TablePagination";
import { determineDayStatus } from "./approval-utils";

const statusOptions = [
    { value: "All", label: "All" },
    { value: "upToDate", label: "Approved Up To Date" }, // Green
    { value: "missingDays", label: "Missing Days" }, // Red
    { value: "pending", label: "Pending Approval" }, // Orange
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

            const { status } = determineDayStatus(approval);

            let matchesStatus = false;

            // Check if the current filter matches the determined status
            switch (filter) {
                case "upToDate":
                    matchesStatus = status === "Approved Up To Date";
                    break;
                case "missingDays":
                    matchesStatus = status === "Missing Days";
                    break;
                case "pending":
                    matchesStatus = status === "Pending Approval";
                    break;
                case "All":
                    matchesStatus = true; // Show all statuses
                    break;
                default:
                    matchesStatus = true;
                    break;
            }

            const matchesDiscipline = discipline === "All" || approval.discipline_id === discipline;

            // Return true if the name, status, and discipline all match
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
                    currentApprovals.map((approval) => {
                        const { status, final_date } = determineDayStatus(approval);

                        // Assign color based on status
                        let colorClass;
                        if (status === "Approved Up To Date") {
                            colorClass = "bg-green-500";
                        } else if (status === "Missing Days") {
                            colorClass = "bg-red-500";
                        } else if (status === "Pending Approval") {
                            colorClass = "bg-orange-400";
                        }

                        const formattedFinalDate = final_date
                            ? new Date(final_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
                            : "N/A";

                        return (
                            <Link href={`/timesheet/approvals?employee_id=${approval.employee_id}`} key={approval.employee_id}>
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
                                                <p className="font-semibold text-base mob:text-sm">{approval.first_name} {approval.last_name}</p>
                                                <p className="text-sm text-gray-500">{approval.discipline_name}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold mob:text-xs">
                                            <span className={`text-xs p-1 text-white rounded-md font-semibold ${colorClass}`}>
                                                {formattedFinalDate}
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
