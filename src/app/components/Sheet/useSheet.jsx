"use client"

import { useEffect, useRef, useState, useCallback } from "react";

const useSheet = (numRows, numCols, initialCellContents, numberOfUneditableCells, edited, setEdited) => {

  const [drawing, setDrawing] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [editableCell, setEditableCell] = useState(null);
  const [historyIndex, setHistoryIndex] = useState(0);

  const cellRefs = useRef([]);

  // Memoize the cellContents and history state
  const [cellContents, setCellContents] = useState(() => initialCellContents);
  const [history, setHistory] = useState(() => [initialCellContents]);

  const getCellsInSelection = useCallback((start, end) => {
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
    return cells;
  }, []);

  const handleMouseDown = useCallback((row, col) => {
    setDrawing(true);
    setStartCell({ row, col });
    setEndCell({ row, col });
    setSelectedCells([{ row, col }]);
  }, []);

  const handleMouseEnter = useCallback((row, col) => {
    if (drawing) {
      setEndCell({ row, col });
      const newSelectedCells = getCellsInSelection(startCell, { row, col });
      setSelectedCells(newSelectedCells);
    }
  }, [drawing, startCell, getCellsInSelection]);

  const handleMouseUp = useCallback(() => {
    setDrawing(false);
  }, []);

  const handleClick = useCallback((row, col) => {
    const cell = { row, col };
    setSelectedCells([cell]);
  }, []);

  const handleDoubleClick = useCallback((row, col) => {
    const cell = { row, col };
    setSelectedCells([cell]);
    setEditableCell(cell);
  }, []);

  // Updated to handle history correctly
  const saveHistory = useCallback((newCellContents) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newCellContents]);
    setHistoryIndex(newHistory.length); // Set index to the end of the new history
  }, [history, historyIndex]);



  // Handling Undo (Ctrl+Z)
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      if (history[historyIndex - 1] != undefined) {
        setHistoryIndex(historyIndex - 1);
        setCellContents(history[historyIndex - 1]);
      }
    }
  }, [historyIndex, history, setCellContents]);

  // Handling Redo (Ctrl+Shift+Z)
  const handleRedo = useCallback(() => {
    if (historyIndex > 0) {
      if (history[historyIndex + 1] != undefined) {
        setHistoryIndex(historyIndex + 1);
        setCellContents(history[historyIndex + 1]);
      }
    }
  }, [historyIndex, history, setCellContents]);


  const handleKeyDown = useCallback((e) => {
    if ((e.key === 'c' || e.key === 'x') && e.ctrlKey) {
      e.preventDefault();
      let prevRow = null;
      const content = selectedCells.map((cell) => {
        const cellKey = `${cell.row}-${cell.col}`;
        const cellContent = cellContents[cellKey] !== undefined ? cellContents[cellKey] : '';
        if (prevRow !== null && cell.row !== prevRow) {
          prevRow = cell.row;
          return `\n${cellContent}`;
        }
        prevRow = cell.row;
        return cellContent;
      });

      navigator.clipboard.writeText(content.join('\t'));

      if (e.key === 'x') {
        !edited && selectedCells.length > 0 && setEdited(true);
        saveHistory(cellContents);
        const newCellContents = { ...cellContents };
        selectedCells.forEach((cell) => {
          newCellContents[`${cell.row}-${cell.col}`] = '';
        });
        setCellContents(newCellContents);
      }
    } else if (e.key === 'v' && e.ctrlKey) {
      e.preventDefault();
      !edited && selectedCells.length > 0 && setEdited(true);
      navigator.clipboard.readText().then((clipboardContent) => {
        const lines = clipboardContent.split('\n');
        const newCellContents = { ...cellContents };
        let startRow = selectedCells[0].row;
        let startCol = selectedCells[0].col;
        lines.forEach((line, rowIndex) => {
          const values = line.split('\t');
          values.forEach((value, colIndex) => {
            const row = startRow + rowIndex;
            const col = startCol + colIndex;
            if (row < numRows && col < numCols) {
              newCellContents[`${row}-${col}`] = value.trim();
            }
          });
        });
        saveHistory(newCellContents);
        setCellContents(newCellContents);
      });
    } else if (e.key === 'z' && e.ctrlKey) {
      e.preventDefault();
      handleUndo()
    } else if (e.shiftKey && e.key === 'z' && e.ctrlKey) {
      e.preventDefault();
      handleRedo()
    } else if (e.key === 'Tab') {
      e.preventDefault();
      let newSelectedCell = { ...selectedCells[0] };
      newSelectedCell.col = Math.min(numCols - 1, selectedCells[0].col + 1);
      setSelectedCells([newSelectedCell]);
      setStartCell(newSelectedCell);
      setEndCell(newSelectedCell);
      if (editableCell) {
        const cell = cellRefs.current[editableCell.row][editableCell.col];
        cell.blur();
        setEditableCell(null);
      }
    } else if (e.shiftKey && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      let newEndCell = { ...endCell };
      switch (e.key) {
        case 'ArrowUp':
          newEndCell.row = Math.max(0, endCell.row - 1);
          break;
        case 'ArrowDown':
          newEndCell.row = Math.min(numRows - 1, endCell.row + 1);
          break;
        case 'ArrowLeft':
          newEndCell.col = Math.max(5 + numberOfUneditableCells, endCell.col - 1);
          break;
        case 'ArrowRight':
          newEndCell.col = Math.min(numCols - 1, endCell.col + 1);
          break;
        default:
          return;
      }
      setEndCell(newEndCell);
      const newSelectedCells = getCellsInSelection(startCell, newEndCell);
      setSelectedCells(newSelectedCells);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      !edited && selectedCells.length > 0 && setEdited(true);
      saveHistory(cellContents);

      const newCellContents = { ...cellContents };
      selectedCells.forEach((cell) => {
        newCellContents[`${cell.row}-${cell.col}`] = '';
      });
      setCellContents(newCellContents);
    } else if (!e.ctrlKey) {
      let newSelectedCell = { ...selectedCells[0] };
      if (e.key.length === 1) {
        e.preventDefault();
        if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
          const cellKey = `${newSelectedCell.row}-${newSelectedCell.col}`;
          const newContent = (cellContents[cellKey] || '') + e.key;
          const newCellContents = {
            ...cellContents,
            [cellKey]: newContent,
          };
          saveHistory(newCellContents);
          setCellContents(newCellContents);
          setEditableCell(newSelectedCell);
        }
      } else if (e.key === 'Enter') {
        if (editableCell) {
          const cell = cellRefs.current[editableCell.row][editableCell.col];
          cell.blur();
          setEditableCell(null);
        }
      } else {
        if (!editableCell) {
          switch (e.key) {
            case 'ArrowUp':
              newSelectedCell.row = Math.max(0, selectedCells[0].row - 1);
              break;
            case 'ArrowDown':
              newSelectedCell.row = Math.min(numRows - 1, selectedCells[0].row + 1);
              break;
            case 'ArrowLeft':
              newSelectedCell.col = Math.max(5 + numberOfUneditableCells, selectedCells[0].col - 1);
              break;
            case 'ArrowRight':
              newSelectedCell.col = Math.min(numCols - 1, selectedCells[0].col + 1);
              break;
            default:
              return;
          }
          setSelectedCells([newSelectedCell]);
          setStartCell(newSelectedCell);
          setEndCell(newSelectedCell);
        } else {
          const cell = cellRefs.current[editableCell.row][editableCell.col];
          cell.blur();
          setEditableCell(null);
          setTimeout(() => {
            switch (e.key) {
              case 'ArrowUp':
                newSelectedCell.row = Math.max(0, selectedCells[0].row - 1);
                break;
              case 'ArrowDown':
                newSelectedCell.row = Math.min(numRows - 1, selectedCells[0].row + 1);
                break;
              case 'ArrowLeft':
                newSelectedCell.col = Math.max(5 + numberOfUneditableCells, selectedCells[0].col - 1);
                break;
              case 'ArrowRight':
                newSelectedCell.col = Math.min(numCols - 1, selectedCells[0].col + 1);
                break;
              default:
                return;
            }
            setSelectedCells([newSelectedCell]);
            setStartCell(newSelectedCell);
            setEndCell(newSelectedCell);
          }, 0);
        }
      }
    }
  }, [
    selectedCells,
    cellContents,
    editableCell,
    endCell,
    history,
    historyIndex,
    numRows,
    numCols,
    saveHistory,
    startCell,
    getCellsInSelection,
    edited,
    numberOfUneditableCells,
    setEdited
  ]);


  const handleCellBlur = useCallback((row, col, e) => {
    const value = e.target.textContent;
    const newCellContents = {
      ...cellContents,
      [`${row}-${col}`]: value,
    };
    saveHistory(newCellContents);
    setCellContents(newCellContents);
    setEditableCell(null);
  }, [cellContents, saveHistory]);

  const getCellStyle = useCallback((row, col) => {
    if (!startCell || !endCell) return {};
    const startRow = Math.min(startCell.row, endCell.row);
    const endRow = Math.max(startCell.row, endCell.row);
    const startCol = Math.min(startCell.col, endCell.col);
    const endCol = Math.max(startCell.col, endCell.col);

    if (row >= startRow && row <= endRow && col >= startCol && col <= endCol) {
      return { backgroundColor: 'rgba(255, 0, 0, 0.1)' };
    }
    return {};
  }, [startCell, endCell]);

  useEffect(() => {
    const handleKey = (e) => {
      handleKeyDown(e);
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (editableCell) {
      const { row, col } = editableCell;

      if (row != undefined && col != undefined) {
        const cell = cellRefs.current[row][col];
        if (cell) {
          cell.setAttribute('contentEditable', 'true');
          cell.focus();

          const range = document.createRange();
          range.selectNodeContents(cell);
          range.collapse(false);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }

    }
  }, [editableCell]);

  return {
    cellRefs,
    drawing,
    startCell,
    endCell,
    selectedCells,
    editableCell,
    cellContents,
    history,
    setCellContents,
    setHistory,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleClick,
    handleDoubleClick,
    handleCellBlur,
    getCellStyle,
  };
};

export default useSheet;