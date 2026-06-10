"use client";

import { useState, useEffect } from "react";
import styles from "./Module11.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module11() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  // App States
  const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);
  const [isPrintQueueOpen, setIsPrintQueueOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  // Power / Profile Menus
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Screen States
  const [isLocked, setIsLocked] = useState(false);
  const [isFrozen, setIsFrozen] = useState(taskIndex === 3);

  // Data States
  const [filesInBin, setFilesInBin] = useState(["Lost_Homework.docx", "old_photo.jpg"]);
  const [printJobs, setPrintJobs] = useState(["Essay.pdf", "Tickets.pdf"]);
  const [wifiOn, setWifiOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  
  // Context Menu
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: string, target: string} | null>(null);

  // Close menus on click away
  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      setIsPowerMenuOpen(false);
      setIsProfileMenuOpen(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Update frozen state based on task
  useEffect(() => {
    if (taskIndex === 3) setIsFrozen(true);
    else setIsFrozen(false);
  }, [taskIndex]);

  // Handlers
  const handleRightClickBinItem = (e: React.MouseEvent, file: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'bin', target: file });
  };

  const handleRestoreFile = () => {
    if (contextMenu?.type === 'bin' && contextMenu.target === 'Lost_Homework.docx') {
      setFilesInBin(filesInBin.filter(f => f !== 'Lost_Homework.docx'));
      if (taskIndex === 0) {
        logEvent("restored_file");
        nextTask();
      }
    }
    setContextMenu(null);
  };

  const handleWifiToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !wifiOn;
    setWifiOn(newState);
    if (taskIndex === 1 && newState && audioOn) {
      logEvent("fixed_audio_network");
      setIsTrayOpen(false);
      setTimeout(nextTask, 500);
    }
  };

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !audioOn;
    setAudioOn(newState);
    if (taskIndex === 1 && wifiOn && newState) {
      logEvent("fixed_audio_network");
      setIsTrayOpen(false);
      setTimeout(nextTask, 500);
    }
  };

  const handleRightClickPrintJob = (e: React.MouseEvent, job: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'print', target: job });
  };

  const handleCancelPrint = () => {
    if (contextMenu?.type === 'print') {
      setPrintJobs(printJobs.filter(j => j !== contextMenu.target));
      if (taskIndex === 2) {
        logEvent("cancelled_print_job");
        setTimeout(nextTask, 500);
      }
    }
    setContextMenu(null);
  };

  const handleRestart = () => {
    if (taskIndex === 3) {
      logEvent("soft_restart");
      setIsStartMenuOpen(false);
      setIsFrozen(false);
      setTimeout(nextTask, 1000);
    }
  };

  const handleLock = () => {
    if (taskIndex === 4) {
      logEvent("locked_screen");
      setIsLocked(true);
      setIsStartMenuOpen(false);
      setTimeout(nextTask, 1000);
    }
  };

  if (taskIndex === 5 && !isLocked) {
    return (
      <Quiz 
        title="Troubleshooting Knowledge Check"
        questions={[
          {
            question: "If your computer software completely freezes, what should you do first?",
            options: ["Hold the power button down to turn it off", "Click Start Menu -> Power -> Restart for a Soft Restart", "Unplug it from the wall"],
            correctAnswerIndex: 1
          },
          {
            question: "Where is the quickest place to fix Wi-Fi connection and Audio volume issues?",
            options: ["The System Tray in the bottom right corner", "The Recycle Bin", "Task Manager"],
            correctAnswerIndex: 0
          },
          {
            question: "What does locking your computer (Start -> Profile -> Lock) do?",
            options: ["Deletes all your files securely", "Shuts the computer down instantly", "Secures your account so nobody else can use it while you're away"],
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
      
      {/* Locked Screen Overlay */}
      {isLocked && (
        <div className={styles.lockScreen}>
          <h1 className={styles.lockTime}>12:00</h1>
          <div className={styles.lockDate}>Wednesday, October 14</div>
          <div className={styles.lockProfile}>
            <div className={styles.lockAvatar}>👤</div>
            <div className={styles.lockName}>Student Account</div>
            {taskIndex === 5 && (
              <button className={styles.unlockBtn} onClick={() => setIsLocked(false)}>Unlock to take Quiz</button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={() => setIsRecycleBinOpen(true)}>
          <div className={styles.iconSquare} style={{ background: 'transparent' }}>🗑️</div>
          <span>Recycle Bin</span>
        </div>
      </div>

      {/* Frozen App Simulator for Task 3 */}
      {isFrozen && (
        <div className={styles.frozenApp}>
          <div className={styles.frozenAppHeader}>Word Processor (Not Responding)</div>
          <div>Program is frozen...</div>
        </div>
      )}

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarCenter}>
          <div 
            className={`${styles.taskbarIcon} ${isStartMenuOpen ? styles.active : ''}`} 
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          >
            <span className={styles.startButton}>⊞</span>
          </div>
        </div>
        
        <div className={styles.systemTray} onClick={() => setIsTrayOpen(!isTrayOpen)}>
          <span className={styles.trayIcon}>🖨️</span>
          <span className={styles.trayIcon}>{wifiOn ? '📶' : '📵'}</span>
          <span className={styles.trayIcon}>{audioOn ? '🔊' : '🔇'}</span>
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div className={styles.startMenu}>
          <div className={styles.startMenuContent}>
            <h3>Pinned</h3>
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
              <div style={{padding: '1rem', background: 'white', borderRadius: '4px', textAlign: 'center'}}>Word</div>
              <div style={{padding: '1rem', background: 'white', borderRadius: '4px', textAlign: 'center'}}>Excel</div>
            </div>
          </div>
          <div className={styles.startMenuFooter}>
            <div style={{position: 'relative'}}>
              <div className={styles.profileBtn} onClick={(e) => { e.stopPropagation(); setIsProfileMenuOpen(!isProfileMenuOpen); }}>
                👤 Student
              </div>
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <div className={styles.menuItem} onClick={handleLock}>Lock</div>
                  <div className={styles.menuItem}>Sign out</div>
                </div>
              )}
            </div>
            
            <div style={{position: 'relative'}}>
              <div className={styles.powerBtn} onClick={(e) => { e.stopPropagation(); setIsPowerMenuOpen(!isPowerMenuOpen); }}>
                ⏻
              </div>
              {isPowerMenuOpen && (
                <div className={styles.powerMenu}>
                  <div className={styles.menuItem}>Sleep</div>
                  <div className={styles.menuItem} onClick={handleRestart}>Restart</div>
                  <div className={styles.menuItem}>Shut down</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* System Tray Popup */}
      {isTrayOpen && (
        <div className={styles.trayPopup}>
          <div className={styles.traySection}>
            <div style={{fontWeight: 'bold'}}>School_WiFi</div>
            <div className={styles.trayToggle} onClick={handleWifiToggle}>
              <div className={`${styles.toggleBtn} ${wifiOn ? styles.on : ''}`}>
                <div className={styles.toggleSlider}></div>
              </div>
            </div>
          </div>
          <div className={styles.traySection}>
            <div style={{fontWeight: 'bold'}}>Speakers</div>
            <div className={styles.trayToggle} onClick={handleAudioToggle}>
              <div className={`${styles.toggleBtn} ${audioOn ? styles.on : ''}`}>
                <div className={styles.toggleSlider}></div>
              </div>
            </div>
          </div>
          <hr style={{border: 'none', borderTop: '1px solid #ccc', margin: '0.5rem 0'}} />
          <div className={styles.traySection} style={{cursor: 'pointer'}} onClick={() => { setIsPrintQueueOpen(true); setIsTrayOpen(false); }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span>🖨️</span>
              <span>Open Print Queue ({printJobs.length} documents)</span>
            </div>
          </div>
        </div>
      )}

      {/* Recycle Bin Window */}
      {isRecycleBinOpen && (
        <div className={styles.appWindow}>
          <div className={styles.appHeader}>
            <span>Recycle Bin</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsRecycleBinOpen(false)}>✕</button>
            </div>
          </div>
          <table className={styles.listView}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Original Location</th>
                <th>Date Deleted</th>
              </tr>
            </thead>
            <tbody>
              {filesInBin.map(file => (
                <tr 
                  key={file} 
                  className={styles.listRow}
                  onContextMenu={(e) => handleRightClickBinItem(e, file)}
                >
                  <td>{file}</td>
                  <td>C:\Users\Student\Documents</td>
                  <td>Today</td>
                </tr>
              ))}
              {filesInBin.length === 0 && (
                <tr>
                  <td colSpan={3} style={{textAlign: 'center', padding: '2rem', color: '#666'}}>Recycle Bin is empty</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Print Queue Window */}
      {isPrintQueueOpen && (
        <div className={styles.appWindow} style={{width: '50%', height: '50%', top: '20%', left: '25%'}}>
          <div className={styles.appHeader}>
            <span>Library Printer - 1 Error</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsPrintQueueOpen(false)}>✕</button>
            </div>
          </div>
          <table className={styles.listView}>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {printJobs.map((job, index) => (
                <tr 
                  key={job} 
                  className={styles.listRow}
                  onContextMenu={(e) => handleRightClickPrintJob(e, job)}
                >
                  <td>{job}</td>
                  <td style={{color: index === 0 ? 'red' : 'inherit'}}>{index === 0 ? 'Error - Out of Paper' : 'Waiting...'}</td>
                  <td>Student</td>
                </tr>
              ))}
              {printJobs.length === 0 && (
                <tr>
                  <td colSpan={3} style={{textAlign: 'center', padding: '2rem', color: '#666'}}>No documents in queue</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Shared Context Menu */}
      {contextMenu && (
        <div 
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'bin' && (
            <>
              <div className={styles.menuItem} onClick={handleRestoreFile}>Restore</div>
              <div className={styles.menuItem}>Delete Permanently</div>
            </>
          )}
          {contextMenu.type === 'print' && (
            <>
              <div className={styles.menuItem}>Restart</div>
              <div className={styles.menuItem} onClick={handleCancelPrint}>Cancel</div>
            </>
          )}
        </div>
      )}

    </div>
  );
}
