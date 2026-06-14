"use client";

import { useState, createContext, useContext, KeyboardEvent, useEffect } from "react";
import Link from "next/link";
import styles from "./ModuleWrapper.module.css";
import { markModuleCompleted } from "@/actions/progress";

export type Task = { 
  title: string; 
  instruction: string;
  content?: React.ReactNode; 
};

interface ModuleContextType {
  taskIndex: number;
  nextTask: () => void;
  logEvent: (action: string) => void;
  showAlert: (msg: string) => void;
}

export const ModuleContext = createContext<ModuleContextType | null>(null);

export function useModule() {
  const context = useContext(ModuleContext);
  if (!context) throw new Error("useModule must be used within a ModuleWrapper");
  return context;
}

export default function ModuleWrapper({ 
  moduleId, 
  tasks, 
  children,
  onKeyDown
}: { 
  moduleId: string, 
  tasks: Task[], 
  children: React.ReactNode,
  onKeyDown?: (e: KeyboardEvent) => void
}) {
  const [taskIndex, setTaskIndex] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (msg: string) => setAlertMessage(msg);

  // Auto-open guide when task changes
  useEffect(() => {
    if (taskIndex < tasks.length) {
      setIsGuideOpen(true);
    }
  }, [taskIndex, tasks.length]);

  const logEvent = async (action: string) => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, actionType: action, metadataJson: {} })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const nextTask = async () => {
    const next = taskIndex + 1;
    setTaskIndex(next);
    if (next >= tasks.length) {
      await markModuleCompleted(moduleId);
    }
  };

  const currentTask = taskIndex < tasks.length ? tasks[taskIndex] : null;

  return (
    <ModuleContext.Provider value={{ taskIndex, nextTask, logEvent, showAlert }}>
      <div className={styles.container} onKeyDown={onKeyDown} tabIndex={0}>
        
        {/* Minimal Top Bar for Back Navigation */}
        <header className={styles.minimalTopBar}>
          <Link href="/dashboard" className={styles.backBtn}>← Back to Dashboard</Link>
          {!isGuideOpen && currentTask && (
            <div className={`glass-panel ${styles.floatingWidget}`}>
              <div className={styles.floatingContent}>
                <span className={styles.floatingTitle}>{currentTask.title}:</span>
                <span className={styles.floatingInstruction}>{currentTask.instruction}</span>
              </div>
              <button className={styles.showGuideBtn} onClick={() => setIsGuideOpen(true)}>
                📖 Show Guide
              </button>
            </div>
          )}
        </header>

        {/* The Desktop Simulator Area */}
        <main className={`${styles.desktop} ${isGuideOpen ? styles.desktopShrink : ''}`}>
          {children}
        </main>

        {/* The Windows 11 Taskbar */}
        <div className={styles.taskbar}>
          <div className={styles.startBtn}>❖</div>
          <div className={styles.taskbarIcon}>🔍</div>
          <div className={styles.taskbarIcon}>📁</div>
          <div className={styles.taskbarIcon}>🌐</div>
        </div>

        {/* The Collapsible Learning Drawer */}
        <aside className={`${styles.sidePanel} ${isGuideOpen ? styles.panelOpen : styles.panelClosed}`}>
          <div className={styles.panelHeader}>
            <h2>Course Guide</h2>
            <button className={styles.closePanelBtn} onClick={() => setIsGuideOpen(false)}>
              Hide ➔
            </button>
          </div>
          
          <div className={styles.panelContentScroll}>
            {currentTask ? (
              <>
                <div className={styles.learningContent}>
                  <h3>{currentTask.title}</h3>
                  {currentTask.content && <div className={styles.contentText}>{currentTask.content}</div>}
                </div>
                
                <div className={styles.actionBlock}>
                  <h4>Current Task</h4>
                  <p>{currentTask.instruction}</p>
                </div>
              </>
            ) : (
              <div className={styles.successMessage}>
                <h3>🎉 Module Complete!</h3>
                <p>You have successfully completed this module. You can now return to the dashboard to continue your journey.</p>
                <Link href="/dashboard" className={styles.returnBtn}>Return to Dashboard</Link>
              </div>
            )}
          </div>
        </aside>

        {/* Custom Alert Modal */}
        {alertMessage && (
          <div className={styles.alertOverlay}>
            <div className={styles.alertModal}>
              <div className={styles.alertIcon}>⚠️</div>
              <div className={styles.alertMessage}>{alertMessage}</div>
              <button className={styles.alertOkBtn} onClick={() => setAlertMessage(null)}>OK</button>
            </div>
          </div>
        )}

      </div>
    </ModuleContext.Provider>
  );
}
