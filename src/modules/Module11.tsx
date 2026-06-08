"use client";

import { useState, useEffect } from "react";
import styles from "./Module11.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module11() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  const [isMuted, setIsMuted] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  const [openMenu, setOpenMenu] = useState<"start" | "wifi" | "volume" | null>(null);
  const [systemState, setSystemState] = useState<"normal" | "restarting" | "locked">("normal");

  const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);
  const [recycleBinFiles, setRecycleBinFiles] = useState(["History_Essay.docx"]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file: string } | null>(null);

  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState("HP Universal Printing PCL 6");
  
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  // Evaluate Task 1: Fix Audio and Wi-Fi
  useEffect(() => {
    if (taskIndex === 0) {
      if (!isMuted && isConnected) {
        logEvent("audio_wifi_fixed");
        nextTask();
        setOpenMenu(null);
      }
    }
  }, [isMuted, isConnected, taskIndex, nextTask, logEvent]);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMenuToggle = (menu: "start" | "wifi" | "volume") => {
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menu);
      logEvent(`opened_${menu}_menu`);
    }
  };

  const handleConnectWifi = () => {
    setIsConnected(true);
    setOpenMenu(null);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (taskIndex === 1) {
      setOpenMenu(null);
      setSystemState("restarting");
      logEvent("initiated_restart");
      
      setTimeout(() => {
        setSystemState("normal");
        nextTask();
      }, 3000); // 3 seconds restart simulation
    }
  };

  const handleLock = () => {
    if (taskIndex === 2) {
      setOpenMenu(null);
      setSystemState("locked");
      logEvent("locked_device");
    }
  };

  const handleUnlock = () => {
    if (systemState === "locked") {
      setSystemState("normal");
      if (taskIndex === 2) {
        nextTask();
      }
    }
  };

  const handleRestore = () => {
    if (contextMenu) {
      setRecycleBinFiles(recycleBinFiles.filter(f => f !== contextMenu.file));
      setContextMenu(null);
      if (taskIndex === 3) {
        logEvent("restored_file");
        nextTask();
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent, file: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const handlePrint = () => {
    if (taskIndex === 4 && selectedPrinter === "FOLLOW_ME") {
      setIsPrintDialogOpen(false);
      logEvent("printed_to_follow_me");
      nextTask();
      setTimeout(() => setIsQuizOpen(true), 1500);
    }
  };

  const handleQuizAnswer = (answer: string, isCorrect: boolean) => {
    setQuizAnswered(answer);
    if (isCorrect && taskIndex === 5) {
      logEvent("module11_quiz_passed");
      setTimeout(() => {
        setIsQuizOpen(false);
        nextTask();
      }, 1500);
    }
  };

  const isFrozen = taskIndex === 1 && systemState === "normal";

  if (systemState === "restarting") {
    return (
      <div className={styles.desktop}>
        <div className={styles.restartingOverlay}>
          <div className={styles.spinner}>⚙️</div>
          <div>Restarting...</div>
        </div>
      </div>
    );
  }

  if (systemState === "locked") {
    return (
      <div className={styles.desktop}>
        <div className={styles.lockedOverlay} onClick={handleUnlock} style={{ cursor: "pointer" }}>
          <div className={styles.lockedTime}>12:34</div>
          <div style={{ fontSize: "1.5rem" }}>School User</div>
          <div style={{ marginTop: "1rem" }}>🔒 Locked</div>
          <div style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.8 }}>Click anywhere to sign back in</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.desktop} onClick={() => setOpenMenu(null)}>
      
      {/* Desktop Icons */}
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={() => setIsRecycleBinOpen(true)}>
          <span className={styles.iconImage}>🗑️</span>
          <span>Recycle Bin</span>
        </div>
        <div className={styles.desktopIcon} onDoubleClick={() => setIsPrintDialogOpen(true)}>
          <span className={styles.iconImage}>📝</span>
          <span>Word Processor</span>
        </div>
      </div>

      {/* Frozen Window (Task 2) */}
      {isFrozen && (
        <div className={styles.frozenWindow}>
          <div className={styles.frozenHeader}>
            <span>Word Processor (Not Responding)</span>
            <span style={{ cursor: "not-allowed" }}>✕</span>
          </div>
          <div className={styles.frozenBody}>
            ⏳ System Unresponsive
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className={styles.taskbar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.startBtn} onClick={() => handleMenuToggle("start")}>
          ⊞
        </div>
        
        <div className={styles.systemTray}>
          <div className={styles.trayIcon} onClick={() => handleMenuToggle("wifi")}>
            {isConnected ? "📶" : "🌐"}
          </div>
          <div className={styles.trayIcon} onClick={() => handleMenuToggle("volume")}>
            {isMuted ? "🔇" : "🔊"}
          </div>
          <div className={styles.clock}>
            <span>12:34 PM</span>
            <span>22/02/2026</span>
          </div>
        </div>
      </div>

      {/* Popouts */}
      {openMenu === "volume" && (
        <div className={`${styles.menuPopup} ${styles.volumeMenu}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.volumeToggle} onClick={handleToggleMute}>
            {isMuted ? "🔇" : "🔊"}
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : 50} 
            className={styles.volumeSlider}
            onChange={() => setIsMuted(false)}
          />
        </div>
      )}

      {openMenu === "wifi" && (
        <div className={`${styles.menuPopup} ${styles.wifiMenu}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.wifiHeader}>Wi-Fi Networks</div>
          <div className={styles.networkItem} onClick={handleConnectWifi}>
            <span style={{ fontSize: "1.2rem" }}>📶</span>
            <div style={{ flex: 1 }}>School_WiFi {isConnected && <div style={{ fontSize: "0.8rem", color: "green" }}>Connected</div>}</div>
            {!isConnected && <button style={{ padding: "0.2rem 0.5rem" }}>Connect</button>}
          </div>
          <div className={styles.networkItem}>
            <span style={{ fontSize: "1.2rem" }}>🔒</span>
            <div style={{ flex: 1 }}>Staff_Network</div>
          </div>
        </div>
      )}

      {openMenu === "start" && (
        <div className={`${styles.menuPopup} ${styles.startMenu}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.startSidebar}>
            <div className={styles.startAction} title="Lock (Accountability)" onClick={handleLock}>👤</div>
            <div className={styles.startAction} title="Restart" onClick={handleRestart}>⏻</div>
          </div>
          <div className={styles.startMain}>
            <h3 style={{ margin: 0 }}>Start Menu</h3>
            <p style={{ fontSize: "0.85rem", color: "#aaa" }}>Pinned applications would be here...</p>
          </div>
        </div>
      )}

      {/* Recycle Bin Window */}
      {isRecycleBinOpen && (
        <div className={styles.recycleBinWindow} onClick={(e) => e.stopPropagation()}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>🗑️</span> Recycle Bin
            </div>
            <div className={styles.windowControls}>
              <button className={styles.closeBtn} onClick={() => setIsRecycleBinOpen(false)}>✕</button>
            </div>
          </div>
          <div className={styles.appBody}>
            <div className={styles.fileGrid}>
              {recycleBinFiles.map(file => (
                <div 
                  key={file} 
                  className={styles.fileItem}
                  onContextMenu={(e) => handleContextMenu(e, file)}
                >
                  <div className={styles.fileIcon}>📄</div>
                  <div className={styles.fileName}>{file}</div>
                </div>
              ))}
              {recycleBinFiles.length === 0 && (
                <div style={{ padding: "1rem", color: "#666" }}>Recycle Bin is empty.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.contextMenuItem} onClick={handleRestore}>
            ↩️ Restore
          </div>
        </div>
      )}

      {/* Print Dialog Modal */}
      {isPrintDialogOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.printDialog}>
            <div className={styles.printHeader}>
              Print
              <button className={styles.closeBtn} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "1.2rem" }} onClick={() => setIsPrintDialogOpen(false)}>✕</button>
            </div>
            <div className={styles.printBody}>
              <div className={styles.printSection}>
                <label style={{ fontWeight: "bold" }}>Printer:</label>
                <select 
                  className={styles.printerSelect} 
                  value={selectedPrinter} 
                  onChange={(e) => setSelectedPrinter(e.target.value)}
                >
                  <option value="HP Universal Printing PCL 6">HP Universal Printing PCL 6</option>
                  <option value="Microsoft Print to PDF">Microsoft Print to PDF</option>
                  <option value="FOLLOW_ME">FOLLOW_ME</option>
                  <option value="Library_Printer_1">Library_Printer_1</option>
                </select>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button className={styles.printSecondaryBtn}>Properties</button>
                  <button className={styles.printSecondaryBtn}>Advanced</button>
                </div>
              </div>
              <div className={styles.printSection} style={{ flex: 1, display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1, border: "1px solid #ccc", padding: "1rem" }}>
                  <p style={{ margin: "0 0 1rem 0", fontWeight: "bold" }}>Pages to Print</p>
                  <div><input type="radio" checked readOnly /> All</div>
                  <div><input type="radio" readOnly /> Current</div>
                  <div><input type="radio" readOnly /> Pages <input type="text" style={{ width: "50px" }} /></div>
                </div>
                <div style={{ flex: 1, border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
                  <div style={{ background: "white", width: "150px", height: "200px", padding: "1rem", fontSize: "0.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <h1 style={{ fontSize: "0.8rem" }}>History Essay</h1>
                    <p>By Student</p>
                    <hr />
                    <p>This is a preview of the document...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.printFooter}>
              <button className={styles.printPrimaryBtn} onClick={handlePrint}>Print</button>
              <button className={styles.printSecondaryBtn} onClick={() => setIsPrintDialogOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.quizModal}>
            <div className={styles.quizHeader}>
              Module 11 Knowledge Check
            </div>
            <div className={styles.quizBody}>
              <div className={styles.quizQuestion}>
                If a program freezes and stops responding, what is the safest way to fix it?
              </div>
              <div className={styles.quizOptions}>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "A" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("A", false)}
                >
                  A) Hold down the physical power button on the computer until it turns off.
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "B" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("B", false)}
                >
                  B) Unplug the computer from the wall.
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "C" ? styles.correct : ""}`}
                  onClick={() => handleQuizAnswer("C", true)}
                >
                  C) Use the Start Menu to perform a Soft Restart.
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "D" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("D", false)}
                >
                  D) Hit the keyboard really hard.
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
