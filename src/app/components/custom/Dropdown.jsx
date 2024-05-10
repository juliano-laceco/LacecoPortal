"use client"

import Select from 'react-select'

function Dropdown({ options, isSearchable, isDisabled, isLoading, defaultValue }) {
    return (

        <div class="flex flex-col items-start gap-[3px] w-full">
            <label class="mob:text-xs tablet:text-sm lap:text-base desk:text-base pr-3 mob:mt-1 ">Work Email</label>
            <div class="w-full flex relative">
                <Select
                    classNamePrefix="react-select-dd"
                    options={options}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: "100%"
                        }),
                    }}
                    IsSearchable={isSearchable}
                    defaultValue={options[0]}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    classNames={{
                        control: (state) =>
                            isDisabled ? "bg-input-dis border-input-b cursor-not-allowed" : state.isFocused ? 'border-pric ring-0 hover:border-pric cursor-pointer' : 'border-input-b cursor-pointer',
                    }}
                />
            </div>
        </div>

    )
}

export default Dropdown
