"use client"

import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { formatDate } from '@/utilities/date/date-utils';
import DropdownFilter from '@/app/components/custom/DropdownFilter';
import Input from '@/app/components/custom/Input';
import { useRouter } from 'next/navigation';

function EmployeeTableWrapper({ data, filterItems , searchParams}) {

  const router = useRouter()

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'fullName',
        Cell: ({ row }) => (
          <div>
            {row.original.first_name} {row.original.last_name}
          </div>
        ),
      },
      {
        Header: 'Email',
        accessor: 'work_email',
      },
      {
        Header: 'Division',
        accessor: 'division_name',
      },
      {
        Header: 'Discipline',
        accessor: 'discipline_name',
      },
      {
        Header: 'Position',
        accessor: 'position_name',
      },
      {
        Header: 'Grade',
        accessor: 'grade_code',
      },
      {
        Header: 'Created On',
        accessor: 'created_on',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Status',
        accessor: 'status_id',
      },
    ],
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
    state,
    setGlobalFilter,
  } = tableInstance;


  const { globalFilter } = state;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mb-4">

        <div className="flex space-x-4 mob:hidden">
          <Input
            type="text"
            label="Search"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Enter keywords ..."
            className="w-fit"
          />

          {
            filterItems.map((item) => (
              <DropdownFilter
                classNamePrefix="react-select-dd"
                label={item.filterLabel}
                options={item.filterOptions}
                stateVal={""}
                pushQS={(value) => (router.push(`/hr/employee/all-test?${item.filterKey}=${value}`))}
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
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 bg-white font-bold  text-left text-xs leading-4  text-gray-500 uppercase tracking-wider "
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
              <tr {...row.getRowProps()} className="bg-white">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTableWrapper
