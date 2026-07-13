"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { BOTTOM_NAV, MAIN_NAV } from "@/lib/constants";
import { cx } from "@/lib/utils";
import type { NavItem } from "@/types";
import styles from "./Sidebar.module.css";

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      title={item.label}
      className={cx(styles.navItem, active && styles.navItemActive)}
    >
      <span className={styles.navIcon}>
        <Icon name={item.icon} size={19} />
      </span>
      <span className={styles.navLabel}>{item.label}</span>
      {item.badge ? <span className={styles.navBadge}>{item.badge}</span> : null}
    </Link>
  );
}

export default function Sidebar() {
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const pathname = usePathname();
  const { show } = useToast();
  const { user } = useAuth();
  const bottomNav = BOTTOM_NAV.filter((item) => item.id !== "admin" || user?.role === "admin");

  return (
    <aside className={cx(styles.sidebar, collapsed && styles.collapsed)}>
      <div className={styles.brandRow}>
        <span className={styles.mark}>
          <Icon name="sparkle" size={19} strokeWidth={0} />
        </span>
        <div className={styles.brandLabel}>
          <div className={styles.brandName}>
            SocialCraft <span>AI</span>
          </div>
          <div className={styles.brandSub}>Content studio</div>
        </div>
      </div>

      <nav className={cx(styles.nav, "scScroll")}>
        <div className={styles.sectionLabel}>MENU</div>
        {MAIN_NAV.map((item) => (
          <NavLink key={item.id} item={item} active={pathname?.startsWith(item.href) ?? false} />
        ))}

        <div className={styles.divider} />
        <div className={styles.sectionLabel}>WORKSPACE</div>
        {bottomNav.map((item) => (
          <NavLink key={item.id} item={item} active={pathname?.startsWith(item.href) ?? false} />
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.upgrade}>
          <div className={styles.upgradeGlow} />
          <div className={styles.upgradeTitle}>Upgrade to Pro</div>
          <div className={styles.upgradeDesc}>Unlimited AI generations &amp; all channels.</div>
          <button
            type="button"
            className={styles.upgradeButton}
            onClick={() => show("Upgrade flow coming soon")}
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
