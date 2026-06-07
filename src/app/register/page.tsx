"use client";

import styles from "../page.module.css";
import Link from "next/link";
import { registerUser } from "@/actions/auth";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <main className={styles.main}>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <ThemeToggle />
      </div>
      <div className={`glass-panel animate-fade-in ${styles.loginCard}`}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <BrandLogo />
        </div>
        <p className={styles.subtitle}>Enter your school access code to register.</p>
        
        {error && <div className={styles.errorBanner}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="accessCode">Access Code</label>
            <input type="text" id="accessCode" name="accessCode" className="input-field" placeholder="e.g., SCH-2026" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" className="input-field" placeholder="John Doe" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">School Email</label>
            <input type="email" id="email" name="email" className="input-field" placeholder="student@school.com" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="input-field" placeholder="••••••••" required minLength={6} />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            Register Account
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link href="/" style={{ color: "var(--accent-color)" }}>Already have an account? Sign In</Link>
        </div>
      </div>
    </main>
  );
}
