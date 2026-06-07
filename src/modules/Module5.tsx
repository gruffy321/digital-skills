"use client";

import { useState } from "react";
import styles from "./Module5.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module5() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  
  // States for tasks
  const [hasReadTeacherEmail, setHasReadTeacherEmail] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [hasReplied, setHasReplied] = useState(false);
  const [phishingDeleted, setPhishingDeleted] = useState(false);

  const openApp = () => {
    setIsAppOpen(true);
    if (taskIndex === 0 && !isAppOpen) {
      logEvent("outlook_opened");
    }
  };

  const handleSelectEmail = (id: string) => {
    setSelectedEmail(id);
    if (id === "teacher" && taskIndex === 0) {
      setHasReadTeacherEmail(true);
      logEvent("teacher_email_read");
      nextTask();
    }
  };

  const handleSendReply = () => {
    if (replyText.trim().length < 5) {
      alert("Please write a proper reply.");
      return;
    }
    
    // Rudimentary check for text-speak
    const lowercaseReply = replyText.toLowerCase();
    if (lowercaseReply.includes("idk") || lowercaseReply.includes("thx") || lowercaseReply.includes("lol")) {
      alert("Remember, this is a professional email to a teacher. Please avoid using text-speak like 'idk', 'thx', or 'lol'.");
      return;
    }

    if (taskIndex === 1) {
      setHasReplied(true);
      logEvent("professional_reply_sent");
      nextTask();
    }
  };

  const handleDeletePhishing = () => {
    if (selectedEmail === "phishing" && taskIndex === 2) {
      setPhishingDeleted(true);
      setSelectedEmail(null);
      logEvent("phishing_email_deleted");
      nextTask();
    } else {
      alert("Are you sure you want to delete this email? Focus on your current task.");
    }
  };

  const handlePhishingClick = () => {
    if (taskIndex === 2) {
      logEvent("phishing_link_clicked_failed");
      alert("WARNING! You just clicked a phishing link in an email. This is how hackers steal passwords. Your task is to DELETE this email, not click the links!");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📧</span>
          <span>Outlook Mail</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>📧</span> Outlook
            </div>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.appBody}>
            {/* Left Pane: Folders */}
            <div className={styles.folderPane}>
              <button className={styles.newMailBtn}>+ New mail</button>
              <div className={`${styles.folderItem} ${styles.active}`}>Inbox</div>
              <div className={styles.folderItem}>Drafts</div>
              <div className={styles.folderItem}>Sent Items</div>
              <div className={styles.folderItem}>Deleted Items</div>
              <div className={styles.folderItem}>Junk Email</div>
            </div>

            {/* Middle Pane: Inbox List */}
            <div className={styles.inboxPane}>
              <div className={styles.inboxHeader}>Inbox</div>
              <div className={styles.emailList}>
                
                {/* Teacher Email */}
                <div 
                  className={`${styles.emailItem} ${selectedEmail === "teacher" ? styles.selected : ""} ${!hasReadTeacherEmail ? styles.unread : ""}`}
                  onClick={() => handleSelectEmail("teacher")}
                >
                  <div className={styles.emailSender}>Mr. Johnson (Science)</div>
                  <div className={styles.emailSubject}>Missing Assignment: Lab Report</div>
                  <div className={styles.emailPreview}>Hello, I noticed you haven't turned in your lab report...</div>
                </div>

                {/* Phishing Email - Only appears when they reach task 2 */}
                {taskIndex >= 2 && !phishingDeleted && (
                  <div 
                    className={`${styles.emailItem} ${styles.danger} ${selectedEmail === "phishing" ? styles.selected : ""} ${styles.unread}`}
                    onClick={() => handleSelectEmail("phishing")}
                  >
                    <div className={styles.emailSender} style={{ color: "#d13438", fontWeight: "bold" }}>IT Helpdesk [URGENT]</div>
                    <div className={styles.emailSubject}>YOUR ACCOUNT WILL BE DELETED</div>
                    <div className={styles.emailPreview}>Verify your login immediately to prevent deletion...</div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Pane: Reading Area */}
            <div className={styles.readingPane}>
              {!selectedEmail ? (
                <div className={styles.emptyReadingPane}>
                  Select an item to read
                </div>
              ) : selectedEmail === "teacher" ? (
                <>
                  <div className={styles.readingHeader}>
                    <div className={styles.readingSubject}>Missing Assignment: Lab Report</div>
                    <div className={styles.readingMeta}>
                      <div className={styles.senderAvatar}>J</div>
                      <div className={styles.senderDetails}>
                        <div className={styles.senderName}>Mr. Johnson (Science)</div>
                        <div className={styles.senderEmail}>mr.johnson@school.edu</div>
                      </div>
                      <div className={styles.readingToolbar}>
                        <button className={styles.toolbarBtn}>Reply</button>
                        <button className={styles.toolbarBtn}>Forward</button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.readingBody}>
                    <p>Hello,</p>
                    <p>I noticed that you haven't turned in your Biology Lab Report from last week. Please let me know if you are having trouble with the material or if you need an extension.</p>
                    <p>Best regards,<br/>Mr. Johnson</p>
                  </div>
                  {taskIndex === 1 && !hasReplied && (
                    <div className={styles.replyBox}>
                      <strong>Reply to Mr. Johnson:</strong>
                      <textarea 
                        className={styles.replyTextarea}
                        placeholder="Type your professional reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button className={styles.sendBtn} onClick={handleSendReply}>Send Reply</button>
                    </div>
                  )}
                  {hasReplied && (
                    <div className={styles.replyBox} style={{ background: "#e8f5e9", borderColor: "#a5d6a7" }}>
                      <strong style={{ color: "#2e7d32" }}>✅ Reply Sent Successfully!</strong>
                      <p>{replyText}</p>
                    </div>
                  )}
                </>
              ) : selectedEmail === "phishing" ? (
                <>
                  <div className={styles.readingHeader}>
                    <div className={styles.readingSubject}>YOUR ACCOUNT WILL BE DELETED</div>
                    <div className={styles.readingMeta}>
                      <div className={`${styles.senderAvatar} ${styles.dangerAvatar}`}>!</div>
                      <div className={styles.senderDetails}>
                        <div className={styles.senderName}>IT Helpdesk [URGENT]</div>
                        <div className={styles.senderEmail}>admin-security@suspicious-domain-1234.com</div>
                      </div>
                      <div className={styles.readingToolbar}>
                        <button 
                          className={`${styles.toolbarBtn} ${styles.deleteBtn}`}
                          onClick={handleDeletePhishing}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.readingBody}>
                    <div className={styles.phishingWarning}>
                      <strong>SECURITY ALERT:</strong> Your school email account has been flagged for abnormal activity and will be deleted in 24 hours.
                    </div>
                    <p>To prevent the deletion of your account and loss of all your files, you must click the link below and login to verify your identity immediately.</p>
                    <br/>
                    <p>
                      <span className={styles.phishingLink} onClick={handlePhishingClick}>
                        👉 CLICK HERE TO VERIFY YOUR ACCOUNT 👈
                      </span>
                    </p>
                    <br/>
                    <p>Failure to comply will result in immediate permanent deletion.</p>
                    <p>Regards,<br/>The IT Team</p>
                  </div>
                </>
              ) : null}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
