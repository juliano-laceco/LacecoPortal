'use client'

import React from 'react';
import Select from 'react-select';
import { theme } from '../../../../../tailwind.config';

function DropdownRegular({
    options,
    isSearchable,
    isDisabled,
    isLoading,
    label,
    onChange,
    value
}) {
    const colors = theme.extend.colors;

    return (
        <div className="flex flex-col items-center justify-center gap-[3px] w-full">
            {!!label && (
                <label className="mob:text-base tablet:text-base lap:text-base desk:text-base pr-3">
                    {label}
                </label>
            )}
            <div
                className={`w-full items-center justify-center flex mob:text-sm mob:p-0 relative ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
            >
                <Select
                    classNamePrefix="react-select"
                    value={options.filter(option => option.value === value)}
                    onChange={onChange}
                    options={options}
                    isSearchable={isSearchable}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    className="px-3 py-2 rounded-md"
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            boxShadow: 'none',
                            backgroundColor: state.isDisabled ? '#DADDE2' : colors['input-bg'],
                            borderColor: state.isFocused ? colors['pric'] : colors['input-b'],
                            '&:hover': {
                                borderColor: colors['pric']
                            }
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? colors['pric'] : 'white',
                            '&:hover': {
                                backgroundColor: !state.isSelected && colors['basic-item-hov']
                            }
                        })
                    }}
                />
            </div>
        </div>
    );
}

export default DropdownRegular;