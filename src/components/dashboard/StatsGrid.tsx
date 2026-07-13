import Icon from "@/components/common/Icon";
import { STAT_CARDS } from "@/lib/constants";
import { cx } from "@/lib/utils";
import styles from "./Dashboard.module.css";

export default function StatsGrid() {
  return (
    <div className={styles.statsGrid}>
      {STAT_CARDS.map((stat, index) => (
        <div key={stat.id} className={styles.statCard} style={{ animationDelay: `${index * 0.05}s` }}>
          <div className={styles.statTopRow}>
            <span className={styles.statIcon} style={{ background: stat.iconBg, color: stat.iconColor }}>
              <Icon name={stat.icon} size={19} />
            </span>
            {stat.trend ? (
              <span className={cx(styles.statTrend, !stat.trend.positive && styles.statTrendNegative)}>
                <Icon name="external" size={12} strokeWidth={2.5} />
                {stat.trend.label}
              </span>
            ) : (
              <span className={styles.statMeta}>{stat.meta}</span>
            )}
          </div>
          <div className={styles.statValue}>{stat.value}</div>
          <div className={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
