"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Module9.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

const COLUMNS = ["A", "B", "C", "D", "E", "F"];
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Module9() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  const [activeCell, setActiveCell] = useState("A1");
  const [cells, setCells] = useState<Record<string, string>>({});
  
  // Track formula completion to avoid double triggering nextTask
  const tasksCompleted = useRef<Record<number, boolean>>({});

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const openApp = () => setIsAppOpen(true);
  const closeApp = () => setIsAppOpen(false);

  // Focus input when active cell changes
  useEffect(() => {
    if (inputRefs.current[activeCell]) {
      inputRefs.current[activeCell]?.focus();
    }
  }, [activeCell]);

  const handleCellChange = (cellId: string, value: string) => {
    const newCells = { ...cells, [cellId]: value };
    setCells(newCells);

    // Task 1: Data Entry Check
    if (taskIndex === 0 && !tasksCompleted.current[0]) {
      const a1 = newCells["A1"]?.trim().length > 0;
      const a2 = newCells["A2"]?.trim().length > 0;
      const a3 = newCells["A3"]?.trim().length > 0;
      const b1 = newCells["B1"]?.trim().length > 0 && !isNaN(parseFloat(newCells["B1"]));
      const b2 = newCells["B2"]?.trim().length > 0 && !isNaN(parseFloat(newCells["B2"]));
      const b3 = newCells["B3"]?.trim().length > 0 && !isNaN(parseFloat(newCells["B3"]));

      if (a1 && a2 && a3 && b1 && b2 && b3) {
        tasksCompleted.current[0] = true;
        logEvent("excel_data_entered");
        setTimeout(nextTask, 500);
      }
    }

    // Task 2: SUM
    if (taskIndex === 1 && !tasksCompleted.current[1]) {
      if (cellId === "B4" && value.replace(/\s/g, '').toUpperCase() === "=SUM(B1:B3)") {
        tasksCompleted.current[1] = true;
        logEvent("excel_sum_formula");
        setTimeout(nextTask, 500);
      }
    }

    // Task 3: COUNTA
    if (taskIndex === 2 && !tasksCompleted.current[2]) {
      if (cellId === "A5" && value.replace(/\s/g, '').toUpperCase() === "=COUNTA(A1:A3)") {
        tasksCompleted.current[2] = true;
        logEvent("excel_counta_formula");
        setTimeout(nextTask, 500);
      }
    }

    // Task 4: MAX
    if (taskIndex === 3 && !tasksCompleted.current[3]) {
      if (cellId === "B5" && value.replace(/\s/g, '').toUpperCase() === "=MAX(B1:B3)") {
        tasksCompleted.current[3] = true;
        logEvent("excel_max_formula");
        setTimeout(nextTask, 500);
      }
    }

    // Task 5: MIN
    if (taskIndex === 4 && !tasksCompleted.current[4]) {
      if (cellId === "B6" && value.replace(/\s/g, '').toUpperCase() === "=MIN(B1:B3)") {
        tasksCompleted.current[4] = true;
        logEvent("excel_min_formula");
        setTimeout(nextTask, 500);
      }
    }

    // Task 6: AVERAGE
    if (taskIndex === 5 && !tasksCompleted.current[5]) {
      if (cellId === "B7" && value.replace(/\s/g, '').toUpperCase() === "=AVERAGE(B1:B3)") {
        tasksCompleted.current[5] = true;
        logEvent("excel_average_formula");
        setTimeout(nextTask, 500);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, col: string, row: number) => {
    const colIndex = COLUMNS.indexOf(col);
    
    if (e.key === "Enter") {
      e.preventDefault();
      if (row < ROWS.length) setActiveCell(`${col}${row + 1}`);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        if (colIndex > 0) setActiveCell(`${COLUMNS[colIndex - 1]}${row}`);
      } else {
        if (colIndex < COLUMNS.length - 1) setActiveCell(`${COLUMNS[colIndex + 1]}${row}`);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (row > 1) setActiveCell(`${col}${row - 1}`);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (row < ROWS.length) setActiveCell(`${col}${row + 1}`);
    } else if (e.key === "ArrowLeft") {
      // Only navigate if cursor is at the beginning of the input
      if (e.currentTarget.selectionStart === 0 && colIndex > 0) {
        e.preventDefault();
        setActiveCell(`${COLUMNS[colIndex - 1]}${row}`);
      }
    } else if (e.key === "ArrowRight") {
      // Only navigate if cursor is at the end of the input
      if (e.currentTarget.selectionStart === e.currentTarget.value.length && colIndex < COLUMNS.length - 1) {
        e.preventDefault();
        setActiveCell(`${COLUMNS[colIndex + 1]}${row}`);
      }
    }
  };

  // Simple parser to display calculated values when not editing
  const getDisplayValue = (cellId: string) => {
    const val = cells[cellId] || "";
    if (activeCell === cellId) return val; // show raw text when editing
    
    // Evaluate formulas
    if (val.startsWith("=")) {
      const upperVal = val.toUpperCase().replace(/\s/g, '');
      if (upperVal === "=SUM(B1:B3)") return "230";
      if (upperVal === "=COUNTA(A1:A3)") return "3";
      if (upperVal === "=MAX(B1:B3)") return "150";
      if (upperVal === "=MIN(B1:B3)") return "30";
      if (upperVal === "=AVERAGE(B1:B3)") return "76.67";
      // Fallback
      return "#NAME?";
    }
    return val;
  };

  if (taskIndex === 6) {
    return (
      <Quiz 
        title="Spreadsheet Basics Knowledge Check"
        questions={[
          {
            question: "What does every formula in a spreadsheet start with?",
            options: ["The letter F", "A number", "An equals sign (=)"],
            correctAnswerIndex: 2
          },
          {
            question: "Which formula would you use to find the highest number in a range?",
            options: ["=MAX", "=MIN", "=SUM"],
            correctAnswerIndex: 0
          },
          {
            question: "What does the =COUNTA formula do?",
            options: ["Adds all numbers together", "Counts how many cells have data in them", "Finds the average of the cells"],
            correctAnswerIndex: 1
          }
        ]}
        onComplete={() => {
          logEvent("quiz_completed");
          nextTask();
        }}
      />
    );
  }

  return (
    <div className={styles.desktopArea}>
      
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <div className={styles.iconSquare} style={{ background: '#107C41' }}>X</div>
          <span>Spreadsheets</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isAppOpen ? styles.active : ''}`} onClick={openApp}>
          <span style={{color: '#107C41', fontWeight: 'bold'}}>X</span>
        </div>
      </div>

      {/* Application Window */}
      {isAppOpen && (
        <div className={styles.appWindow}>
          {/* Windows 11 Title Bar */}
          <div className={styles.appHeader}>
            <span>Book1 - Spreadsheets</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeApp}>✕</button>
            </div>
          </div>

          {/* Excel Green Header */}
          <div className={styles.excelGreenHeader}>
            <div style={{fontWeight: 'bold'}}>X</div>
            <div className={styles.excelMenu}>
              <span className={`${styles.menuItem} ${styles.active}`}>Home</span>
              <span className={styles.menuItem}>Insert</span>
              <span className={styles.menuItem}>Formulas</span>
              <span className={styles.menuItem}>Data</span>
            </div>
          </div>

          {/* Ribbon */}
          <div className={styles.excelRibbon}>
            <div className={styles.ribbonGroup}>
              <button className={styles.ribbonBtn}>Paste</button>
              <button className={styles.ribbonBtn}>Copy</button>
            </div>
            <div className={styles.ribbonGroup}>
              <select style={{padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px'}}>
                <option>Arial</option>
              </select>
              <select style={{padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px'}}>
                <option>11</option>
              </select>
              <button className={styles.ribbonBtn} style={{fontWeight: 'bold'}}>B</button>
            </div>
            <div className={styles.ribbonGroup}>
              <button className={styles.ribbonBtn}>∑ AutoSum</button>
            </div>
          </div>

          {/* Formula Bar */}
          <div className={styles.formulaBarContainer}>
            <div className={styles.cellNameBox}>{activeCell}</div>
            <div className={styles.fxIcon}>fx</div>
            <input 
              type="text" 
              className={styles.formulaInput} 
              value={cells[activeCell] || ""}
              onChange={(e) => handleCellChange(activeCell, e.target.value)}
            />
          </div>

          {/* Spreadsheet Grid */}
          <div className={styles.spreadsheetContainer}>
            <div className={styles.gridHeaderRow}>
              <div className={styles.gridCorner}></div>
              {COLUMNS.map(col => (
                <div key={col} className={styles.columnHeader}>{col}</div>
              ))}
            </div>
            
            <div className={styles.gridBody}>
              {ROWS.map(row => (
                <div key={row} className={styles.gridRow}>
                  <div className={styles.rowHeader}>{row}</div>
                  {COLUMNS.map(col => {
                    const cellId = `${col}${row}`;
                    const isActive = activeCell === cellId;
                    return (
                      <div key={col} className={`${styles.gridCell} ${isActive ? styles.active : ''}`} onClick={() => setActiveCell(cellId)}>
                        <input
                          ref={(el) => { inputRefs.current[cellId] = el; }}
                          type="text"
                          className={styles.gridCellInput}
                          value={getDisplayValue(cellId)}
                          onChange={(e) => handleCellChange(cellId, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, col, row)}
                          onFocus={() => setActiveCell(cellId)}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
