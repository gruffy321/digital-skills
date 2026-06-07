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

  const columns = ["A", "B", "C", "D"];
  const rows = [1, 2, 3, 4, 5, 6, 7];

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
      
      if (cleanFormula.startsWith("=SUM(")) {
        const rangeStr = cleanFormula.substring(5, cleanFormula.indexOf(")"));
        const [startCell, endCell] = rangeStr.split(":");
        if (startCell && endCell && startCell[0] === endCell[0]) {
          const col = startCell[0];
          const startRow = parseInt(startCell.substring(1));
          const endRow = parseInt(endCell.substring(1));
          let sum = 0;
          for (let i = startRow; i <= endRow; i++) {
            sum += parseFloat(getCellValue(`${col}${i}`)) || 0;
          }
          return sum.toString();
        }
        return "#REF!";
      }

      if (cleanFormula.startsWith("=COUNTA(")) {
        const rangeStr = cleanFormula.substring(8, cleanFormula.indexOf(")"));
        const [startCell, endCell] = rangeStr.split(":");
        if (startCell && endCell && startCell[0] === endCell[0]) {
          const col = startCell[0];
          const startRow = parseInt(startCell.substring(1));
          const endRow = parseInt(endCell.substring(1));
          let count = 0;
          for (let i = startRow; i <= endRow; i++) {
            if (getCellValue(`${col}${i}`).trim() !== "") count++;
          }
          return count.toString();
        }
        return "#REF!";
      }

      return "#ERROR!";
    } catch (e) {
      return "#ERROR!";
    }
  };

  const handleCellCommit = (value: string) => {
    if (taskIndex === 0) {
      if (Object.values(gridData).filter(v => v.trim() !== "").length >= 6) {
        logEvent("data_entry_completed");
        nextTask();
      }
    } else if (taskIndex === 1) {
      if (value.toUpperCase().replace(/\s/g, "").startsWith("=SUM(")) {
        logEvent("sum_formula_entered");
        nextTask();
      }
    } else if (taskIndex === 2) {
      if (value.toUpperCase().replace(/\s/g, "").startsWith("=COUNTA(")) {
        logEvent("counta_formula_entered");
        nextTask();
      }
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
                        className={`${styles.dataCell} ${isFocus ? styles.active : ""}`}
                        onClick={() => handleCellClick(cellId)}
                      >
                        <input
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
                              e.currentTarget.blur();
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
    </div>
  );
}
