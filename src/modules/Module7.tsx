"use client";

import { useState } from "react";
import styles from "./Module7.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz, { QuizQuestion } from "@/components/Quiz";

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What does the 'red squiggly line' under a word usually mean?",
    options: ["The computer likes that word", "Spelling error", "Grammar error", "The word is too long"],
    correctAnswerIndex: 1
  },
  {
    question: "How do you see suggestions for a misspelled word?",
    options: ["Right-click on the word", "Double-click the word", "Press Delete", "Shout at the screen"],
    correctAnswerIndex: 0
  },
  {
    question: "Tables are best used for:",
    options: ["Making the page look pretty", "Drawing pictures", "Organizing information into rows and columns", "Writing long paragraphs"],
    correctAnswerIndex: 2
  }
];

export default function Module7() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  const [docText, setDocText] = useState("This is my revision guide. I will definately pass the exam!");
  const [hasTable, setHasTable] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [showSpellMenu, setShowSpellMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [showQuiz, setShowQuiz] = useState(false);

  const handleInsertTable = () => {
    if (taskIndex === 0) {
      setHasTable(true);
      logEvent("inserted_table");
      nextTask();
    }
  };

  const handleInsertImage = () => {
    if (taskIndex === 1) {
      setHasImage(true);
      logEvent("inserted_image");
      nextTask();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (taskIndex === 2) {
      setMenuPos({ x: e.clientX, y: e.clientY });
      setShowSpellMenu(true);
    }
  };

  const handleSpellFix = () => {
    setDocText("This is my revision guide. I will definitely pass the exam!");
    setShowSpellMenu(false);
    logEvent("fixed_spelling");
    nextTask();
    setTimeout(() => setShowQuiz(true), 1500);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    logEvent("passed_module5_quiz");
    nextTask();
  };

  return (
    <div className={styles.desktop} onClick={() => setShowSpellMenu(false)}>
      
      <div className={styles.wordWindow}>
        <div className={styles.windowHeader}>
          <span>Revision Guide - Word Processor</span>
          <div className={styles.windowControls}>
            <span>—</span><span>□</span><span>✕</span>
          </div>
        </div>
        
        <div className={styles.toolbar}>
          <div className={styles.menuBar}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span className={taskIndex < 2 ? styles.highlightMenu : ""}>Insert ▼</span>
          </div>
          <div className={styles.formatBar}>
            <button className={styles.formatBtn} onClick={handleInsertTable} disabled={hasTable}>
              ⊞ Table
            </button>
            <button className={styles.formatBtn} onClick={handleInsertImage} disabled={hasImage}>
              🖼️ Image
            </button>
          </div>
        </div>

        <div className={styles.pageArea}>
          <div className={styles.page}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Revision Guide</h1>
            
            <p style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
              This is my revision guide. I will{" "}
              {docText.includes("definately") ? (
                <span 
                  className={styles.spellError}
                  onContextMenu={handleContextMenu}
                >
                  definately
                </span>
              ) : (
                "definitely"
              )}
              {" "}pass the exam!
            </p>

            {hasTable && (
              <table className={styles.docTable}>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Digital Skills</td>
                    <td>Review module 5</td>
                  </tr>
                  <tr>
                    <td>Maths</td>
                    <td>Practice fractions</td>
                  </tr>
                </tbody>
              </table>
            )}

            {hasImage && (
              <div className={styles.imageWrapper}>
                <div className={styles.placeholderImage}>
                  <span>🏫 School Logo</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSpellMenu && (
        <div 
          className={styles.contextMenu} 
          style={{ top: menuPos.y, left: menuPos.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.suggestionTitle}>Spelling Suggestions:</div>
          <div className={styles.menuItem} onClick={handleSpellFix}>definitely</div>
          <div className={styles.menuItem} onClick={handleSpellFix}>defiantly</div>
          <div className={styles.menuDivider}></div>
          <div className={styles.menuItem}>Add to dictionary</div>
          <div className={styles.menuItem}>Ignore all</div>
        </div>
      )}

      {showQuiz && (
        <Quiz 
          title="Module 5 Knowledge Check" 
          questions={QUIZ_QUESTIONS} 
          onComplete={handleQuizComplete} 
        />
      )}
    </div>
  );
}
