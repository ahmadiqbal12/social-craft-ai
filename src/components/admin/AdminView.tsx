"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { ADMIN_STATS } from "@/lib/adminContent";
import ModerationQueue from "./ModerationQueue";
import PlatformHealth from "./PlatformHealth";
import UsersTable from "./UsersTable";
import styles from "./Admin.module.css";

export default function AdminView() {
  const { show } = useToast();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>Admin</h1>
          <p className={styles.subheading}>Users, moderation and platform-wide health.</p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={() => show("Invite flow is coming soon")}>
          <Icon name="plus" size={17} strokeWidth={2.2} />
          Invite user
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTopRow}>
            <span className={styles.statIcon} style={{ background: "var(--primary-tint)", color: "var(--primary)" }}>
              <Icon name="accounts" size={19} />
            </span>
            <span className={styles.statMeta}>Live</span>
          </div>
          <div className={styles.statValue}>{totalUsers ?? "—"}</div>
          <div className={styles.statLabel}>Total users</div>
        </div>
        {ADMIN_STATS.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.statTopRow}>
              <span className={styles.statIcon} style={{ background: stat.iconBg, color: stat.iconColor }}>
                <Icon name={stat.icon} size={19} />
              </span>
              <span className={styles.statMeta}>{stat.meta}</span>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.colMain}>
          <UsersTable onTotalChange={setTotalUsers} />
        </div>
        <div className={styles.colSide}>
          <ModerationQueue />
          <PlatformHealth />
        </div>
      </div>
    </div>
  );
}
