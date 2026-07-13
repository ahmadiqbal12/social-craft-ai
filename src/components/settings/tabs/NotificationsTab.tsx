"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { DEFAULT_NOTIFICATION_PREFS } from "@/lib/settingsContent";
import type { NotificationPref } from "@/types";
import Switch from "../Switch";
import styles from "../Settings.module.css";

export default function NotificationsTab() {
  const { show } = useToast();
  const [prefs, setPrefs] = useState<NotificationPref[]>(DEFAULT_NOTIFICATION_PREFS);

  function toggle(id: string, enabled: boolean) {
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, enabled } : p)));
  }

  function handleSave() {
    show("Notification preferences saved");
  }

  return (
    <div>
      <h2 className={styles.sectionTitle}>Notifications</h2>
      <p className={styles.sectionDesc}>Choose what you want to hear about, and how.</p>
      <div className={styles.demoNote}>
        <Icon name="warning" size={14} />
        Demo only — there&apos;s no notifications backend yet, so these preferences reset on reload.
      </div>

      {prefs.map((pref) => (
        <div key={pref.id} className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>{pref.label}</div>
            <div className={styles.toggleDesc}>{pref.desc}</div>
          </div>
          <Switch checked={pref.enabled} onChange={(v) => toggle(pref.id, v)} label={pref.label} />
        </div>
      ))}

      <div className={styles.formFooter}>
        <button type="button" className={styles.primaryButton} onClick={handleSave}>
          Save preferences
        </button>
      </div>
    </div>
  );
}
