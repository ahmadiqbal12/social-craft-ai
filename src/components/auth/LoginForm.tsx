"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Auth.module.css";

export default function LoginForm() {
  const { signIn, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn({ email, password });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.mark}>
            <Icon name="sparkle" size={19} strokeWidth={0} />
          </span>
          <span className={styles.brandText}>
            SocialCraft <span>AI</span>
          </span>
        </div>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to manage your content studio.</p>

        {error ? <div className={styles.error}>{error}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? <span className={styles.spinner} /> : null}
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.footerLink}>
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
