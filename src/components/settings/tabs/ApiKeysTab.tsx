"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { DEFAULT_API_KEYS, maskKey } from "@/lib/settingsContent";
import type { ApiKeyItem } from "@/types";
import styles from "../Settings.module.css";

function randomKeyValue(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < 24; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `sk_live_${out}`;
}

export default function ApiKeysTab() {
  const { show } = useToast();
  const [keys, setKeys] = useState<ApiKeyItem[]>(DEFAULT_API_KEYS);
  const [revealedId, setRevealedId] = useState<string | null>(null);

  function generateKey() {
    const key: ApiKeyItem = {
      id: `${Date.now()}`,
      label: "New API key",
      createdAt: "Just now",
      lastUsed: "Never",
      value: randomKeyValue(),
    };
    setKeys((prev) => [key, ...prev]);
    setRevealedId(key.id);
    show("New key generated — copy it now, it won't be shown again");
  }

  async function copyKey(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      show("API key copied to clipboard");
    } catch {
      show("Couldn't copy automatically — select the text manually");
    }
  }

  function revokeKey(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    show("API key revoked");
  }

  return (
    <div>
      <div className={styles.demoNote}>
        <Icon name="warning" size={14} />
        Demo only — the backend doesn&apos;t expose an API-key system yet, so these aren&apos;t real credentials.
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <h2 className={styles.sectionTitle}>API keys</h2>
          <p className={styles.sectionDesc}>Use these to authenticate requests to the SocialCraft AI API.</p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={generateKey} style={{ flexShrink: 0 }}>
          <Icon name="plus" size={16} strokeWidth={2.2} />
          Generate new key
        </button>
      </div>

      {keys.map((key) => {
        const isNew = revealedId === key.id;
        return (
          <div key={key.id} className={`${styles.apiKeyRow} ${isNew ? styles.apiKeyRowNew : ""}`}>
            <span className={styles.apiKeyIcon}>
              <Icon name="key" size={18} />
            </span>
            <div className={styles.apiKeyBody}>
              <div className={styles.apiKeyLabel}>{key.label}</div>
              <div className={styles.apiKeyValue}>{isNew ? key.value : maskKey(key.value)}</div>
              <div className={styles.apiKeyMeta}>
                Created {key.createdAt} · Last used {key.lastUsed}
              </div>
            </div>
            <div className={styles.apiKeyActions}>
              <button type="button" className={styles.iconGhostButton} onClick={() => copyKey(key.value)}>
                <Icon name="copy" size={14} />
                Copy
              </button>
              <button
                type="button"
                className={`${styles.iconGhostButton} ${styles.dangerButton}`}
                onClick={() => revokeKey(key.id)}
              >
                <Icon name="trash" size={14} />
                Revoke
              </button>
            </div>
          </div>
        );
      })}

      {keys.length === 0 ? <p className={styles.sectionDesc}>No API keys yet — generate one to get started.</p> : null}
    </div>
  );
}
