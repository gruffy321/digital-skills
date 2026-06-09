"use client";

import { useState } from "react";
import styles from "./Module3.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module3() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  // UI State
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [omniboxValue, setOmniboxValue] = useState("");
  const [currentRoute, setCurrentRoute] = useState<"home" | "science-facts" | "search-results">("home");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const openBrowser = () => {
    if (taskIndex === 0) {
      logEvent("browser_opened");
      setIsBrowserOpen(true);
      setTimeout(nextTask, 500);
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
      if (val === "www.science-facts.edu" || val === "http://www.science-facts.edu" || val === "https://www.science-facts.edu") {
        logEvent("url_navigation_success");
        setCurrentRoute("science-facts");
        setTimeout(nextTask, 500);
      } else {
        logEvent("url_navigation_failed");
        setOmniboxValue("Must be exactly: www.science-facts.edu");
        setTimeout(() => setOmniboxValue("www.science-facts.edu"), 1500);
      }
    } 
    else if (taskIndex === 2) {
      if (val === "climate change facts") {
        logEvent("search_query_success");
        setCurrentRoute("search-results");
        setTimeout(nextTask, 500);
      } else if (!val.includes(".")) {
        logEvent("search_query_partial");
        setCurrentRoute("search-results");
        setOmniboxValue("Try EXACTLY: climate change facts");
        setTimeout(() => setOmniboxValue("climate change facts"), 1500);
      } else {
        setOmniboxValue("Search terms don't use .com!");
        setTimeout(() => setOmniboxValue("climate change facts"), 1500);
      }
    }
    else {
      // Free play after tasks
      if (val.includes(".")) setCurrentRoute("science-facts");
      else setCurrentRoute("search-results");
    }
  };

  const clickSafeLink = () => {
    if (taskIndex === 3) {
      logEvent("safe_link_clicked");
      setCurrentRoute("science-facts");
      setOmniboxValue("www.science-facts.edu");
      setTimeout(nextTask, 500);
    } else if (taskIndex >= 3) {
      setCurrentRoute("science-facts");
      setOmniboxValue("www.science-facts.edu");
    }
  };

  const clickPhishingLink = () => {
    if (taskIndex === 3) {
      logEvent("phishing_link_clicked");
      alert("WARNING! You clicked a suspicious link. Did you notice the URL was '.biz'? Always check the URL before clicking!");
    } else {
      alert("WARNING! You clicked a suspicious link. Did you notice the URL was '.biz'? Always check the URL before clicking!");
    }
  };

  const handleQuizComplete = () => {
    logEvent("module3_quiz_completed");
    nextTask();
  };

  const toggleBookmark = () => {
    if (taskIndex === 4 && currentRoute === "science-facts") {
      logEvent("page_bookmarked");
      setIsBookmarked(true);
      showToast("Page bookmarked successfully!");
      setTimeout(nextTask, 1500);
    } else {
      setIsBookmarked(!isBookmarked);
      if (!isBookmarked) showToast("Page bookmarked successfully!");
    }
  };

  return (
    <div className={styles.desktopArea}>
      
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={openBrowser}>
          <div className={styles.iconImage}>🌐</div>
          <span>Microsoft Edge</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isBrowserOpen ? styles.active : ''}`} onClick={openBrowser}>🌐</div>
      </div>

      {/* Browser Window */}
      {isBrowserOpen && (
        <div className={styles.osWindow}>
          <div className={styles.browserTitleBar}>
            <div className={styles.browserTabs}>
              <div className={styles.tab}>
                <span>🌐</span> {currentRoute === "home" ? "New Tab" : currentRoute === "science-facts" ? "Science Facts" : "Search Results"}
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
              <button className={styles.navBtn} onClick={() => setCurrentRoute("home")}>←</button>
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
            <button 
              className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}
              onClick={toggleBookmark}
              title="Bookmark this page"
            >
              {isBookmarked ? "★" : "☆"}
            </button>
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
                {taskIndex === 1 && <div className={styles.searchHint}>Task: Type <strong>www.science-facts.edu</strong> in the address bar above and press Enter.</div>}
                {taskIndex === 2 && <div className={styles.searchHint}>Task: Type <strong>climate change facts</strong> in the address bar above and press Enter.</div>}
              </div>
            )}

            {currentRoute === "science-facts" && (
              <div className={styles.learnSite}>
                <h1>National Science Institute</h1>
                <p>Welcome to our educational database. All facts are peer-reviewed by leading scientists.</p>
                {taskIndex === 4 && <div className={styles.searchHint}>Great choice! Now, Bookmark this page using the Star icon (☆) in the toolbar.</div>}
                {taskIndex >= 6 && <p><strong>Congratulations! You completed Module 3!</strong></p>}
              </div>
            )}

            {currentRoute === "search-results" && (
              <div className={styles.searchResults}>
                <div className={styles.searchStats}>About 2,140,000 results (0.33 seconds)</div>
                
                {/* Phishing/Scam Result */}
                <div className={`${styles.resultItem} ${styles.adResult}`}>
                  <div className={styles.resultUrl}>
                    <span className={styles.adBadge}>Sponsored</span>
                    &nbsp;&nbsp;
                    <span className={styles.suspiciousUrl}>http://www.climate-change-hoax-exposed.biz</span>
                  </div>
                  <h3 className={styles.resultTitle} onClick={clickPhishingLink}>
                    The TRUTH about Climate Change - It's a HOAX!
                  </h3>
                  <div className={styles.resultDesc}>
                    Click here to read the real truth that scientists don't want you to know! Written by anonymous user "TruthSeeker99". Buy our survival kits now!
                  </div>
                </div>

                {/* Legitimate Result */}
                <div className={styles.resultItem}>
                  <div className={styles.resultUrl}>https://www.science-facts.edu › climate</div>
                  <h3 className={styles.resultTitle} onClick={clickSafeLink}>
                    Climate Change: Facts and Evidence - National Science Institute
                  </h3>
                  <div className={styles.resultDesc}>
                    Peer-reviewed research and empirical evidence regarding global climate shifts. Published by Dr. Sarah Jenkins, PhD in Climatology.
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Module 3 Quiz */}
      {taskIndex === 5 && (
        <div className={styles.quizContainer}>
          <Quiz 
            title="Fact or Fake?"
            questions={[
              { 
                question: "Why was the second link a reliable source?", 
                options: [
                  "Because it was listed second.", 
                  "It had an .edu domain and listed a real scientist as the author.", 
                  "It had 'Truth' in the title.", 
                  "Because it was sponsored."
                ], 
                correctAnswerIndex: 1 
              }
            ]}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

    </div>
  );
}
