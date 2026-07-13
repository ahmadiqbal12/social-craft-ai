"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { MODERATION_QUEUE } from "@/lib/adminContent";
import { cx } from "@/lib/utils";
import type { ModerationItem } from "@/types";
import styles from "./Admin.module.css";

export default function ModerationQueue() {
  const { show } = useToast();
  const [items, setItems] = useState<ModerationItem[]>(MODERATION_QUEUE);

  function resolve(id: string, action: "approved" | "removed") {
    setItems((prev) => prev.filter((i) => i.id !== id));
    show(action === "approved" ? "Post approved" : "Post removed");
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeadRow}>
        <div>
          <h3 className={styles.cardTitle}>Moderation queue</h3>
          <p className={styles.cardSubtitle}>Flagged content awaiting review (demo data).</p>
        </div>
        {items.length > 0 ? <span className={styles.countBadge}>{items.length}</span> : null}
      </div>

      {items.length === 0 ? (
        <div className={styles.moderationEmpty}>Queue is clear — nothing to review.</div>
      ) : (
        items.map((item) => (
          <div key={item.id} className={styles.moderationItem}>
            <div className={styles.moderationHead}>
              <span className={styles.platformDot} style={{ background: item.platformColor }} />
              <span className={styles.moderationAuthor}>{item.author}</span>
              <span className={styles.moderationTime}>{item.reportedAt}</span>
            </div>
            <p className={styles.moderationSnippet}>&ldquo;{item.snippet}&rdquo;</p>
            <div className={styles.moderationReason}>
              <Icon name="flag" size={12} />
              {item.reason}
            </div>
            <div className={styles.moderationActions}>
              <button
                type="button"
                className={cx(styles.iconGhostButton, styles.approveButton)}
                onClick={() => resolve(item.id, "approved")}
              >
                <Icon name="check" size={13} />
                Approve
              </button>
              <button
                type="button"
                className={cx(styles.iconGhostButton, styles.dangerButton)}
                onClick={() => resolve(item.id, "removed")}
              >
                <Icon name="trash" size={13} />
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
