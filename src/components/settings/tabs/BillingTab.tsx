"use client";

import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { BILLING_HISTORY, USAGE_METRICS } from "@/lib/settingsContent";
import { cx } from "@/lib/utils";
import styles from "../Settings.module.css";

export default function BillingTab() {
  const { show } = useToast();

  return (
    <div>
      <h2 className={styles.sectionTitle}>Billing</h2>
      <p className={styles.sectionDesc}>Manage your plan, usage and payment details.</p>
      <div className={styles.demoNote}>
        <Icon name="warning" size={14} />
        Demo only — there&apos;s no billing backend yet, so plan, usage and payment data below are illustrative.
      </div>

      <div className={styles.planCard}>
        <div className={styles.planGlow} />
        <div style={{ position: "relative" }}>
          <div className={styles.planName}>Current plan</div>
          <div className={styles.planPrice}>
            Pro <span>· $29/month</span>
          </div>
        </div>
        <button type="button" className={styles.planButton} onClick={() => show("Plan management is coming soon")}>
          Manage subscription
        </button>
      </div>

      <div className={styles.usageList}>
        {USAGE_METRICS.map((metric) => {
          const pct = Math.min(100, Math.round((metric.used / metric.total) * 100));
          const warn = pct >= 85;
          return (
            <div key={metric.id}>
              <div className={styles.usageHead}>
                <span className={styles.usageLabel}>{metric.label}</span>
                <span className={styles.usageValue}>
                  {metric.used} / {metric.total}
                </span>
              </div>
              <div className={styles.usageBar}>
                <div
                  className={cx(styles.usageBarFill, warn && styles.usageBarFillWarn)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.divider} />

      <h2 className={styles.sectionTitle}>Payment method</h2>
      <div className={styles.paymentRow}>
        <span className={styles.paymentIcon}>
          <Icon name="card" size={18} />
        </span>
        <div className={styles.paymentBody}>
          Visa ending in 4242
          <div className={styles.paymentMeta}>Expires 08/28</div>
        </div>
        <button
          type="button"
          className={`${styles.ghostButton} ${styles.ghostButtonSmall}`}
          onClick={() => show("Payment method update is coming soon")}
        >
          Update
        </button>
      </div>

      <div className={styles.divider} />

      <h2 className={styles.sectionTitle}>Billing history</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {BILLING_HISTORY.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.desc}</td>
              <td>{row.amount}</td>
              <td>
                <span className={styles.statusPaid}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
