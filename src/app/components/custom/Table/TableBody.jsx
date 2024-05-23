function TableBody({ getTableBodyProps, getTableProps, tableHeaders, headerGroups, page, prepareRow }) {
    return (
      <table {...getTableProps()} className="min-w-full divide-y rounded-lg shadow-xl overflow-hidden divide-gray-200 table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={crypto.randomUUID()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`px-6 py-3 bg-white text-black text-center font-bold text-xs uppercase tracking-wider ${column && !column.mobile && 'mob:hidden'}`}
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
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="bg-white" key={crypto.randomUUID()}>
                  {row.cells.map((cell) => {
                    const column = tableHeaders.find((col) => col.accessor === cell.column.id);
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`px-6 py-4 w-fit text-sm mob:text-xs mob:px-3 mob:py-3 leading-5 text-sec-txtc overflow-hidden text-ellipsis ${column && !column.mobile && 'mob:hidden'}`}
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
        </tbody>
      </table>
    );
  }
  
  export default TableBody;