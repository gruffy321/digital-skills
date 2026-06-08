"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Module2.module.css";
import { useModule } from "@/components/ModuleWrapper";

type FileItem = { id: string; name: string; type: "folder" | "file"; icon: string; parentId: string };

export default function Module2() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerMinimized, setExplorerMinimized] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  const [files, setFiles] = useState<FileItem[]>([
    { id: "f1", name: "Science", type: "folder", icon: "📁", parentId: "root" },
    { id: "f2", name: "Math", type: "folder", icon: "📁", parentId: "root" },
    { id: "doc1", name: "untitled_doc_1.docx", type: "file", icon: "📄", parentId: "root" },
    { id: "img1", name: "funny_cat_meme.jpg", type: "file", icon: "🖼️", parentId: "root" },
  ]);

  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("New Folder");

  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, fileId: string } | null>(null);

  // Move Menu State
  const [moveMenuOpen, setMoveMenuOpen] = useState(false);

  const handleOpenExplorer = () => {
    if (taskIndex === 0) {
      logEvent('OPENED_EXPLORER');
      setExplorerOpen(true);
      setTimeout(nextTask, 500);
    } else {
      setExplorerOpen(true);
      setExplorerMinimized(false);
    }
  };

  const startCreateFolder = () => {
    if (taskIndex === 1) {
      setIsCreatingFolder(true);
      setNewFolderName("New Folder");
    }
  };

  const commitCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskIndex === 1) {
      if (newFolderName.trim() === "Science Work") {
        logEvent('CREATED_FOLDER');
        setFiles([...files, { id: "science_work", name: newFolderName, type: "folder", icon: "📁", parentId: currentFolder }]);
        setIsCreatingFolder(false);
        setTimeout(nextTask, 500);
      } else {
        // Just flash the input red or clear it, native alert causes focus loops
        setNewFolderName("Try 'Science Work'");
        setTimeout(() => setNewFolderName("Science Work"), 1500);
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFileId(fileId);
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
    setMoveMenuOpen(false);
  };

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      setMoveMenuOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const startRename = (fileId: string) => {
    if (taskIndex === 2 && fileId === "doc1") {
      const file = files.find(f => f.id === fileId);
      if (file) {
        setIsRenaming(fileId);
        setRenameValue(file.name);
      }
    }
  };

  const commitRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskIndex === 2 && isRenaming === "doc1") {
      if (renameValue === "Science_Lab_Report.docx") {
        logEvent('RENAMED_FILE');
        setFiles(files.map(f => f.id === "doc1" ? { ...f, name: renameValue } : f));
        setIsRenaming(null);
        setTimeout(nextTask, 500);
      } else {
        setRenameValue("Try 'Science_Lab_Report.docx'");
        setTimeout(() => setRenameValue("Science_Lab_Report.docx"), 1500);
      }
    }
  };

  const handleMoveFile = (folderId: string) => {
    if (taskIndex === 3 && selectedFileId === "doc1" && folderId === "science_work") {
      logEvent('MOVED_FILE');
      setFiles(files.map(f => f.id === "doc1" ? { ...f, parentId: folderId } : f));
      setTimeout(nextTask, 500);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (taskIndex === 4 && fileId === "img1") {
      logEvent('DELETED_FILE');
      setFiles(files.filter(f => f.id !== fileId));
      setSelectedFileId(null);
      setTimeout(nextTask, 500);
    }
  };

  const answerQuiz = (isCorrect: boolean) => {
    if (taskIndex === 5 && isCorrect) {
      logEvent('QUIZ_PASSED');
      nextTask();
    } else if (taskIndex === 5) {
      // It's safe to use alert here because there is no onBlur focus fighting on buttons
      alert("Incorrect! Hint: .docx stands for Document.");
    }
  };

  const currentFiles = files.filter(f => f.parentId === currentFolder);
  const foldersOnly = files.filter(f => f.type === "folder");

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

      {explorerOpen && !explorerMinimized && (
        <div className={`glass-panel ${styles.osWindow}`}>
          <div className={styles.windowHeader}>
            <span>File Explorer - Documents</span>
            <div className={styles.windowControls}>
              <button className={styles.minimizeBtn} onClick={() => setExplorerMinimized(true)}>—</button>
              <button className={styles.maximizeBtn}>□</button>
              <button className={styles.closeBtn} onClick={() => setExplorerOpen(false)}>×</button>
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
            
            <div style={{ position: 'relative' }}>
              <button 
                className={styles.toolbarBtn} 
                onClick={(e) => { e.stopPropagation(); setMoveMenuOpen(!moveMenuOpen); }}
                disabled={!selectedFileId || taskIndex < 3}
              >
                Move To ⏷
              </button>
              {moveMenuOpen && (
                <div className={styles.dropdownMenu}>
                  {foldersOnly.map(folder => (
                    <button 
                      key={folder.id} 
                      className={styles.dropdownItem}
                      onClick={() => handleMoveFile(folder.id)}
                    >
                      📁 {folder.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.windowBody}>
            <div className={styles.sidebar}>
              <div className={`${styles.sidebarItem} ${currentFolder === 'root' ? styles.active : ''}`} onClick={() => setCurrentFolder('root')}>Documents</div>
              <div className={styles.sidebarItem}>Downloads</div>
              <div className={styles.sidebarItem}>Pictures</div>
            </div>
            <div className={styles.fileList} onClick={() => setSelectedFileId(null)}>
              {currentFiles.map(file => (
                <div 
                  key={file.id} 
                  className={`${styles.fileItem} ${selectedFileId === file.id ? styles.selected : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedFileId(file.id); }}
                  onDoubleClick={() => file.type === "folder" ? setCurrentFolder(file.id) : null}
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                >
                  <div className={styles.fileIcon}>{file.icon}</div>
                  
                  {isRenaming === file.id ? (
                    <form onSubmit={commitRename}>
                      <input 
                        type="text" 
                        className={styles.renameInput}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    </form>
                  ) : (
                    <span className={styles.fileName}>{file.name}</span>
                  )}
                </div>
              ))}

              {isCreatingFolder && (
                <div className={styles.fileItem}>
                  <div className={styles.fileIcon}>📁</div>
                  <form onSubmit={commitCreateFolder}>
                    <input 
                      type="text" 
                      className={styles.renameInput}
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
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
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.contextMenuItem}>Open</div>
          <div 
            className={styles.contextMenuItem} 
            onClick={() => {
              setContextMenu(null);
              startRename(contextMenu.fileId);
            }}
          >
            Rename
          </div>
          <div className={styles.contextMenuDivider}></div>
          <div 
            className={`${styles.contextMenuItem} ${styles.danger}`}
            onClick={() => {
              setContextMenu(null);
              handleDeleteFile(contextMenu.fileId);
            }}
          >
            Delete
          </div>
        </div>
      )}

      {/* Quiz Window */}
      {taskIndex === 5 && (
        <div className={`glass-panel ${styles.quizWindow}`}>
          <div style={{background: 'rgba(0,0,0,0.8)', inset: 0, position: 'fixed', zIndex: -1}} />
          <div style={{position: 'relative', zIndex: 1}}>
            <h3>Knowledge Check</h3>
            <p>Which file extension represents a <strong>Microsoft Word Document</strong>?</p>
            <div className={styles.quizButtons}>
              <button onClick={() => answerQuiz(false)}>A) .jpg</button>
              <button onClick={() => answerQuiz(true)}>B) .docx</button>
              <button onClick={() => answerQuiz(false)}>C) .pdf</button>
              <button onClick={() => answerQuiz(false)}>D) .mp4</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
