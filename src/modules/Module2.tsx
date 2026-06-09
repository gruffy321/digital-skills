"use client";

import { useState, useEffect } from "react";
import styles from "./Module2.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

type FileItem = { id: string; name: string; type: "folder" | "file"; icon: string; parentId: string };

export default function Module2() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  // UI State
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerMinimized, setExplorerMinimized] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<string>("documents");
  const [toast, setToast] = useState("");

  // Files State
  const [files, setFiles] = useState<FileItem[]>([
    { id: "f_math", name: "Math", type: "folder", icon: "📁", parentId: "documents" },
    { id: "doc_1", name: "untitled_doc_1.docx", type: "file", icon: "📄", parentId: "documents" },
    { id: "img_1", name: "funny_cat_meme.jpg", type: "file", icon: "🖼️", parentId: "documents" },
  ]);

  // Interaction State
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("New Folder");
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, fileId: string | null } | null>(null);
  
  // Drag and drop state
  const [draggedFileId, setDraggedFileId] = useState<string | null>(null);

  // Close menus on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

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

  // --- Task 2: Create Folder ---
  const startCreateFolder = () => {
    if (taskIndex === 1) {
      setIsCreatingFolder(true);
      setNewFolderName("New Folder");
    }
  };

  const commitCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskIndex === 1) {
      if (newFolderName.trim().toLowerCase() === "science work") {
        logEvent('CREATED_FOLDER');
        setFiles([...files, { id: "f_science", name: "Science Work", type: "folder", icon: "📁", parentId: currentFolder }]);
        setIsCreatingFolder(false);
        setTimeout(nextTask, 500);
      } else {
        setNewFolderName("Try 'Science Work'");
        setTimeout(() => setNewFolderName("Science Work"), 1500);
      }
    }
  };

  // --- Task 3: Rename File ---
  const handleContextMenu = (e: React.MouseEvent, fileId: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileId) setSelectedFileId(fileId);
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
  };

  const startRename = (fileId: string) => {
    if (taskIndex === 2 && fileId === "doc_1") {
      const file = files.find(f => f.id === fileId);
      if (file) {
        setIsRenaming(fileId);
        setRenameValue(file.name);
      }
    } else if (taskIndex >= 2) {
      const file = files.find(f => f.id === fileId);
      if (file) {
        setIsRenaming(fileId);
        setRenameValue(file.name);
      }
    }
  };

  const commitRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskIndex === 2 && isRenaming === "doc_1") {
      if (renameValue === "Science_Lab_Report.docx") {
        logEvent('RENAMED_FILE');
        setFiles(files.map(f => f.id === "doc_1" ? { ...f, name: renameValue } : f));
        setIsRenaming(null);
        setTimeout(nextTask, 500);
      } else {
        setRenameValue("Must be exactly: Science_Lab_Report.docx");
        setTimeout(() => setRenameValue("Science_Lab_Report.docx"), 2000);
      }
    } else {
      setFiles(files.map(f => f.id === isRenaming ? { ...f, name: renameValue } : f));
      setIsRenaming(null);
    }
  };

  // --- Task 4: Move and Delete (Organise the Chaos) ---
  const handleDragStart = (e: React.DragEvent, fileId: string) => {
    if (taskIndex === 3) {
      setDraggedFileId(fileId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnFolder = (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (taskIndex === 3 && draggedFileId === "doc_1" && targetFolderId === "f_science") {
      setFiles(files.map(f => f.id === draggedFileId ? { ...f, parentId: targetFolderId } : f));
      setDraggedFileId(null);
      checkTask4Completion(targetFolderId, true);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (taskIndex === 3 && fileId === "img_1") {
      setFiles(files.filter(f => f.id !== fileId));
      setSelectedFileId(null);
      checkTask4Completion(null, false, true);
    } else if (taskIndex >= 3) {
      setFiles(files.filter(f => f.id !== fileId));
    }
  };

  const checkTask4Completion = (targetFolderId: string | null, justMoved: boolean = false, justDeleted: boolean = false) => {
    // Determine the state after this action
    const labReport = files.find(f => f.id === "doc_1");
    const meme = files.find(f => f.id === "img_1");
    
    const reportMoved = justMoved ? true : labReport?.parentId === "f_science";
    const memeDeleted = justDeleted ? true : !meme;

    if (reportMoved && memeDeleted) {
      logEvent('ORGANIZED_CHAOS');
      setTimeout(nextTask, 500);
    }
  };

  // --- Task 5: Copy to USB ---
  const copyToUSB = (fileId: string) => {
    if (taskIndex === 4 && fileId === "doc_1") {
      logEvent('COPIED_TO_USB');
      const file = files.find(f => f.id === fileId);
      if (file) {
        setFiles([...files, { ...file, id: "doc_1_usb", parentId: "usb" }]);
        showToast("File successfully copied to USB Drive (D:)!");
        setTimeout(nextTask, 2000);
      }
    }
  };

  // --- Task 6: Quiz ---
  const handleQuizComplete = () => {
    logEvent("module2_quiz_completed");
    nextTask();
  };

  const currentFiles = files.filter(f => f.parentId === currentFolder);

  return (
    <div className={styles.desktopArea} onClick={() => setContextMenu(null)} onContextMenu={(e) => handleContextMenu(e, null)}>
      
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={handleOpenExplorer}>
          <div className={styles.iconImage}>📁</div>
          <span>File Explorer</span>
        </div>
        <div className={styles.desktopIcon}>
          <div className={styles.iconImage}>🗑️</div>
          <span>Recycle Bin</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar} onClick={e => e.stopPropagation()}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${explorerOpen ? styles.active : ''}`} onClick={handleOpenExplorer}>📁</div>
      </div>

      {/* File Explorer Window */}
      {explorerOpen && !explorerMinimized && (
        <div className={styles.osWindow} onClick={e => e.stopPropagation()}>
          <div className={styles.windowHeader}>
            File Explorer
            <div className={styles.windowControls}>
              <button onClick={() => setExplorerMinimized(true)}>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setExplorerOpen(false)}>×</button>
            </div>
          </div>
          
          <div className={styles.explorerToolbar}>
            <button className={styles.toolbarBtn} onClick={startCreateFolder} disabled={taskIndex < 1 || currentFolder !== 'documents'}>
              ➕ New Folder
            </button>
            <button className={styles.toolbarBtn}>✂️ Cut</button>
            <button className={styles.toolbarBtn}>📄 Copy</button>
            <button className={styles.toolbarBtn}>📋 Paste</button>
          </div>

          <div className={styles.windowBody}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={`${styles.sidebarItem} ${currentFolder === 'documents' ? styles.active : ''}`} onClick={() => setCurrentFolder('documents')}>
                📄 Documents
              </div>
              <div className={`${styles.sidebarItem} ${currentFolder === 'downloads' ? styles.active : ''}`} onClick={() => setCurrentFolder('downloads')}>
                ⬇️ Downloads
              </div>
              <div className={`${styles.sidebarItem} ${currentFolder === 'usb' ? styles.active : ''}`} onClick={() => setCurrentFolder('usb')}>
                💾 USB Drive (D:)
              </div>
            </div>
            
            {/* File List */}
            <div 
              className={styles.fileList} 
              onClick={() => setSelectedFileId(null)}
              onContextMenu={(e) => handleContextMenu(e, null)}
            >
              {currentFiles.length === 0 && !isCreatingFolder && (
                <p style={{ color: '#888', width: '100%', textAlign: 'center', marginTop: '2rem' }}>This folder is empty.</p>
              )}

              {currentFiles.map(file => (
                <div 
                  key={file.id} 
                  className={`${styles.fileItem} ${selectedFileId === file.id ? styles.selected : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedFileId(file.id); }}
                  onDoubleClick={() => file.type === "folder" ? setCurrentFolder(file.id) : null}
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                  draggable={file.type === "file" && isRenaming !== file.id}
                  onDragStart={(e) => handleDragStart(e, file.id)}
                  onDragOver={file.type === "folder" ? handleDragOver : undefined}
                  onDrop={file.type === "folder" ? (e) => handleDropOnFolder(e, file.id) : undefined}
                >
                  <div className={styles.fileIcon}>{file.icon}</div>
                  
                  {isRenaming === file.id ? (
                    <form onSubmit={commitRename} style={{ width: '100%' }}>
                      <input 
                        type="text" 
                        className={styles.renameInput}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
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
                  <form onSubmit={commitCreateFolder} style={{ width: '100%' }}>
                    <input 
                      type="text" 
                      className={styles.renameInput}
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
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
          {contextMenu.fileId ? (
            <>
              <div className={styles.menuItem}>Open</div>
              <div className={styles.menuDivider}></div>
              {taskIndex >= 4 && (
                <div className={styles.menuItem} onClick={() => { setContextMenu(null); copyToUSB(contextMenu.fileId!); }}>
                  💾 Copy to USB
                </div>
              )}
              <div className={styles.menuItem} onClick={() => { setContextMenu(null); startRename(contextMenu.fileId!); }}>
                ✏️ Rename
              </div>
              <div className={styles.menuDivider}></div>
              <div className={`${styles.menuItem} ${styles.danger}`} onClick={() => { setContextMenu(null); handleDeleteFile(contextMenu.fileId!); }}>
                🗑️ Delete
              </div>
            </>
          ) : (
            <>
              <div className={styles.menuItem}>View</div>
              <div className={styles.menuItem}>Sort by</div>
              <div className={styles.menuDivider}></div>
              <div className={styles.menuItem} onClick={() => { setContextMenu(null); startCreateFolder(); }}>
                ➕ New Folder
              </div>
            </>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Module 2 Quiz */}
      {taskIndex === 5 && (
        <div className={styles.quizContainer}>
          <Quiz 
            title="Module 2 Quiz"
            questions={[
              { question: "What should you do to organize a messy Downloads folder?", options: ["Delete everything", "Create folders and move files into them", "Rename all files to 'document'", "Leave it alone"], correctAnswerIndex: 1 },
              { question: "Which file extension represents a Microsoft Word Document?", options: [".jpg", ".mp4", ".docx", ".pdf"], correctAnswerIndex: 2 },
              { question: "Why is it important to use a USB Drive or Cloud Storage?", options: ["To make the computer faster", "To back up your work in case the computer breaks", "To stop viruses", "To print documents"], correctAnswerIndex: 1 }
            ]}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

    </div>
  );
}
