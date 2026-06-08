"use client";

import { useState, useEffect } from "react";
import styles from "./Module1.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module1() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  // Task 1 State
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Task 2 & 3 State
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsMinimized, setSettingsMinimized] = useState(false);

  // Task 4 State
  const [desktopColor, setDesktopColor] = useState("transparent");
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);

  // Task 5 State
  const [pastedText, setPastedText] = useState("");

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

  const openSettings = () => {
    if (!unlocked) return;
    setSettingsOpen(true);
    setSettingsMinimized(false);
    if (taskIndex === 1) {
      logEvent('OPENED_SETTINGS');
      setTimeout(nextTask, 500);
    }
  };

  const minimizeSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSettingsMinimized(true);
    if (taskIndex === 2) {
      logEvent('MINIMIZED_SETTINGS');
      setTimeout(nextTask, 500);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (taskIndex >= 3) {
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const changeBackground = () => {
    setDesktopColor("#1e3a8a"); // A nice deep blue
    setContextMenu(null);
    if (taskIndex === 3) {
      logEvent('CHANGED_BACKGROUND');
      setTimeout(nextTask, 500);
    }
  };

  const handlePaste = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPastedText(e.target.value);
    if (taskIndex === 4 && e.target.value === "SECRET-CODE-99") {
      logEvent('PASTED_CODE');
      setTimeout(nextTask, 500);
    }
  };

  const answerQuiz = (isHardware: boolean) => {
    if (taskIndex === 5 && isHardware) {
      logEvent('QUIZ_PASSED');
      nextTask();
    } else if (taskIndex === 5) {
      alert("Incorrect! Hardware is something physical you can touch. Try again.");
    }
  };

  if (!unlocked) {
    return (
      <div className={styles.lockScreen}>
        <div className={styles.loginBox}>
          <div className={styles.userAvatar}>👤</div>
          <h2>Student User</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter password..." 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={loginError ? styles.errorInput : ''}
              autoFocus
            />
            <button type="submit">→</button>
          </form>
          {loginError && <p className={styles.errorText}>Incorrect password. Hint: password123</p>}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={styles.desktopArea} 
      style={{ backgroundColor: desktopColor }}
      onClick={() => setContextMenu(null)}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openSettings}>
          <div className={styles.iconImage}>⚙️</div>
          <span>Settings</span>
        </div>
        <div className={styles.desktopIcon}>
          <div className={styles.iconImage}>🌐</div>
          <span>Web Browser</span>
        </div>
        <div className={styles.desktopIcon}>
          <div className={styles.iconImage}>📝</div>
          <span>Word Processor</span>
        </div>
        <div className={styles.desktopIcon}>
          <div className={styles.iconImage}>🗑️</div>
          <span>Recycle Bin</span>
        </div>
      </div>

      {settingsOpen && !settingsMinimized && (
        <div className={`glass-panel ${styles.osWindow}`}>
          <div className={styles.windowHeader}>
            <span>System Settings</span>
            <div className={styles.windowControls}>
              <button className={styles.minimizeBtn} onClick={minimizeSettings}>—</button>
              <button className={styles.maximizeBtn}>□</button>
              <button className={styles.closeBtn} onClick={() => setSettingsOpen(false)}>×</button>
            </div>
          </div>
          <div className={styles.windowBody}>
            <p>Device configuration and preferences.</p>
          </div>
        </div>
      )}

      {contextMenu && (
        <div 
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className={styles.menuItem} onClick={changeBackground}>
            🎨 Change Background
          </div>
          <div className={styles.menuItem} onClick={() => setContextMenu(null)}>
            📁 New Folder
          </div>
        </div>
      )}

      {taskIndex === 4 && (
        <div className={`glass-panel ${styles.codeWindow}`}>
          <h3>Keyboard Shortcut Challenge</h3>
          <p>Highlight the text below and press <strong>Ctrl+C</strong> to copy it:</p>
          <div className={styles.selectableText}>SECRET-CODE-99</div>
          <p>Then, click in the box below and press <strong>Ctrl+V</strong> to paste it:</p>
          <input 
            type="text" 
            value={pastedText}
            onChange={handlePaste}
            placeholder="Paste here..."
            className={styles.pasteInput}
          />
        </div>
      )}

      {taskIndex === 5 && (
        <div className={`glass-panel ${styles.quizWindow}`}>
          <h3>Knowledge Check</h3>
          <p>Which of the following is considered <strong>Hardware</strong>?</p>
          <div className={styles.quizButtons}>
            <button onClick={() => answerQuiz(false)}>A) Microsoft Word</button>
            <button onClick={() => answerQuiz(true)}>B) The Computer Mouse</button>
            <button onClick={() => answerQuiz(false)}>C) The Operating System</button>
          </div>
        </div>
      )}
    </div>
  );
}
