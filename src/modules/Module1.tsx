"use client";

import { useState, useEffect } from "react";
import styles from "./Module1.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module1() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  // Login State
  const [unlocked, setUnlocked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // App States
  const [browserOpen, setBrowserOpen] = useState(false);
  const [wordOpen, setWordOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false); // Used for screenshot task
  
  const [settingsMinimized, setSettingsMinimized] = useState(false);
  
  // Settings Volume State
  const [volume, setVolume] = useState(50);
  const [volumeChanged, setVolumeChanged] = useState(false);

  // Desktop State
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  const [desktopIcons, setDesktopIcons] = useState<{id: string, label: string, icon: string}[]>([
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "browser", label: "Web Browser", icon: "🌐" },
    { id: "word", label: "Word Processor", icon: "📝" },
    { id: "tools", label: "Snipping Tool", icon: "✂️" }
  ]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Task 5 State
  const [screenshotTaken, setScreenshotTaken] = useState(false);
  const [pastedText, setPastedText] = useState("");

  useEffect(() => {
    // Check if scavenger hunt apps are open
    if (taskIndex === 1 && browserOpen && wordOpen) {
      logEvent("scavenger_hunt_completed");
      setTimeout(nextTask, 1000);
    }
  }, [browserOpen, wordOpen, taskIndex, nextTask, logEvent]);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "password123") {
      logEvent('LOGGED_IN');
      setUnlocked(true);
      if (taskIndex === 0) nextTask();
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const closeAllMenus = () => {
    setContextMenu(null);
    setStartMenuOpen(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (unlocked && taskIndex >= 3) { // Only allow if they reached shortcut task or beyond
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const createShortcut = () => {
    if (taskIndex === 3) {
      logEvent("shortcut_created");
      setDesktopIcons([...desktopIcons, { id: "games", label: "Games Folder", icon: "🎮" }]);
      setContextMenu(null);
      setTimeout(nextTask, 500);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
    if (taskIndex === 2 && !volumeChanged) {
      setVolumeChanged(true);
      logEvent("volume_adjusted");
      setTimeout(nextTask, 1000);
    }
  };

  const takeScreenshot = () => {
    if (taskIndex === 4) {
      setScreenshotTaken(true);
    }
  };

  const handlePaste = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPastedText(e.target.value);
    if (taskIndex === 4 && e.target.value === "SECRET-CODE-99" && screenshotTaken) {
      logEvent("keyboard_shortcuts_mastered");
      setTimeout(nextTask, 1000);
    }
  };

  const handleQuizComplete = () => {
    logEvent("module1_quiz_passed");
    nextTask();
  };

  if (!unlocked) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    
    return (
      <div className={`${styles.lockScreen} ${loginClicked ? styles.active : ''}`} onClick={() => !loginClicked && setLoginClicked(true)}>
        {!loginClicked ? (
          <div className={styles.timeContainer}>
            <h1>{time}</h1>
            <p>{date}</p>
          </div>
        ) : (
          <div className={styles.loginBox} onClick={e => e.stopPropagation()}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userName}>Student User</div>
            <form onSubmit={handleLogin} className={styles.pinInputContainer} style={loginError ? {borderColor: '#ffb3b3'} : {}}>
              <input 
                type="password" 
                placeholder="PIN or Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.pinInput}
                autoFocus
              />
              <button type="submit" className={styles.submitBtn}>→</button>
            </form>
            {loginError && <p className={styles.errorText}>Incorrect password. Hint: password123</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={styles.desktopArea} 
      onClick={closeAllMenus}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        {desktopIcons.map(icon => (
          <div key={icon.id} className={styles.desktopIcon} onDoubleClick={() => {
            if (icon.id === "settings") { setSettingsOpen(true); setSettingsMinimized(false); }
            if (icon.id === "browser") setBrowserOpen(true);
            if (icon.id === "word") setWordOpen(true);
            if (icon.id === "tools") setToolsOpen(true);
          }}>
            <div className={styles.iconImage}>{icon.icon}</div>
            <span>{icon.label}</span>
          </div>
        ))}
      </div>

      {/* Settings Window */}
      {settingsOpen && !settingsMinimized && (
        <div className={styles.osWindow} style={{ top: '15%', left: '20%', width: '600px', height: '400px' }} onClick={e => e.stopPropagation()}>
          <div className={styles.windowHeader}>
            Settings
            <div className={styles.windowControls}>
              <button onClick={() => {
                setSettingsMinimized(true);
                if (taskIndex === 2 && !volumeChanged) {
                  // Only progress if they already changed volume, or wait.
                }
              }}>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setSettingsOpen(false)}>×</button>
            </div>
          </div>
          <div className={styles.windowBody} style={{ padding: 0 }}>
            <div className={styles.settingsLayout}>
              <div className={styles.settingsSidebar}>
                <div className={`${styles.settingsSidebarItem} ${styles.active}`}>System</div>
                <div className={styles.settingsSidebarItem}>Bluetooth & devices</div>
                <div className={styles.settingsSidebarItem}>Network & internet</div>
                <div className={styles.settingsSidebarItem}>Personalization</div>
              </div>
              <div className={styles.settingsContent}>
                <h2>System &gt; Sound</h2>
                <div className={styles.sliderContainer}>
                  <label>Volume: {volume}%</label>
                  <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
                </div>
                <p style={{color: '#666', fontSize: '0.9rem'}}>Adjust the master volume using the slider above.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generic Browser Window */}
      {browserOpen && (
        <div className={styles.osWindow} style={{ top: '10%', left: '10%', width: '700px', height: '450px' }} onClick={e => e.stopPropagation()}>
          <div className={styles.windowHeader}>
            Web Browser
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setBrowserOpen(false)}>×</button>
            </div>
          </div>
          <div className={styles.windowBody} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white'}}>
            <h1 style={{color: '#ccc'}}>Web Browser (Home)</h1>
          </div>
        </div>
      )}

      {/* Generic Word Window */}
      {wordOpen && (
        <div className={styles.osWindow} style={{ top: '25%', left: '25%', width: '650px', height: '400px' }} onClick={e => e.stopPropagation()}>
          <div className={styles.windowHeader}>
            Word Processor
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setWordOpen(false)}>×</button>
            </div>
          </div>
          <div className={styles.windowBody} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white'}}>
            <h1 style={{color: '#ccc'}}>Blank Document</h1>
          </div>
        </div>
      )}

      {/* Snipping/Shortcut Tool Window (For Task 4) */}
      {(toolsOpen || taskIndex === 4) && (
        <div className={styles.osWindow} style={{ top: '30%', left: '30%', width: '450px', height: '350px' }} onClick={e => e.stopPropagation()}>
          <div className={styles.windowHeader}>
            Keyboard & Screen Tools
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setToolsOpen(false)}>×</button>
            </div>
          </div>
          <div className={styles.windowBody}>
            <div className={styles.screenshotApp}>
              <h3>1. Take a Screenshot</h3>
              <p>Click the Snipping Tool button below to simulate capturing your screen (Shortcut: <strong>Windows + Shift + S</strong>).</p>
              <button className={styles.prtScnBtn} onClick={takeScreenshot}>
                {screenshotTaken ? "✓ Screenshot Captured" : "Simulate Windows + Shift + S"}
              </button>

              <h3 style={{marginTop: '1.5rem'}}>2. Copy & Paste</h3>
              <p>Highlight the secret code, press <strong>Ctrl+C</strong> to copy it:</p>
              <div className={styles.codeBox}>SECRET-CODE-99</div>
              <p>Click the box below and press <strong>Ctrl+V</strong> to paste it:</p>
              <input 
                type="text" 
                value={pastedText}
                onChange={handlePaste}
                placeholder="Paste here..."
                className={styles.pasteInput}
              />
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.menuItem}>View</div>
          <div className={styles.menuItem}>Sort by</div>
          <div className={styles.menuItem}>Refresh</div>
          <div className={styles.menuDivider}></div>
          <div className={styles.menuItem} onClick={createShortcut}>
            ➕ New Shortcut
          </div>
          <div className={styles.menuDivider}></div>
          <div className={styles.menuItem}>Display settings</div>
          <div className={styles.menuItem}>Personalize</div>
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className={styles.startMenu} onClick={e => e.stopPropagation()}>
          <h3>Pinned Apps</h3>
          <div className={styles.desktopIcons} style={{position: 'relative', top: 0, left: 0, flexDirection: 'row', flexWrap: 'wrap'}}>
             {/* Duplicate icons for start menu */}
             {desktopIcons.map(icon => (
                <div key={"start_"+icon.id} className={styles.desktopIcon}>
                  <div className={styles.iconImage}>{icon.icon}</div>
                  <span style={{color: 'black'}}>{icon.label}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className={styles.taskbar} onClick={e => e.stopPropagation()}>
        <div className={`${styles.taskbarIcon} ${startMenuOpen ? styles.active : ''}`} onClick={() => setStartMenuOpen(!startMenuOpen)}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={styles.taskbarIcon} onClick={() => { setSettingsOpen(true); setSettingsMinimized(false); }}>⚙️</div>
        <div className={`${styles.taskbarIcon} ${browserOpen ? styles.active : ''}`} onClick={() => setBrowserOpen(true)}>🌐</div>
        <div className={`${styles.taskbarIcon} ${wordOpen ? styles.active : ''}`} onClick={() => setWordOpen(true)}>📝</div>
      </div>

      {/* Module 1 Quiz */}
      {taskIndex === 5 && (
        <div className={styles.quizContainer}>
          <Quiz logEvent={logEvent} 
            title="Module 1 Quiz"
            questions={[
              { question: "What is an example of 'Hardware'?", options: ["The Windows Operating System", "A Web Browser App", "The computer mouse and keyboard", "A Word Document"], correctAnswerIndex: 2 },
              { question: "Which of these is the 'Operating System'?", options: ["Microsoft Windows", "Google Chrome", "The monitor screen", "A USB Drive"], correctAnswerIndex: 0 },
              { question: "What is the keyboard shortcut to open the Snipping Tool?", options: ["Ctrl + C", "Windows + Shift + S", "Alt + F4", "Ctrl + P"], correctAnswerIndex: 1 },
              { question: "What is the keyboard shortcut to PASTE?", options: ["Ctrl + C", "Ctrl + P", "Ctrl + V", "Ctrl + X"], correctAnswerIndex: 2 }
            ]}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

    </div>
  );
}
