"use client";

import React, { useState, useEffect } from "react";
import styles from "./Module12.module.css";
import { useModule } from "@/components/ModuleWrapper";
import { saveModuleState, getModuleState } from "@/actions/progress";
import { getCertificateDetails } from "@/actions/user";
import Image from "next/image";

const CHECKLIST_ITEMS = [
  { id: "m12_1", section: "File Management & Cloud", text: "Create a 'Digital Skills Final Project' folder in OneDrive." },
  { id: "m12_2", section: "Word Processing", text: "Create a 'Survival_Guide.docx', format it with bold/italics, and insert an image." },
  { id: "m12_3", section: "Spreadsheet", text: "Create a 'Weekly_Budget.xlsx' and use the =SUM() formula." },
  { id: "m12_4", section: "Presentation", text: "Create a 3-slide 'My_Hobbies.pptx' with one slide transition." },
  { id: "m12_5", section: "Cyber Safety", text: "Lock your PC screen to secure your account before walking away." },
  { id: "m12_6", section: "Email & Communication", text: "Send a professional email to your teacher with the OneDrive share link attached." }
];

export default function Module12() {
  const { nextTask, logEvent } = useModule();
  
  const [certDetails, setCertDetails] = useState<any>(null);
  
  const [itemStatuses, setItemStatuses] = useState<Record<string, string>>({
    "m12_1": "in_progress",
    "m12_2": "locked",
    "m12_3": "locked",
    "m12_4": "locked",
    "m12_5": "locked",
    "m12_6": "locked",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getModuleState("12").then((state) => {
      if (state && typeof state === 'object') {
        setItemStatuses(state as Record<string, string>);
      }
      setLoaded(true);
    });

    getCertificateDetails().then(details => {
      if (details) setCertDetails(details);
    });

    const pollInterval = setInterval(() => {
      getModuleState("12").then((state) => {
        if (state && typeof state === 'object') {
          setItemStatuses(state as Record<string, string>);
        }
      });
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    if (loaded) {
      saveModuleState("12", itemStatuses);
    }
  }, [itemStatuses, loaded]);
  
  const [isComplete, setIsComplete] = useState(false);

  const handleStudentSubmit = (id: string) => {
    setItemStatuses(prev => {
      const newState = { ...prev, [id]: "ready_for_review" };
      logEvent(`student_submitted_${id}`);
      return newState;
    });
  };

  useEffect(() => {
    const allApproved = CHECKLIST_ITEMS.every(item => itemStatuses[item.id] === "approved");
    if (allApproved && !isComplete) {
      setIsComplete(true);
      logEvent("final_project_completed");
      nextTask();
    }
  }, [itemStatuses, isComplete, nextTask, logEvent]);

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.celebration}>
          <div className={styles.certificate}>
            <div className={styles.certHeader}>
              <Image src="/logo.png" alt="ESW Logo" width={80} height={80} className={styles.certLogo} />
              Certificate of Competence
            </div>
            <div className={styles.certBody}>
              <p>This certifies that</p>
              <h2>{certDetails ? certDetails.studentName : "School User"}</h2>
              <p>has successfully completed the Digital Skills Curriculum and mastered the Student Survival Pack!</p>
              <div className={styles.badgeContainer}>
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <div key={item.id} className={styles.badge} title={item.section}>
                    🏅<br/>{idx + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.certFooter}>
              <span>Verified by: {certDetails ? certDetails.approverName : "Admin"}</span>
              <span>Date: {new Date().toLocaleDateString()}</span>
            </div>
            <button className={styles.printBtn} onClick={() => window.print()}>🖨️ Print Certificate</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2>Final Digital Skills Project</h2>
        </div>
        <p>Use the real software on your computer to complete each task. When finished, submit it for review and await teacher approval!</p>
      </div>

      <div className={styles.taskList}>
        {CHECKLIST_ITEMS.map((item, index) => {
          const status = itemStatuses[item.id];
          const isLocked = status === "locked";
          const isInProgress = status === "in_progress";
          const isReady = status === "ready_for_review";
          const isApproved = status === "approved";
          const needsRevision = status === "needs_revision";

          return (
            <div key={item.id} className={`${styles.taskCard} ${styles[status]}`}>
              <div className={styles.taskCardMain}>
                <div className={styles.taskNumber}>{index + 1}</div>
                <div className={styles.taskContent}>
                  <div className={styles.taskSection}>{item.section}</div>
                  <div className={styles.taskText}>{item.text}</div>
                </div>
                <div className={styles.taskStatusLabel}>
                  {isLocked && "🔒 Locked"}
                  {isInProgress && "📝 In Progress"}
                  {isReady && "⏳ Reviewing..."}
                  {needsRevision && "❌ Needs Revision"}
                  {isApproved && "✅ Approved"}
                </div>
              </div>
              
              <div className={styles.taskAction}>
                {(isInProgress || needsRevision) && (
                  <button className={styles.btnSubmit} onClick={() => handleStudentSubmit(item.id)}>
                    {needsRevision ? "Resubmit for Review" : "Mark Ready for Review"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
