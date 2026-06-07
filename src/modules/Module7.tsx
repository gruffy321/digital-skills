"use client";

import { useState } from "react";
import styles from "./Module7.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module7() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  const [isInsertMenuOpen, setIsInsertMenuOpen] = useState(false);
  const [hasTable, setHasTable] = useState(false);
  const [hasHeader, setHasHeader] = useState(false);
  const [isCommentResolved, setIsCommentResolved] = useState(false);

  const openApp = () => {
    setIsAppOpen(true);
    if (!isAppOpen) {
      logEvent("advanced_word_opened");
    }
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "Insert") {
      setIsInsertMenuOpen(!isInsertMenuOpen);
    } else {
      setIsInsertMenuOpen(false);
    }
  };

  const handleInsertTable = () => {
    setIsInsertMenuOpen(false);
    if (!hasTable) {
      setHasTable(true);
      if (taskIndex === 0) {
        logEvent("table_inserted");
        nextTask();
      }
    }
  };

  const handleInsertHeader = () => {
    setIsInsertMenuOpen(false);
    if (!hasHeader) {
      setHasHeader(true);
      if (taskIndex === 1) {
        logEvent("header_inserted");
        nextTask();
      }
    }
  };

  const handleResolveComment = () => {
    setIsCommentResolved(true);
    if (taskIndex === 2) {
      logEvent("comment_resolved");
      nextTask();
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📝</span>
          <span>Advanced Word</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>📝</span> Science_Report_Draft.docx - Word Processor
            </div>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.appRibbon}>
            <div className={styles.menuBar}>
              <div className={styles.menuItem} onClick={() => handleMenuClick("File")}>File</div>
              <div className={styles.menuItem} onClick={() => handleMenuClick("Home")}>Home</div>
              <div className={`${styles.menuItem} ${isInsertMenuOpen ? styles.active : ""}`} onClick={() => handleMenuClick("Insert")}>
                Insert
                {isInsertMenuOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownItem} onClick={handleInsertTable}>
                      <span>📊</span> Table (3x3)
                    </div>
                    <div className={styles.dropdownItem} onClick={handleInsertHeader}>
                      <span>📄</span> Header & Page Number
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.menuItem} onClick={() => handleMenuClick("Review")}>Review</div>
            </div>
          </div>

          <div className={styles.appBody}>
            <div className={styles.scrollArea}>
              <div className={styles.documentContainer}>
                
                <div className={styles.documentPage}>
                  {hasHeader && (
                    <div className={styles.docHeader}>
                      <span>Science Lab Report</span>
                      <span>Page 1</span>
                    </div>
                  )}

                  <p><b>Title:</b> The Effect of Sunlight on Plant Growth</p>
                  <p>
                    In this experiment, we will <span className={!isCommentResolved ? styles.highlightedText : ""}>{isCommentResolved ? "examine" : "look at"}</span> how plants respond to different levels of sunlight over a two-week period.
                  </p>
                  
                  {hasTable && (
                    <table className={styles.docTable}>
                      <thead>
                        <tr>
                          <th>Plant ID</th>
                          <th>Sunlight Level</th>
                          <th>Growth (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>A1</td><td>High</td><td></td></tr>
                        <tr><td>A2</td><td>Low</td><td></td></tr>
                      </tbody>
                    </table>
                  )}

                  <p>Our hypothesis is that plants with high sunlight will grow significantly taller than those kept in the shade.</p>
                </div>

                {/* Peer Review Comments Panel */}
                <div className={styles.commentsPanel}>
                  {!isCommentResolved && (
                    <div className={styles.commentCard}>
                      <div className={styles.commentHeader}>
                        <div className={styles.commentAvatar}>JD</div>
                        <div className={styles.commentAuthor}>Jane Doe</div>
                      </div>
                      <div className={styles.commentText}>
                        "Look at" sounds a bit informal for a science report. Maybe change this to "examine"?
                      </div>
                      <div className={styles.commentActions}>
                        <button className={styles.resolveBtn} onClick={handleResolveComment}>Accept & Resolve</button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
