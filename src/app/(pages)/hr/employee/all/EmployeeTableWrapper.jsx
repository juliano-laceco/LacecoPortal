"use client"

import React, { useMemo, useRef } from 'react';
import { theme } from '../../../../../../tailwind.config';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination
} from 'react-table';
import DropdownFilter from '@/app/components/custom/DropdownFilter';
import Input from '@/app/components/custom/Input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Select from 'react-select';

function EmployeeTableWrapper({ data, filterItems, tableHeaders }) {
  const router = useRouter();
  const pathname = usePathname();
  const keywordRef = useRef();
  const searchParams = useSearchParams();
  const pageSizeOptions = [
    { value: 1, label: 'Show 1' },
    { value: 2, label: 'Show 2' },
    { value: 3, label: 'Show 3' },
    { value: 4, label: 'Show 4' },
    { value: 5, label: 'Show 5' },
  ];

  const colors = theme.extend.colors;
  const columns = useMemo(
    () => tableHeaders,
    [tableHeaders]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 1 }, // Initialize the pageSize to 1
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of 'rows', use 'page' to get the paginated rows
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const pushQS = (itemKey, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(itemKey);
    } else {
      params.set(itemKey, value);
    }

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="container mx-auto min-w-full">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 mob:flex-col mob:justify-center tablet:flex-col tablet:justify-center mob:gap-1">
          {filterItems.map((item, index) => (
            item.type === "keyword" ? (
              <Input
                type="text"
                ref={keywordRef}
                Icon={<Image src="/resources/icons/search.svg" height="25" width="25" />}
                label={item.filterLabel}
                onKeyDown={(e) => (e.key === "Enter") && pushQS(item.filterKey, keywordRef.current.value)}
                onClickIcon={() => {
                  pushQS(item.filterKey, keywordRef.current.value);
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
                pushQS={(value) => pushQS(item.filterKey, value)}
              />
            )
          ))}
        </div>
      </div>
      <table
        {...getTableProps()}
        className="min-w-full divide-y rounded-lg shadow-xl overflow-hidden divide-gray-200 table-auto"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={crypto.randomUUID()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`px-6 py-3 bg-white text-black text-center font-bold  text-xs uppercase tracking-wider ${column && !column.mobile && 'mob:hidden'}`}
                  key={crypto.randomUUID()}
                >
                  {column.render('Header')}
                  <span className={column.isSortedDesc ? 'text-red-500' : ''}>
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-white" key={crypto.randomUUID()}>
                {row.cells.map((cell) => {
                  // Find the column definition from tableHeaders
                  const column = tableHeaders.find(
                    (col) => col.accessor === cell.column.id
                  );

                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`px-6 py-4 w-fit text-sm mob:text-xs mob:px-3 mob:py-3 leading-5 text-sec-txtc overflow-hidden text-ellipsis ${column && !column.mobile && 'mob:hidden'}`}
                      key={crypto.randomUUID()}
                    >
                      <div className="flex justify-center items-center">
                        {cell.render('Cell')}
                      </div>

                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-center my-8">
        <div className="pagination flex gap-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`px-3 py-2 rounded-md ${canPreviousPage
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-2 rounded-md ${canPreviousPage
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {'<'}
          </button>
          <span className="flex gap-2">
            {pageOptions.map((pageOption, index) => (
              <button
                key={index}
                onClick={() => gotoPage(pageOption)}
                className={`px-3 py-2 rounded-md ${pageOption === pageIndex
                  ? 'bg-pric text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
              >
                {pageOption + 1}
              </button>
            ))}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-2 rounded-md ${canNextPage
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`px-3 py-2 rounded-md ${canNextPage
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {'>>'}
          </button>
          <Select
            classNamePrefix="react-select"
            value={pageSizeOptions.find(option => option.value === pageSize)}
            onChange={(selectedOption) => setPageSize(selectedOption.value)}
            options={pageSizeOptions}
            isSearchable={false}
            className="px-3 py-2 rounded-md"
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
    </div>
  );
}

export default EmployeeTableWrapper;
