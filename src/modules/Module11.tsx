"use client";

import { useState, useEffect } from "react";
import styles from "./Module11.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module11() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  const [isMuted, setIsMuted] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  const [openMenu, setOpenMenu] = useState<"start" | "wifi" | "volume" | null>(null);
  
  const [systemState, setSystemState] = useState<"normal" | "restarting" | "locked">("normal");

  // Evaluate Task 1: Fix Audio and Wi-Fi
  useEffect(() => {
    if (taskIndex === 0) {
      if (!isMuted && isConnected) {
        logEvent("audio_wifi_fixed");
        nextTask();
        setOpenMenu(null);
      }
    }
  }, [isMuted, isConnected, taskIndex, nextTask, logEvent]);

  const handleMenuToggle = (menu: "start" | "wifi" | "volume") => {
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menu);
      logEvent(`opened_${menu}_menu`);
    }
  };

  const handleConnectWifi = () => {
    setIsConnected(true);
    setOpenMenu(null);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (taskIndex === 1) {
      setOpenMenu(null);
      setSystemState("restarting");
      logEvent("initiated_restart");
      
      setTimeout(() => {
        setSystemState("normal");
        nextTask();
      }, 3000); // 3 seconds restart simulation
    }
  };

  const handleLock = () => {
    if (taskIndex === 2) {
      setOpenMenu(null);
      setSystemState("locked");
      logEvent("locked_device");
      nextTask();
    }
  };

  const isFrozen = taskIndex === 1 && systemState === "normal";

  if (systemState === "restarting") {
    return (
      <div className={styles.desktop}>
        <div className={styles.restartingOverlay}>
          <div className={styles.spinner}>⚙️</div>
          <div>Restarting...</div>
        </div>
      </div>
    );
  }

  if (systemState === "locked") {
    return (
      <div className={styles.desktop}>
        <div className={styles.lockedOverlay}>
          <div className={styles.lockedTime}>12:34</div>
          <div style={{ fontSize: "1.5rem" }}>School User</div>
          <div style={{ marginTop: "1rem" }}>🔒 Locked</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.desktop} onClick={() => setOpenMenu(null)}>
      {/* Frozen Window (Task 2) */}
      {isFrozen && (
        <div className={styles.frozenWindow}>
          <div className={styles.frozenHeader}>
            <span>Word Processor (Not Responding)</span>
            <span style={{ cursor: "not-allowed" }}>✕</span>
          </div>
          <div className={styles.frozenBody}>
            ⏳ System Unresponsive
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className={styles.taskbar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.startBtn} onClick={() => handleMenuToggle("start")}>
          ⊞
        </div>
        
        <div className={styles.systemTray}>
          <div className={styles.trayIcon} onClick={() => handleMenuToggle("wifi")}>
            {isConnected ? "📶" : "🌐"}
          </div>
          <div className={styles.trayIcon} onClick={() => handleMenuToggle("volume")}>
            {isMuted ? "🔇" : "🔊"}
          </div>
          <div className={styles.clock}>
            <span>12:34 PM</span>
            <span>22/02/2026</span>
          </div>
        </div>
      </div>

      {/* Popouts */}
      {openMenu === "volume" && (
        <div className={`${styles.menuPopup} ${styles.volumeMenu}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.volumeToggle} onClick={handleToggleMute}>
            {isMuted ? "🔇" : "🔊"}
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : 50} 
            className={styles.volumeSlider}
            onChange={() => setIsMuted(false)}
          />
        </div>
      )}

      {openMenu === "wifi" && (
        <div className={`${styles.menuPopup} ${styles.wifiMenu}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.wifiHeader}>Wi-Fi Networks</div>
          <div className={styles.networkItem} onClick={handleConnectWifi}>
            <span style={{ fontSize: "1.2rem" }}>📶</span>
            <div style={{ flex: 1 }}>School_WiFi {isConnected && <div style={{ fontSize: "0.8rem", color: "green" }}>Connected</div>}</div>
            {!isConnected && <button style={{ padding: "0.2rem 0.5rem" }}>Connect</button>}
          </div>
          <div className={styles.networkItem}>
            <span style={{ fontSize: "1.2rem" }}>🔒</span>
            <div style={{ flex: 1 }}>Staff_Network</div>
          </div>
        </div>
      )}

      {openMenu === "start" && (
        <div className={`${styles.menuPopup} ${styles.startMenu}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.startSidebar}>
            <div className={styles.startAction} title="Lock (Accountability)" onClick={handleLock}>👤</div>
            <div className={styles.startAction} title="Restart" onClick={handleRestart}>⏻</div>
          </div>
          <div className={styles.startMain}>
            <h3 style={{ margin: 0 }}>Start Menu</h3>
            <p style={{ fontSize: "0.85rem", color: "#aaa" }}>Pinned applications would be here...</p>
          </div>
        </div>
      )}
    </div>
  );
}
