import { useEffect, useState } from "react";
import Button from "../Other/Button";
import Image from "next/image";
import DropdownFilter from "../Dropdowns/DropdownFilter";
import Input from "../Other/Input";
import { useSearchParams, useRouter } from "next/navigation";

// Get the current year for validation
const currentYear = new Date().getFullYear();

function TableFilter({ filterItems, filterFunction, keywordRef, clearFunction }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state for the date range with parsed values from QS or null
    const [dateRange, setDateRange] = useState({
        start: searchParams.get('start_date') || "",
        end: searchParams.get('end_date') || ""
    });

    // Effect to synchronize QS with state when the component loads
    useEffect(() => {
        const start_date = searchParams.get('start_date');
        const end_date = searchParams.get('end_date');

        if (start_date && end_date) {
            setDateRange({
                start: start_date,
                end: end_date
            });
        }
    }, [searchParams]);

    // Function to handle changes in date inputs
    const handleDateChange = (e, key) => {
        const value = e.target.value;
        setDateRange((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    // Function to validate and apply the date range
    const applyDateRange = () => {
        const { start, end } = dateRange;

        // Validate both dates
        if (start && end) {
            const startYear = new Date(start).getFullYear();
            const endYear = new Date(end).getFullYear();

            // Ensure the years are between 2000 and the current year
            if (startYear >= 2000 && startYear <= currentYear && endYear >= 2000 && endYear <= currentYear) {
                // Combine the dates and call the filter function
                const dateRangeValue = `${start}-${end}`;
                filterFunction('date_range', dateRangeValue);
            } else {
                console.log('Year must be between 2000 and the current year.');
            }
        } else {
            console.log('Both start and end dates must be selected.');
        }
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
                                <div className="flex gap-2">
                                    {/* Start Date Input */}
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) => handleDateChange(e, 'start')}
                                        className="max-w-xs border rounded-md border-gray-400"
                                    />

                                    {/* End Date Input */}
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) => handleDateChange(e, 'end')}
                                        className="max-w-xs border rounded-md border-gray-400"
                                    />

                                    {/* Apply Date Range Button */}
                                    <button
                                        onClick={applyDateRange}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                    >
                                        Apply
                                    </button>
                                </div>
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
                    onClick={clearFunction}
                    alt="clear-filter"
                />
                <Button primary small name="Clear Filters" className="w-fit mt-2 lap:hidden desk:hidden" onClick={clearFunction} />
            </div>
        </div>
    );
}

export default TableFilter;
