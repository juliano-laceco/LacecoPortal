"use client";

import React, { useEffect, useState } from "react";
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone, startOfWeek, endOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { formatDate } from "@/utilities/date/date-utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function RangePickerCalendar({ maxDate, start, appendToQS }) {
    const { locale } = useLocale();
    const now = today(getLocalTimeZone());
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const formatToLocale = (date) => {
        return today(getLocalTimeZone()).set({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        });
    };

    // Convert start and maxDate to the correct format expected by RangeCalendar
    const startFormatted = formatToLocale(start);
    const maxDateFormatted = formatToLocale(maxDate);

    // Reusable function to get the Monday-Sunday range
    const getWeekRange = (date) => {
        let startOfWeekDate = startOfWeek(date, locale, { weekStartsOn: 1 });
        let endOfWeekDate = endOfWeek(startOfWeekDate, locale, { weekStartsOn: 1 });

        // Ensure the end date doesn't exceed maxDate
        if (endOfWeekDate.compare(maxDateFormatted) > 0) {
            endOfWeekDate = maxDateFormatted;
        }

        return {
            start: startOfWeekDate.add({ days: 1 }), // Monday
            end: endOfWeekDate.add({ days: 1 }) // Sunday
        };
    };

    const default_range = getWeekRange(startFormatted);

    const thisWeek = getWeekRange(now);
    const lastWeek = getWeekRange(now.subtract({ weeks: 1 }));
    const weekBeforeLast = getWeekRange(now.subtract({ weeks: 2 }));

    const [value, setValue] = useState(default_range);
    const [focusedValue, setFocusedValue] = useState(thisWeek.end);
    const [dateRangeText, setDateRangeText] = useState(`${formatDate(default_range.start, "d-m-y")} - ${formatDate(default_range.end, "d-m-y")}`);
    const [selectedWeek, setSelectedWeek] = useState("default_range");

    const setQSParams = (adjustedValue) => {
        // Update the search parameters
        const params = new URLSearchParams(searchParams);
        params.set("start", formatDate(adjustedValue.start, "YYYY-MM-DD"));
        params.set("end", formatDate(adjustedValue.end, "YYYY-MM-DD"));

        router.replace(`${pathname}?${params.toString()}`);
        router.refresh();
    };

    const handleRangeChange = (newValue) => {
        if (!newValue?.start) return;

        const adjustedValue = getWeekRange(newValue.start);

        setValue(adjustedValue);
        setFocusedValue(adjustedValue.end);

        if (adjustedValue.start && adjustedValue.end) {
            setDateRangeText(`${formatDate(adjustedValue.start, "d-m-y")} - ${formatDate(adjustedValue.end, "d-m-y")}`);

            // Changing the QS if needed
            appendToQS && setQSParams(adjustedValue);
        }

        // Check if the adjusted value matches any predefined range
        if (
            adjustedValue.start.compare(weekBeforeLast.start) === 0 &&
            adjustedValue.end.compare(weekBeforeLast.end) === 0
        ) {
            setSelectedWeek("weekBeforeLast");
        } else if (
            adjustedValue.start.compare(lastWeek.start) === 0 &&
            adjustedValue.end.compare(lastWeek.end) === 0
        ) {
            setSelectedWeek("lastWeek");
        } else if (
            adjustedValue.start.compare(thisWeek.start) === 0 &&
            adjustedValue.end.compare(thisWeek.end) === 0
        ) {
            setSelectedWeek("thisWeek");
        } else {
            setSelectedWeek(""); // Clear the selection if it doesn't match any predefined range
        }
    };

    const handleButtonClick = (weekRange, selectedWeekKey) => {
        setValue(weekRange);
        setSelectedWeek(selectedWeekKey);
        handleRangeChange(weekRange); // Ensure the range is processed consistently and URL is updated
    };

    const handleNextWeek = () => {
        const nextStart = value.start.add({ weeks: 1 });
        const nextRange = getWeekRange(nextStart);

        // Check if the next range exceeds maxDate
        if (nextRange.end.compare(maxDateFormatted) <= 0) {
            handleRangeChange(nextRange);
        }
    };

    const handlePreviousWeek = () => {
        const previousStart = value.start.subtract({ weeks: 1 });
        const previousRange = getWeekRange(previousStart);
        handleRangeChange(previousRange);
    };

    useEffect(() => {
        handleRangeChange(default_range); // Ensure the default range goes through the same process
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="text-sm border border-gray-300 text-center bg-white shadow-xl p-2 rounded-md text-sec-textc font-semibold">
                {dateRangeText}
            </div>
            <RangeCalendar
                classNames={{
                    content: "w-full",
                }}
                focusedValue={focusedValue}
                nextButtonProps={{
                    variant: "bordered",
                }}
                prevButtonProps={{
                    variant: "bordered",
                }}
                topContent={
                    <>
                        <div className="flex w-full px-2 pb-2 pt-3 gap-1 bg-content1 rounded-sm">
                            <button
                                onClick={() => handleButtonClick(weekBeforeLast, "weekBeforeLast")}
                                className={`w-full text-xs py-2 px-[2px] rounded-md transition-colors ${selectedWeek === "weekBeforeLast" ? "bg-gray-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                            >
                                2 Weeks Ago
                            </button>
                            <button
                                onClick={() => handleButtonClick(lastWeek, "lastWeek")}
                                className={`w-full text-xs py-2 px-[2px] rounded-md transition-colors ${selectedWeek === "lastWeek" ? "bg-gray-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                            >
                                Last Week
                            </button>
                            <button
                                onClick={() => handleButtonClick(thisWeek, "thisWeek")}
                                className={`w-full text-xs py-2 px-[2px]  rounded-md  transition-colors ${selectedWeek === "thisWeek" ? "bg-gray-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                            >
                                This Week
                            </button>
                        </div>
                        <div className="flex justify-between w-full px-2 pt-3 text-white">
                            <button
                                onClick={handlePreviousWeek}
                                className="text-xs py-2 px-4 rounded-md transition-colors bg-pric hover:bg-pri-hovc"
                            >
                                {"< Prev"}
                            </button>
                            <button
                                onClick={handleNextWeek}
                                className="text-xs py-2 px-4 rounded-md transition-colors bg-pric hover:bg-pri-hovc disabled:bg-pric disabled:hover:bg-pric disabled:opacity-[0.6] disabled:cursor-not-allowed"
                                disabled={value.end.compare(maxDateFormatted) >= 0}
                            >
                                {"Next >"}
                            </button>
                        </div>
                    </>
                }
                value={value}
                onChange={handleRangeChange}
                onFocusChange={setFocusedValue}
                maxValue={maxDateFormatted} // Use the maxDateFormatted prop instead of a hardcoded value
            />
        </div>
    );
}
