"use client";

import { useState } from "react";
import styles from "./Module5.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module5() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  
  // State for Tasks
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
    if (id === "teacher" && taskIndex === 0 && !hasReadTeacherEmail) {
      setHasReadTeacherEmail(true);
      logEvent("teacher_email_read");
      setTimeout(nextTask, 500);
    }
  };

  const handleSendReply = () => {
    if (replyText.trim().length < 10) {
      alert("Please write a proper, polite reply.");
      return;
    }
    setHasReplied(true);
    if (taskIndex === 1) {
      logEvent("email_replied_professionally");
      setTimeout(nextTask, 500);
    }
  };

  const handleDeletePhishing = () => {
    setPhishingDeleted(true);
    setSelectedEmail(null);
    if (taskIndex === 2) {
      logEvent("phishing_email_deleted");
      setTimeout(nextTask, 500);
    }
  };

  const handleQuizComplete = () => {
    logEvent("module5_quiz_completed");
    nextTask();
  };

  // Task 3 is the Quiz
  if (taskIndex === 3) {
    return (
      <div style={{ padding: "2rem" }}>
        <Quiz 
          title="Module 5 Quiz"
          questions={[
            { question: "When emailing a teacher, you should:", options: ["Use text-speak like 'idk'", "Start with a professional greeting", "Write in all capital letters", "Leave the subject blank"], correctAnswerIndex: 1 },
            { question: "What is a major red flag of a phishing email?", options: ["It asks how your day is", "It has a PDF attachment of your homework", "It demands immediate action or threatens account deletion", "It is sent from your teacher's real email"], correctAnswerIndex: 2 },
            { question: "If you receive a suspicious email asking for your password, you should:", options: ["Reply with a fake password", "Click the link to investigate", "Delete it immediately and never click the links", "Forward it to all your friends"], correctAnswerIndex: 2 },
            { question: "Which is the most professional sign-off?", options: ["See ya,", "Best regards,", "Bye,", "Whatever,"], correctAnswerIndex: 1 }
          ]} 
          onComplete={handleQuizComplete} 
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!isAppOpen ? (
        <button onClick={openApp} className={styles.desktopIcon}>
          <div className={styles.iconImage}>📧</div>
          <span>Outlook</span>
        </button>
      ) : (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>Outlook</div>
            <div className={styles.windowControls}>
              <button onClick={() => setIsAppOpen(false)} className={styles.closeBtn}>×</button>
            </div>
          </div>
          
          <div className={styles.appBody}>
            {/* Folder Pane */}
            <div className={styles.folderPane}>
              <button className={styles.newMailBtn}>New Mail</button>
              <div className={`${styles.folderItem} ${styles.active}`}>Inbox</div>
              <div className={styles.folderItem}>Drafts</div>
              <div className={styles.folderItem}>Sent Items</div>
              <div className={styles.folderItem}>Deleted Items</div>
            </div>

            {/* Inbox List */}
            <div className={styles.inboxPane}>
              <div className={styles.inboxHeader}>Inbox</div>
              <div className={styles.emailList}>
                
                {/* Phishing Email */}
                {!phishingDeleted && (
                  <div 
                    className={`${styles.emailItem} ${styles.danger} ${!hasReadTeacherEmail ? styles.unread : ""} ${selectedEmail === "phishing" ? styles.selected : ""}`}
                    onClick={() => handleSelectEmail("phishing")}
                  >
                    <div className={styles.emailSender}>IT Helpdesk ⚠️</div>
                    <div className={styles.emailSubject}>URGENT: Account Deletion</div>
                    <div className={styles.emailPreview}>Click here immediately to verify...</div>
                  </div>
                )}

                {/* Teacher Email */}
                <div 
                  className={`${styles.emailItem} ${!hasReadTeacherEmail ? styles.unread : ""} ${selectedEmail === "teacher" ? styles.selected : ""}`}
                  onClick={() => handleSelectEmail("teacher")}
                >
                  <div className={styles.emailSender}>Mr. Johnson</div>
                  <div className={styles.emailSubject}>Missing Lab Report</div>
                  <div className={styles.emailPreview}>Hello, I noticed you haven't...</div>
                </div>

              </div>
            </div>

            {/* Reading Pane */}
            <div className={styles.readingPane}>
              {!selectedEmail ? (
                <div className={styles.emptyReadingPane}>Select an item to read</div>
              ) : selectedEmail === "teacher" ? (
                <>
                  <div className={styles.readingHeader}>
                    <div className={styles.readingSubject}>Missing Lab Report</div>
                    <div className={styles.readingMeta}>
                      <div className={styles.senderAvatar}>J</div>
                      <div className={styles.senderDetails}>
                        <div className={styles.senderName}>Mr. Johnson</div>
                        <div className={styles.senderEmail}>t.johnson@school.edu</div>
                      </div>
                      <div className={styles.readingToolbar}>
                        <button className={styles.toolbarBtn}>Reply</button>
                        <button className={styles.toolbarBtn}>Forward</button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.readingBody}>
                    <p>Hello,</p>
                    <p>I noticed you haven't turned in your Biology Lab Report yet. It was due yesterday. Please let me know if you need any help with the assignment, or if you simply forgot to attach it.</p>
                    <p>Best,<br/>Mr. Johnson</p>
                  </div>
                  {!hasReplied ? (
                    <div className={styles.replyBox}>
                      <textarea 
                        className={styles.replyTextarea} 
                        placeholder="Type a polite, professional reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button className={styles.sendBtn} onClick={handleSendReply}>Send</button>
                    </div>
                  ) : (
                    <div className={styles.replyBox}>
                      <p><em>Your reply has been sent!</em></p>
                    </div>
                  )}
                </>
              ) : selectedEmail === "phishing" ? (
                <>
                  <div className={styles.readingHeader}>
                    <div className={styles.readingSubject}>URGENT: Account Deletion</div>
                    <div className={styles.readingMeta}>
                      <div className={`${styles.senderAvatar} ${styles.dangerAvatar}`}>!</div>
                      <div className={styles.senderDetails}>
                        <div className={styles.senderName}>IT Helpdesk</div>
                        <div className={styles.senderEmail}>admin@secure-update-portal-xyz.com</div>
                      </div>
                      <div className={styles.readingToolbar}>
                        <button className={`${styles.toolbarBtn} ${styles.deleteBtn}`} onClick={handleDeletePhishing}>Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.readingBody}>
                    <div className={styles.phishingWarning}>⚠️ Be careful with this message. The sender address looks suspicious.</div>
                    <p>Dear Student,</p>
                    <p>Your school account is scheduled for <strong>IMMEDIATE DELETION</strong> due to inactivity. If you do not verify your password right now, you will lose all your files.</p>
                    <p>Please click the link below to log in and save your account:</p>
                    <p><span className={styles.phishingLink} onClick={() => alert("DANGER! This is a phishing link. Do not click!")}>http://www.secure-update-portal-xyz.com/login</span></p>
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