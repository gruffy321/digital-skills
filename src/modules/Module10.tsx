"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Module10.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module10() {
  const { taskIndex, nextTask, logEvent, showAlert } = useModule();
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isWordOpen, setIsWordOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  // Context Menu state
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  
  // Modals/Panels state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePermission, setSharePermission] = useState("View");
  const [shareEmail, setShareEmail] = useState("");
  
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{author: string, text: string}[]>([]);
  const [textHighlighted, setTextHighlighted] = useState(false);
  
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);

  // Document Content State
  const [docTopContent, setDocTopContent] = useState("We need to decide on a topic for the science presentation.");
  const [docBottomContent, setDocBottomContent] = useState("");
  
  // Fake Classmate State
  const [fakeClassmateText, setFakeClassmateText] = useState("");
  const [showFakeCursor, setShowFakeCursor] = useState(false);

  // Close context menu on click elsewhere
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Fake classmate typing effect for Task 2
  useEffect(() => {
    if (taskIndex === 1 && isWordOpen) {
      setTimeout(() => setShowFakeCursor(true), 1000);
      
      const fullText = " I think we should do our project on renewable energy sources like solar and wind.";
      let i = 0;
      
      const typeInterval = setInterval(() => {
        if (i < fullText.length) {
          setFakeClassmateText(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setShowFakeCursor(false), 2000);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [taskIndex, isWordOpen]);

  // Handlers
  const handleRightClickFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedFile("Group_Project.docx");
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleShareSubmit = () => {
    if (taskIndex === 0 && sharePermission === "Editor") {
      logEvent("onedrive_shared_editor");
      setIsShareModalOpen(false);
      nextTask();
    } else if (taskIndex === 0) {
      showAlert("Make sure you give them 'Editor' access so they can help write it!");
    } else {
      setIsShareModalOpen(false);
    }
  };

  const handleBottomContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || "";
    setDocBottomContent(content);
    
    // Check for task 2 completion
    if (taskIndex === 1 && content.trim().length > 5 && fakeClassmateText.length > 10) {
      logEvent("word_simultaneous_edit");
      setTimeout(nextTask, 1000);
    }
  };

  const handleHighlight = () => {
    if (taskIndex === 2) {
      setTextHighlighted(true);
      setIsCommentsOpen(true);
    }
  };

  const handlePostComment = () => {
    if (commentText.trim().length > 0) {
      setComments([...comments, { author: "You", text: commentText }]);
      setCommentText("");
      
      if (taskIndex === 2) {
        logEvent("word_comment_posted");
        setTimeout(nextTask, 1000);
      }
    }
  };

  const handleRestoreVersion = () => {
    if (taskIndex === 3) {
      logEvent("word_version_restored");
      setIsVersionHistoryOpen(false);
      // Simulate restoration
      setDocTopContent("We need to decide on a topic for the science presentation. I think we should do our project on renewable energy sources like solar and wind.");
      nextTask();
    }
  };

  if (taskIndex === 4) {
    return (
      <Quiz logEvent={logEvent} 
        title="Cloud Storage Knowledge Check"
        questions={[
          {
            question: "What is the difference between View and Editor access?",
            options: ["View means they can't see the file, Editor means they can", "View means they can read it, Editor means they can change it", "There is no difference"],
            correctAnswerIndex: 1
          },
          {
            question: "Why are comments useful in a shared document?",
            options: ["To delete other people's work quickly", "To change the font color", "To discuss changes or leave feedback without altering the actual text"],
            correctAnswerIndex: 2
          },
          {
            question: "What should you do if someone accidentally deletes a paragraph in a cloud document?",
            options: ["Panic and start over", "Use Version History to restore an older version", "Delete the whole file"],
            correctAnswerIndex: 1
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
      
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={() => setIsExplorerOpen(true)}>
          <div className={styles.iconSquare} style={{ background: '#f3f2f1', color: '#0078D4' }}>📁</div>
          <span>OneDrive</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isExplorerOpen ? styles.active : ''}`} onClick={() => setIsExplorerOpen(!isExplorerOpen)}>
          <span>📁</span>
        </div>
        {isWordOpen && (
          <div className={`${styles.taskbarIcon} ${styles.active}`} onClick={() => setIsWordOpen(true)}>
            <span style={{color: '#2b579a', fontWeight: 'bold'}}>W</span>
          </div>
        )}
      </div>

      {/* File Explorer (OneDrive) */}
      {isExplorerOpen && !isWordOpen && (
        <div className={styles.appWindow}>
          <div className={styles.appHeader}>
            <span>OneDrive - Student</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsExplorerOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.explorerToolbar}>
            <button className={styles.toolbarBtn}>＋ New</button>
            <button className={styles.toolbarBtn}>↑ Upload</button>
            <button className={styles.toolbarBtn} onClick={() => showAlert("Refresh clicked")}>↻ Refresh Sync</button>
          </div>

          <div className={styles.explorerContent}>
            <div className={styles.explorerSidebar}>
              <div className={`${styles.sidebarItem} ${styles.active}`}>📁 My files</div>
              <div className={styles.sidebarItem}>👥 Shared</div>
              <div className={styles.sidebarItem}>🗑️ Recycle bin</div>
            </div>
            
            <div className={styles.explorerMain}>
              <div className={styles.fileGrid}>
                <div 
                  className={`${styles.fileItem} ${selectedFile === 'Group_Project.docx' ? styles.selected : ''}`}
                  onClick={() => setSelectedFile('Group_Project.docx')}
                  onDoubleClick={() => setIsWordOpen(true)}
                  onContextMenu={handleRightClickFile}
                >
                  <div className={styles.fileIcon}>📄</div>
                  <div className={styles.fileName}>Group_Project.docx</div>
                </div>
              </div>

              {/* Context Menu */}
              {contextMenu && (
                <div 
                  className={styles.contextMenu}
                  style={{ top: contextMenu.y - 50, left: contextMenu.x - 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.menuItem} onClick={() => setIsWordOpen(true)}>Open in browser</div>
                  <div className={styles.menuItem} onClick={() => { setContextMenu(null); setIsShareModalOpen(true); }}>Share</div>
                  <div className={styles.menuItem}>Download</div>
                  <div className={styles.menuItem}>Delete</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.shareModal}>
            <h2>Share 'Group_Project.docx'</h2>
            <div className={styles.shareInputGroup}>
              <input 
                type="email" 
                className={styles.shareInput} 
                placeholder="Enter email address..." 
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
              <select 
                className={styles.shareSelect}
                value={sharePermission}
                onChange={(e) => setSharePermission(e.target.value)}
              >
                <option value="View">Can View</option>
                <option value="Editor">Can Edit</option>
              </select>
            </div>
            <button className={styles.shareBtn} onClick={handleShareSubmit}>Send Link</button>
            <button className={styles.shareBtn} style={{background: 'transparent', color: '#0078D4', marginTop: '0.5rem'}} onClick={() => setIsShareModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Word Online Window */}
      {isWordOpen && (
        <div className={styles.appWindow} style={{top: '5%', left: '5%', width: '90%', height: '85%'}}>
          <div className={styles.appHeader}>
            <span>Group_Project.docx - Word Online</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsWordOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.wordOnlineHeader}>
            <div style={{fontWeight: 'bold'}}>W</div>
            <div style={{display: 'flex', gap: '1rem', fontSize: '0.9rem'}}>
              <span style={{cursor: 'pointer'}}>File</span>
              <span style={{cursor: 'pointer'}}>Home</span>
              <span style={{cursor: 'pointer'}}>Insert</span>
              <span style={{cursor: 'pointer'}}>Review</span>
            </div>
            <div style={{flex: 1}}></div>
            <button 
              style={{background: 'white', color: '#2b579a', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem'}}
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            >
              Comments
            </button>
            <button 
              style={{background: 'white', color: '#2b579a', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem'}}
              onClick={() => setIsShareModalOpen(true)}
            >
              Share
            </button>
          </div>

          <div className={styles.wordRibbon}>
            <span style={{fontSize: '0.85rem', color: '#605e5c', marginRight: '2rem'}}>Saved to OneDrive</span>
            {taskIndex === 3 && (
              <button 
                style={{padding: '0.3rem 0.6rem', background: '#f3f2f1', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'}}
                onClick={() => setIsVersionHistoryOpen(true)}
              >
                🕒 Version History
              </button>
            )}
            {taskIndex === 2 && (
              <button 
                style={{padding: '0.3rem 0.6rem', background: '#f3f2f1', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', marginLeft: '1rem'}}
                onClick={() => setIsCommentsOpen(true)}
              >
                💬 New Comment
              </button>
            )}
          </div>

          <div className={styles.wordCanvasArea}>
            <div className={styles.documentCanvas}>
              
              {/* Fake cursor for classmate */}
              {showFakeCursor && (
                <div className={styles.fakeCursor} style={{ left: `calc(1in + ${docTopContent.length * 6}px + ${fakeClassmateText.length * 6}px)`}}>
                  <div className={styles.fakeCursorLabel}>Alex</div>
                </div>
              )}

              {/* Top Paragraph (Classmate typing area) */}
              <div className={styles.editableParagraph}>
                <span 
                  className={textHighlighted ? styles.textHighlight : ''}
                  onMouseUp={handleHighlight}
                >
                  {docTopContent}
                </span>
                <span style={{color: '#D83B01'}}>{fakeClassmateText}</span>
              </div>

              {/* Bottom Paragraph (User typing area) */}
              {taskIndex === 3 && docTopContent === "We need to decide on a topic for the science presentation." ? (
                // Simulated deleted paragraph state
                <div className={styles.editableParagraph} style={{color: '#999', fontStyle: 'italic'}}>
                  [Paragraph missing...]
                </div>
              ) : (
                <div 
                  className={styles.editableParagraph} 
                  contentEditable 
                  onInput={handleBottomContentChange}
                  suppressContentEditableWarning
                  data-placeholder="Type here..."
                >
                </div>
              )}

            </div>

            {/* Comments Panel */}
            {isCommentsOpen && (
              <div className={styles.commentsPanel}>
                <div className={styles.panelHeader}>
                  Comments
                  <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => setIsCommentsOpen(false)}>✕</button>
                </div>
                <div className={styles.commentList}>
                  {comments.map((c, i) => (
                    <div key={i} className={styles.commentCard}>
                      <strong>{c.author}</strong>
                      <div style={{marginTop: '0.25rem'}}>{c.text}</div>
                    </div>
                  ))}
                  {comments.length === 0 && <div style={{color: '#605e5c', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem'}}>No comments yet.</div>}
                </div>
                <div className={styles.commentInputArea}>
                  <textarea 
                    className={styles.commentTextarea}
                    placeholder="Type a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button className={styles.postCommentBtn} onClick={handlePostComment}>Post</button>
                </div>
              </div>
            )}

            {/* Version History Panel */}
            {isVersionHistoryOpen && (
              <div className={styles.versionHistoryPanel}>
                <div className={styles.panelHeader}>
                  Version History
                  <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => setIsVersionHistoryOpen(false)}>✕</button>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <div className={`${styles.versionItem} ${styles.active}`}>
                    <div style={{fontWeight: 'bold'}}>Current Version</div>
                    <div style={{fontSize: '0.8rem', color: '#605e5c'}}>Just now by You</div>
                  </div>
                  <div className={styles.versionItem}>
                    <div style={{fontWeight: 'bold'}}>Older Version</div>
                    <div style={{fontSize: '0.8rem', color: '#605e5c'}}>10 minutes ago by Alex</div>
                    <button className={styles.restoreBtn} onClick={handleRestoreVersion}>Restore</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
