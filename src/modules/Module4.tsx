"use client";

import { useState } from "react";
import styles from "./Module4.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module4() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "feed" | "settings">("requests");
  
  // State for interactive elements
  const [requestDenied, setRequestDenied] = useState(false);
  const [postReported, setPostReported] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const openApp = () => {
    setIsAppOpen(true);
    if (taskIndex === 0 && !isAppOpen) {
      logEvent("social_app_opened");
    }
  };

  const handleDenyStranger = () => {
    if (taskIndex === 0) {
      logEvent("stranger_denied_success");
      setRequestDenied(true);
      nextTask();
      setActiveTab("feed"); // auto-move to feed for task 2
    }
  };

  const handleAcceptStranger = () => {
    if (taskIndex === 0) {
      logEvent("stranger_accepted_failed");
      alert("WARNING: Never accept friend requests from adults or people you do not know in real life. Please 'Deny' the request.");
    }
  };

  const handleReportBullying = () => {
    if (taskIndex === 1) {
      logEvent("cyberbullying_reported");
      setPostReported(true);
      setShowReportMenu(false);
      nextTask();
      setActiveTab("settings"); // auto-move to settings for task 3
    }
  };

  const handleTogglePrivacy = () => {
    if (taskIndex === 2) {
      if (!isPrivate) {
        logEvent("account_set_private");
        setIsPrivate(true);
        nextTask();
      }
    } else {
      setIsPrivate(!isPrivate);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📱</span>
          <span>SocialNet</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <span>SocialNet App</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>
          
          <div className={styles.appHeader}>SocialNet</div>
          
          <div className={styles.navBar}>
            <button 
              className={`${styles.navTab} ${activeTab === "requests" ? styles.active : ""}`}
              onClick={() => setActiveTab("requests")}
            >👥 Requests {taskIndex === 0 && "🔴"}</button>
            <button 
              className={`${styles.navTab} ${activeTab === "feed" ? styles.active : ""}`}
              onClick={() => setActiveTab("feed")}
            >📰 Feed {taskIndex === 1 && "🔴"}</button>
            <button 
              className={`${styles.navTab} ${activeTab === "settings" ? styles.active : ""}`}
              onClick={() => setActiveTab("settings")}
            >⚙️ Settings {taskIndex === 2 && "🔴"}</button>
          </div>

          <div className={styles.appBody}>
            
            {activeTab === "requests" && (
              <>
                {!requestDenied && (
                  <div className={styles.requestCard}>
                    <div className={styles.avatar}>👤</div>
                    <div className={styles.requestInfo}>
                      <div className={styles.requestName}>JohnDoe45 (Age: 45)</div>
                      <div className={styles.requestMutual}>0 mutual friends · Lives in Florida</div>
                    </div>
                    <div className={styles.requestActions}>
                      <button className={styles.acceptBtn} onClick={handleAcceptStranger}>Accept</button>
                      <button className={styles.denyBtn} onClick={handleDenyStranger}>Deny</button>
                    </div>
                  </div>
                )}
                
                <div className={styles.requestCard}>
                  <div className={styles.avatar}>👧</div>
                  <div className={styles.requestInfo}>
                    <div className={styles.requestName}>Sarah Smith</div>
                    <div className={styles.requestMutual}>12 mutual friends · Goes to your school</div>
                  </div>
                  <div className={styles.requestActions}>
                    <button className={styles.acceptBtn}>Accept</button>
                    <button className={styles.denyBtn}>Deny</button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "feed" && (
              <>
                <div className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <div className={styles.postAuthor}>
                      <div className={styles.smallAvatar}>🐶</div>
                      <span>CoolDude99</span>
                    </div>
                    <button className={styles.postOptionsBtn}>...</button>
                  </div>
                  <div className={styles.postContent}>
                    Just finished my homework! Time to play some video games. 🎮
                  </div>
                  <div className={styles.postActions}>
                    <span>👍 Like</span>
                    <span>💬 Comment</span>
                  </div>
                </div>

                {!postReported ? (
                  <div className={styles.postCard}>
                    <div className={styles.postHeader}>
                      <div className={styles.postAuthor}>
                        <div className={styles.smallAvatar}>👿</div>
                        <span>AnonymousHater</span>
                      </div>
                      <div style={{ position: "relative" }}>
                        <button 
                          className={styles.postOptionsBtn} 
                          onClick={() => setShowReportMenu(!showReportMenu)}
                        >...</button>
                        {showReportMenu && (
                          <div className={styles.reportMenu}>
                            <div className={styles.reportItem} onClick={handleReportBullying}>
                              🚩 Report: Cyberbullying
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.postContent}>
                      Mr. Johnson is the WORST teacher ever. He smells terrible and everyone hates him. Also, did you hear what happened to Jessica? She is such a loser! 😂🤡
                    </div>
                    <div className={styles.postActions}>
                      <span>👍 Like</span>
                      <span>💬 Comment</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.postCard} style={{ background: "#e8f5e9", color: "#2e7d32", textAlign: "center", padding: "2rem" }}>
                    ✅ Post Reported and removed from your feed. Thank you for keeping SocialNet safe!
                  </div>
                )}
              </>
            )}

            {activeTab === "settings" && (
              <>
                <div className={styles.settingsSection}>
                  <h3>Account Privacy</h3>
                  <div className={styles.settingRow}>
                    <div>
                      <strong>Private Account</strong>
                      <div style={{ fontSize: "0.85rem", color: "#65676B", marginTop: "0.25rem" }}>
                        When your account is public, anyone can see your photos and school information. Switch to Private so only approved friends can see your posts.
                      </div>
                    </div>
                    <div 
                      className={`${styles.toggleSwitch} ${isPrivate ? styles.on : ""}`}
                      onClick={handleTogglePrivacy}
                    >
                      <div className={styles.toggleKnob}></div>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
