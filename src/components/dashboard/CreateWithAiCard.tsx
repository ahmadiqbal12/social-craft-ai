"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import styles from "./Dashboard.module.css";

export default function CreateWithAiCard() {
  const router = useRouter();
  const { show } = useToast();

  function openStudio() {
    show("Opening Content Studio…");
    router.push("/studio");
  }

  return (
    <div className={styles.aiCard}>
      <div className={styles.aiGlowTop} />
      <div className={styles.aiGlowBottom} />
      <span className={styles.aiIcon}>
        <Icon name="sparkle" size={21} />
      </span>
      <h3 className={styles.aiTitle}>Create with AI</h3>
      <p className={styles.aiDesc}>
        Turn a single idea into a week of on-brand posts, captions and visuals.
      </p>
      <button type="button" className={styles.aiButton} onClick={openStudio}>
        Open Content Studio
        <Icon name="external" size={16} />
      </button>
    </div>
  );
}
