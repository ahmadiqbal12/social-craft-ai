"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { PLACEHOLDER_CONTENT } from "@/lib/constants";
import styles from "./Placeholder.module.css";

interface PlaceholderScreenProps {
  screenId: keyof typeof PLACEHOLDER_CONTENT;
}

export default function PlaceholderScreen({ screenId }: PlaceholderScreenProps) {
  const content = PLACEHOLDER_CONTENT[screenId];
  const router = useRouter();
  const { show } = useToast();

  function handleAction() {
    show(`${content.action} — coming soon`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>{content.title}</h1>
          <p className={styles.subheading}>{content.desc}</p>
        </div>
        <button type="button" className={styles.actionButton} onClick={handleAction}>
          <Icon name="plus" size={17} strokeWidth={2.2} />
          {content.action}
        </button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <Icon name={content.icon} size={32} />
        </div>
        <h2 className={styles.emptyTitle}>{content.emptyTitle}</h2>
        <p className={styles.emptyDesc}>{content.emptyDesc}</p>
        <div className={styles.emptyActions}>
          <button type="button" className={styles.ghostButton} onClick={() => router.push("/dashboard")}>
            Back to dashboard
          </button>
          <button type="button" className={styles.actionButton} onClick={handleAction}>
            {content.action}
          </button>
        </div>
      </div>
    </div>
  );
}
