'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DropdownRegular from '../Dropdowns/DropdownRegular';

const DateRangePicker = ({ project_start_date, project_end_date, selectionMade }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [startDate, setStartDate] = useState(searchParams.get('start') || project_start_date);
    const [endDate, setEndDate] = useState(searchParams.get('end') || project_end_date);

    const handleStartDateChange = (selectedOption) => {
        setStartDate(selectedOption.value);
        const params = new URLSearchParams({ start: startDate, end: searchParams.get("end") });
        router.push(`${pathname}?${params.toString()}`);
        router.refresh();
    };

    const handleEndDateChange = (selectedOption) => {
        setEndDate(selectedOption.value);
        const params = new URLSearchParams({ start: searchParams.get("start"), end: endDate });
        router.push(`${pathname}?${params.toString()}`);
        router.refresh();
    };





    const generateDateOptions = (start_date, end_date) => {
        const options = new Set();
        let currentDate = new Date(start_date);
        const endDate = new Date(end_date);

        // Ensure that the first and last month are fully covered
        currentDate.setDate(1); // Start from the first of the month

        // Move endDate to the end of the month
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // This sets the date to the last day of the previous month

        while (currentDate <= endDate) {
            const formattedDateMonth = currentDate.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
            });
            options.add(formattedDateMonth);

            // Move to the next month
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        // Ensure the end date month is included
        const formattedEndDateMonth = endDate.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
        });
        options.add(formattedEndDateMonth);

        return Array.from(options).map(month => ({ value: month, label: month }));
    };


    const dateOptions = generateDateOptions(project_start_date, project_end_date);

    return (
        <div className="space-y-4">
            <div className="flex w-[400px] items-center">
                <DropdownRegular
                    label="From"
                    options={dateOptions}
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <DropdownRegular
                    label="To"
                    options={dateOptions}
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
