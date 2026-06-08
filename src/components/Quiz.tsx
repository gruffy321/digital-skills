"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import styles from "./Quiz.module.css";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function Quiz({ title, questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // prevent multiple clicks
    setSelectedOption(index);

    const correct = index === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          // Next question
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          // Quiz complete, trigger confetti
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
          });
          
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      }, 1000);
    } else {
      // Incorrect, reset after short delay to let them try again
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.quizModal}>
        <div className={styles.quizHeader}>
          {title} ({currentQuestionIndex + 1} of {questions.length})
        </div>
        <div className={styles.quizBody}>
          <div className={styles.quizQuestion}>
            {currentQuestion.question}
          </div>
          <div className={styles.quizOptions}>
            {currentQuestion.options.map((option, index) => {
              let optionClass = styles.quizOption;
              if (selectedOption === index) {
                optionClass += isCorrect ? ` ${styles.correct}` : ` ${styles.incorrect}`;
              } else if (selectedOption !== null && index === currentQuestion.correctAnswerIndex && isCorrect === false) {
                // Optionally highlight the right answer if they got it wrong? 
                // Or just let them try again. Let's just let them try again.
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleOptionClick(index)}
                  disabled={selectedOption !== null}
                >
                  {String.fromCharCode(65 + index)}) {option}
                </button>
              );
            })}
          </div>
          {selectedOption !== null && isCorrect === false && (
            <div className={styles.feedbackMsg}>Incorrect, try again!</div>
          )}
          {selectedOption !== null && isCorrect === true && (
            <div className={styles.feedbackMsgCorrect}>Correct!</div>
          )}
        </div>
      </div>
    </div>
  );
}
