"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Module6.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module6() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  // Document state
  const [documentText, setDocumentText] = useState("");
  const [isBold, setIsBold] = useState(false);
  
  // Menu and Modals
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [filenameInput, setFilenameInput] = useState("");

  const pageRef = useRef<HTMLDivElement>(null);

  const openApp = () => {
    setIsAppOpen(true);
    if (taskIndex === 0 && !isAppOpen) {
      logEvent("word_processor_opened");
    }
  };

  const handleBoldClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent losing text selection
    document.execCommand('bold', false, undefined);
    
    // Check if they correctly bolded the word "important"
    if (pageRef.current) {
      const html = pageRef.current.innerHTML.toLowerCase();
      // Browsers might use <b> or <strong> when execCommand bold is called
      if (html.includes("<b>important</b>") || html.includes("<strong>important</strong>")) {
        logEvent("text_formatted_bold_correctly");
        if (taskIndex === 0) nextTask();
      } else if (taskIndex === 0) {
        // Did they select anything?
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
          alert("You must highlight (select) the word you want to make bold first!");
        } else {
          alert("Make sure you type the sentence 'Digital skills are important' and highlight just the word 'important' to make it bold.");
        }
      }
    }
  };

  const handleDocumentInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || "";
    setDocumentText(text);
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "File") {
      setIsFileMenuOpen(!isFileMenuOpen);
    } else {
      setIsFileMenuOpen(false);
    }
  };

  const handleSaveAsClick = () => {
    setIsFileMenuOpen(false);
    setIsSaveModalOpen(true);
    if (taskIndex === 1) {
      logEvent("save_as_clicked");
      nextTask();
    }
  };

  const handleSaveSubmit = () => {
    const name = filenameInput.trim();
    
    if (name.length === 0) {
      alert("Filename cannot be empty.");
      return;
    }

    // 1. Check for unacceptable symbols
    const badSymbols = /[\\/:*?"<>|]/;
    if (badSymbols.test(name)) {
      logEvent("filename_invalid_symbols");
      alert("Unacceptable Symbols Detected!\n\nYou cannot use \\ / : * ? \" < > | in a filename. These special characters confuse the computer's filing system.");
      return;
    }

    // 2. Check for profanity (simple check for demo purposes)
    const lowercaseName = name.toLowerCase();
    const badWords = ["crap", "shit", "fuck", "bitch", "ass", "stupid", "idiot", "hate"];
    if (badWords.some(word => lowercaseName.includes(word))) {
      logEvent("filename_profanity");
      alert("Inappropriate Language!\n\nSchool computer usage policies prohibit the use of inappropriate language, even in file names. Please choose a professional name.");
      return;
    }

    // 3. Check for lazy/non-descriptive names
    const lazyNames = ["document", "doc", "asdf", "test", "homework", "file", "untitled"];
    if (lazyNames.includes(lowercaseName) || name.length < 4) {
      logEvent("filename_lazy");
      alert("Poor Naming Convention!\n\n'"+name+"' is not descriptive enough. If you have 100 files named 'document', you will never find what you are looking for. Try adding a subject or a date (e.g., 'Digital_Skills_Homework_May25').");
      return;
    }

    // Pass!
    if (taskIndex === 2) {
      logEvent("file_saved_successfully");
      setIsSaveModalOpen(false);
      nextTask();
    } else {
      setIsSaveModalOpen(false);
      alert(`File saved successfully as: ${name}.docx`);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📝</span>
          <span>Word</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>📝</span> Document1 - Word Processor
            </div>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.appRibbon}>
            <div className={styles.menuBar}>
              <div className={`${styles.menuItem} ${isFileMenuOpen ? styles.active : ""}`} onClick={() => handleMenuClick("File")}>
                File
                {isFileMenuOpen && (
                  <div className={styles.fileDropdown}>
                    <div className={styles.dropdownItem} onClick={() => setIsFileMenuOpen(false)}>New</div>
                    <div className={styles.dropdownItem} onClick={() => setIsFileMenuOpen(false)}>Open...</div>
                    <div className={styles.dropdownItem} onClick={() => setIsFileMenuOpen(false)}>Save</div>
                    <div className={styles.dropdownItem} onClick={handleSaveAsClick}>Save As...</div>
                  </div>
                )}
              </div>
              <div className={styles.menuItem} onClick={() => handleMenuClick("Home")}>Home</div>
              <div className={styles.menuItem} onClick={() => handleMenuClick("Insert")}>Insert</div>
              <div className={styles.menuItem} onClick={() => handleMenuClick("View")}>View</div>
            </div>

            <div className={styles.toolbar}>
              <button 
                className={`${styles.toolbarBtn}`} 
                onMouseDown={handleBoldClick}
                title="Bold"
              >
                <b>B</b>
              </button>
              <button className={styles.toolbarBtn} title="Italic"><i>I</i></button>
              <button className={styles.toolbarBtn} title="Underline"><u>U</u></button>
              <div style={{ width: "1px", height: "20px", background: "#c8c6c4", margin: "0 0.5rem" }}></div>
              <select style={{ padding: "0.25rem", border: "1px solid #c8c6c4", borderRadius: "4px" }}>
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Calibri</option>
              </select>
              <select style={{ padding: "0.25rem", border: "1px solid #c8c6c4", borderRadius: "4px" }}>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>24</option>
              </select>
            </div>
          </div>

          <div className={styles.appBody}>
            <div 
              ref={pageRef}
              className={styles.documentPage}
              contentEditable
              suppressContentEditableWarning
              onInput={handleDocumentInput}
              data-placeholder="Type your document here..."
            >
            </div>
          </div>
        </div>
      )}

      {isSaveModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.saveModal}>
            <div className={styles.modalHeader}>
              💾 Save As
            </div>
            <div className={styles.modalBody}>
              <div className={styles.inputGroup}>
                <label>Where to save:</label>
                <select className={styles.fileNameInput} disabled>
                  <option>📁 Documents / Homework</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>File name:</label>
                <input 
                  type="text" 
                  className={styles.fileNameInput} 
                  value={filenameInput}
                  onChange={(e) => setFilenameInput(e.target.value)}
                  placeholder="Enter a descriptive filename..."
                  autoFocus
                />
              </div>
              <p style={{ fontSize: "0.85rem", color: "#605e5c", margin: 0 }}>
                Save as type: Word Document (*.docx)
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalBtn} onClick={() => setIsSaveModalOpen(false)}>Cancel</button>
              <button className={`${styles.modalBtn} ${styles.primary}`} onClick={handleSaveSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
