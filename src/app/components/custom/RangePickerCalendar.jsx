"use client";

import React from "react";
import { RangeCalendar, Button, ButtonGroup } from "@nextui-org/react";
import { today, getLocalTimeZone, startOfWeek, endOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { formatDate } from "@/utilities/date/date-utils";

export default function RangePickerCalendar() {
    const { locale } = useLocale();
    const now = today(getLocalTimeZone());

    const thisWeek = {
        start: startOfWeek(now, locale),
        end: endOfWeek(now, locale),
    };

    const [value, setValue] = React.useState(thisWeek);
    const [focusedValue, setFocusedValue] = React.useState(thisWeek.end);
    const [dateRangeText, setDateRangeText] = React.useState(`${formatDate(thisWeek.start, "d-m-y")} - ${formatDate(thisWeek.end, "d-m-y")}`);

    const lastWeek = {
        start: startOfWeek(now.subtract({ weeks: 1 }), locale),
        end: endOfWeek(now.subtract({ weeks: 1 }), locale),
    };
    const weekBeforeLast = {
        start: startOfWeek(now.subtract({ weeks: 2 }), locale),
        end: endOfWeek(now.subtract({ weeks: 2 }), locale),
    };

    const handleRangeChange = (newValue) => {
        let adjustedEnd = newValue?.end;
        if (adjustedEnd && adjustedEnd.compare(thisWeek.end) > 0) {
            adjustedEnd = thisWeek.end;
        }
        
        const adjustedValue = {
            start: newValue?.start || value.start,
            end: adjustedEnd || value.end,
        };

        setValue(adjustedValue);

        if (adjustedValue.start && adjustedValue.end) {
            setDateRangeText(`${formatDate(adjustedValue.start, "d-m-y")} - ${formatDate(adjustedValue.end, "d-m-y")}`);
        }
    };

    return (
        <div className="flex flex-col gap-4">
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
                    <ButtonGroup
                        fullWidth
                        className="w-full px-2 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                        radius="sm"
                        variant="light"
                        size="sm"
                    >
                        <Button
                            onPress={() => {
                                setValue(weekBeforeLast);
                                setFocusedValue(weekBeforeLast.end);
                                setDateRangeText(`${formatDate(weekBeforeLast.start, "d-m-y")} - ${formatDate(weekBeforeLast.end, "d-m-y")}`);
                            }}
                        >
                            2 Weeks Ago
                        </Button>
                        <Button
                            onPress={() => {
                                setValue(lastWeek);
                                setFocusedValue(lastWeek.end);
                                setDateRangeText(`${formatDate(lastWeek.start, "d-m-y")} - ${formatDate(lastWeek.end, "d-m-y")}`);
                            }}
                        >
                            Last Week
                        </Button>
                        <Button
                            onPress={() => {
                                setValue(thisWeek);
                                setFocusedValue(thisWeek.end);
                                setDateRangeText(`${formatDate(thisWeek.start, "d-m-y")} - ${formatDate(thisWeek.end, "d-m-y")}`);
                            }}
                        >
                            This Week
                        </Button>
                    </ButtonGroup>
                }
                value={value}
                onChange={handleRangeChange}
                onFocusChange={setFocusedValue}
                maxValue={thisWeek.end} // Prevent selecting dates beyond the end of the current week
            />
        </div>
    );
}
