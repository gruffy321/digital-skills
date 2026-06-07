"use client";

import { useState, useEffect } from "react";
import styles from "./Module10.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module10() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  const [activeFolder, setActiveFolder] = useState<"local" | "cloud">("local");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const [localFiles, setLocalFiles] = useState<string[]>(["History_Essay.docx"]);
  const [cloudFiles, setCloudFiles] = useState<string[]>([]);
  
  const [syncStatus, setSyncStatus] = useState<"none" | "syncing" | "synced">("none");

  const openApp = () => {
    setIsAppOpen(true);
    if (!isAppOpen) {
      logEvent("explorer_app_opened");
    }
  };

  const handleNavigate = (folder: "local" | "cloud") => {
    setActiveFolder(folder);
    setSelectedFile(null);
    
    if (taskIndex === 0 && folder === "local") {
      logEvent("navigated_to_local");
      nextTask();
    }
  };

  const handleMoveToOneDrive = () => {
    if (activeFolder === "local" && selectedFile) {
      setLocalFiles(localFiles.filter(f => f !== selectedFile));
      setCloudFiles([...cloudFiles, selectedFile]);
      setSyncStatus("syncing");
      setSelectedFile(null);
      
      if (taskIndex === 1) {
        logEvent("moved_file_to_cloud");
        nextTask();
      }
    }
  };

  const handleRefreshSync = () => {
    if (syncStatus === "syncing") {
      setSyncStatus("synced");
      if (taskIndex === 2) {
        logEvent("sync_completed_green_check");
        nextTask();
      }
    }
  };

  // Auto sync after a few seconds if they don't click refresh
  useEffect(() => {
    if (syncStatus === "syncing") {
      const timer = setTimeout(() => {
        handleRefreshSync();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  const filesToShow = activeFolder === "local" ? localFiles : cloudFiles;
  const addressPath = activeFolder === "local" ? "This PC > My Documents" : "This PC > OneDrive - Student";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📁</span>
          <span>File Explorer</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>📁</span> File Explorer
            </div>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.explorerRibbon}>
            <div className={styles.ribbonTabs}>
              <div className={`${styles.ribbonTab} ${styles.active}`}>Home</div>
              <div className={styles.ribbonTab}>Share</div>
              <div className={styles.ribbonTab}>View</div>
            </div>
            <div className={styles.ribbonToolbar}>
              <div className={styles.ribbonGroup}>
                <button className={styles.ribbonBtn} onClick={handleMoveToOneDrive} disabled={activeFolder !== "local" || !selectedFile}>
                  <span style={{ fontSize: "1.5rem" }}>➡️☁️</span>
                  <span>Move to OneDrive</span>
                </button>
              </div>
              <div className={styles.ribbonGroup}>
                <button className={styles.ribbonBtn} onClick={handleRefreshSync} disabled={syncStatus !== "syncing"}>
                  <span style={{ fontSize: "1.5rem" }}>🔄</span>
                  <span>Refresh Sync</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.addressBarRow}>
            <span>↑</span>
            <span>↻</span>
            <input type="text" className={styles.addressInput} value={addressPath} readOnly />
            <input type="text" className={styles.addressInput} style={{ width: "200px", flex: "none" }} placeholder="Search" readOnly />
          </div>

          <div className={styles.appBody}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", color: "#605e5c", fontWeight: "bold" }}>
                Quick access
              </div>
              <div 
                className={`${styles.sidebarItem} ${activeFolder === "local" ? styles.active : ""}`}
                onClick={() => handleNavigate("local")}
              >
                <span className={styles.sidebarIcon}>📄</span>
                <span>My Documents</span>
              </div>
              <div 
                className={`${styles.sidebarItem} ${activeFolder === "cloud" ? styles.active : ""}`}
                onClick={() => handleNavigate("cloud")}
              >
                <div className={styles.sidebarIcon}>
                  ☁️
                  {syncStatus === "synced" && (
                    <div className={styles.syncIconOverlay} style={{ color: "green" }}>✅</div>
                  )}
                  {syncStatus === "syncing" && (
                    <div className={styles.syncIconOverlay} style={{ color: "blue" }}>🔄</div>
                  )}
                </div>
                <span>OneDrive - Student</span>
              </div>
            </div>

            {/* Main View */}
            <div className={styles.mainView}>
              <div className={styles.fileGrid}>
                {filesToShow.map(file => (
                  <div 
                    key={file} 
                    className={`${styles.fileItem} ${selectedFile === file ? styles.selected : ""}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className={styles.fileIcon}>
                      📝
                      {activeFolder === "cloud" && (
                        <div className={styles.syncIconOverlay}>
                          {syncStatus === "syncing" ? (
                            <span className={styles.spinning} style={{ color: "blue" }}>🔄</span>
                          ) : (
                            <span style={{ color: "green" }}>✅</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={styles.fileName}>{file}</div>
                  </div>
                ))}
                {filesToShow.length === 0 && (
                  <div style={{ color: "#605e5c", padding: "1rem" }}>This folder is empty.</div>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.statusBar}>
            <span>{filesToShow.length} items</span>
            {syncStatus === "syncing" && <span>Syncing 1 file... Do not turn off PC.</span>}
            {syncStatus === "synced" && <span>All files synced. Safe to log out.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
