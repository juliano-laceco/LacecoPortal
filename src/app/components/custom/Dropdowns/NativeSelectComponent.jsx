"use client"

import React, { useEffect } from 'react';
import 'select2/dist/css/select2.min.css';
import $ from 'jquery';
import 'select2';

const NativeSelectComponent = ({ options, value, handleChange, row, col, placeholder = "Select an option" }) => {

    useEffect(() => {
        // Initialize Select2
        const $select = $(`#select-${row}-${col}`);
        $select.select2({
            placeholder: placeholder
        });

        // Cleanup on unmount
        return () => {
            $select.select2('destroy');
        };
    }, [row, col, placeholder]);

    return (
        <select
            id={`select-${row}-${col}`}
            value={value}
            onChange={(e) => handleChange(e, row, col)}
            className="border border-gray-300 rounded-md p-1 box-border text-center bg-gray-100 select-none w-full focus:ring-red-500 focus:ring-[1.5px] focus:border-none"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default NativeSelectComponent;
