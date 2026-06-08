"use client";

import { useState, useEffect } from "react";
import styles from "./Module8.module.css";
import { useModule } from "@/components/ModuleWrapper";

type Slide = {
  id: number;
  layout: "title" | "title-content";
  imageUrl: string | null;
  textContent: string;
  headerContent: string;
  transition: string;
};

export default function Module8() {
  const { taskIndex, nextTask, logEvent } = useModule();
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, layout: "title", imageUrl: null, textContent: "", headerContent: "", transition: "none" }
  ]);
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [isPresenting, setIsPresenting] = useState(false);
  const [presentationSlideIndex, setPresentationSlideIndex] = useState(0);

  // Modals
  const [alertMessage, setAlertMessage] = useState<{ title: string; body: string } | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Quiz
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  const activeSlide = slides.find(s => s.id === activeSlideId);
  const presentationSlide = slides[presentationSlideIndex];

  const openApp = () => {
    setIsAppOpen(true);
    if (!isAppOpen) {
      logEvent("presentation_app_opened");
    }
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleNewSlide = (layout: "title" | "title-content") => {
    setActiveMenu(null);
    const newSlide: Slide = {
      id: slides.length + 1,
      layout,
      imageUrl: null,
      textContent: "",
      headerContent: "",
      transition: "none"
    };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newSlide.id);

    if (taskIndex === 0 && layout === "title-content") {
      logEvent("added_content_slide");
      nextTask();
    }
  };

  const handleInsertImage = () => {
    setActiveMenu(null);
    if (activeSlide && activeSlide.layout === "title-content" && !activeSlide.imageUrl) {
      setIsImagePickerOpen(true);
      setSelectedFile(null);
    } else {
      setAlertMessage({ title: "Wrong Slide Layout", body: "Please select a 'Title and Content' slide to insert an image." });
    }
  };

  const handleImagePickerSubmit = () => {
    if (!selectedFile) {
      setAlertMessage({ title: "No Selection", body: "Please select an image to insert." });
      return;
    }

    if (selectedFile === "cat_meme.png") {
      logEvent("selected_unprofessional_image");
      setAlertMessage({ 
        title: "Unprofessional Choice!", 
        body: "While that cat is hilarious, it's not appropriate for a professional Science Project presentation. Please select a relevant image." 
      });
      return;
    }

    if (selectedFile === "science_graph.png") {
      setIsImagePickerOpen(false);
      setSlides(slides.map(s => s.id === activeSlideId ? { ...s, imageUrl: "/science_graph.png" } : s));
      if (taskIndex === 1) {
        logEvent("inserted_image");
        nextTask();
      }
    }
  };

  const handleTextInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || "";
    setSlides(slides.map(s => s.id === activeSlideId ? { ...s, textContent: text } : s));
  };

  const handleHeaderInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || "";
    setSlides(slides.map(s => s.id === activeSlideId ? { ...s, headerContent: text } : s));
  };

  const handleApplyTransition = (transition: string) => {
    setActiveMenu(null);

    // Wall of Text Adjudicator
    if (activeSlide && activeSlide.textContent.length > 200) {
      logEvent("wall_of_text_blocked");
      setAlertMessage({
        title: "Too much text!",
        body: "Your audience will spend their time reading the slide instead of listening to you. Try breaking this into shorter bullet points (under 200 characters total) before applying a transition."
      });
      return;
    }

    setSlides(slides.map(s => s.id === activeSlideId ? { ...s, transition } : s));
    
    if (taskIndex === 2 && transition === "fade") {
      logEvent("transition_applied_successfully");
      nextTask();
    }
  };

  const startPresentation = () => {
    setActiveMenu(null);
    setPresentationSlideIndex(0);
    setIsPresenting(true);
    if (taskIndex === 3) {
      logEvent("started_presentation");
      nextTask();
      // Wait a moment then open the quiz
      setTimeout(() => setIsQuizOpen(true), 2000);
    }
  };

  const handleQuizAnswer = (answer: string, isCorrect: boolean) => {
    setQuizAnswered(answer);
    if (isCorrect && taskIndex === 4) {
      logEvent("module8_quiz_passed");
      setTimeout(() => {
        setIsQuizOpen(false);
        nextTask();
      }, 1500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPresenting) {
        if (e.key === "Escape") {
          setIsPresenting(false);
        } else if (e.key === "ArrowRight" || e.key === " ") {
          if (presentationSlideIndex < slides.length - 1) {
            setPresentationSlideIndex(prev => prev + 1);
          }
        } else if (e.key === "ArrowLeft") {
          if (presentationSlideIndex > 0) {
            setPresentationSlideIndex(prev => prev - 1);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPresenting, presentationSlideIndex, slides.length]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className={styles.iconGrid}>
        <div className={styles.desktopIcon} onDoubleClick={openApp}>
          <span className={styles.iconImage}>📊</span>
          <span>Slides</span>
        </div>
      </div>

      {isAppOpen && (
        <div className={styles.osWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowHeaderTitle}>
              <span>📊</span> My_Presentation.pptx - Slide Simulator
            </div>
            <div className={styles.windowControls}>
              <button onClick={startPresentation} style={{ width: '80px', fontWeight: 'bold' }}>Present</button>
              <button>—</button>
              <button>□</button>
              <button className={styles.closeBtn} onClick={() => setIsAppOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.appRibbon}>
            <div className={styles.menuBar}>
              <div className={styles.menuItem} onClick={() => handleMenuClick("File")}>File</div>
              <div className={`${styles.menuItem} ${activeMenu === "Home" ? styles.active : ""}`} onClick={() => handleMenuClick("Home")}>
                Home
                {activeMenu === "Home" && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownItem} onClick={() => handleNewSlide("title")}>
                      <span>📄</span> New Title Slide
                    </div>
                    <div className={styles.dropdownItem} onClick={() => handleNewSlide("title-content")}>
                      <span>📑</span> New Title & Content Slide
                    </div>
                  </div>
                )}
              </div>
              <div className={`${styles.menuItem} ${activeMenu === "Insert" ? styles.active : ""}`} onClick={() => handleMenuClick("Insert")}>
                Insert
                {activeMenu === "Insert" && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownItem} onClick={handleInsertImage}>
                      <span>🖼️</span> Image
                    </div>
                  </div>
                )}
              </div>
              <div className={`${styles.menuItem} ${activeMenu === "Transitions" ? styles.active : ""}`} onClick={() => handleMenuClick("Transitions")}>
                Transitions
                {activeMenu === "Transitions" && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownItem} onClick={() => handleApplyTransition("none")}>None</div>
                    <div className={styles.dropdownItem} onClick={() => handleApplyTransition("fade")}>Fade</div>
                  </div>
                )}
              </div>
              <div className={styles.menuItem} onClick={startPresentation} style={{ marginLeft: "auto", color: "#c43e1c", fontWeight: "bold" }}>
                Slide Show
              </div>
            </div>
          </div>

          <div className={styles.appBody}>
            {/* Thumbnails Sidebar */}
            <div className={styles.thumbnailsPanel}>
              {slides.map((slide, i) => (
                <div 
                  key={slide.id} 
                  className={`${styles.thumbnailContainer} ${activeSlideId === slide.id ? styles.active : ""}`}
                  onClick={() => setActiveSlideId(slide.id)}
                >
                  <div className={styles.thumbnailNumber}>{i + 1}</div>
                  <div className={`${styles.thumbnailSlide} ${activeSlideId === slide.id ? styles.activeSlide : ""}`}>
                    <div style={{ transform: "scale(0.2)", width: "500%", height: "500%", transformOrigin: "top left", padding: "10px", pointerEvents: "none" }}>
                      {slide.layout === "title" ? (
                        <div style={{ textAlign: "center", paddingTop: "20%" }}>
                          <h2>{slide.headerContent || "Title Slide"}</h2>
                        </div>
                      ) : (
                        <div>
                          <h3>{slide.headerContent || "Content Slide"}</h3>
                          {slide.imageUrl && <div style={{width: '50px', height: '50px', background: '#ccc'}}></div>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Slide Editor */}
            <div className={styles.mainEditor}>
              {activeSlide && (
                <div 
                  className={`${styles.slideCanvas}`}
                  key={`${activeSlide.id}`}
                >
                  {activeSlide.layout === "title" ? (
                    <div className={styles.layoutTitle}>
                      <div className={styles.titleBox} contentEditable suppressContentEditableWarning onInput={handleHeaderInput} data-placeholder="Click to add title"></div>
                      <div className={styles.subtitleBox} contentEditable suppressContentEditableWarning onInput={handleTextInput} data-placeholder="Click to add subtitle"></div>
                    </div>
                  ) : (
                    <div className={styles.layoutContent}>
                      <div className={styles.headerBox} contentEditable suppressContentEditableWarning onInput={handleHeaderInput} data-placeholder="Click to add title"></div>
                      <div className={styles.contentBody}>
                        <div 
                          className={styles.textBox} 
                          contentEditable 
                          suppressContentEditableWarning 
                          onInput={handleTextInput}
                          data-placeholder="Click to add text..."
                        ></div>
                        {activeSlide.imageUrl ? (
                          <div className={styles.imageBox} style={{ border: 'none', background: 'transparent' }}>
                            <img src={activeSlide.imageUrl} alt="Inserted" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                        ) : (
                          <div className={styles.imageBox} style={{ borderStyle: "dashed", opacity: 0.5 }}>
                            Image Placeholder
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Presentation Mode */}
      {isPresenting && presentationSlide && (
        <div className={styles.fullScreenMode} onClick={() => {
          if (presentationSlideIndex < slides.length - 1) {
            setPresentationSlideIndex(prev => prev + 1);
          }
        }}>
          <div 
            className={`${styles.fullScreenSlide} ${presentationSlide.transition === "fade" ? styles.fadeTransition : ""}`}
            key={`${presentationSlide.id}-${presentationSlideIndex}`}
          >
            {presentationSlide.layout === "title" ? (
              <div className={styles.layoutTitle}>
                <div className={styles.titleBox} style={{ border: 'none' }}>{presentationSlide.headerContent || "Untitled Presentation"}</div>
                <div className={styles.subtitleBox} style={{ border: 'none' }}>{presentationSlide.textContent || ""}</div>
              </div>
            ) : (
              <div className={styles.layoutContent}>
                <div className={styles.headerBox} style={{ border: 'none' }}>{presentationSlide.headerContent || ""}</div>
                <div className={styles.contentBody}>
                  <div className={styles.textBox} style={{ border: 'none' }}>{presentationSlide.textContent || ""}</div>
                  {presentationSlide.imageUrl && (
                    <div className={styles.imageBox} style={{ border: 'none', background: 'transparent' }}>
                      <img src={presentationSlide.imageUrl} alt="Inserted" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className={styles.exitPresentationBtn} onClick={(e) => { e.stopPropagation(); setIsPresenting(false); }}>
            Exit Slide Show (Esc)
          </button>
        </div>
      )}

      {/* Image Picker Modal */}
      {isImagePickerOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.saveModal}>
            <div className={styles.modalHeader}>
              <span>Insert Image</span>
              <button className={styles.closeBtn} onClick={() => setIsImagePickerOpen(false)} style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>✕</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.filePickerSidebar}>
                <div className={styles.filePickerSidebarItem}>Desktop</div>
                <div className={styles.filePickerSidebarItem}>Documents</div>
                <div className={styles.filePickerSidebarItem}>Downloads</div>
                <div className={`${styles.filePickerSidebarItem} ${styles.active}`}>Pictures</div>
              </div>
              <div className={styles.filePickerContent}>
                <div className={styles.fileListHeader}>Name</div>
                
                <div 
                  className={`${styles.contentRow} ${selectedFile === "cat_meme.png" ? styles.active : ""}`}
                  onClick={() => setSelectedFile("cat_meme.png")}
                  onDoubleClick={() => { setSelectedFile("cat_meme.png"); handleImagePickerSubmit(); }}
                >
                  <img src="/cat_meme.png" alt="Cat Meme" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.9rem' }}>cat_meme.png</span>
                </div>

                <div 
                  className={`${styles.contentRow} ${selectedFile === "science_graph.png" ? styles.active : ""}`}
                  onClick={() => setSelectedFile("science_graph.png")}
                  onDoubleClick={() => { setSelectedFile("science_graph.png"); handleImagePickerSubmit(); }}
                >
                  <img src="/science_graph.png" alt="Science Graph" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.9rem' }}>science_graph.png</span>
                </div>
                
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.modalBtn} onClick={() => setIsImagePickerOpen(false)}>Cancel</button>
              <button className={`${styles.modalBtn} ${styles.primary}`} onClick={handleImagePickerSubmit}>Insert</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {alertMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.alertModal}>
            <div className={styles.alertHeader}>
              <span>⚠️</span> {alertMessage.title}
            </div>
            <div className={styles.alertBody}>
              {alertMessage.body}
            </div>
            <div className={styles.alertFooter}>
              <button className={`${styles.modalBtn} ${styles.primary}`} onClick={() => setAlertMessage(null)}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.quizModal}>
            <div className={styles.quizHeader}>
              Module 8 Knowledge Check
            </div>
            <div className={styles.quizBody}>
              <div className={styles.quizQuestion}>
                According to the "Wall of Text" rule, what is the problem with putting 5 paragraphs of text on a presentation slide?
              </div>
              <div className={styles.quizOptions}>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "A" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("A", false)}
                >
                  A) The computer will run out of memory.
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "B" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("B", false)}
                >
                  B) The text will automatically shrink until it is invisible.
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "C" ? styles.correct : ""}`}
                  onClick={() => handleQuizAnswer("C", true)}
                >
                  C) Your audience will read the screen instead of listening to you speak.
                </button>
                <button 
                  className={`${styles.quizOption} ${quizAnswered === "D" ? styles.incorrect : ""}`}
                  onClick={() => handleQuizAnswer("D", false)}
                >
                  D) It prevents you from adding animations.
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
