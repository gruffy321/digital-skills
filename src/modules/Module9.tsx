"use client";

import React, { useState, useEffect } from "react";
import styles from "./Module9.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module9() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  const [gridData, setGridData] = useState<Record<string, string>>({});
  const [activeCell, setActiveCell] = useState("A1");
  const [formulaInput, setFormulaInput] = useState("");

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<string | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<string | null>(null);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsSelecting(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  const columns = ["A", "B", "C", "D"];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const openApp = () => {
    setIsAppOpen(true);
    if (!isAppOpen) {
      logEvent("spreadsheet_app_opened");
    }
  };

  const getCellValue = (cellId: string) => {
    return gridData[cellId] || "";
  };

  const parseFormula = (formula: string) => {
    if (!formula.startsWith("=")) return formula;
    
    try {
      const cleanFormula = formula.toUpperCase().replace(/\s/g, "");
      
      const extractRange = (prefix: string) => {
        const rangeStr = cleanFormula.substring(prefix.length, cleanFormula.indexOf(")"));
        const [startCell, endCell] = rangeStr.split(":");
        if (startCell && endCell && startCell[0] === endCell[0]) {
          const col = startCell[0];
          const startRow = parseInt(startCell.substring(1));
          const endRow = parseInt(endCell.substring(1));
          return { col, startRow, endRow };
        }
        return null;
      };

      if (cleanFormula.startsWith("=SUM(")) {
        const range = extractRange("=SUM(");
        if (range) {
          let sum = 0;
          for (let i = range.startRow; i <= range.endRow; i++) {
            sum += parseFloat(getCellValue(`${range.col}${i}`)) || 0;
          }
          return sum.toString();
        }
        return "#REF!";
      }

      if (cleanFormula.startsWith("=COUNTA(")) {
        const range = extractRange("=COUNTA(");
        if (range) {
          let count = 0;
          for (let i = range.startRow; i <= range.endRow; i++) {
            if (getCellValue(`${range.col}${i}`).trim() !== "") count++;
          }
          return count.toString();
        }
        return "#REF!";
      }

      if (cleanFormula.startsWith("=AVERAGE(")) {
        const range = extractRange("=AVERAGE(");
        if (range) {
          let sum = 0;
          let count = 0;
          for (let i = range.startRow; i <= range.endRow; i++) {
            const val = parseFloat(getCellValue(`${range.col}${i}`));
            if (!isNaN(val)) {
              sum += val;
              count++;
            }
          }
          return count > 0 ? (sum / count).toFixed(2).replace(/\.00$/, "") : "#DIV/0!";
        }
        return "#REF!";
      }

      if (cleanFormula.startsWith("=MAX(")) {
        const range = extractRange("=MAX(");
        if (range) {
          let max = -Infinity;
          for (let i = range.startRow; i <= range.endRow; i++) {
            const val = parseFloat(getCellValue(`${range.col}${i}`));
            if (!isNaN(val) && val > max) max = val;
          }
          return max === -Infinity ? "0" : max.toString();
        }
        return "#REF!";
      }

      if (cleanFormula.startsWith("=MIN(")) {
        const range = extractRange("=MIN(");
        if (range) {
          let min = Infinity;
          for (let i = range.startRow; i <= range.endRow; i++) {
            const val = parseFloat(getCellValue(`${range.col}${i}`));
            if (!isNaN(val) && val < min) min = val;
          }
          return min === Infinity ? "0" : min.toString();
        }
        return "#REF!";
      }

      return "#ERROR!";
    } catch (e) {
      return "#ERROR!";
    }
  };

  const updateFormulaWithSelection = (start: string, end: string) => {
    const startCol = start[0];
    const startRow = parseInt(start.substring(1));
    const endCol = end[0];
    const endRow = parseInt(end.substring(1));
    
    const minCol = startCol < endCol ? startCol : endCol;
    const maxCol = startCol > endCol ? startCol : endCol;
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    
    const rangeStr = start === end ? start : `${minCol}${minRow}:${maxCol}${maxRow}`;

    const bracketIndex = formulaInput.lastIndexOf("(");
    if (bracketIndex !== -1) {
      const newFormula = formulaInput.substring(0, bracketIndex + 1) + rangeStr;
      setFormulaInput(newFormula);
      setGridData(prev => ({ ...prev, [activeCell]: newFormula }));
    }
  };

  const handleMouseDown = (cellId: string) => {
    const cleanFormula = formulaInput.toUpperCase().replace(/\s/g, "");
    if (/=(SUM|COUNTA|AVERAGE|MAX|MIN)\([A-Z0-9:]*$/.test(cleanFormula)) {
      setIsSelecting(true);
      setSelectionStart(cellId);
      setSelectionEnd(cellId);
      updateFormulaWithSelection(cellId, cellId);
    }
  };

  const handleMouseEnter = (cellId: string) => {
    if (isSelecting && selectionStart) {
      setSelectionEnd(cellId);
      updateFormulaWithSelection(selectionStart, cellId);
    }
  };

  const isCellSelected = (cellId: string) => {
    if (!selectionStart || !selectionEnd) return false;

    const cCol = cellId[0];
    const cRow = parseInt(cellId.substring(1));
    const sCol = selectionStart[0];
    const sRow = parseInt(selectionStart.substring(1));
    const eCol = selectionEnd[0];
    const eRow = parseInt(selectionEnd.substring(1));

    const minCol = sCol < eCol ? sCol : eCol;
    const maxCol = sCol > eCol ? sCol : eCol;
    const minRow = Math.min(sRow, eRow);
    const maxRow = Math.max(sRow, eRow);

    return cCol >= minCol && cCol <= maxCol && cRow >= minRow && cRow <= maxRow;
  };

  const handleCellCommit = (value: string) => {
    setSelectionStart(null);
    setSelectionEnd(null);
    const cleanValue = value.toUpperCase().replace(/\s/g, "");
    if (taskIndex === 0) {
      if (Object.values(gridData).filter(v => v.trim() !== "").length >= 6) {
        logEvent("data_entry_completed");
        nextTask();
      }
    } else if (taskIndex === 1) {
      if (cleanValue.startsWith("=SUM(")) {
        logEvent("sum_formula_entered");
        nextTask();
      }
    } else if (taskIndex === 2) {
      if (cleanValue.startsWith("=COUNTA(")) {
        logEvent("counta_formula_entered");
        nextTask();
      }
    } else if (taskIndex === 3) {
      if (cleanValue.startsWith("=AVERAGE(")) {
        logEvent("average_formula_entered");
        nextTask();
      }
    } else if (taskIndex === 4) {
      if (cleanValue.startsWith("=MAX(")) {
        logEvent("max_formula_entered");
        nextTask();
      }
    } else if (taskIndex === 5) {
      if (cleanValue.startsWith("=MIN(")) {
        logEvent("min_formula_entered");
        nextTask();
        setTimeout(() => setIsQuizOpen(true), 1500);
      }
    }
  };

  const handleQuizAnswer = (answer: string, isCorrect: boolean) => {
    setQuizAnswered(answer);
    if (isCorrect && taskIndex === 6) {
      logEvent("module9_quiz_passed");
      setTimeout(() => {
        setIsQuizOpen(false);
        nextTask();
      }, 1500);
    }
  };

  const handleCellChange = (cellId: string, value: string) => {
    setGridData(prev => ({ ...prev, [cellId]: value }));
    setFormulaInput(value);
  };

  const handleCellClick = (cellId: string) => {
    setActiveCell(cellId);
    setFormulaInput(gridData[cellId] || "");
  };

  const handleFormulaBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormulaInput(val);
    handleCellChange(activeCell, val);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📈</span>
          <span>Spreadsheets</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>📈</span> Budget.xlsx - Spreadsheet Simulator
            </div>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.appRibbon}>
            <div className={styles.menuBar}>
              <div className={styles.menuItem}>File</div>
              <div className={styles.menuItem}>Home</div>
              <div className={styles.menuItem}>Insert</div>
              <div className={styles.menuItem}>Formulas</div>
              <div className={styles.menuItem}>Data</div>
            </div>
            <div className={styles.formulaBar}>
              <span className={styles.formulaLabel}>fx</span>
              <input 
                type="text" 
                className={styles.formulaInput} 
                value={formulaInput}
                onChange={handleFormulaBarChange}
                onBlur={(e) => handleCellCommit(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.appBody}>
            <div className={styles.spreadsheetGrid}>
              {/* Corner header */}
              <div className={styles.headerCell}></div>
              {/* Column headers */}
              {columns.map(col => (
                <div key={col} className={styles.headerCell}>{col}</div>
              ))}

              {/* Rows */}
              {rows.map(row => (
                <React.Fragment key={row}>
                  <div className={styles.rowHeader}>{row}</div>
                  {columns.map(col => {
                    const cellId = `${col}${row}`;
                    const isFocus = activeCell === cellId;
                    const rawValue = getCellValue(cellId);
                    const displayValue = isFocus ? rawValue : parseFormula(rawValue);

                    return (
                      <div 
                        key={cellId} 
                        className={`${styles.dataCell} ${isFocus ? styles.active : ""} ${isCellSelected(cellId) ? styles.selectedCell : ""}`}
                        onClick={() => handleCellClick(cellId)}
                        onMouseDown={() => handleMouseDown(cellId)}
                        onMouseEnter={() => handleMouseEnter(cellId)}
                      >
                        <input
                          id={`input-${cellId}`}
                          className={styles.cellInput}
                          value={isFocus ? formulaInput : displayValue}
                          onChange={(e) => {
                            setFormulaInput(e.target.value);
                            handleCellChange(cellId, e.target.value);
                          }}
                          onFocus={() => handleCellClick(cellId)}
                          onBlur={(e) => handleCellCommit(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.currentTarget.blur();
                              
                              // Calculate next cell down
                              const currentRowIndex = rows.indexOf(row);
                              if (currentRowIndex < rows.length - 1) {
                                const nextRow = rows[currentRowIndex + 1];
                                const nextCellId = `${col}${nextRow}`;
                                
                                // Focus the next cell
                                setTimeout(() => {
                                  const nextInput = document.getElementById(`input-${nextCellId}`);
                                  if (nextInput) {
                                    nextInput.focus();
                                  }
                                }, 10);
                              }
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.quizModal}>
            <div className={styles.quizHeader}>
              Module 9 Knowledge Check
            </div>
            <div className={styles.quizBody}>
              <div className={styles.quizQuestion}>
                What symbol must you type at the beginning of a cell to let the spreadsheet know you are writing a formula?
              </div>
              <div className={styles.quizOptions}>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "A" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("A", false)}
                >
                  A) +
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "B" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("B", false)}
                >
                  B) @
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "C" ? styles.correct : ""}`}
                  onClick={() => handleQuizAnswer("C", true)}
                >
                  C) =
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "D" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("D", false)}
                >
                  D) #
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
