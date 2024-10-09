"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination
} from 'react-table';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TableFilter from '@/app/components/custom/Table/TableFilter';
import TableBody from '@/app/components/custom/Table/TableBody';
import TablePagination from '@/app/components/custom/Table/TablePagination';

function TableWrapper({ data, filterItems, tableHeaders, isPaginated, isFilterable, minPageSize, maxPageSize, pageSizeStep, title, subTitle, nonClearableQS, children, isSelectable }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keywordRef = useRef();
  const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows


  useEffect(() => {
    console.log("SELECTED ROWS", selectedRows)
  }, [selectedRows])
  const pageSizeOptions = [];
  for (let i = minPageSize; i <= maxPageSize; i += pageSizeStep) {
    pageSizeOptions.push({ value: i, label: `Show ${i}` });
  }

  // Define columns including the selectable checkbox if `isSelectable` is true
  const columns = useMemo(() => {
    const baseColumns = tableHeaders;
    if (isSelectable) {
      return [
        {
          // Checkbox column for selecting rows
          Header: () => (
            <div>
              <input
                type="checkbox"
                className="text-pric focus:ring-pric rounded-md duration-100 ease" // Apply Tailwind classes for the "pric" color
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </div>
          ),
          accessor: 'select',
          Cell: ({ row }) => (
            <input
              type="checkbox"
              className="text-pric focus:ring-pric rounded-md duration-100 ease" // Apply Tailwind classes for the "pric" color
              checked={selectedRows.includes(row.original)}
              onChange={() => handleRowCheckboxChange(row.original)}
            />
          ),
          disableSortBy: true // Disable sorting for the checkbox column
        },
        ...baseColumns,
      ];
    }
    

    return baseColumns;
  }, [data, tableHeaders, selectedRows, isSelectable]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: minPageSize },
    },
    useFilters,
    useGlobalFilter,
    useSortBy, // Sorting plugin
    usePagination
  );

  const {
    state: { pageIndex, pageSize },
  } = tableInstance;

  const pushQS = (itemKey, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(itemKey);
    } else {
      params.set(itemKey, typeof value === 'string' ? value.trim() : value);
    }

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const clearFunction = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newParams = new URLSearchParams();

    nonClearableQS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        newParams.set(key, value);
      }
    });

    const queryString = newParams.toString();

    if (queryString.length > 0) {
      router.push(`${pathname}?${queryString}`);
    } else {
      router.push(pathname);
    }

    router.refresh();
  };

  // Function to handle row selection and log the row if not already logged
  const handleRowCheckboxChange = (row) => {
    toggleRowSelection(row);
  };

  // Function to handle row selection
  const toggleRowSelection = (row) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(row)) {
        return prevSelectedRows.filter((selectedRow) => selectedRow !== row);
      } else {
        return [...prevSelectedRows, row];
      }
    });
  };

  // Function to handle select/deselect all rows
  const toggleSelectAll = (isSelectAll) => {
    if (isSelectAll) {
      setSelectedRows(data);
      data.forEach((row) => {
        if (!selectedRows.includes(row)) {
          console.log("Selected Row:", row); // Log each row when "select all" is applied
        }
      });
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="container mx-auto min-w-full z-100 border rounded-lg shadow-xl panel overflow-y-visible">
      <div className="table-wrapper bg-white p-5 mob:p-4 rounded-lg">
        <h1 className="font-bold text-3xl">{title}</h1>
        <h3 className="py-2 mb-3">{subTitle}</h3>
        {isFilterable && (
          <TableFilter
            filterItems={filterItems}
            filterFunction={pushQS}
            clearFunction={clearFunction}
            keywordRef={keywordRef}
          />
        )}
        <TableBody {...tableInstance} tableHeaders={tableHeaders} />
        {children}
        {isPaginated && data.length > 0 && (
          <TablePagination
            {...tableInstance}
            pageSize={pageSize}
            pageIndex={pageIndex}
            pageSizeOptions={pageSizeOptions}
          />
        )}
      </div>
    </div>
  );
}

export default TableWrapper;
