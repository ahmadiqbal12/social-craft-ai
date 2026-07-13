"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { SETTINGS_TABS } from "@/lib/settingsContent";
import { cx } from "@/lib/utils";
import type { SettingsTabId } from "@/types";
import ApiKeysTab from "./tabs/ApiKeysTab";
import BillingTab from "./tabs/BillingTab";
import NotificationsTab from "./tabs/NotificationsTab";
import ProfileTab from "./tabs/ProfileTab";
import SecurityTab from "./tabs/SecurityTab";
import styles from "./Settings.module.css";

const TAB_COMPONENTS: Record<SettingsTabId, React.ComponentType> = {
  profile: ProfileTab,
  security: SecurityTab,
  notifications: NotificationsTab,
  billing: BillingTab,
  api: ApiKeysTab,
};

export default function SettingsView() {
  const [active, setActive] = useState<SettingsTabId>("profile");
  const ActiveTab = TAB_COMPONENTS[active];

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>Settings</h1>
          <p className={styles.subheading}>Manage your workspace, security and preferences.</p>
        </div>
      </div>

      <div className={styles.body}>
        <nav className={styles.tabsCard}>
          {SETTINGS_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cx(styles.tabButton, active === tab.id && styles.tabButtonActive)}
              onClick={() => setActive(tab.id)}
              aria-current={active === tab.id}
            >
              <Icon name={tab.icon} size={17} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className={styles.contentCard}>
          <ActiveTab />
        </div>
      </div>
    </div>
  );
}
