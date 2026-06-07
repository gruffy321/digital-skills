"use client";

import { useState, useEffect } from "react";
import styles from "./Module1.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module1() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [windowOpen, setWindowOpen] = useState(false);
  const [shortcutPressed, setShortcutPressed] = useState(false);

  const handleDoubleClick = () => {
    if (taskIndex === 0) {
      logEvent('OPENED_SETTINGS');
      setWindowOpen(true);
      setTimeout(nextTask, 1000);
    }
  };

  const handleMinimize = () => {
    if (taskIndex === 1) {
      logEvent('MINIMIZED_WINDOW');
      setWindowOpen(false);
      setTimeout(nextTask, 1000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (taskIndex === 2 && e.ctrlKey && e.key === 'c') {
        const selection = window.getSelection()?.toString();
        if (selection && selection.length > 0) {
          logEvent('COPIED_SHORTCUT');
          setShortcutPressed(true);
          setTimeout(nextTask, 1000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [taskIndex, nextTask, logEvent]);

  return (
    <>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={handleDoubleClick}>
          <div className={styles.iconImage}>⚙️</div>
          <span>Settings</span>
        </div>
        <div className={styles.desktopIcon}>
          <div className={styles.iconImage}>📁</div>
          <span>Files</span>
        </div>
      </div>

      {windowOpen && (
        <div className={`glass-panel ${styles.osWindow}`}>
          <div className={styles.windowHeader}>
            <span>System Settings</span>
            <div className={styles.windowControls}>
              <button className={styles.minimizeBtn} onClick={handleMinimize}>—</button>
              <button className={styles.maximizeBtn}>□</button>
              <button className={styles.closeBtn}>×</button>
            </div>
          </div>
          <div className={styles.windowBody}>
            <p>Device configuration and preferences.</p>
          </div>
        </div>
      )}

      {taskIndex === 2 && (
        <div className={`glass-panel ${styles.codeWindow}`}>
          <h3>Secret Code</h3>
          <p className={shortcutPressed ? styles.successText : ''}>
            {shortcutPressed ? "Copied!" : "Select this and press Ctrl+C"}
          </p>
        </div>
      )}
    </>
  );
}
