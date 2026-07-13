"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import styles from "./Dashboard.module.css";
import StatsGrid from "./StatsGrid";
import PerformanceChart from "./PerformanceChart";
import RecentActivity from "./RecentActivity";
import CreateWithAiCard from "./CreateWithAiCard";
import UpcomingPostsCard from "./UpcomingPosts";
import ConnectedAccountsCard from "./ConnectedAccounts";

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardView() {
  const { user } = useAuth();
  const router = useRouter();
  const { show } = useToast();
  const now = new Date();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <div className={styles.eyebrow}>
            {now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <h1 className={styles.heading}>
            {greeting(now.getHours())}, {firstName}
          </h1>
          <p className={styles.subheading}>Here&apos;s what&apos;s happening across your channels today.</p>
        </div>
        <div className={styles.headActions}>
          <button type="button" className={styles.secondaryButton} onClick={() => show("Range picker coming soon")}>
            <Icon name="calendar" size={16} />
            This week
            <Icon name="chevronDown" size={15} />
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => {
              show("Opening Content Studio…");
              router.push("/studio");
            }}
          >
            <Icon name="plus" size={17} strokeWidth={2.2} />
            Create content
          </button>
        </div>
      </div>

      <StatsGrid />

      <div className={styles.body}>
        <div className={styles.colMain}>
          <PerformanceChart />
          <RecentActivity />
        </div>
        <div className={styles.colSide}>
          <CreateWithAiCard />
          <UpcomingPostsCard />
          <ConnectedAccountsCard />
        </div>
      </div>
    </div>
  );
}
