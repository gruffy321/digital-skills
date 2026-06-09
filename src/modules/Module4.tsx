"use client";

import { useState } from "react";
import styles from "./Module4.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module4() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "feed" | "requests" | "settings">("login");
  
  // Login State
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Action States
  const [requestDenied, setRequestDenied] = useState(false);
  const [phishingReported, setPhishingReported] = useState(false);
  const [bullyingReported, setBullyingReported] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  
  // Menus
  const [showPhishingMenu, setShowPhishingMenu] = useState(false);
  const [showBullyingMenu, setShowBullyingMenu] = useState(false);

  const openApp = () => {
    setIsAppOpen(true);
    if (taskIndex === 0 && !isAppOpen) {
      logEvent("social_app_opened");
    }
  };

  const closeApp = () => {
    setIsAppOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskIndex === 0) {
      const hasNumber = /\d/.test(passwordInput);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput);
      
      if (passwordInput.length < 8) {
        setLoginError("Password must be at least 8 characters.");
      } else if (!hasNumber) {
        setLoginError("Password must contain a number.");
      } else if (!hasSymbol) {
        setLoginError("Password must contain a symbol.");
      } else {
        logEvent("strong_password_created");
        setLoginError("");
        setActiveTab("requests");
        setTimeout(nextTask, 500);
      }
    }
  };

  const handleDenyRequest = () => {
    setRequestDenied(true);
    if (taskIndex === 1) {
      logEvent("stranger_danger_denied");
      setTimeout(() => {
        setActiveTab("feed");
        nextTask();
      }, 500);
    }
  };

  const handleReportPhishing = () => {
    setPhishingReported(true);
    setShowPhishingMenu(false);
    if (taskIndex === 2) {
      logEvent("phishing_reported");
      setTimeout(nextTask, 500);
    }
  };

  const handleReportBullying = () => {
    setBullyingReported(true);
    setShowBullyingMenu(false);
    if (taskIndex === 3) {
      logEvent("cyberbullying_reported");
      setTimeout(() => {
        setActiveTab("settings");
        nextTask();
      }, 500);
    }
  };

  const togglePrivacy = () => {
    setIsPrivate(!isPrivate);
    if (taskIndex === 4 && !isPrivate) {
      logEvent("privacy_enabled");
      setTimeout(nextTask, 500);
    }
  };

  const handleQuizComplete = () => {
    logEvent("module4_quiz_completed");
    nextTask();
  };

  return (
    <div className={styles.desktopArea} onClick={() => { setShowPhishingMenu(false); setShowBullyingMenu(false); }}>
      
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <div className={styles.iconSquare} style={{ background: '#3b5998' }}>S</div>
          <span>SocialNet</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isAppOpen ? styles.active : ''}`} onClick={openApp}>
          <span style={{color: '#3b5998', fontWeight: 'bold'}}>S</span>
        </div>
      </div>

      {/* SocialNet Application Window */}
      {isAppOpen && (
        <div className={styles.appWindow} onClick={(e) => e.stopPropagation()}>
          <div className={styles.appHeader}>
            <span>SocialNet</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeApp}>✕</button>
            </div>
          </div>

          {activeTab === "login" ? (
            <div className={styles.loginScreen}>
              <h2>Welcome to SocialNet</h2>
              <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
                <input type="text" placeholder="Username" defaultValue="student123" disabled />
                <input 
                  type="password" 
                  placeholder="Create a strong password" 
                  value={passwordInput} 
                  onChange={(e) => setPasswordInput(e.target.value)} 
                  autoFocus
                />
                {loginError && <p className={styles.error}>{loginError}</p>}
                <button type="submit" className={styles.loginBtn}>Secure Account & Login</button>
              </form>
            </div>
          ) : (
            <div className={styles.appBody}>
              <div className={styles.sidebar}>
                <button className={activeTab === "requests" ? styles.activeTab : ""} onClick={() => setActiveTab("requests")}>👤 Friend Requests</button>
                <button className={activeTab === "feed" ? styles.activeTab : ""} onClick={() => setActiveTab("feed")}>📰 Feed</button>
                <button className={activeTab === "settings" ? styles.activeTab : ""} onClick={() => setActiveTab("settings")}>⚙️ Settings</button>
              </div>

              <div className={styles.contentArea}>
                {activeTab === "requests" && (
                  <div className={styles.requestsTab}>
                    <h3>Friend Requests</h3>
                    {!requestDenied ? (
                      <div className={styles.requestCard}>
                        <div className={styles.avatar}>?</div>
                        <div className={styles.requestInfo}>
                          <h4>JohnDoe45</h4>
                          <p>0 mutual friends</p>
                        </div>
                        <div className={styles.requestActions}>
                          <button className={styles.acceptBtn} onClick={() => alert("Are you sure? You don't know this person!")}>Accept</button>
                          <button className={styles.denyBtn} onClick={handleDenyRequest}>Deny</button>
                        </div>
                      </div>
                    ) : (
                      <p>No new requests.</p>
                    )}
                  </div>
                )}

                {activeTab === "feed" && (
                  <div className={styles.feedTab}>
                    <h3>Your Feed</h3>
                    
                    {/* Phishing Post */}
                    {!phishingReported && (
                      <div className={styles.post}>
                        <div className={styles.postHeader}>
                          <strong>GamingGifts</strong>
                          <div className={styles.postOptions}>
                            <button onClick={(e) => { e.stopPropagation(); setShowPhishingMenu(!showPhishingMenu); setShowBullyingMenu(false); }}>...</button>
                            {showPhishingMenu && (
                              <div className={styles.dropdownMenu}>
                                <button onClick={handleReportPhishing} className={styles.reportBtn}>Report Phishing</button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p>Click here for FREE V-Bucks! Just enter your password! 💰💰💰</p>
                        <div className={styles.scamLink}>www.free-vbucks-secure-login.xyz</div>
                      </div>
                    )}

                    {/* Cyberbullying Post */}
                    {!bullyingReported && (
                      <div className={styles.post}>
                        <div className={styles.postHeader}>
                          <strong>MeanStudent99</strong>
                          <div className={styles.postOptions}>
                            <button onClick={(e) => { e.stopPropagation(); setShowBullyingMenu(!showBullyingMenu); setShowPhishingMenu(false); }}>...</button>
                            {showBullyingMenu && (
                              <div className={styles.dropdownMenu}>
                                <button onClick={handleReportBullying} className={styles.reportBtn}>Report Bullying</button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p>Mr. Johnson is the worst teacher ever. He looks so stupid today! 😂</p>
                      </div>
                    )}

                    {(phishingReported && bullyingReported) && <p>You are all caught up!</p>}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className={styles.settingsTab}>
                    <h3>Privacy & Safety</h3>
                    <div className={styles.settingItem}>
                      <div>
                        <h4>Private Account</h4>
                        <p>Only approved followers can see your posts.</p>
                      </div>
                      <button 
                        className={`${styles.toggleBtn} ${isPrivate ? styles.toggleOn : ""}`}
                        onClick={togglePrivacy}
                      >
                        {isPrivate ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Module 4 Quiz */}
      {taskIndex === 5 && (
        <div className={styles.quizContainer}>
          <Quiz 
            title="Fact or Fake?"
            questions={[
              { question: "What is the best way to handle a friend request from someone you don't know?", options: ["Accept it", "Message them", "Deny it", "Share it"], correctAnswerIndex: 2 },
              { question: "Which password is the strongest?", options: ["password123", "P@ssw0rd2024!", "dog", "12345678"], correctAnswerIndex: 1 },
              { question: "What should you do if you see cyberbullying?", options: ["Like it", "Report it", "Join in", "Ignore it"], correctAnswerIndex: 1 },
              { question: "Why should your account be private?", options: ["To hide from friends", "To get famous", "To protect personal data from strangers", "To save battery"], correctAnswerIndex: 2 },
              { question: "If a link offers 'Free V-Bucks', it is likely:", options: ["A great deal", "A phishing scam", "A mistake", "A school project"], correctAnswerIndex: 1 }
            ]}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

    </div>
  );
}