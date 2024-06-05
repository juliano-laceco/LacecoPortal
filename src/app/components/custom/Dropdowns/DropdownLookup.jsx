"use client"

import { useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useController } from 'react-hook-form';
import { theme } from "../../../../../tailwind.config";

function DropdownLookup({ options, input_name, isSearchable, isDisabled, isLoading, isClearable, defaultValue, label, error, control, handler, isMulti, isCreatable }) {

    const { field: { value: ddValue, onChange: ddOnChange, ...rest } } = useController({ name: input_name, control });

    useEffect(() => {
        if (defaultValue && !ddValue) {
            ddOnChange(defaultValue);
        }
    }, [defaultValue, ddValue, ddOnChange]);

    const errorClasses = 'text-pric text-[1.5ex] ml-1';
    const colors = theme.extend.colors;

    const handleOnChange = (option) => {
        if (Array.isArray(option)) {
            ddOnChange(option);
            !!handler && handler(option);
        } else {
            ddOnChange(option ? option.value : option);
            !!handler && handler(option?.value ?? null);
        }
    };

    const SelectComponent = isCreatable ? CreatableSelect : Select;

    return (
        <div className="flex flex-col items-start gap-[3px] w-full">
            <label className="mob:text-base tablet:text-base lap:text-base desk:text-base pr-3">{label}</label>
            <div className={`w-full flex mob:text-sm mob:p-0 relative ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
                <SelectComponent
                    classNamePrefix="react-select-dd"
                    options={options}
                    value={!Array.isArray(ddValue) ? options.find(x => x.value == ddValue) : ddValue}
                    onChange={option => handleOnChange(option)}
                    defaultValue={!Array.isArray(defaultValue) ? options.find(x => x.value == defaultValue) : defaultValue}
                    isSearchable={isSearchable}
                    isDisabled={isLoading || isDisabled}
                    isClearable={isClearable}
                    isLoading={isLoading}
                    isMulti={isMulti}
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
                    {...rest}
                />
            </div>
            {error && <div className={errorClasses}>{error}</div>}
        </div>
    );
}

export default DropdownLookup;
