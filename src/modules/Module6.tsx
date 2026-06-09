"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Module6.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module6() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  // Word State
  const [activeTab, setActiveTab] = useState<"Home" | "Insert" | "File">("Home");
  const [isBold, setIsBold] = useState(false);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [showBullets, setShowBullets] = useState(false);
  const [fontSize, setFontSize] = useState("12");
  
  const [headingText, setHeadingText] = useState("");
  const [bulletsText, setBulletsText] = useState("");
  const bulletTaskCompleted = useRef(false);
  const [hasHeader, setHasHeader] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);

  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveFileName, setSaveFileName] = useState("Document1.docx");

  // App interactions
  const openApp = () => {
    setIsAppOpen(true);
    if (taskIndex === 0 && !isAppOpen) {
      logEvent("word_opened");
      setTimeout(nextTask, 500);
    }
  };

  const closeApp = () => setIsAppOpen(false);

  // Formatting Tracking
  useEffect(() => {
    if (taskIndex === 1) {
      const isDisco = headingText.toLowerCase().includes("school disco");
      const isLarge = parseInt(fontSize) >= 24;
      if (hasHeader && isDisco && isBold && align === "center" && isLarge) {
        logEvent("word_formatting_applied");
        setTimeout(nextTask, 1000);
      }
    }
  }, [hasHeader, headingText, isBold, align, fontSize, taskIndex, nextTask, logEvent]);

  useEffect(() => {
    if (taskIndex === 2) {
      if (showBullets && bulletsText.length > 10) {
        logEvent("word_bullets_added");
        setTimeout(nextTask, 1000);
      }
    }
  }, [showBullets, bulletsText, taskIndex, nextTask, logEvent]);

  // Actions
  const handleInsertImage = () => {
    setIsFilePickerOpen(true);
  };

  const handleSave = () => {
    if (saveFileName === "Disco_Flyer.docx") {
      setIsSaveModalOpen(false);
      setIsFileMenuOpen(false);
      if (taskIndex === 4) {
        logEvent("word_file_saved");
        setTimeout(nextTask, 1000);
      }
      alert(`Successfully saved to Documents as ${saveFileName}`);
    } else {
      alert("Please save it as 'Disco_Flyer.docx'!");
    }
  };

  if (taskIndex === 5) {
    return (
      <Quiz 
        title="Word Processing Basics Knowledge Check"
        questions={[
          {
            question: "Which toolbar button would you use to make a title stand out more?",
            options: ["Bold", "Align Left", "Save"],
            correctAnswerIndex: 0
          },
          {
            question: "Why should you use bullet points in a document?",
            options: ["To make the file size smaller", "To make lists of information clear and easy to read", "To change the color of the text"],
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
            <span>Document1 - Word</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeApp}>✕</button>
            </div>
          </div>

          {/* Word Blue Header */}
          <div className={styles.wordBlueHeader}>
            <div className={styles.wordTitle}>
              <strong>W</strong> Document1
            </div>
            <div className={styles.wordMenu}>
              <span 
                className={`${styles.menuItem} ${activeTab === "File" ? styles.active : ''}`}
                onClick={() => { setActiveTab("File"); setIsFileMenuOpen(!isFileMenuOpen); }}
              >File</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Home" ? styles.active : ''}`}
                onClick={() => { setActiveTab("Home"); setIsFileMenuOpen(false); }}
              >Home</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Insert" ? styles.active : ''}`}
                onClick={() => { setActiveTab("Insert"); setIsFileMenuOpen(false); }}
              >Insert</span>
            </div>
          </div>

          {/* Ribbon */}
          {!isFileMenuOpen && (
            <div className={styles.wordRibbon}>
              {activeTab === "Home" && (
                <>
                  <div className={styles.ribbonGroup}>
                    <select className={styles.ribbonSelect} style={{width: '120px'}}>
                      <option>Calibri</option>
                      <option>Arial</option>
                      <option>Times New Roman</option>
                    </select>
                    <select className={styles.ribbonSelect} value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                      <option value="12">12</option>
                      <option value="18">18</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                    </select>
                  </div>
                  <div className={styles.ribbonGroup}>
                    <button className={`${styles.ribbonBtn} ${isBold ? styles.active : ''}`} onClick={() => setIsBold(!isBold)}><strong>B</strong></button>
                    <button className={styles.ribbonBtn}><em>I</em></button>
                    <button className={styles.ribbonBtn}><u>U</u></button>
                  </div>
                  <div className={styles.ribbonGroup}>
                    <button className={`${styles.ribbonBtn} ${align === 'left' ? styles.active : ''}`} onClick={() => setAlign('left')}>≣</button>
                    <button className={`${styles.ribbonBtn} ${align === 'center' ? styles.active : ''}`} onClick={() => setAlign('center')}>≡</button>
                    <button className={`${styles.ribbonBtn} ${align === 'right' ? styles.active : ''}`} onClick={() => setAlign('right')}>≢</button>
                  </div>
                  <div className={styles.ribbonGroup}>
                    <button className={`${styles.ribbonBtn} ${showBullets ? styles.active : ''}`} onClick={() => setShowBullets(!showBullets)}>•—</button>
                  </div>
                </>
              )}
              {activeTab === "Insert" && (
                <div className={styles.ribbonGroup}>
                  <button className={styles.ribbonBtn} onClick={() => setHasHeader(true)}>📄 Header</button>
                  <button className={styles.ribbonBtn} onClick={handleInsertImage}>🖼️ Pictures</button>
                  <button className={styles.ribbonBtn}>⬠ Shapes</button>
                </div>
              )}
            </div>
          )}

          {/* File Menu Dropdown */}
          {isFileMenuOpen && (
            <div className={styles.fileMenuDropdown}>
              <div className={styles.fileMenuItem} onClick={() => setIsFileMenuOpen(false)}>← Back</div>
              <div className={styles.fileMenuItem}>New</div>
              <div className={styles.fileMenuItem}>Open</div>
              <div className={styles.fileMenuItem}>Save</div>
              <div className={styles.fileMenuItem} onClick={() => setIsSaveModalOpen(true)}>Save As</div>
              <div className={styles.fileMenuItem}>Print</div>
            </div>
          )}

          {/* Main Document Area */}
          <div className={styles.documentArea}>
            <div className={styles.documentPage}>
              {/* Heading Area */}
              {hasHeader && (
                <div className={styles.headerRegion}>
                  <div className={styles.headerLabel}>Header</div>
                  <div 
                    className={styles.docHeading}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setHeadingText(e.currentTarget.textContent || "")}
                    style={{
                      fontSize: `${fontSize}px`,
                      fontWeight: isBold ? 'bold' : 'normal',
                      textAlign: align,
                      minHeight: '40px'
                    }}
                  ></div>
                </div>
              )}

              {/* Main Text Area */}
              <div 
                className={styles.docBodyArea}
                onClick={() => {
                  if (!showBullets && taskIndex > 1) {
                    // Just click to focus body
                  }
                }}
              >

              {/* Bullets Area */}
              {showBullets && (
                <ul 
                  className={styles.docBullets}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    if (taskIndex === 2 && e.currentTarget.textContent && e.currentTarget.textContent.length > 15) {
                      if (!bulletTaskCompleted.current) {
                        bulletTaskCompleted.current = true;
                        logEvent("word_bullets_added");
                        setTimeout(nextTask, 500);
                      }
                    }
                  }}
                  onBlur={(e) => setBulletsText(e.currentTarget.textContent || "")}
                >
                  <li></li>
                </ul>
              )}

              {/* Image Area */}
              {hasImage && (
                <div style={{textAlign: 'center'}} contentEditable={false}>
                  <img src="/disco_ball.png" alt="Disco Ball" className={styles.docImage} />
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save As Modal */}
      {isSaveModalOpen && (
        <div className={styles.saveModalOverlay}>
          <div className={styles.saveModal}>
            <h2 style={{marginTop: 0, marginBottom: '1.5rem', color: '#111'}}>Save As</h2>
            <p style={{color: '#605e5c', marginBottom: '0.5rem'}}>Location: Documents Folder</p>
            <input 
              type="text" 
              className={styles.saveModalInput} 
              value={saveFileName}
              onChange={(e) => setSaveFileName(e.target.value)}
            />
            <div className={styles.saveModalActions}>
              <button className={styles.cancelBtn} onClick={() => setIsSaveModalOpen(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* File Picker Modal */}
      {isFilePickerOpen && (
        <div className={styles.saveModalOverlay}>
          <div className={styles.saveModal} style={{width: '600px', padding: 0, overflow: 'hidden'}}>
            <div style={{padding: '1rem', background: '#f3f3f3', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111'}}>
              <span>Open File</span>
              <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => setIsFilePickerOpen(false)}>✕</button>
            </div>
            <div style={{display: 'flex', height: '300px'}}>
              <div style={{width: '150px', borderRight: '1px solid #e5e5e5', padding: '1rem', background: '#fbfbfb', color: '#111'}}>
                <div style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Pictures</div>
                <div>Documents</div>
              </div>
              <div style={{flex: 1, padding: '1rem', display: 'flex', gap: '1rem'}}>
                <div 
                  style={{width: '100px', height: '100px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
                  onClick={() => {
                    setIsFilePickerOpen(false);
                    setHasImage(true);
                    if (taskIndex === 3) {
                      logEvent("word_image_inserted");
                      setTimeout(nextTask, 500);
                    }
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f3f2f1'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <img src="/disco_ball.png" alt="Disco Ball" style={{maxWidth: '60px', maxHeight: '60px'}} />
                  <span style={{fontSize: '0.8rem', marginTop: '0.5rem', color: '#111'}}>disco_ball.png</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
