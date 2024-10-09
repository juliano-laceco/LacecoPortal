import { DateRangePicker } from "@nextui-org/react";
import { useEffect, useState, useCallback } from "react";
import { parseDate, CalendarDate } from "@internationalized/date";
import Button from "../Other/Button";
import Image from "next/image";
import DropdownFilter from "../Dropdowns/DropdownFilter";
import Input from "../Other/Input";
import { useSearchParams } from "next/navigation";

// Get the current year for validation
const currentYear = new Date().getFullYear();

function TableFilter({ filterItems, filterFunction, keywordRef, clearFunction }) {
    const searchParams = useSearchParams();
    const [dateRange, setDateRange] = useState(() => {
        const dateRangeFilter = filterItems.find(item => item.filterKey === 'date_range');
        return {
            start: dateRangeFilter && dateRangeFilter.filterValue.start_date ? parseDate(dateRangeFilter.filterValue.start_date) : null,
            end: dateRangeFilter && dateRangeFilter.filterValue.end_date ? parseDate(dateRangeFilter.filterValue.end_date) : null
        };
    });
    
    const [dateError, setDateError] = useState(null); // State to track date validation error

    // Function to parse and validate date from query string
    const parseAndValidateDate = useCallback((dateString) => {
        if (!dateString) return null;
        const date = parseDate(dateString);
        if (date.year >= 2000 && date.year <= currentYear) {
            return date;
        }
        return null;
    }, []);

    // Effect to set initial date range from query string
    useEffect(() => {
        const start_date = searchParams.get('start_date');
        const end_date = searchParams.get('end_date');

        const parsedStartDate = parseAndValidateDate(start_date);
        const parsedEndDate = parseAndValidateDate(end_date);

        if (parsedStartDate && parsedEndDate) {
            setDateRange({ start: parsedStartDate, end: parsedEndDate });
        }
    }, [searchParams, parseAndValidateDate]);

    const handleDateChange = (value) => {
        setDateRange(value);
        const start = value?.start;
        const end = value?.end;

        // Check if both start and end dates are fully filled
        if (start && end && start instanceof CalendarDate && end instanceof CalendarDate) {
            const startYear = start.year;
            const endYear = end.year;

            // Ensure year is between 2000 and the current year
            if (
                startYear >= 2000 && startYear <= currentYear &&
                endYear >= 2000 && endYear <= currentYear
            ) {
                // Clear the error message
                setDateError(null);

                // Get the formatted start and end dates for filtering
                const formattedStart = `${start.year}-${String(start.month).padStart(2, '0')}-${String(start.day).padStart(2, '0')}`;
                const formattedEnd = `${end.year}-${String(end.month).padStart(2, '0')}-${String(end.day).padStart(2, '0')}`;

                // Combine the formatted start and end dates into a single date_range value
                const dateRange = `${formattedStart}-${formattedEnd}`;

                // Call the filter function with the combined date_range string
                filterFunction('date_range', dateRange);
            } else {
                // Set the error message if the year is out of range
                setDateError(`Year must be between 2000 and ${currentYear}.`);
            }
        } else {
            // Set the error message if dates are not fully selected
            setDateError('Please select both start and end dates.');
        }
    };

    const handleClearFilters = () => {
        setDateRange(null);
        clearFunction();
        setDateError(null); // Clear any error message when filters are cleared
    };

    return (
        <div className="flex justify-between mb-4 border mob:border-none rounded-md p-3">
            <div className="flex gap-4 mob:flex-col mob:justify-center tablet:flex-col tablet:justify-center mob:gap-1">
                {filterItems.map((item, index) => {
                    if (item.type === "keyword") {
                        return (
                            <Input
                                type="text"
                                ref={keywordRef}
                                Icon={<Image src="/resources/icons/search.svg" height="25" width="25" alt="search-icon" />}
                                label={item.filterLabel}
                                onKeyDown={(e) => (e.key === "Enter") && filterFunction(item.filterKey, keywordRef.current.value)}
                                onClickIcon={() => {
                                    filterFunction(item.filterKey, keywordRef.current.value);
                                }}
                                key={index}
                                placeholder={item.filterValue || "Search..."}
                                className="w-fit"
                            />
                        );
                    } else if (item.type === "dd") {
                        return (
                            <DropdownFilter
                                classNamePrefix="react-select-dd"
                                key={index}
                                label={item.filterLabel}
                                options={item.filterOptions}
                                stateVal={item.filterValue}
                                filterFunction={(value) => filterFunction(item.filterKey, value)}
                            />
                        );
                    } else if (item.type === "date-range") {
                        return (
                            <div className="flex flex-col" key={index}>
                                <label className="mob:text-base tablet:text-base lap:text-base desk:text-base pr-3 pb-[2px]">{item.filterLabel}</label>
                                <DateRangePicker
                                    value={dateRange}
                                    onChange={handleDateChange}
                                    aria-label={`${item.filterLabel} date range`}
                                    radius="none"
                                    className="max-w-xs border rounded-md border-gray-400 overflow-hidden w-full"
                                />
                                {dateError && <p className="text-pric text-xs p-1">{dateError}</p>}
                            </div>
                        );
                    }
                    return null;
                })}

                <Image
                    title="Clear All Filters"
                    src="/resources/icons/clear-filter.svg"
                    height="40"
                    width="50"
                    className="cursor-pointer hover:bg-[#E9EBEF] max-h-[45px] max-w-[55px] mt-6 mob:hidden tablet:hidden transition-all duration-200 p-2 rounded-lg"
                    onClick={handleClearFilters}
                    alt="clear-filter"
                />
                <Button
                    primary
                    small
                    name="Clear Filters"
                    className="w-fit mt-2 lap:hidden desk:hidden"
                    onClick={handleClearFilters}
                />
            </div>
        </div>
    );
}

export default TableFilter;
