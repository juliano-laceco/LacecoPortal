import Image from "next/image";
import DropdownFilter from "../Dropdowns/DropdownFilter";
import Input from "../Input";
import Button from "../Button";

function TableFilter({ filterItems, filterFunction, keywordRef , clearFunction }) {
    return (
        <div className="flex justify-between mb-4 border mob:border-none rounded-md p-3">
            <div className="flex gap-4 mob:flex-col mob:justify-center tablet:flex-col tablet:justify-center mob:gap-1">
                {filterItems.map((item, index) => (
                    item.type === "keyword" ? (
                        <Input
                            type="text"
                            ref={keywordRef}
                            Icon={<Image src="/resources/icons/search.svg" height="25" width="25" />}
                            label={item.filterLabel}
                            onKeyDown={(e) => (e.key === "Enter") && filterFunction(item.filterKey, keywordRef.current.value)}
                            onClickIcon={() => {
                                filterFunction(item.filterKey, keywordRef.current.value);
                            }}
                            key={index}
                            placeholder={item.filterValue || "Search..."}
                            className="w-fit"
                        />
                    ) : (
                        <DropdownFilter
                            classNamePrefix="react-select-dd"
                            key={index}
                            label={item.filterLabel}
                            options={item.filterOptions}
                            stateVal={item.filterValue}
                            filterFunction={(value) => filterFunction(item.filterKey, value)}
                        />
                    )
                ))}
                <Image title="Clear All Filters" src="/resources/icons/clear-filter.svg" height="40" width="50" className="cursor-pointer hover:bg-[#E9EBEF] mob:hidden tablet:hidden transition-all duration-200 px-2 rounded-lg mt-5" onClick={clearFunction} />
                <Button primary small name="Clear Filters" className="w-fit mt-2 lap:hidden desk:hidden" onClick={clearFunction} />
            </div>
        </div>
    )
}

export default TableFilter
