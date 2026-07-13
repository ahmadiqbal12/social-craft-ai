"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { useAuth } from "@/hooks/useAuth";
import { register } from "@/store/slices/authSlice";
import styles from "./Auth.module.css";

export default function RegisterForm() {
  const { signUp, isLoading, error } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setProfileImage(event.target.files?.[0] ?? null);
    setFileError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profileImage) {
      setFileError("A profile image is required to create an account.");
      return;
    }
    const result = await signUp({ name, email, password, profileImage });
    if (register.fulfilled.match(result)) {
      router.push("/login");
    }
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

        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Start planning content across every channel.</p>

        {error ? <div className={styles.error}>{error}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              className={styles.input}
              placeholder="Alex Kim"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={6}
              className={styles.input}
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="profileImage">
              Profile photo
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              required
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            {fileError ? <p className={styles.hint} style={{ color: "var(--error)" }}>{fileError}</p> : null}
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? <span className={styles.spinner} /> : null}
            {isLoading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" className={styles.footerLink}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
