"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useSocialAccounts } from "@/hooks/useSocialAccounts";
import { socialPlatformById } from "@/lib/socialPlatforms";
import styles from "./Dashboard.module.css";

export default function ConnectedAccountsCard() {
  const router = useRouter();
  const { accounts, loading } = useSocialAccounts();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeadRow}>
        <h3 className={styles.cardTitle}>Connected accounts</h3>
      </div>

      {loading ? (
        <p className={styles.accountHandle}>Loading…</p>
      ) : accounts.length === 0 ? (
        <p className={styles.accountHandle}>No accounts connected yet.</p>
      ) : (
        accounts.map((account) => {
          const meta = socialPlatformById(account.platform);
          return (
            <div key={account._id} className={styles.accountRow}>
              <span className={styles.accountBadge} style={{ background: meta.bg, color: meta.color }}>
                {meta.initials}
              </span>
              <div className={styles.accountBody}>
                <div className={styles.accountName}>{meta.label}</div>
                <div className={styles.accountHandle}>{account.username || account.email || "Connect]]ed"}</div>
              </div>
              <span className={styles.accountStatus} />
            </div>
          );
        })
      )}

      <button type="button" className={styles.connectMore} onClick={() => router.push("/accounts")}>
        <Icon name="plus" size={16} strokeWidth={2.2} />
        Connect more
      </button>
    </div>
  );
}
