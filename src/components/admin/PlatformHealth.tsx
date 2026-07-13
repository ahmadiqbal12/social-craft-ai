import { PLATFORM_HEALTH } from "@/lib/adminContent";
import { cx } from "@/lib/utils";
import styles from "./Admin.module.css";

export default function PlatformHealth() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeadRow}>
        <div>
          <h3 className={styles.cardTitle}>Platform health</h3>
          <p className={styles.cardSubtitle}>System status at a glance (demo data).</p>
        </div>
      </div>

      {PLATFORM_HEALTH.map((metric) => (
        <div key={metric.id} className={styles.healthRow}>
          <span className={cx(styles.healthDot, metric.tone === "warn" && styles.healthDotWarn)} />
          <div className={styles.healthBody}>
            <div className={styles.healthLabel}>{metric.label}</div>
            <div className={styles.healthDetail}>{metric.detail}</div>
          </div>
          <span className={styles.healthValue}>{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
