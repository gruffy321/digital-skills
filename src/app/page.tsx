"use client";

import styles from "./page.module.css";
import { loginUser } from "@/actions/auth";
import { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);
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
        <p className={styles.subtitle}>Welcome to your digital onboarding journey.</p>
        
        {error && <div className={styles.errorBanner}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" className="input-field" placeholder="student@school.com" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="input-field" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            Sign In to Dashboard
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link href="/register" style={{ color: "var(--accent-color)" }}>Need an account? Register here</Link>
        </div>
      </div>
    </main>
  );
}
