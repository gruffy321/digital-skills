"use client";

import { useState } from "react";
import styles from "./Module5.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module5() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  // Outlook State
  const [activeNav, setActiveNav] = useState<"email" | "calendar">("email");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);
  const [pickerFolder, setPickerFolder] = useState<"Documents" | "Downloads">("Documents");
  const [pickerSelectedFile, setPickerSelectedFile] = useState<string | null>(null);

  // App interactions
  const openApp = () => {
    setIsAppOpen(true);
    if (taskIndex === 0 && !isAppOpen) {
      logEvent("outlook_opened");
      setTimeout(nextTask, 500);
    }
  };

  const closeApp = () => setIsAppOpen(false);

  const selectMessage = (id: number) => {
    setSelectedMessage(id);
    if (taskIndex === 1 && id === 1) {
      logEvent("email_read");
      setTimeout(nextTask, 500);
    }
  };

  const handleSendReply = () => {
    if (taskIndex === 2) {
      const lowerReply = replyText.toLowerCase();
      const profanity = ["fuck", "shit", "bitch", "cunt", "asshole", "stupid", "idiot", "damn", "crap", "bastard"];
      const hasProfanity = profanity.some(word => lowerReply.includes(word));

      if (hasProfanity) {
        alert("Your message contains inappropriate language. Please use professional communication.");
        return;
      }

      if (!attachedFile) {
        alert("Don't forget to attach 'Homework.docx' before sending!");
        return;
      }

      // Basic check for etiquette
      const hasGreeting = lowerReply.includes("dear") || lowerReply.includes("hello") || lowerReply.includes("hi") || lowerReply.includes("good morning") || lowerReply.includes("good afternoon");
      const hasSignOff = lowerReply.includes("regards") || lowerReply.includes("sincerely") || lowerReply.includes("best") || lowerReply.includes("thanks") || lowerReply.includes("thank you");

      if (hasGreeting && hasSignOff) {
        logEvent("professional_email_with_attachment_sent");
        setIsReplying(false);
        setReplyText("");
        setTimeout(nextTask, 500);
      } else {
        alert("Remember to use both a professional greeting (e.g., 'Dear') and a professional sign-off (e.g., 'Best regards')!");
      }
    }
  };

  const handleAttachFile = () => {
    setIsFilePickerOpen(true);
  };

  const confirmAttachment = () => {
    if (pickerSelectedFile) {
      setAttachedFile(pickerSelectedFile);
      setIsFilePickerOpen(false);
    }
  };

  const handleRSVP = () => {
    if (taskIndex === 3) {
      logEvent("calendar_rsvp");
      alert("RSVP Accepted! Event added to your calendar.");
      setTimeout(nextTask, 500);
    }
  };

  if (taskIndex === 4) {
    return (
      <Quiz logEvent={logEvent} 
        title="Professional Email & Outlook Knowledge Check"
        questions={[
          {
            question: "Which of these is considered unprofessional in an email to a teacher?",
            options: ["Starting with 'Dear'", "Saying 'thx' or 'idk'", "Signing off with 'Best regards'"],
            correctAnswerIndex: 1
          },
          {
            question: "Why should you always reply to a Calendar invitation (RSVP)?",
            options: ["To earn a badge", "To let the organiser know if you will attend", "To delete the email"],
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
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <div className={styles.iconSquare} style={{ background: '#0078D4' }}>O</div>
          <span>Outlook</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isAppOpen ? styles.active : ''}`} onClick={openApp}>
          <span style={{color: '#0078D4', fontWeight: 'bold'}}>O</span>
        </div>
      </div>

      {/* Outlook Application Window */}
      {isAppOpen && (
        <div className={styles.appWindow}>
          {/* Windows 11 Title Bar */}
          <div className={styles.appHeader}>
            <span>Inbox - Outlook</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeApp}>✕</button>
            </div>
          </div>

          {/* Outlook Blue Header */}
          <div className={styles.outlookBlueHeader}>
            <div className={styles.outlookTitle}>
              <span className={styles.avatar} style={{background: 'white', color: '#0078D4', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>ST</span>
              Inbox
            </div>
            <div className={styles.outlookHeaderIcons}>
              <span>↗</span>
              <span>🔍</span>
            </div>
          </div>

          {/* Main Outlook Body */}
          <div className={styles.outlookBody}>
            {activeNav === "email" ? (
              <>
                {/* Message List Pane */}
                <div className={styles.messageListPane}>
                  <div className={styles.messageListTabs}>
                    <button className={`${styles.tabBtn} ${styles.active}`}>Focused</button>
                    <button className={styles.tabBtn}>Other</button>
                  </div>
                  <div className={styles.messageList}>
                    
                    <div 
                      className={`${styles.messageItem} ${selectedMessage === 1 ? styles.selected : ''}`}
                      onClick={() => selectMessage(1)}
                    >
                      <div className={styles.messageAvatar}>MJ</div>
                      <div className={styles.messageContentPreview}>
                        <div className={styles.messageHeaderRow}>
                          <span className={styles.messageSender}>Mr. Johnson</span>
                          <span className={styles.messageTime}>10:30 AM</span>
                        </div>
                        <span className={styles.messageSubject}>Science Lab Report</span>
                        <span className={styles.messagePreviewText}>Hello students, please remember to submit your lab reports by Friday...</span>
                      </div>
                      {taskIndex <= 1 && <div className={styles.unreadDot}></div>}
                    </div>

                    <div className={styles.messageItem}>
                      <div className={styles.messageAvatar} style={{background: '#D13438'}}>AL</div>
                      <div className={styles.messageContentPreview}>
                        <div className={styles.messageHeaderRow}>
                          <span className={styles.messageSender}>Mrs. Allen</span>
                          <span className={styles.messageTime}>Yesterday</span>
                        </div>
                        <span className={styles.messageSubject}>Math Homework</span>
                        <span className={styles.messagePreviewText}>The answers to the textbook exercises are attached...</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Reading Pane */}
                <div className={styles.readingPane}>
                  {selectedMessage === 1 ? (
                    <>
                      <div className={styles.emailDetailHeader}>
                        <h2 className={styles.emailDetailSubject}>Science Lab Report</h2>
                        <div className={styles.emailDetailInfo}>
                          <div className={styles.messageAvatar}>MJ</div>
                          <div>
                            <div className={styles.emailDetailSender}>Mr. Johnson</div>
                            <div style={{color: '#605e5c'}}>To: Student Class</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.emailDetailBody}>
                        Hello everyone,<br/><br/>
                        Just a reminder that your Science Lab reports on photosynthesis are due this Friday. <br/><br/>
                        Please reply to this email and attach your finished document when you are done.<br/><br/>
                        Best regards,<br/>
                        Mr. Johnson
                      </div>

                      {/* Reply Box */}
                      {taskIndex === 2 ? (
                        <div className={styles.replyBox}>
                          <textarea 
                            className={styles.replyInput} 
                            placeholder="Type a professional reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            autoFocus
                          />
                          {attachedFile && (
                            <div className={styles.attachedFileBadge}>📎 {attachedFile}</div>
                          )}
                          <div className={styles.replyActions}>
                            <button className={styles.attachBtn} onClick={handleAttachFile}>📎</button>
                            <button className={styles.sendBtn} onClick={handleSendReply}>Send</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{padding: '1rem'}}>
                          <button onClick={() => setIsReplying(true)} className={styles.sendBtn} style={{background: 'white', color: '#0078D4', border: '1px solid #0078D4'}}>Reply</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={styles.emptyReadingPane}>
                      <div className={styles.emptyIcon}>✉️</div>
                      <h3>No message selected</h3>
                      <p>Select a message to read.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Calendar View */
              <div className={styles.calendarTab}>
                <h2>Your Calendar</h2>
                <div className={styles.calendarEvent}>
                  <div className={styles.eventDetails}>
                    <h3>Online Assembly</h3>
                    <p style={{color: '#605e5c'}}>Friday, 9:00 AM - 10:00 AM</p>
                    <p>Principal Skinner</p>
                  </div>
                  <button className={styles.rsvpBtn} onClick={handleRSVP}>RSVP</button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className={styles.bottomNav}>
            <button 
              className={`${styles.navBtn} ${activeNav === "email" ? styles.active : ""}`}
              onClick={() => setActiveNav("email")}
            >
              <span className={styles.navIcon}>✉️</span>
              <span>Email</span>
            </button>
            <button 
              className={`${styles.navBtn} ${activeNav === "calendar" ? styles.active : ""}`}
              onClick={() => setActiveNav("calendar")}
            >
              <span className={styles.navIcon}>📅</span>
              <span>Calendar</span>
            </button>
          </div>
        </div>
      )}

      {/* File Picker Modal */}
      {isFilePickerOpen && (
        <div className={styles.filePickerOverlay}>
          <div className={styles.filePickerWindow}>
            <div className={styles.filePickerHeader}>
              <span>Open</span>
              <button onClick={() => setIsFilePickerOpen(false)} style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>✕</button>
            </div>
            <div className={styles.filePickerBody}>
              <div className={styles.filePickerSidebar}>
                <div 
                  className={`${styles.filePickerSidebarItem} ${pickerFolder === "Documents" ? styles.active : ""}`}
                  onClick={() => setPickerFolder("Documents")}
                >📄 Documents</div>
                <div 
                  className={`${styles.filePickerSidebarItem} ${pickerFolder === "Downloads" ? styles.active : ""}`}
                  onClick={() => setPickerFolder("Downloads")}
                >⬇️ Downloads</div>
              </div>
              <div className={styles.filePickerContent}>
                {pickerFolder === "Documents" && (
                  <>
                    <div 
                      className={`${styles.pickerItem} ${pickerSelectedFile === "Homework.docx" ? styles.selected : ""}`}
                      onClick={() => setPickerSelectedFile("Homework.docx")}
                      onDoubleClick={() => { setPickerSelectedFile("Homework.docx"); confirmAttachment(); }}
                    >
                      <span className={styles.pickerItemIcon}>📝</span>
                      <span className={styles.pickerItemText}>Homework.docx</span>
                    </div>
                    <div 
                      className={`${styles.pickerItem} ${pickerSelectedFile === "Notes.txt" ? styles.selected : ""}`}
                      onClick={() => setPickerSelectedFile("Notes.txt")}
                      onDoubleClick={() => { setPickerSelectedFile("Notes.txt"); confirmAttachment(); }}
                    >
                      <span className={styles.pickerItemIcon}>📄</span>
                      <span className={styles.pickerItemText}>Notes.txt</span>
                    </div>
                  </>
                )}
                {pickerFolder === "Downloads" && (
                  <p>Folder is empty.</p>
                )}
              </div>
            </div>
            <div className={styles.filePickerFooter}>
              <div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
                {pickerSelectedFile && <span>File: {pickerSelectedFile}</span>}
              </div>
              <button className={styles.pickerBtn} onClick={() => setIsFilePickerOpen(false)}>Cancel</button>
              <button className={`${styles.pickerBtn} ${styles.pickerBtnPrimary}`} onClick={confirmAttachment} disabled={!pickerSelectedFile}>Open</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}