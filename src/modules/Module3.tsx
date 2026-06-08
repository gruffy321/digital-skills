"use client";

import { useState } from "react";
import styles from "./Module3.module.css";
import { useModule } from "@/components/ModuleWrapper";

export default function Module3() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [omniboxValue, setOmniboxValue] = useState("");
  const [currentRoute, setCurrentRoute] = useState<"home" | "science-facts" | "search-results">("home");
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        setOmniboxValue("Try 'www.science-facts.edu'");
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
        setOmniboxValue("Try 'Climate Change Facts'");
        setTimeout(() => setOmniboxValue("Climate Change Facts"), 1500);
      } else {
        setOmniboxValue("Search terms don't have .com");
        setTimeout(() => setOmniboxValue("Climate Change Facts"), 1500);
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
    }
  };

  const clickPhishingLink = () => {
    if (taskIndex === 3) {
      logEvent("phishing_link_clicked");
      alert("WARNING! You clicked a suspicious link. Did you notice the URL was '.biz'? Always check the URL before clicking!");
    }
  };

  const answerQuiz = (isCorrect: boolean) => {
    if (taskIndex === 4 && isCorrect) {
      logEvent('QUIZ_PASSED');
      nextTask();
    } else if (taskIndex === 4) {
      alert("Incorrect! Look at the domain (.edu) and author (National Science Institute).");
    }
  };

  const toggleBookmark = () => {
    if (taskIndex === 5 && currentRoute === "science-facts") {
      logEvent("page_bookmarked");
      setIsBookmarked(true);
      setTimeout(nextTask, 500);
    } else {
      setIsBookmarked(!isBookmarked);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openBrowser}>
          <span className={styles.iconImage}>🌐</span>
          <span>Microsoft Edge</span>
        </div>
      </div>

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
                {taskIndex === 1 && <div className={styles.searchHint}>Task: Type <strong>www.science-facts.edu</strong> in the address bar above.</div>}
                {taskIndex === 2 && <div className={styles.searchHint}>Task: Type <strong>Climate Change Facts</strong> in the address bar above.</div>}
              </div>
            )}

            {currentRoute === "science-facts" && (
              <div className={styles.learnSite}>
                <h1>National Science Institute</h1>
                <p>Welcome to our educational database. All facts are peer-reviewed by leading scientists.</p>
                {taskIndex === 5 && <div className={styles.searchHint}>Great choice! Now, Bookmark this page using the Star icon in the toolbar.</div>}
                {taskIndex >= 6 && <p><strong>Congratulations! You passed the Research test.</strong></p>}
              </div>
            )}

            {currentRoute === "search-results" && (
              <div className={styles.searchResults}>
                <div className={styles.searchStats}>About 2,140,000 results (0.33 seconds)</div>
                
                <div className={`${styles.resultItem} ${styles.adResult}`}>
                  <div className={styles.resultUrl}>
                    <span className={styles.adBadge}>Sponsored</span>
                    <span className={styles.suspiciousUrl}>http://www.climate-change-hoax-exposed.biz</span>
                  </div>
                  <h3 className={styles.resultTitle} onClick={clickPhishingLink}>
                    The TRUTH about Climate Change - It's a HOAX!
                  </h3>
                  <div className={styles.resultDesc}>
                    Click here to read the real truth that scientists don't want you to know! Written by anonymous user "TruthSeeker99". Buy our survival kits now!
                  </div>
                </div>

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

      {/* Quiz Window */}
      {taskIndex === 4 && (
        <div className={`glass-panel ${styles.quizWindow}`}>
          <div style={{background: 'rgba(0,0,0,0.8)', inset: 0, position: 'fixed', zIndex: -1}} />
          <div style={{position: 'relative', zIndex: 1}}>
            <h3>Fact or Fake?</h3>
            <p>Why was the second link a reliable source?</p>
            <div className={styles.quizButtons}>
              <button onClick={() => answerQuiz(false)}>A) Because it was listed second.</button>
              <button onClick={() => answerQuiz(true)}>B) It had an .edu domain and listed a real scientist as the author.</button>
              <button onClick={() => answerQuiz(false)}>C) It had "Truth" in the title.</button>
              <button onClick={() => answerQuiz(false)}>D) Because it was sponsored.</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
