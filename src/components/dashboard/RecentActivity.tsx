"use client";

import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { RECENT_ACTIVITY } from "@/lib/constants";
import styles from "./Dashboard.module.css";

export default function RecentActivity() {
  const { show } = useToast();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeadRow}>
        <h3 className={styles.cardTitle}>Recent activity</h3>
        <button type="button" className={styles.cardLink} onClick={() => show("Loading full activity…")}>
          View all
        </button>
      </div>

      {RECENT_ACTIVITY.map((item) => (
        <div key={item.id} className={styles.activityRow}>
          <span className={styles.activityIcon} style={{ background: item.iconBg, color: item.iconColor }}>
            <Icon name={item.icon} size={17} />
          </span>
          <div className={styles.activityBody}>
            <div className={styles.activityText}>
              {item.text ? `${item.text} ` : ""}
              <strong style={{ fontWeight: 600 }}>{item.highlight}</strong>
            </div>
          </div>
          <span className={styles.activityTime}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}
