"use client";

import { useRef, useState } from "react";
import Icon from "@/components/common/Icon";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { authApi } from "@/lib/api/authApi";
import { ApiRequestError } from "@/lib/apiClient";
import { getInitials } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import styles from "../Settings.module.css";

export default function ProfileTab() {
  const { user } = useAuth();
  const { show } = useToast();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [company, setCompany] = useState("SocialCraft AI");
  const [timezone, setTimezone] = useState("UTC+05:00 — Karachi");
  const [bio, setBio] = useState("Building on-brand content across every channel, faster.");
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { user: updated } = await authApi.updateAccount({ name: name.trim(), email: email.trim() });
      dispatch(setUser(updated));
      show("Profile updated");
    } catch (err) {
      show(err instanceof ApiRequestError ? err.message : "Couldn't update your profile");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    show("Changes discarded");
  }

  async function handlePhotoSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const updated = await authApi.updateProfileImage(file);
      dispatch(setUser(updated));
      show("Profile photo updated");
    } catch (err) {
      show(err instanceof ApiRequestError ? err.message : "Couldn't upload that photo");
    } finally {
      setUploadingPhoto(false);
    }
  }

  const initials = getInitials(name || "there");

  return (
    <form onSubmit={handleSave}>
      <h2 className={styles.sectionTitle}>Profile</h2>
      <p className={styles.sectionDesc}>This information is shown across your workspace and to teammates.</p>

      <div className={styles.avatarRow}>
        <span className={styles.avatarPreview}>
          {user?.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.profileImage} alt={name} />
          ) : (
            initials
          )}
        </span>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoSelected}
          />
          <button
            type="button"
            className={styles.ghostButton}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
          >
            {uploadingPhoto ? <span className={styles.spinnerDark} /> : <Icon name="image" size={16} />}
            {uploadingPhoto ? "Uploading…" : "Change photo"}
          </button>
          {user?.role ? <div className={styles.roleBadge}>{user.role}</div> : null}
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="settings-name">
            Full name
          </label>
          <input
            id="settings-name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="settings-email">
            Email address
          </label>
          <input
            id="settings-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="settings-company">
            Company
          </label>
          <input
            id="settings-company"
            className={styles.input}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="settings-timezone">
            Timezone
          </label>
          <select
            id="settings-timezone"
            className={styles.select}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option>UTC+05:00 — Karachi</option>
            <option>UTC+00:00 — London</option>
            <option>UTC-05:00 — New York</option>
            <option>UTC-08:00 — Los Angeles</option>
            <option>UTC+01:00 — Berlin</option>
          </select>
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.label} htmlFor="settings-bio">
            Bio
          </label>
          <textarea
            id="settings-bio"
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
          />
          <p className={styles.hint}>
            {bio.length}/200 — company, timezone and bio aren&apos;t saved by the API yet, only your name and
            photo are synced.
          </p>
        </div>
      </div>

      <div className={styles.formFooter}>
        <button type="button" className={styles.ghostButton} onClick={handleCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className={styles.primaryButton} disabled={saving}>
          {saving ? <span className={styles.spinner} /> : null}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
