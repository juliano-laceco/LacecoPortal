'use client'

import React from 'react';
import Select from 'react-select';
import { theme } from '../../../../../tailwind.config';

function DropdownFilter({ options, isSearchable, isDisabled, isLoading, label, stateVal, filterFunction }) {
    const colors = theme.extend.colors;

    // Find the default option based on the stateVal
    const defaultOption = options.find(x => x.value == stateVal);

    // Handle onChange event
    const handleChange = (option) => {
        const value = option ? option.value : '';
        filterFunction(value);
    };

    return (
        <div className="flex flex-col items-start gap-[3px] w-full">
            <label className="mob:text-base tablet:text-base lap:text-base desk:text-base pr-3"> {label} </label>
            <div className={`w-full flex mob:text-sm mob:p-0 relative ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
                <Select
                    classNamePrefix="react-select-dd"
                    options={options}
                    defaultValue={defaultOption}
                    value={defaultOption || ""}
                    onChange={(option) => handleChange(option)}
                    isSearchable={isSearchable}
                    isDisabled={isLoading || isDisabled}
                    isClearable
                    isLoading={isLoading}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            boxShadow: "none",
                            backgroundColor: state.isDisabled ? "#DADDE2" : colors["input-bg"],
                            borderColor: state.isFocused ? colors["pric"] : colors["input-b"],
                            "&:hover": {
                                borderColor: colors["pric"]
                            }
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? colors["pric"] : "white",
                            "&:hover": {
                                backgroundColor: !state.isSelected && colors["basic-item-hov"],
                            }
                        })
                    }}
                />
            </div>
        </div>
    );
}

export default DropdownFilter;
