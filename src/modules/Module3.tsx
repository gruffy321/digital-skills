"use client";

import { useState } from "react";
import styles from "./Module3.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module3() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [omniboxValue, setOmniboxValue] = useState("");
  const [currentRoute, setCurrentRoute] = useState<"home" | "learn-site" | "search-results">("home");

  const openBrowser = () => {
    if (taskIndex === 0) {
      logEvent("browser_opened");
      setIsBrowserOpen(true);
      nextTask();
    } else {
      setIsBrowserOpen(true);
    }
  };

  const closeBrowser = () => {
    setIsBrowserOpen(false);
    setCurrentRoute("home");
    setOmniboxValue("");
  };

  const handleOmniboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = omniboxValue.trim().toLowerCase();
    
    if (taskIndex === 1) {
      if (val === "www.learn-digital.org" || val === "http://www.learn-digital.org" || val === "https://www.learn-digital.org") {
        logEvent("url_navigation_success");
        setCurrentRoute("learn-site");
        nextTask();
      } else {
        logEvent("url_navigation_failed");
        alert("Make sure you type exactly: www.learn-digital.org");
      }
    } 
    else if (taskIndex === 2) {
      if (val === "digital security") {
        logEvent("search_query_success");
        setCurrentRoute("search-results");
        nextTask();
      } else if (!val.includes(".")) {
        logEvent("search_query_partial");
        setCurrentRoute("search-results");
        // We let them pass if they search anything without a dot for realism,
        // but the strict task says "digital security". Let's enforce strict for the lesson.
        alert("Try typing exactly: digital security");
      } else {
        alert("Please search for 'digital security'. A search term usually doesn't have a .com or .org in it.");
      }
    }
    else {
      // Free play after tasks
      if (val.includes(".")) setCurrentRoute("learn-site");
      else setCurrentRoute("search-results");
    }
  };

  const clickSafeLink = () => {
    if (taskIndex === 3) {
      logEvent("safe_link_clicked");
      setCurrentRoute("learn-site");
      nextTask();
    }
  };

  const clickPhishingLink = () => {
    if (taskIndex === 3) {
      logEvent("phishing_link_clicked");
      alert("WARNING! You clicked a suspicious link. Did you notice the URL was 'free-iphones-scam.biz'? Always check the URL before clicking!");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openBrowser}>
          <span className={styles.iconImage}>🌐</span>
          <span>Web Browser</span>
        </div>
      </div>

      {isBrowserOpen && (
        <div className={styles.osWindow}>
          <div className={styles.browserTitleBar}>
            <div className={styles.browserTabs}>
              <div className={styles.tab}>
                <span>🌐</span> {currentRoute === "home" ? "New Tab" : currentRoute === "learn-site" ? "Learn Digital" : "Search Results"}
              </div>
            </div>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeBrowser}>✕</button>
            </div>
          </div>
          
          <div className={styles.browserToolbar}>
            <div className={styles.navBtns}>
              <button className={styles.navBtn}>←</button>
              <button className={styles.navBtn}>→</button>
              <button className={styles.navBtn}>↻</button>
            </div>
            <form className={styles.omniboxForm} onSubmit={handleOmniboxSubmit}>
              <input 
                className={styles.omnibox}
                type="text"
                value={omniboxValue}
                onChange={(e) => setOmniboxValue(e.target.value)}
                placeholder="Search or type a URL"
                autoFocus
              />
            </form>
          </div>

          <div className={styles.browserViewport}>
            {currentRoute === "home" && (
              <div className={styles.homePage}>
                <div className={styles.searchLogo}>
                  <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                </div>
                <div className={styles.searchContainer}>
                  <div className={styles.fakeSearchBox}>
                    <span>🔍</span> Search the web or type a URL
                  </div>
                </div>
                {taskIndex === 1 && <div className={styles.searchHint}>Task: Type <strong>www.learn-digital.org</strong> in the address bar above.</div>}
                {taskIndex === 2 && <div className={styles.searchHint}>Task: Type <strong>digital security</strong> in the address bar above.</div>}
              </div>
            )}

            {currentRoute === "learn-site" && (
              <div className={styles.learnSite}>
                <h1>Welcome to Learn Digital</h1>
                <p>This is a safe, educational website.</p>
                {taskIndex >= 4 && <p><strong>Congratulations! You passed the Internet Safety test.</strong></p>}
              </div>
            )}

            {currentRoute === "search-results" && (
              <div className={styles.searchResults}>
                <div className={styles.searchStats}>About 14,000,000 results (0.42 seconds)</div>
                
                <div className={`${styles.resultItem} ${styles.adResult}`}>
                  <div className={styles.resultUrl}>
                    <span className={styles.adBadge}>Sponsored</span>
                    <span className={styles.suspiciousUrl}>http://www.free-iphones-scam.biz/claim</span>
                  </div>
                  <h3 className={styles.resultTitle} onClick={clickPhishingLink}>
                    FREE IPHONE 15 - CLAIM NOW! No Credit Card Required!
                  </h3>
                  <div className={styles.resultDesc}>
                    Click here to claim your free device! 100% legit, totally not a scam. Just enter your Social Security Number and banking details to cover shipping.
                  </div>
                </div>

                <div className={styles.resultItem}>
                  <div className={styles.resultUrl}>https://www.learn-digital.org › security</div>
                  <h3 className={styles.resultTitle} onClick={clickSafeLink}>
                    Digital Security Basics: How to Stay Safe Online
                  </h3>
                  <div className={styles.resultDesc}>
                    Learn the fundamentals of digital security. Protect yourself against phishing, scams, and identify theft by verifying URLs and avoiding suspicious links.
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
