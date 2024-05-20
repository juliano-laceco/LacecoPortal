"use client"
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { formatDate } from '@/utilities/date/date-utils';
import Select from 'react-select';
import { theme } from "../../../../../../tailwind.config"
import DropdownFilter from '@/app/components/custom/DropdownFilter';
import Input from '@/app/components/custom/Input';


const EmployeeTable = ({ data }) => {

    const [departmentFilter, setDepartmentFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const colors = theme.extend.colors


    const departments = [...new Set(data.map((item) => item.discipline_name))];
    const departmentOptions = departments.map((department) => ({
        value: department,
        label: department,
    }))
    const divisions = [...new Set(data.map((item) => item.division_name))];
    const divisionOptions = divisions.map((division) => ({
        value: division,
        label: division,
    }))

    const statuses = [...new Set(data.map((item) => item.status_id))];
    const statusesOptions = statuses.map((status) => ({
        value: status,
        label: status,
    }))

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

    const filterData = useMemo(
        () =>
            data.filter(
                (item) =>
                    (departmentFilter === '' || item.discipline_name === departmentFilter) &&
                    (divisionFilter === '' || item.division_name === divisionFilter) &&
                    (statusFilter === '' || item.status_id === parseInt(statusFilter))
            ),
        [data, departmentFilter, divisionFilter, statusFilter]
    );

    const tableInstance = useTable(
        {
            columns,
            data: filterData
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
                    <DropdownFilter
                        classNamePrefix="react-select-dd"
                        label="Department"
                        options={departmentOptions}
                        stateVal={departmentFilter}
                        changeStateVal={setDepartmentFilter}
                    />
                    <DropdownFilter
                        classNamePrefix="react-select-dd"
                        label="Division"
                        options={divisionOptions}
                        stateVal={divisionFilter}
                        changeStateVal={setDivisionFilter}
                    />
                    <DropdownFilter
                        classNamePrefix="react-select-dd"
                        label="Status"
                        options={statusesOptions}
                        stateVal={statusFilter}
                        changeStateVal={setStatusFilter}
                    />
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
};

export default EmployeeTable;