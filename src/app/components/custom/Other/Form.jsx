"use client";

import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { theme } from "../../../../../tailwind.config";

function Form({
    title,
    children,
    handleSubmit,
    onSubmit,
    submitText,
    submit,
    isSubmitting,
    isDisabled,
    className,
    AdditionalButton,
    columns = { default: 1, mob: 1, tablet: 2, lap: 3, desk: 3 } // default column values
}) {
    const screens = theme.extend.screens;

    const getGridColumns = (width) => {
        if (width >= parseInt(screens.desk.min)) {
            return columns.desk;
        } else if (width >= parseInt(screens.lap.min)) {
            return columns.lap;
        } else if (width >= parseInt(screens.tablet.min)) {
            return columns.tablet;
        } else if (width >= parseInt(screens.mob.min)) {
            return columns.mob;
        } else {
            return columns.default;
        }
    };

    const [gridColumns, setGridColumns] = useState(() => getGridColumns(window.innerWidth));

    const updateGridColumns = useCallback(() => {
        const width = window.innerWidth;
        setGridColumns(getGridColumns(width));
    })

    useEffect(() => {
        window.addEventListener("resize", updateGridColumns);
        return () => {
            window.removeEventListener("resize", updateGridColumns);
        };
    }, [updateGridColumns]);

    const inlineGridCols = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
        gap: '0.5rem',
    };

    return (
        <div className={`p-6 mob:p-4 tablet:p-4 lap:p-4 ${className}`}>
            {!!title && <p className="font-bold text-3xl mob:text-3xl py-6">{title}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={inlineGridCols}>
                    {children}
                </div>
                <div className="flex items-center justify-between gap-2 mt-3">
                    <div className="flex gap-3 items-center">{AdditionalButton}</div>
                    <div className="col-span-full">
                        <Button name={submitText} submit={submit} isDisabled={isDisabled || isSubmitting} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
