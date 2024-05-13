import React, { useEffect } from 'react';
import Select from 'react-select';

function Dropdown({ options, value, onChange, isSearchable, isDisabled, isLoading , defaultValue, label , error}) {

    const errorClasses = 'text-pric text-[1.5ex] ml-1';
    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    useEffect(() => {
        handleChange(null);
    }, []);

    return (
        <div className="flex flex-col items-start gap-[3px] w-full">
            <label className="mob:text-xs tablet:text-sm lap:text-base desk:text-base pr-3 mob:mt-1 ">{label}</label>
            <div className="w-full flex relative">
                <Select
                    classNamePrefix="react-select-dd"
                    options={options}
                    value={value}
                    onChange={handleChange}
                    isSearchable={isSearchable}
                    isDisabled={isDisabled}
                    isClearable
                    isLoading={isLoading}
                    classNames={{
                        control: (state) =>
                            isDisabled ? "bg-input-dis border-input-b cursor-not-allowed" : state.isFocused ? 'border-pric bg-inputring-0 hover:border-pric cursor-pointer' : 'border-input-b cursor-pointer',
                    }}
                />
            </div>
            {error && <div className={errorClasses}>{error}</div>}
        </div>
    );
}

export default Dropdown;
