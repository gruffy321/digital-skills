"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import OnboardingModal from "@/components/OnboardingModal";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

const getModuleIcon = (id: string | number) => {
  const iconProps = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, style: { marginBottom: '0.5rem', opacity: 0.8 } };
  switch (String(id)) {
    case "1": return <svg {...iconProps}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
    case "2": return <svg {...iconProps}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
    case "3": return <svg {...iconProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
    case "4": return <svg {...iconProps}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
    case "5": return <svg {...iconProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
    case "6": return <svg {...iconProps}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
    case "7": return <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="9" x2="9" y2="21"></line><line x1="15" y1="9" x2="15" y2="21"></line></svg>;
    case "8": return <svg {...iconProps}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><polygon points="10 7 15 10 10 13 10 7"></polygon></svg>;
    case "9": return <svg {...iconProps}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
    case "10": return <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
    case "11": return <svg {...iconProps}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
    case "12": return <svg {...iconProps}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
    default: return <svg {...iconProps}><circle cx="12" cy="12" r="10"></circle></svg>;
  }
};

export default function DashboardClient({ initialUser, modules, logoutUser }: any) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("hasSeenOnboarding")) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  return (
    <main className={styles.dashboard}>
      <header className={`glass-panel ${styles.header}`}>
        <BrandLogo />
        <div className={styles.userProfile} style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'nowrap' }}>
          <span>Welcome, {initialUser.name || "Student"} {initialUser.isAdmin && "(Admin)"}</span>
          <ThemeToggle />
          <button 
            onClick={() => setShowOnboarding(true)}
            className="btn-primary" 
            style={{ background: 'var(--text-secondary)' }}
          >
            ℹ️ Help
          </button>
          {initialUser.isAdmin && (
            <Link href="/dashboard/admin" className="btn-primary">
              Admin Portal
            </Link>
          )}
          <form action={logoutUser} style={{ display: 'inline' }}>
            <button type="submit" className={styles.logoutBtn}>Log Out</button>
          </form>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.welcomeSection}>
          <h1 className="animate-fade-in">Your Learning Journey</h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Complete the modules below to build your digital skills portfolio.
          </p>
        </div>

        <div className={styles.moduleGrid}>
          {modules.map((mod: any, index: number) => (
            <div 
              key={mod.id} 
              className={`glass-panel animate-fade-in ${styles.moduleCard} ${mod.status === 'LOCKED' ? styles.locked : ''}`}
              style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}
            >
              <div className={styles.moduleHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getModuleIcon(mod.id)}
                  <span className={styles.moduleNumber}>Module {mod.id}</span>
                </div>
                <span className={`${styles.statusBadge} ${styles[mod.status.toLowerCase()]}`}>
                  {mod.status.replace("_", " ")}
                </span>
              </div>
              <h3 className={styles.moduleTitle}>{mod.title}</h3>
              {mod.status !== "LOCKED" && (
                <Link href={`/dashboard/module/${mod.id}`} className={styles.startBtn}>
                  {mod.status === "COMPLETED" ? "Review Module →" : "Continue Module →"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} />
    </main>
  );
}
