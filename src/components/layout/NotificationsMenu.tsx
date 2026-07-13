"use client";

import { useRef } from "react";
import Icon from "@/components/common/Icon";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeMenus, toggleNotifications } from "@/store/slices/uiSlice";
import styles from "./Header.module.css";

const NOTIFICATIONS = [
  {
    id: "1",
    icon: "check" as const,
    bg: "rgba(16,185,129,.14)",
    color: "#10B981",
    text: "Your LinkedIn post was published successfully.",
    time: "1h ago",
  },
  {
    id: "2",
    icon: "sparkle" as const,
    bg: "var(--primary-tint)",
    color: "var(--primary)",
    text: "3 new AI caption variations are ready to review.",
    time: "3h ago",
  },
  {
    id: "3",
    icon: "external" as const,
    bg: "rgba(245,158,11,.16)",
    color: "#F59E0B",
    text: "Your Instagram reach is up 18% this week.",
    time: "Yesterday",
  },
];

export default function NotificationsMenu() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.notificationsOpen);
  const { show } = useToast();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => dispatch(closeMenus()), open);

  return (
    <div className={styles.menuAnchor} ref={ref}>
      <button
        type="button"
        title="Notifications"
        className={styles.iconButton}
        onClick={() => dispatch(toggleNotifications())}
      >
        <Icon name="bell" size={18} />
        <span className={styles.dot} />
      </button>

      {open ? (
        <div className={styles.menu}>
          <div className={styles.menuHeaderRow}>
            <span className={styles.menuTitle}>Notifications</span>
            <button
              type="button"
              className={styles.menuAction}
              onClick={() => {
                dispatch(closeMenus());
                show("All notifications marked read");
              }}
            >
              Mark all read
            </button>
          </div>
          {NOTIFICATIONS.map((item) => (
            <div key={item.id} className={styles.notifRow}>
              <span className={styles.notifIcon} style={{ background: item.bg, color: item.color }}>
                <Icon name={item.icon} size={16} strokeWidth={2.2} />
              </span>
              <div className={styles.notifBody}>
                <div className={styles.notifText}>{item.text}</div>
                <div className={styles.notifTime}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
