import Image from "next/image";

function TableBody({ getTableBodyProps, getTableProps, tableHeaders, headerGroups, page, prepareRow, data }) {
  return (
    <table {...getTableProps()} className="min-w-full divide-y rounded-lg shadow-lg overflow-hidden divide-gray-200 table-auto">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={crypto.randomUUID()} className="border overflow-hidden">
            {headerGroup.headers.map((column) => {
              const columnMeta = tableHeaders.find((col) => col.accessor === column.id);
              return (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`px-6 py-3 bg-gray-100 text-black text-center font-bold text-xs uppercase tracking-wider 
                    ${columnMeta && !columnMeta.mobile ? 'mob:hidden' : ''}
                    ${columnMeta && !columnMeta.tablet ? 'tablet:hidden' : ''}`
                  }

                  key={crypto.randomUUID()}
                >
                  <div className="flex justify-center items-center gap-1">
                    {column.render('Header')}
                    <span className={column.isSortedDesc ? 'text-red-500' : ''}>
                      {column.isSorted ? (column.isSortedDesc ? <Image src="/resources/icons/descending.svg" height="15" width="15" className="min-h-[15px] min-w-[15px]" alt="descending" /> : <Image src="/resources/icons/ascending.svg" alt="ascending" height="15" width="15" className="min-h-[15px] min-w-[15px]" />) : ''}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.length > 0 ? (
          page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-white border-t" key={crypto.randomUUID()}>
                {row.cells.map((cell) => {
                  const columnMeta = tableHeaders.find((col) => col.accessor === cell.column.id);
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`px-6 py-4 w-fit text-sm mob:text-xs mob:px-3 mob:py-3 leading-5 text-sec-txtc overflow-hidden text-ellipsis 
                        ${columnMeta && !columnMeta.mobile ? 'mob:hidden' : ''}
                        ${columnMeta && !columnMeta.tablet ? 'tablet:hidden' : ''}`}
                      key={crypto.randomUUID()}
                    >
                      <div className="flex justify-center text-center items-center">{cell.render('Cell')}</div>
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={tableHeaders.length} className="px-6 py-4 text-center text-pric bg-white">
              No items found
            </td>
          </tr>
        )}

        {page.length > 0 &&
          <tr>
            <td colSpan={tableHeaders.length} className="px-6 py-4 text-left text-sm text-pric bg-gray-100">
              Showing {page.length} out of {data.length} entries
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
}

export default TableBody;
