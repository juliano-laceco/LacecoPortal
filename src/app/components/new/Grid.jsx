import React from 'react';
import Header from './Header';
import Row from './Row';

const Grid = ({
    initialData,
    headerDates,
    numCols,
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
    getBudgetHoursCells,
    handleAddAssignee,
    colors,
    getPhaseBudgetHours
}) => {
    let rowCounter = 0;
    return (
        <div className="outline-none w-full border border-gray-300 rounded-lg user-select-none" tabIndex={0}>
            <Header headerDates={headerDates} numCols={numCols} colors={colors} />
            {initialData.map((phase, phaseIndex) => (
                <React.Fragment key={`phase-${phase.phase_id}`}>
                    <div className="col-span-full font-bold bg-gray-100 text-left text-xl px-2 py-3 select-none">
                        {phase.phase} - <span className="text-pric text-lg">{getPhaseBudgetHours[phaseIndex]} hrs</span>
                    </div>
                    {phase.assignees.map((assignee, assigneeIndex) => {
                        const row = rowCounter++;
                        return (
                            <Row
                                key={`assignee-${phase.phase_id}-${assignee.phase_assignee_id}-${assigneeIndex}`}
                                row={row}
                                assignee={assignee}
                                numCols={numCols}
                                headerDates={headerDates}
                                cellContents={cellContents}
                                disciplines={disciplines}
                                users={users}
                                selectedCells={selectedCells}
                                cellRefs={cellRefs}
                                getCellStyle={getCellStyle}
                                handleMouseDown={handleMouseDown}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseUp={handleMouseUp}
                                handleClick={handleClick}
                                handleDoubleClick={handleDoubleClick}
                                handleCellBlur={handleCellBlur}
                                editableCell={editableCell}
                                updateAssigneeDiscipline={updateAssigneeDiscipline}
                                updateAssigneeUser={updateAssigneeUser}
                                deleteAssignee={deleteAssignee}
                                getBudgetHoursCells={getBudgetHoursCells}
                            />
                        );
                    })}
                    <div
                        className="col-span-full flex justify-center items-center p-[3px] text-white text-2xl cursor-pointer select-none bg-gray-400 hover:bg-gray-500 transition duration-200 ease"
                        onClick={() => handleAddAssignee(phaseIndex)}
                    >
                        +
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Grid;
