"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useAuth } from "@/hooks/useAuth";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeMenus, toggleUserMenu } from "@/store/slices/uiSlice";
import { cx, getInitials } from "@/lib/utils";
import styles from "./Header.module.css";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const open = useAppSelector((state) => state.ui.userMenuOpen);
  const { user, signOut } = useAuth();
  const { show } = useToast();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => dispatch(closeMenus()), open);

  if (!user) return null;
  const initials = getInitials(user.name);

  function goSettings() {
    dispatch(closeMenus());
    router.push("/settings");
  }

  return (
    <div className={styles.menuAnchor} ref={ref}>
      <button type="button" className={styles.userTrigger} onClick={() => dispatch(toggleUserMenu())}>
        <span className={styles.avatar}>
          {user.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.profileImage} alt={user.name} />
          ) : (
            initials
          )}
        </span>
        <Icon name="chevronDown" size={15} />
      </button>

      {open ? (
        <div className={cx(styles.menu, styles.menuNarrow)}>
          <div className={styles.userSummary}>
            <span className={cx(styles.avatar, styles.avatarLarge)}>
              {user.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.profileImage} alt={user.name} />
              ) : (
                initials
              )}
            </span>
            <div>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          </div>

          <button type="button" className={styles.menuItem} onClick={goSettings}>
            <Icon name="user" size={17} />
            Profile
          </button>
          <button type="button" className={styles.menuItem} onClick={goSettings}>
            <Icon name="gear" size={17} />
            Settings
          </button>
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              dispatch(closeMenus());
              show("Billing & usage — coming soon");
            }}
          >
            <Icon name="card" size={17} />
            Billing &amp; usage
          </button>

          <div className={styles.menuDivider} />

          <button
            type="button"
            className={cx(styles.menuItem, styles.menuItemDanger)}
            onClick={() => {
              dispatch(closeMenus());
              signOut();
            }}
          >
            <Icon name="logout" size={17} />
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
