'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DropdownRegular from '../Dropdowns/DropdownRegular';

const DateRangePicker = ({ project_start_date, project_end_date, start, end }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [errorMessage, setErrorMessage] = useState('');
    const [filteredEndDateOptions, setFilteredEndDateOptions] = useState([]);

    const handleStartDateChange = (selectedOption) => {
        const newStartDate = selectedOption.value;
        const newEndDate = searchParams.get("end") || end;

        if (new Date(newStartDate) > new Date(newEndDate)) {
            setErrorMessage('Start date cannot be greater than end date.');
        } else {
            setErrorMessage('');
        }

        const params = new URLSearchParams(searchParams);
        params.set("start", newStartDate);

        if (!params.has("end")) {
            params.set("end", end || omitDayFromDate(project_end_date));
        }

        router.push(`${pathname}?${params.toString()}`);
        router.refresh();

        // Filter end date options based on the selected start date
        setFilteredEndDateOptions(generateDateOptions(newStartDate, project_end_date));
    };

    const handleEndDateChange = (selectedOption) => {
        const newEndDate = selectedOption.value;
        const newStartDate = searchParams.get("start") || start;

        if (new Date(newStartDate) > new Date(newEndDate)) {
            setErrorMessage('Start date cannot be greater than end date.');
        } else {
            setErrorMessage('');
        }

        const params = new URLSearchParams(searchParams);
        params.set("end", newEndDate);

        if (!params.has("start")) {
            params.set("start", start || omitDayFromDate(project_start_date));
        }

        router.push(`${pathname}?${params.toString()}`);
        router.refresh();
    };

    const omitDayFromDate = (date) => {
        let initialDate = new Date(date);
        return initialDate.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
        });
    };

    const generateDateOptions = (start_date, end_date) => {
        const options = new Set();
        let currentDate = new Date(start_date);
        const endDate = new Date(end_date);

        currentDate.setDate(1); // Start from the first of the month

        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // This sets the date to the last day of the previous month

        while (currentDate <= endDate) {
            const formattedDateMonth = currentDate.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
            });
            options.add(formattedDateMonth);

            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return Array.from(options).map(month => ({ value: month, label: month }));
    };

    const startDateOptions = generateDateOptions(project_start_date, project_end_date);
    const endDateOptions = filteredEndDateOptions.length > 0 ? filteredEndDateOptions : generateDateOptions(project_start_date, project_end_date);

    return (
        <div className="space-y-4">
            <div className="flex w-[400px] items-center">
                <DropdownRegular
                    label="From"
                    options={startDateOptions}
                    value={start || null}
                    onChange={handleStartDateChange}
                />
                <DropdownRegular
                    label="To"
                    options={endDateOptions}
                    value={end || null}
                    onChange={handleEndDateChange}
                />
            </div>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};

export default DateRangePicker;
