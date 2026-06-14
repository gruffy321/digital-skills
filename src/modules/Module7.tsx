"use client";

import { useState, useEffect } from "react";
import styles from "./Module7.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module7() {
  const { taskIndex, nextTask, logEvent, showAlert } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  // Word State
  const [activeTab, setActiveTab] = useState<"Home" | "Insert" | "Review" | "File">("Home");
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isPrintScreenOpen, setIsPrintScreenOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState("PDF Printer");

  // Document Content State
  const [hasTable, setHasTable] = useState(false);
  const [hasHeader, setHasHeader] = useState(false);
  const [showSpellCheck, setShowSpellCheck] = useState(false);
  const [isSpellingFixed, setIsSpellingFixed] = useState(false);

  // App interactions
  const openApp = () => {
    setIsAppOpen(true);
    // Task 1 triggers on opening app? Actually Task 1 is inserting table.
  };

  const closeApp = () => setIsAppOpen(false);

  // Handlers
  const handleInsertTable = () => {
    setHasTable(true);
    if (taskIndex === 0) {
      logEvent("word_table_inserted");
      setTimeout(nextTask, 400);
    }
  };

  const handleInsertHeader = () => {
    setHasHeader(true);
    if (taskIndex === 1) {
      logEvent("word_header_inserted");
      setTimeout(nextTask, 400);
    }
  };

  const handleRunSpellCheck = () => {
    setShowSpellCheck(true);
  };

  const handleFixSpelling = () => {
    setIsSpellingFixed(true);
    setShowSpellCheck(false);
    if (taskIndex === 2) {
      logEvent("word_spelling_fixed");
      setTimeout(nextTask, 400);
    }
  };

  const handlePrint = () => {
    if (selectedPrinter === "FOLLOW_ME") {
      setIsPrintScreenOpen(false);
      setIsFileMenuOpen(false);
      setActiveTab("Home");
      if (taskIndex === 3) {
        logEvent("word_printed_follow_me");
        showAlert("Sent to FOLLOW_ME queue successfully!");
        setTimeout(nextTask, 400);
      }
    } else {
      showAlert("Please select the 'FOLLOW_ME' printer to complete the task.");
    }
  };

  if (taskIndex === 4) {
    return (
      <Quiz logEvent={logEvent} 
        title="Intermediate Word Processing Check"
        questions={[
          {
            question: "Why is a Header useful in a long document?",
            options: ["It changes the font color", "It displays information like your name and page number on every page automatically", "It makes the document print faster"],
            correctAnswerIndex: 1
          },
          {
            question: "Why should you print to a FOLLOW_ME queue instead of a specific printer at school?",
            options: ["It's the only printer that works", "It saves ink", "It allows you to retrieve your print job from any printer in the building using your unique code"],
            correctAnswerIndex: 2
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
          <div className={styles.iconSquare} style={{ background: '#2B579A' }}>W</div>
          <span>Word</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isAppOpen ? styles.active : ''}`} onClick={openApp}>
          <span style={{color: '#2B579A', fontWeight: 'bold'}}>W</span>
        </div>
      </div>

      {/* Application Window */}
      {isAppOpen && (
        <div className={styles.appWindow}>
          {/* Windows 11 Title Bar */}
          <div className={styles.appHeader}>
            <span>Science_Report.docx - Word</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeApp}>✕</button>
            </div>
          </div>

          {/* Word Blue Header */}
          <div className={styles.wordBlueHeader}>
            <div style={{fontWeight: 'bold'}}>W</div>
            <div className={styles.wordMenu}>
              <span 
                className={`${styles.menuItem} ${activeTab === "File" ? styles.active : ''}`}
                onClick={() => { setActiveTab("File"); setIsFileMenuOpen(!isFileMenuOpen); }}
              >File</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Home" ? styles.active : ''}`}
                onClick={() => { setActiveTab("Home"); setIsFileMenuOpen(false); setIsPrintScreenOpen(false); }}
              >Home</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Insert" ? styles.active : ''}`}
                onClick={() => { setActiveTab("Insert"); setIsFileMenuOpen(false); setIsPrintScreenOpen(false); }}
              >Insert</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Review" ? styles.active : ''}`}
                onClick={() => { setActiveTab("Review"); setIsFileMenuOpen(false); setIsPrintScreenOpen(false); }}
              >Review</span>
            </div>
          </div>

          {/* Ribbon */}
          {!isFileMenuOpen && !isPrintScreenOpen && (
            <div className={styles.wordRibbon}>
              {activeTab === "Home" && (
                <div className={styles.ribbonGroup}>
                  <span style={{color: '#8a8886', fontSize: '0.9rem'}}>Basic formatting tools...</span>
                </div>
              )}
              {activeTab === "Insert" && (
                <div className={styles.ribbonGroup}>
                  <button className={styles.ribbonBtn} onClick={handleInsertTable}>⊞ Table (3x3)</button>
                  <button className={styles.ribbonBtn} onClick={handleInsertHeader}>📄 Header & Page No.</button>
                </div>
              )}
              {activeTab === "Review" && (
                <div className={styles.ribbonGroup}>
                  <button className={styles.ribbonBtn} onClick={handleRunSpellCheck}>✓ Spell Check</button>
                  <button className={styles.ribbonBtn}>💬 Comments</button>
                </div>
              )}
            </div>
          )}

          {/* File Menu Dropdown */}
          {isFileMenuOpen && !isPrintScreenOpen && (
            <div className={styles.fileMenuDropdown}>
              <div className={styles.fileMenuItem} onClick={() => setIsFileMenuOpen(false)}>← Back</div>
              <div className={styles.fileMenuItem}>New</div>
              <div className={styles.fileMenuItem}>Open</div>
              <div className={styles.fileMenuItem}>Save</div>
              <div className={styles.fileMenuItem}>Save As</div>
              <div className={styles.fileMenuItem} onClick={() => { setIsPrintScreenOpen(true); setIsFileMenuOpen(false); }}>Print</div>
            </div>
          )}

          {/* Print Screen Overlay */}
          {isPrintScreenOpen && (
            <div className={styles.printOverlay}>
              <div className={styles.printSidebar}>
                <div style={{cursor: 'pointer', fontSize: '1.2rem', marginBottom: '1rem'}} onClick={() => {setIsPrintScreenOpen(false); setActiveTab("Home");}}>← Back</div>
                <h1 style={{marginTop: 0}}>Print</h1>
                <button className={styles.printBtn} onClick={handlePrint}>🖨️ Print</button>
                
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Printer</label>
                  <select 
                    className={styles.printerSelect} 
                    value={selectedPrinter} 
                    onChange={(e) => setSelectedPrinter(e.target.value)}
                  >
                    <option value="PDF Printer">PDF Printer</option>
                    <option value="Staff Room Printer">Staff Room Printer</option>
                    <option value="Library Printer">Library Printer</option>
                    <option value="FOLLOW_ME">FOLLOW_ME</option>
                  </select>
                  {selectedPrinter !== "FOLLOW_ME" && taskIndex === 3 && (
                    <p style={{color: '#E81123', fontSize: '0.8rem', marginTop: '0.5rem'}}>Wait! Are you sure you want to print to this machine?</p>
                  )}
                </div>
              </div>
              <div className={styles.printPreviewArea}>
                <div className={styles.printPreviewDoc}>
                  {hasHeader && (
                    <div style={{borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', color: '#666'}}>
                      <span>Student Name</span>
                      <span>Page 1</span>
                    </div>
                  )}
                  <h2>Science Report</h2>
                  <p>In this {isSpellingFixed ? "experiment" : "experiemnt"}, we tested the reaction of baking soda and vinegar.</p>
                  {hasTable && (
                    <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
                      <tbody>
                        <tr><th style={{border: '1px solid #ccc', background: '#f3f3f3', padding: '4px'}}>Trial</th><th style={{border: '1px solid #ccc', background: '#f3f3f3', padding: '4px'}}>Amount</th><th style={{border: '1px solid #ccc', background: '#f3f3f3', padding: '4px'}}>Result</th></tr>
                        <tr><td style={{border: '1px solid #ccc', padding: '4px'}}>1</td><td style={{border: '1px solid #ccc', padding: '4px'}}>10g</td><td style={{border: '1px solid #ccc', padding: '4px'}}>Small</td></tr>
                        <tr><td style={{border: '1px solid #ccc', padding: '4px'}}>2</td><td style={{border: '1px solid #ccc', padding: '4px'}}>20g</td><td style={{border: '1px solid #ccc', padding: '4px'}}>Large</td></tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Document Area */}
          {!isPrintScreenOpen && (
            <div className={styles.documentArea}>
              <div className={styles.documentPage}>
                {/* Header Area */}
                {hasHeader && (
                  <div className={styles.headerRegion}>
                    <span>Student Name</span>
                    <span>Page 1</span>
                  </div>
                )}

                <div className={styles.docBody}>
                  <h2>Science Report</h2>
                  <p>
                    In this{" "}
                    {!isSpellingFixed ? (
                      <span 
                        className={styles.spellError} 
                        onClick={() => { if(taskIndex >= 2) setShowSpellCheck(true) }}
                      >experiemnt</span>
                    ) : (
                      <span>experiment</span>
                    )}
                    , we tested the reaction of baking soda and vinegar. The results are shown in the table below.
                  </p>

                  {hasTable && (
                    <table className={styles.docTable}>
                      <thead>
                        <tr>
                          <th>Trial</th>
                          <th>Amount</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>10g</td>
                          <td>Small Bubble</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>20g</td>
                          <td>Large Eruption</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Spell Check Sidebar */}
              {showSpellCheck && (
                <div className={styles.spellCheckSidebar}>
                  <div className={styles.sidebarHeader}>
                    <span>Spelling</span>
                    <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => setShowSpellCheck(false)}>✕</button>
                  </div>
                  <div className={styles.sidebarContent}>
                    <p style={{color: '#E81123', fontWeight: 'bold'}}>Not in Dictionary:</p>
                    <div style={{background: '#f3f2f1', padding: '1rem', fontStyle: 'italic', marginBottom: '1rem'}}>experiemnt</div>
                    
                    <p style={{fontWeight: 'bold'}}>Suggestions:</p>
                    <div className={styles.suggestionBox}>
                      <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>experiment</div>
                      <button className={styles.changeBtn} onClick={handleFixSpelling}>Change</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
