"use client";

import { useState, useRef } from "react";
import styles from "./Module8.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz from "@/components/Quiz";

export default function Module8() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  // App State
  const [activeTab, setActiveTab] = useState<"Home" | "Insert" | "Transitions" | "Slide Show">("Home");
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [presentationSlideIndex, setPresentationSlideIndex] = useState(1);

  // Document State
  const [hasContentSlide, setHasContentSlide] = useState(false);
  const [activeSlide, setActiveSlide] = useState<1 | 2>(1);
  const [hasImage, setHasImage] = useState(false);
  const [transitionType, setTransitionType] = useState<"None" | "Fade">("None");
  const [bulletsText, setBulletsText] = useState("");
  
  const bulletTaskCompleted = useRef(false);

  // Handlers
  const openApp = () => {
    setIsAppOpen(true);
  };

  const closeApp = () => setIsAppOpen(false);

  const handleNewSlide = () => {
    setHasContentSlide(true);
    setActiveSlide(2);
    if (taskIndex === 0) {
      logEvent("ppt_new_slide_added");
      setTimeout(nextTask, 400);
    }
  };

  const handleInsertImage = () => {
    setIsFilePickerOpen(false);
    setHasImage(true);
    if (taskIndex === 1) {
      logEvent("ppt_image_inserted");
      setTimeout(nextTask, 400);
    }
  };

  const handleTransitionSelect = (type: "Fade") => {
    setTransitionType(type);
    if (taskIndex === 2 && bulletsText.length > 5) {
      if (!bulletTaskCompleted.current) {
        bulletTaskCompleted.current = true;
        logEvent("ppt_transition_and_bullets_added");
        setTimeout(nextTask, 400);
      }
    }
  };

  const handleBulletInput = (e: React.FormEvent<HTMLUListElement>) => {
    const text = e.currentTarget.textContent || "";
    if (text.length > 60) {
      // Prevent "Wall of Text" by resetting content directly via DOM and alerting
      alert("Whoa! That is way too much text. Remember the 6x6 rule. Keep it short!");
      e.currentTarget.textContent = text.substring(0, 60);
      setBulletsText(text.substring(0, 60));
    } else {
      setBulletsText(text);
      if (taskIndex === 2 && text.length > 5 && transitionType === "Fade") {
        if (!bulletTaskCompleted.current) {
          bulletTaskCompleted.current = true;
          logEvent("ppt_transition_and_bullets_added");
          setTimeout(nextTask, 400);
        }
      }
    }
  };

  const handleRunSlideShow = () => {
    setIsPresentationMode(true);
    setPresentationSlideIndex(1); // Always start from beginning
    if (taskIndex === 3) {
      logEvent("ppt_slide_show_ran");
    }
  };

  const handlePresentationClick = () => {
    if (presentationSlideIndex === 1) {
      // Go to next slide
      setPresentationSlideIndex(2);
    } else {
      // Exit slide show
      setIsPresentationMode(false);
      if (taskIndex === 3) {
        setTimeout(nextTask, 400);
      }
    }
  };

  const handleExitSlideShow = () => {
    setIsPresentationMode(false);
    if (taskIndex === 3) {
      setTimeout(nextTask, 400);
    }
  };

  if (taskIndex === 4) {
    return (
      <Quiz logEvent={logEvent} 
        title="Presentation Skills Knowledge Check"
        questions={[
          {
            question: "What is the '6x6 Rule' for presentations?",
            options: ["Your slides should be exactly 6 by 6 inches", "You should have no more than 6 bullet points, and 6 words per bullet", "You must use 6 pictures and 6 videos"],
            correctAnswerIndex: 1
          },
          {
            question: "Why should you avoid putting a 'Wall of Text' on your slides?",
            options: ["The computer might crash", "It uses too much digital ink", "The audience will read the slide instead of listening to you"],
            correctAnswerIndex: 2
          }
        ]}
        onComplete={() => {
          logEvent("quiz_completed");
          nextTask();
        }}
      />
    );
  }

  // Common slide contents for rendering in different views
  const renderSlide1 = () => (
    <div className={`${styles.slideCanvas} ${styles.titleSlideCanvas}`}>
      <div className={styles.titleBox}>Science Project 2026</div>
      <div className={styles.subtitleBox}>End of Year Review</div>
    </div>
  );

  const renderSlide2 = () => (
    <div className={`${styles.slideCanvas} ${styles.contentSlideCanvas}`}>
      <div className={styles.contentTitle}>Project Highlights</div>
      <div className={styles.contentBody}>
        <div className={styles.textColumn}>
          <ul 
            className={styles.bulletList}
            contentEditable
            suppressContentEditableWarning
            onInput={handleBulletInput}
          >
            {bulletsText === "" ? <li></li> : null}
          </ul>
        </div>
        <div className={styles.imageColumn}>
          {hasImage && <img src="/science_graph.png" alt="Sales Graph" className={styles.slideImage} />}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.desktopArea}>
      
      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <div className={styles.iconSquare} style={{ background: '#C43E1C' }}>P</div>
          <span>Slides</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.taskbarIcon}>
          <span className={styles.startButton}>⊞</span>
        </div>
        <div className={`${styles.taskbarIcon} ${isAppOpen ? styles.active : ''}`} onClick={openApp}>
          <span style={{color: '#C43E1C', fontWeight: 'bold'}}>P</span>
        </div>
      </div>

      {/* Application Window */}
      {isAppOpen && !isPresentationMode && (
        <div className={styles.appWindow}>
          {/* Windows 11 Title Bar */}
          <div className={styles.appHeader}>
            <span>Presentation1 - Slides</span>
            <div className={styles.windowControls}>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={closeApp}>✕</button>
            </div>
          </div>

          {/* PowerPoint Orange Header */}
          <div className={styles.pptOrangeHeader}>
            <div style={{fontWeight: 'bold'}}>P</div>
            <div className={styles.pptMenu}>
              <span 
                className={`${styles.menuItem} ${activeTab === "Home" ? styles.active : ''}`}
                onClick={() => setActiveTab("Home")}
              >Home</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Insert" ? styles.active : ''}`}
                onClick={() => setActiveTab("Insert")}
              >Insert</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Transitions" ? styles.active : ''}`}
                onClick={() => setActiveTab("Transitions")}
              >Transitions</span>
              <span 
                className={`${styles.menuItem} ${activeTab === "Slide Show" ? styles.active : ''}`}
                onClick={() => setActiveTab("Slide Show")}
              >Slide Show</span>
            </div>
          </div>

          {/* Ribbon */}
          <div className={styles.pptRibbon}>
            {activeTab === "Home" && (
              <div className={styles.ribbonGroup}>
                <button className={styles.ribbonBtn} onClick={handleNewSlide}>📄 New Title & Content Slide</button>
                <button className={styles.ribbonBtn}>Layout ▼</button>
              </div>
            )}
            {activeTab === "Insert" && (
              <div className={styles.ribbonGroup}>
                <button className={styles.ribbonBtn} onClick={() => setIsFilePickerOpen(true)}>🖼️ Pictures</button>
                <button className={styles.ribbonBtn}>⬠ Shapes</button>
              </div>
            )}
            {activeTab === "Transitions" && (
              <div className={styles.ribbonGroup}>
                <button className={`${styles.ribbonBtn} ${transitionType === "None" ? styles.active : ''}`} onClick={() => setTransitionType("None")}>None</button>
                <button className={`${styles.ribbonBtn} ${transitionType === "Fade" ? styles.active : ''}`} onClick={() => handleTransitionSelect("Fade")}>✨ Fade</button>
                <button className={styles.ribbonBtn}>Push</button>
              </div>
            )}
            {activeTab === "Slide Show" && (
              <div className={styles.ribbonGroup}>
                <button className={styles.ribbonBtn} onClick={handleRunSlideShow}>▶️ From Beginning</button>
                <button className={styles.ribbonBtn}>▶️ From Current Slide</button>
              </div>
            )}
          </div>

          {/* Workspace Area */}
          <div className={styles.workspaceArea}>
            
            {/* Sidebar Thumbnails */}
            <div className={styles.thumbnailsSidebar}>
              <div className={`${styles.thumbnailItem} ${activeSlide === 1 ? styles.active : ''}`} onClick={() => setActiveSlide(1)}>
                <span className={styles.thumbnailNumber}>1</span>
                <div className={styles.thumbnailSlide}>
                  <div style={{fontSize: '0.8rem', fontWeight: 'bold'}}>Science Project</div>
                  <div style={{fontSize: '0.5rem'}}>End of Year Review</div>
                </div>
              </div>

              {hasContentSlide && (
                <div className={`${styles.thumbnailItem} ${activeSlide === 2 ? styles.active : ''}`} onClick={() => setActiveSlide(2)}>
                  <span className={styles.thumbnailNumber}>2</span>
                  <div className={styles.thumbnailSlide} style={{padding: '0.2rem', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <div style={{fontSize: '0.6rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', width: '100%', marginBottom: '0.2rem'}}>Project Highlights</div>
                    <div style={{display: 'flex', width: '100%', height: '100%'}}>
                      <div style={{flex: 1, fontSize: '0.3rem', paddingTop: '0.2rem'}}>• {bulletsText.substring(0, 10)}...</div>
                      <div style={{flex: 1, border: hasImage ? 'none' : '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {hasImage && <div style={{width: '80%', height: '80%', background: '#a0a0a0'}}></div>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Canvas */}
            <div className={styles.mainCanvasArea}>
              {activeSlide === 1 ? renderSlide1() : renderSlide2()}
            </div>
          </div>
        </div>
      )}

      {/* File Picker Modal */}
      {isFilePickerOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.filePickerModal}>
            <div className={styles.modalHeader}>
              <span>Open File</span>
              <button className={styles.modalCloseBtn} onClick={() => setIsFilePickerOpen(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalSidebar}>
                <div className={`${styles.modalSidebarItem} ${styles.active}`}>Pictures</div>
                <div className={styles.modalSidebarItem}>Documents</div>
                <div className={styles.modalSidebarItem}>Downloads</div>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.fileItem} onClick={handleInsertImage}>
                  <img src="/science_graph.png" alt="Graph" />
                  <span>science_graph.png</span>
                </div>
                <div className={styles.fileItem} onClick={() => alert("While cat memes are funny, they aren't appropriate for a formal school presentation. Let's pick an image that supports our Science Project!")}>
                  <img src="/cat_meme.png" alt="Cat" />
                  <span>cat_meme.png</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Presentation Mode */}
      {isPresentationMode && (
        <div className={styles.fullScreenPresentation} onClick={handlePresentationClick}>
          <div key={`slide-${presentationSlideIndex}`} className={`${styles.presentedSlide} ${presentationSlideIndex === 2 && transitionType === "Fade" ? styles.transitionFade : ''}`}>
            {presentationSlideIndex === 1 ? (
              <div className={`${styles.slideCanvas} ${styles.titleSlideCanvas}`} style={{width: '100%', height: '100%'}}>
                <div className={styles.titleBox}>Science Project 2026</div>
                <div className={styles.subtitleBox}>End of Year Review</div>
              </div>
            ) : (
              <div className={`${styles.slideCanvas} ${styles.contentSlideCanvas}`} style={{width: '100%', height: '100%'}}>
                <div className={styles.contentTitle}>Project Highlights</div>
                <div className={styles.contentBody}>
                  <div className={styles.textColumn}>
                    <ul className={styles.bulletList}>
                      <li>{bulletsText}</li>
                    </ul>
                  </div>
                  <div className={styles.imageColumn}>
                    {hasImage && <img src="/science_graph.png" alt="Sales Graph" className={styles.slideImage} />}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.presentationTooltip}>
            {presentationSlideIndex === 1 ? "Click anywhere to go to the next slide" : "Click anywhere to exit Slide Show"}
          </div>
        </div>
      )}

    </div>
  );
}
