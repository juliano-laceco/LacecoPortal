"use client"

import React, { useMemo, useRef } from 'react';

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

function TableWrapper({ data, filterItems, tableHeaders, isPaginated, isFilterable, minPageSize, maxPageSize, pageSizeStep , title , subTitle }) {

  const router = useRouter();
  const pathname = usePathname();
  const keywordRef = useRef();
  const searchParams = useSearchParams();
  const pageSizeOptions = [];

  for (let i = minPageSize; i <= maxPageSize; i += pageSizeStep) {
    pageSizeOptions.push({ value: i, label: `Show ${i}` });
  }

  const columns = useMemo(
    () => tableHeaders,
    [tableHeaders]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: minPageSize }, // Initialize the pageSize to 1
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    state: { pageIndex, pageSize }
  } = tableInstance

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

  const clearFunction = () => {
    router.push(`${pathname}`);
    router.refresh();
  }

  return (
    <div className="container mx-auto min-w-full z-100 border  rounded-lg shadow-xl">
      <div className="table-wrapper bg-white p-5 mob:p-4 rounded-lg">
        <h1 className="font-bold text-3xl">{title}</h1>
        <h3 className="py-2 mb-3">{subTitle}</h3>
        {isFilterable && <TableFilter filterItems={filterItems} filterFunction={pushQS} clearFunction={clearFunction} keywordRef={keywordRef} />}
        <TableBody {...tableInstance} tableHeaders={tableHeaders} />
        {(isPaginated && data.length > 0) && <TablePagination {...tableInstance} pageSize={pageSize} pageIndex={pageIndex} pageSizeOptions={pageSizeOptions} />}
      </div>

    </div>


  );
}

export default TableWrapper;
