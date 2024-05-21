"use client"

import React, { useMemo, useRef } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import DropdownFilter from '@/app/components/custom/DropdownFilter';
import Input from '@/app/components/custom/Input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function EmployeeTableWrapper({ data, filterItems, tableHeaders }) {

  const router = useRouter()
  const pathname = usePathname()
  const keywordRef = useRef()
  const searchParams = useSearchParams()

  const columns = useMemo(
    () => tableHeaders,
    []
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: data
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const pushQS = (itemKey, value) => {

    const params = new URLSearchParams(searchParams.toString())

    if (!value) {
      params.delete(itemKey)
    } else {
      params.set(itemKey, value)
    }

    router.push(`${pathname}?${params.toString()}`)
    router.refresh()
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mb-4">

        <div className="flex gap-4 mob:flex-col mob:justify-center mob:justify-center tablet:flex-col tablet:justify-center mob:gap-1">
          {
            filterItems.map((item, index) => (

              item.type === "keyword" ?
                <Input
                  type="text"
                  ref={keywordRef}
                  Icon={<Image src="/resources/icons/search.svg" height="30" width="30" />}
                  label={item.filterLabel}
                  onKeyDown={(e) => (e.key === "Enter") && pushQS(item.filterKey, keywordRef.current.value)}
                  onClickIcon={() => {
                    pushQS(item.filterKey, keywordRef.current.value);
                  }}
                  key={index}
                  placeholder={item.filterValue || "Search..."}
                  className="w-fit"
                /> :
                <DropdownFilter
                  classNamePrefix="react-select-dd"
                  key={index}
                  label={item.filterLabel}
                  options={item.filterOptions}
                  stateVal={item.filterValue}
                  pushQS={(value) => pushQS(item.filterKey, value)}
                />
            ))
          }

        </div>
      </div>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200 table-auto"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={crypto.randomUUID()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`px-6 py-3 bg-white font-bold  text-left text-xs leading-4  text-gray-500 uppercase tracking-wider ${column && !column.mobile && 'mob:hidden'
                    }`}
                  key={crypto.randomUUID()}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
                      className={`px-6 py-4 whitespace-no-wrap text-sm mob:text-xs mob:px-3 mob:py-3 leading-5 text-gray-500 ${column && !column.mobile && 'mob:hidden'
                        }`}
                      key={crypto.randomUUID()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTableWrapper