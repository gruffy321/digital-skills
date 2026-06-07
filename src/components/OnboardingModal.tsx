"use client";

import { useEffect, useState } from "react";
import styles from "./OnboardingModal.module.css";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Welcome to the Digital Skills Curriculum!</h2>
        </div>
        <div className={styles.content}>
          <ul>
            <li><strong>How it works:</strong> You will find 12 training modules on your dashboard. Click on a module card to launch its simulator.</li>
            <li><strong>The Guide:</strong> Inside each module, a white guide panel will appear on the right side of your screen telling you exactly what to do.</li>
            <li><strong>Progress:</strong> Read the instructions carefully, complete the task inside the simulator, and the system will automatically move you to the next step.</li>
            <li><strong>Final Exam:</strong> Once you complete Modules 1-11, you will unlock the Final Project (Module 12) where you will build a "Student Survival Pack" using real software!</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <button className={styles.closeBtn} onClick={onClose}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
