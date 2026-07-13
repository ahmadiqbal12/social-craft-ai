"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { authApi } from "@/lib/api/authApi";
import { ApiRequestError } from "@/lib/apiClient";
import { DEFAULT_SESSIONS } from "@/lib/settingsContent";
import type { SessionItem } from "@/types";
import Switch from "../Switch";
import styles from "../Settings.module.css";

export default function SecurityTab() {
  const { show } = useToast();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState<SessionItem[]>(DEFAULT_SESSIONS);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPw || !newPw || !confirmPw) {
      show("Fill in all password fields");
      return;
    }
    if (newPw !== confirmPw) {
      show("New passwords don't match");
      return;
    }
    if (newPw.length < 6) {
      show("New password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      await authApi.changePassword({ oldPassword: currentPw, newPassword: newPw });
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      show("Password updated");
    } catch (err) {
      show(err instanceof ApiRequestError ? err.message : "Couldn't update your password");
    } finally {
      setSaving(false);
    }
  }

  function signOutSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    show("Session signed out");
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <h2 className={styles.sectionTitle}>Password</h2>
        <p className={styles.sectionDesc}>Use a strong password you don&apos;t reuse elsewhere.</p>

        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor="current-pw">
              Current password
            </label>
            <input
              id="current-pw"
              type="password"
              className={styles.input}
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="new-pw">
              New password
            </label>
            <input
              id="new-pw"
              type="password"
              className={styles.input}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirm-pw">
              Confirm new password
            </label>
            <input
              id="confirm-pw"
              type="password"
              className={styles.input}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className={styles.formFooter}>
          <button type="submit" className={styles.primaryButton} disabled={saving}>
            {saving ? <span className={styles.spinner} /> : null}
            {saving ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>

      <div className={styles.divider} />

      <h2 className={styles.sectionTitle}>Two-factor authentication</h2>
      <p className={styles.sectionDesc}>Add an extra layer of security to your account.</p>
      <div className={styles.demoNote}>
        <Icon name="warning" size={14} />
        Demo only — the backend doesn&apos;t support 2FA or session tracking yet, so this section isn&apos;t
        persisted.
      </div>
      <div className={styles.toggleRow} style={{ borderBottom: "none", paddingTop: 0 }}>
        <div>
          <div className={styles.toggleLabel}>Require a code at sign-in</div>
          <div className={styles.toggleDesc}>
            {twoFactor ? "Enabled — you'll be asked for a code from your authenticator app." : "Currently disabled."}
          </div>
        </div>
        <Switch
          checked={twoFactor}
          onChange={(v) => {
            setTwoFactor(v);
            show(v ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
          }}
          label="Two-factor authentication"
        />
      </div>

      <div className={styles.divider} />

      <h2 className={styles.sectionTitle}>Active sessions</h2>
      <p className={styles.sectionDesc}>Devices currently signed in to your account.</p>
      {sessions.map((session) => (
        <div key={session.id} className={styles.sessionRow}>
          <span className={styles.sessionIcon}>
            <Icon name="clock" size={17} />
          </span>
          <div className={styles.sessionBody}>
            <div className={styles.sessionDevice}>{session.device}</div>
            <div className={styles.sessionMeta}>
              {session.location} · {session.lastActive}
            </div>
          </div>
          {session.current ? (
            <span className={styles.currentBadge}>This device</span>
          ) : (
            <button
              type="button"
              className={`${styles.ghostButton} ${styles.ghostButtonSmall}`}
              onClick={() => signOutSession(session.id)}
            >
              Sign out
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
