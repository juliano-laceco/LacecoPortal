// worker.js

self.addEventListener('message', (event) => {
    const { type, payload } = event.data;

    switch (type) {
        case 'GET_CELLS_IN_SELECTION':
            const { start, end } = payload;
            const startRow = Math.min(start.row, end.row);
            const endRow = Math.max(start.row, end.row);
            const startCol = Math.min(start.col, end.col);
            const endCol = Math.max(start.col, end.col);

            const cells = [];
            for (let row = startRow; row <= endRow; row++) {
                for (let col = startCol; col <= endCol; col++) {
                    cells.push({ row, col });
                }
            }
            self.postMessage({ type: 'CELLS_IN_SELECTION', payload: cells });
            break;

        case 'UPDATE_CELL_CONTENTS':
            const { cellContents, updates } = payload;
            const updatedCellContents = { ...cellContents };
            updates.forEach(({ row, col, value }) => {
                updatedCellContents[`${row}-${col}`] = value;
            });
            self.postMessage({ type: 'UPDATED_CELL_CONTENTS', payload: updatedCellContents });
            break;

        case 'SAVE_HISTORY':
            const { history, newCellContents, historyIndex } = payload;
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push({ ...newCellContents });
            self.postMessage({ type: 'HISTORY_SAVED', payload: { newHistory, newHistoryIndex: historyIndex + 1 } });
            break;

        default:
            break;
    }
});
