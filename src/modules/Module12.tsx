"use client";

import { useState, useEffect } from "react";
import styles from "./Module12.module.css";
import { useModule } from "@/components/ModuleWrapper";

const CHECKLIST_ITEMS = [
  { id: "c1", section: "Organization & Cloud", text: "I have opened File Explorer and navigated to my OneDrive - Student folder." },
  { id: "c2", section: "Organization & Cloud", text: "I have created a new folder inside OneDrive named 'Digital Skills Final Project'." },
  { id: "w1", section: "Word Processing", text: "I opened Microsoft Word and created a new document." },
  { id: "w2", section: "Word Processing", text: "I saved the document into my new OneDrive folder as 'Student_Survival_Guide.docx'." },
  { id: "w3", section: "Word Processing", text: "I added a Header with my full name and the date." },
  { id: "w4", section: "Word Processing", text: "I wrote a Paragraph explaining my favorite subject." },
  { id: "w5", section: "Word Processing", text: "I made the title of the document Bold and size 18." },
  { id: "w6", section: "Word Processing", text: "I made a key sentence in my paragraph Italicized." },
  { id: "w7", section: "Word Processing", text: "I inserted an Image related to my favorite subject." },
  { id: "w8", section: "Word Processing", text: "I inserted a Table showing my weekly timetable (at least 3 rows and 2 columns)." },
  { id: "s1", section: "Spreadsheets", text: "I opened Microsoft Excel and created a 'Weekly_Budget.xlsx' file in my OneDrive folder." },
  { id: "s2", section: "Spreadsheets", text: "I entered at least 3 items I buy every week and their costs." },
  { id: "s3", section: "Spreadsheets", text: "I used the =SUM() formula to calculate the total cost." },
  { id: "p1", section: "Presentations", text: "I opened Microsoft PowerPoint and created 'Survival_Presentation.pptx' in my OneDrive." },
  { id: "p2", section: "Presentations", text: "I created a 3-slide presentation about my hobbies." },
  { id: "p3", section: "Presentations", text: "I inserted at least one image and applied one slide transition." },
  { id: "p4", section: "Presentations", text: "I made sure there is no 'Wall of Text' on my slides." },
  { id: "f1", section: "Final Submission", text: "I have Printed my Word Document and PowerPoint Slides (or attached them to an email to my teacher)." },
  { id: "f2", section: "Final Submission", text: "I have secured my account by clicking the Start Menu -> User Icon -> Sign Out before leaving the classroom." }
];

export default function Module12() {
  const { nextTask, logEvent } = useModule();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isComplete, setIsComplete] = useState(false);

  const sections = Array.from(new Set(CHECKLIST_ITEMS.map(item => item.section)));

  const handleToggle = (id: string) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      logEvent(`toggled_checklist_${id}_${newState[id]}`);
      return newState;
    });
  };

  useEffect(() => {
    const allChecked = CHECKLIST_ITEMS.every(item => checkedItems[item.id]);
    if (allChecked && !isComplete) {
      setIsComplete(true);
      logEvent("final_project_completed");
      nextTask();
    }
  }, [checkedItems, isComplete, nextTask, logEvent]);

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.celebration}>
          <div className={styles.trophy}>🏆</div>
          <h2>Congratulations!</h2>
          <p>You have successfully completed the Digital Skills Curriculum.</p>
          <p>Your Student Survival Pack is complete, and you are ready for the digital world!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Final Digital Skills Project</h2>
        <p>Use the real software on your computer to complete the Student Survival Pack. Check off the boxes as you go!</p>
      </div>

      {sections.map(section => (
        <div key={section} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section}</h3>
          <div>
            {CHECKLIST_ITEMS.filter(item => item.section === section).map(item => {
              const isChecked = !!checkedItems[item.id];
              return (
                <label key={item.id} className={`${styles.checklistItem} ${isChecked ? styles.checked : ""}`}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={isChecked}
                    onChange={() => handleToggle(item.id)}
                  />
                  <span className={styles.label}>{item.text}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
