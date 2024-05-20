"use client"

import Select from 'react-select';
import { theme } from "../../../../tailwind.config"
import { useRouter } from "next/navigation"

function DropdownFilter({ options, isSearchable, isDisabled, isLoading, label, stateVal, pushQS }) {


    const colors = theme.extend.colors
    const router = useRouter()
    return (
        <div className="flex flex-col  items-start gap-[3px] w-full">
            <label className="mob:text-base tablet:text-base lap:text-base desk:text-base pr-3"> {label} </label>
            <div className={`w-full flex mob:text-sm mob:p-0 relative ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
                <Select
                    classNamePrefix="react-select-dd"
                    options={options}
                    value={options.find(x => x.value === stateVal)}
                    onChange={(option) => pushQS(option?.value ?? "")}
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
        </div >
    );
}

export default DropdownFilter;
