"use client"

import React from 'react';

const Row = ({
    row,
    assignee,
    numCols,
    headerDates,
    cellContents,
    disciplines,
    users,
    selectedCells,
    cellRefs,
    getCellStyle,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleClick,
    handleDoubleClick,
    handleCellBlur,
    editableCell,
    updateAssigneeDiscipline,
    updateAssigneeUser,
    deleteAssignee,
    getBudgetHoursCells
}) => {
    const cols = [];

    for (let col = 0; col < numCols; col++) {
        let content, initialContent;
        let isSelected = selectedCells.some((cell) => cell.row === row && cell.col === col);
        let colDate;

        if (col === 0) {
            content = (
                <div className="cursor-pointer" onClick={() => deleteAssignee(row)}>
                    <img src="/delete.png" className="w-6 h-6" alt="x" />
                </div>
            );
        } else if (col === 1) {
            content = (
                <select
                    value={assignee.discipline}
                    onChange={(e) => updateAssigneeDiscipline(row, e.target.value)}
                    className="border border-gray-300 p-1 box-border text-center bg-gray-100 select-none w-full"
                >
                    {disciplines.map((discipline) => (
                        <option key={discipline} value={discipline}>
                            {discipline}
                        </option>
                    ))}
                </select>
            );
        } else if (col === 2) {
            content = (
                <select
                    value={assignee.assignee}
                    onChange={(e) => updateAssigneeUser(row, e.target.value)}
                    className="border border-gray-300 p-1 box-border text-center bg-gray-100 select-none w-full"
                >
                    {users.map((user) => (
                        <option key={user} value={user}>
                            {user}
                        </option>
                    ))}
                </select>
            );
        } else if (col === 3) {
            content = (
                <div className="select-none font-semibold min-w-24">
                    G5+
                </div>
            );
        } else if (col === 4) {
            content = (
                <div className="select-none font-semibold min-w-24">
                    {getBudgetHoursCells(row)}
                </div>
            );
        } else {
            colDate = headerDates[col - 5];
            initialContent = assignee.projected_work_weeks[colDate] || '';
            content = cellContents[`${row}-${col}`] !== undefined ? cellContents[`${row}-${col}`] : initialContent;
        }

        if (!cellRefs.current[row]) {
            cellRefs.current[row] = [];
        }

        cols.push(
            <div
                key={`${row}-${col}`}
                ref={(el) => {
                    cellRefs.current[row][col] = el;
                }}
                className={`border border-gray-300 flex h-12 ${col === 0 ? "w-16" : col < 3 ? "w-[130pt]" : col < 5 ? "w-24" : "min-w-12 cursor-cell focus:cursor-auto"} justify-center items-center p-1 box-border text-center select-none ${isSelected ? 'outline-none border-red-500 border-1' : ''}`}
                style={getCellStyle(row, col)}
                onMouseDown={col > 4 ? () => handleMouseDown(row, col) : undefined}
                onMouseEnter={col > 4 ? () => handleMouseEnter(row, col) : undefined}
                onMouseUp={col > 4 ? handleMouseUp : undefined}
                data-date={col > 4 ? headerDates[col - 5] : ''}
                data-col={col}
                data-row={row}
                data-initial={initialContent}
                contentEditable={col > 4 && editableCell?.row === row && editableCell?.col === col}
                suppressContentEditableWarning
                onClick={col > 4 ? () => handleClick(row, col) : undefined}
                onDoubleClick={col > 4 ? () => handleDoubleClick(row, col) : undefined}
                onBlur={col > 4 ? (e) => handleCellBlur(row, col, e) : undefined}
            >
                {content}
            </div>
        );
    }

    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
            {cols}
        </div>
    );
};

export default Row;