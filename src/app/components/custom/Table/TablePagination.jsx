import Select from "react-select";
import { theme } from "../../../../../tailwind.config"

import DropdownRegular from '../Dropdowns/DropdownRegular';

function TablePagination({ canNextPage, canPreviousPage, previousPage, nextPage, pageCount, pageOptions, pageSizeOptions, gotoPage, pageSize, setPageSize, pageIndex }) {

    const colors = theme.extend.colors;

    return (

        <div className="flex items-center justify-center my-8">
            <div className="pagination flex gap-2 mob:flex-col-reverse ">
                <div className="flex gap-2">
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
                </div>
                    <DropdownRegular
                        options={pageSizeOptions}
                        value={pageSize}
                        onChange={(selectedOption) => setPageSize(selectedOption.value)}

                    />
            </div>

        </div>
    )
}

export default TablePagination
