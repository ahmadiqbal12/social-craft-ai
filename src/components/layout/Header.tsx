"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";
import NotificationsMenu from "./NotificationsMenu";
import UserMenu from "./UserMenu";
import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { show } = useToast();

  function openCreate() {
    show("Opening Content Studio…");
    router.push("/studio");
  }

  return (
    <header className={styles.header}>
      <button
        type="button"
        title="Toggle sidebar"
        className={styles.iconButton}
        onClick={() => dispatch(toggleSidebar())}
      >
        <Icon name="sidebar" size={18} />
      </button>

      <div className={styles.search}>
        <span className={styles.searchIcon}>
          <Icon name="search" size={16} />
        </span>
        <input type="text" placeholder="Search posts, drafts, analytics…" className={styles.searchInput} />
        <span className={styles.searchKbd}>⌘K</span>
      </div>

      <div className={styles.spacer} />

      <button type="button" className={styles.createButton} onClick={openCreate}>
        <Icon name="plus" size={17} strokeWidth={2.2} />
        <span>Create</span>
      </button>

      <NotificationsMenu />

      <button
        type="button"
        title="Toggle theme"
        className={styles.iconButton}
        onClick={toggleTheme}
      >
        <Icon name={theme === "light" ? "moon" : "sun"} size={18} />
      </button>

      <UserMenu />
    </header>
  );
}
