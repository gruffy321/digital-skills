"use client";

import { useState } from "react";
import styles from "./Module6.module.css";
import { useModule } from "@/components/ModuleWrapper";
import Quiz, { QuizQuestion } from "@/components/Quiz";

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What does the 'B' button on the formatting toolbar do?",
    options: ["Makes the text Blue", "Brings the text to the bottom", "Makes the text Bold", "Backspaces the text"],
    correctAnswerIndex: 2
  },
  {
    question: "What must you do BEFORE you can make a word bold?",
    options: ["Save the document", "Highlight (Select) the word", "Close the application", "Type it in all caps"],
    correctAnswerIndex: 1
  },
  {
    question: "Why should you avoid using symbols like * and / in file names?",
    options: ["They look messy", "They are illegal", "The computer uses them for system paths and it causes errors", "They take up too much memory"],
    correctAnswerIndex: 2
  }
];

export default function Module6() {
  const { taskIndex, nextTask, logEvent } = useModule();
  
  const [isWordOpen, setIsWordOpen] = useState(false);
  const [docText, setDocText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  const handleOpenWord = () => {
    if (taskIndex === 0) {
      setIsWordOpen(true);
      logEvent("opened_word");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDocText(e.target.value);
    if (taskIndex === 0 && e.target.value.toLowerCase().includes("school sports day")) {
      nextTask();
    }
  };

  const toggleBold = () => {
    setIsBold(!isBold);
    checkFormatting(!isBold, isCenter);
  };

  const toggleCenter = () => {
    setIsCenter(!isCenter);
    checkFormatting(isBold, !isCenter);
  };

  const checkFormatting = (bold: boolean, center: boolean) => {
    if (taskIndex === 1 && bold && center) {
      logEvent("formatted_text_bold_center");
      nextTask();
    }
  };

  const handleSaveClick = () => {
    if (taskIndex === 2) {
      setShowSaveDialog(true);
    }
  };

  const handleSaveConfirm = () => {
    if (fileName === "Sports_Flyer") {
      setIsSaved(true);
      setShowSaveDialog(false);
      logEvent("saved_document_correctly");
      nextTask();
      setTimeout(() => setShowQuiz(true), 1500);
    } else {
      alert("Please name the file exactly 'Sports_Flyer' (without quotes).");
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    logEvent("passed_module4_quiz");
    nextTask();
  };

  return (
    <div className={styles.desktop}>
      {!isWordOpen && (
        <div className={styles.iconGrid}>
          <div className={styles.desktopIcon} onDoubleClick={handleOpenWord}>
            <span className={styles.iconImage}>📝</span>
            <span>Word Processor</span>
          </div>
        </div>
      )}

      {isWordOpen && (
        <div className={styles.wordWindow}>
          <div className={styles.windowHeader}>
            <span>{isSaved ? fileName + ".docx" : "Untitled Document"} - Word Processor</span>
            <div className={styles.windowControls}>
              <span>—</span><span>□</span><span>✕</span>
            </div>
          </div>
          
          <div className={styles.toolbar}>
            <div className={styles.menuBar}>
              <span onClick={handleSaveClick} className={taskIndex === 2 ? styles.highlightMenu : ""}>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
            </div>
            <div className={styles.formatBar}>
              <button 
                className={`${styles.formatBtn} ${isBold ? styles.activeBtn : ""}`} 
                onClick={toggleBold}
              >
                <b>B</b>
              </button>
              <button className={styles.formatBtn}><i>I</i></button>
              <button className={styles.formatBtn}><u>U</u></button>
              <div className={styles.divider}></div>
              <button className={styles.formatBtn}>⫷</button>
              <button 
                className={`${styles.formatBtn} ${isCenter ? styles.activeBtn : ""}`}
                onClick={toggleCenter}
              >
                ≡
              </button>
              <button className={styles.formatBtn}>⫸</button>
            </div>
          </div>

          <div className={styles.pageArea}>
            <div className={styles.page}>
              <textarea
                className={`${styles.docInput} ${isBold ? styles.boldText : ""} ${isCenter ? styles.centerText : ""}`}
                value={docText}
                onChange={handleTextChange}
                placeholder="Start typing here..."
              />
            </div>
          </div>
        </div>
      )}

      {showSaveDialog && (
        <div className={styles.modalOverlay}>
          <div className={styles.saveDialog}>
            <div className={styles.saveHeader}>Save As...</div>
            <div className={styles.saveBody}>
              <label>File name:</label>
              <input 
                type="text" 
                value={fileName} 
                onChange={e => setFileName(e.target.value)} 
                placeholder="e.g. Sports_Flyer"
              />
            </div>
            <div className={styles.saveFooter}>
              <button onClick={handleSaveConfirm} className={styles.primaryBtn}>Save</button>
              <button onClick={() => setShowSaveDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showQuiz && (
        <Quiz 
          title="Module 4 Knowledge Check" 
          questions={QUIZ_QUESTIONS} 
          onComplete={handleQuizComplete} 
        />
      )}
    </div>
  );
}
