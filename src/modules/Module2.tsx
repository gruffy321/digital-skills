"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Module2.module.css";
import { useModule } from "@/components/ModuleWrapper";

type FileItem = { id: string; name: string; type: "folder" | "file"; icon: string };

export default function Module2() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "Documents", type: "folder", icon: "📁" },
    { id: "2", name: "Images", type: "folder", icon: "📁" },
    { id: "3", name: "dummy_file.txt", type: "file", icon: "📄" },
  ]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("New Folder");

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, fileId: string } | null>(null);

  const handleOpenExplorer = () => {
    if (taskIndex === 0) {
      logEvent('OPENED_EXPLORER');
      setExplorerOpen(true);
      setTimeout(nextTask, 1000);
    } else {
      setExplorerOpen(true);
    }
  };

  const handleCloseExplorer = () => setExplorerOpen(false);

  const startCreateFolder = () => {
    if (taskIndex === 1) {
      setIsCreatingFolder(true);
      setNewFolderName("New Folder");
    }
  };

  const commitCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskIndex === 1 && newFolderName.trim().length > 0) {
      logEvent('CREATED_FOLDER');
      setFiles([...files, { id: Date.now().toString(), name: newFolderName, type: "folder", icon: "📁" }]);
      setIsCreatingFolder(false);
      setTimeout(nextTask, 1000);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    setSelectedFileId(fileId);
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      fileId
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  // Close context menu on any outside click
  useEffect(() => {
    const handleClick = () => closeContextMenu();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleDeleteFile = (fileId: string) => {
    if (taskIndex === 2 && fileId === "3") {
      logEvent('DELETED_FILE');
      setFiles(files.filter(f => f.id !== "3"));
      setSelectedFileId(null);
      setTimeout(nextTask, 1000);
    } else {
      // Just visually delete it if it's not the target, or ignore
      if (fileId !== "1" && fileId !== "2") {
         setFiles(files.filter(f => f.id !== fileId));
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }} onContextMenu={(e) => e.preventDefault()}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={handleOpenExplorer}>
          <div className={styles.iconImage}>📁</div>
          <span>File Explorer</span>
        </div>
        <div className={styles.desktopIcon}>
          <div className={styles.iconImage}>🗑️</div>
          <span>Recycle Bin</span>
        </div>
      </div>

      {explorerOpen && (
        <div className={`glass-panel ${styles.osWindow}`}>
          <div className={styles.windowHeader}>
            <span>File Explorer - Documents</span>
            <div className={styles.windowControls}>
              <button className={styles.minimizeBtn}>—</button>
              <button className={styles.maximizeBtn}>□</button>
              <button className={styles.closeBtn} onClick={handleCloseExplorer}>×</button>
            </div>
          </div>
          
          <div className={styles.explorerToolbar}>
            <button 
              className={styles.toolbarBtn} 
              onClick={startCreateFolder}
              disabled={taskIndex < 1}
            >
              + New Folder
            </button>
          </div>

          <div className={styles.windowBody}>
            <div className={styles.sidebar}>
              <div className={`${styles.sidebarItem} ${styles.active}`}>Documents</div>
              <div className={styles.sidebarItem}>Downloads</div>
              <div className={styles.sidebarItem}>Pictures</div>
            </div>
            <div className={styles.fileList}>
              {files.map(file => (
                <div 
                  key={file.id} 
                  className={`${styles.fileItem} ${selectedFileId === file.id ? styles.selected : ''}`}
                  onClick={() => setSelectedFileId(file.id)}
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                >
                  <div className={styles.fileIcon}>{file.icon}</div>
                  <span className={styles.fileName}>{file.name}</span>
                </div>
              ))}

              {isCreatingFolder && (
                <div className={styles.fileItem}>
                  <div className={styles.fileIcon}>📁</div>
                  <form onSubmit={commitCreateFolder}>
                    <input 
                      type="text" 
                      className={styles.newFolderInput}
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onBlur={commitCreateFolder}
                      autoFocus
                    />
                  </form>
                </div>
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
        >
          <div className={styles.contextMenuItem}>Open</div>
          <div className={styles.contextMenuItem}>Rename</div>
          <div className={styles.contextMenuDivider}></div>
          <div 
            className={`${styles.contextMenuItem} ${styles.danger}`}
            onClick={() => handleDeleteFile(contextMenu.fileId)}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}
