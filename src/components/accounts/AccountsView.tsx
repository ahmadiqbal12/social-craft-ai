"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { useSocialAccounts } from "@/hooks/useSocialAccounts";
import { socialApi } from "@/lib/api/socialApi";
import { socialPlatformById, SOCIAL_CONNECT_PLATFORMS } from "@/lib/socialPlatforms";
import type { SocialPlatformId } from "@/types";
import styles from "./Accounts.module.css";

export default function AccountsView() {
  const { accounts, loading, error, refetch, disconnect } = useSocialAccounts();
  const { show } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [disconnectingId, setDisconnectingId] = useState<SocialPlatformId | null>(null);
  const handledParams = useRef(false);

  useEffect(() => {
    if (handledParams.current) return;
    const connected = searchParams.get("connected");
    const oauthError = searchParams.get("error");
    if (connected) {
      handledParams.current = true;
      show(`${socialPlatformById(connected as SocialPlatformId).label} connected successfully`);
      refetch();
      router.replace("/accounts");
    } else if (oauthError) {
      handledParams.current = true;
      show("That connection didn't go through — please try again");
      router.replace("/accounts");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleDisconnect(platform: SocialPlatformId) {
    setDisconnectingId(platform);
    try {
      await disconnect(platform);
      show(`${socialPlatformById(platform).label} disconnected`);
    } catch {
      show("Couldn't disconnect that account");
    } finally {
      setDisconnectingId(null);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>Social Accounts</h1>
          <p className={styles.subheading}>Connect and manage your channels in one place.</p>
        </div>
      </div>

      <div className={styles.note}>
        <Icon name="warning" size={14} />
        Only Google sign-in is fully configured on the backend right now — Facebook, Instagram and LinkedIn
        need OAuth app credentials added there before connecting will work end to end.
      </div>

      {error ? (
        <div className={styles.emptyState}>{error}</div>
      ) : (
        <div className={styles.grid}>
          {SOCIAL_CONNECT_PLATFORMS.map((platform) => {
            const account = accounts.find((a) => a.platform === platform.id);
            const isConnected = Boolean(account);
            const isDisconnecting = disconnectingId === platform.id;

            return (
              <div key={platform.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.badge} style={{ background: platform.bg, color: platform.color }}>
                    {platform.initials}
                  </span>
                  <div>
                    <div className={styles.platformName}>{platform.label}</div>
                    <div className={styles.statusRow}>
                      <span className={`${styles.statusDot} ${isConnected ? styles.statusDotConnected : ""}`} />
                      <span className={styles.statusText}>{loading ? "Checking…" : isConnected ? "Connected" : "Not connected"}</span>
                    </div>
                  </div>
                </div>

                {isConnected && account ? (
                  <>
                    <div className={styles.accountDetail}>{account.username || account.email || "Connected account"}</div>
                    <button
                      type="button"
                      className={styles.disconnectButton}
                      onClick={() => handleDisconnect(platform.id)}
                      disabled={isDisconnecting}
                    >
                      {isDisconnecting ? <span className={styles.spinner} /> : "Disconnect"}
                    </button>
                  </>
                ) : (
                  <a className={styles.connectLink} href={socialApi.connectUrl(platform.id)}>
                    <Icon name="plus" size={15} strokeWidth={2.2} />
                    Connect
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
