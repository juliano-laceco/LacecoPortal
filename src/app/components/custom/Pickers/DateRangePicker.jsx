'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DropdownRegular from '../Dropdowns/DropdownRegular';
import Image from 'next/image';
import { formatDate } from '@/utilities/date/date-utils';


const DateRangePicker = ({ project_start_date, project_end_date, start, end, edited, openModal }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [errorMessage, setErrorMessage] = useState('');
    const [filteredEndDateOptions, setFilteredEndDateOptions] = useState([]);

    const handleStartDateChange = (selectedOption) => {

        const newStartDate = selectedOption.value;
        const currentEndDate = searchParams.get("end") || end;
        const currentStartDate = searchParams.get("start") || start;

        if (new Date(newStartDate) > new Date(currentEndDate) && !!currentEndDate && currentEndDate !== "" && currentEndDate !== undefined) {
            setErrorMessage('Start date cannot be greater than end date.');
            return; // Return early if the date is invalid
        } else {
            setErrorMessage('');
        }

        if (newStartDate != currentStartDate) {
            const proceedWithChange = () => {
                const params = new URLSearchParams(searchParams);
                params.set("start", newStartDate);

                if (!params.has("end")) {
                    params.set("end", end || omitDayFromDate(project_end_date));
                }

                setFilteredEndDateOptions(generateDateOptions(newStartDate, project_end_date));

                router.push(`${pathname}?${params.toString()}`);
                router.refresh();
            };

            if (edited) {
                openModal(proceedWithChange, "Date Change");
            } else {
                proceedWithChange();
            }
        }
    };


    const handleEndDateChange = (selectedOption) => {

        const newEndDate = selectedOption.value;

        const currentStartDate = searchParams.get("start") || start;
        const currentEndDate = searchParams.get("end") || end;

        if (new Date(currentStartDate) > new Date(newEndDate)) {
            openModal(null, "Invalid Dates")
            return; // Return early if the date is invalid
        } else {
            setErrorMessage('');
        }

        // Only update URL and refresh if the new end date is different from the current one
        if (newEndDate != currentEndDate) {
            const proceedWithChange = () => {

                const params = new URLSearchParams(searchParams);
                params.set("end", newEndDate);

                if (!params.has("start")) {
                    params.set("start", start || omitDayFromDate(project_start_date));
                }

                router.push(`${pathname}?${params.toString()}`);
                router.refresh();
            };

            if (edited) {
                openModal(proceedWithChange, "Date Change")
            } else {
                proceedWithChange();
            }
        }
    };



    const omitDayFromDate = (date) => {
        let initialDate = new Date(date);
        return formatDate(initialDate, "m-y")
    };

    const clearDates = () => {
        const proceedWithClear = () => {
            router.push(`${pathname}`);
            router.refresh();
        };


        if (start != null && end != null) {
            if (edited) {
                openModal(proceedWithClear, "Date Clear");
            } else {
                proceedWithClear();
            }
        }


    };

    const generateDateOptions = (start_date, end_date) => {
        const options = new Set();
        let currentDate = new Date(start_date);
        const endDate = new Date(end_date);

        currentDate.setDate(1); // Start from the first of the month

        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // This sets the date to the last day of the previous month

        while (currentDate <= endDate) {
            const formattedDateMonth = formatDate(currentDate, "m-y")
            options.add(formattedDateMonth);
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return Array.from(options).map(month => ({ value: month, label: month }));
    };

    const startDateOptions = generateDateOptions(project_start_date, project_end_date);
    const endDateOptions = filteredEndDateOptions.length > 0 ? filteredEndDateOptions : generateDateOptions(project_start_date, project_end_date);

    return (
        <div className="w-fit py-4 rounded-lg flex flex-col items-center justify center gap-2 ">
            <div className="flex w-[450px] items-end">
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
                <Image title="Clear Dates" src="/resources/icons/reset.svg" height="40" width="40" className={`cursor-pointer hover:bg-[#E9EBEF] transition-all duration-200 px-2 py-2 rounded-lg"`} onClick={clearDates} alt="clear-filter" />
            </div>
            {errorMessage && <div className="text-pric">{errorMessage}</div>}
        </div>
    );
};

export default DateRangePicker;
