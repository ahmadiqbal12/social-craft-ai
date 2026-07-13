"use client";

import Icon from "@/components/common/Icon";
import { platformById } from "@/lib/studioContent";
import type { PlatformSlot } from "@/types";
import VariationCard from "./VariationCard";
import styles from "./Studio.module.css";

interface GeneratedResultsProps {
  slots: PlatformSlot[];
  onTextChange: (platformId: PlatformSlot["platformId"], text: string) => void;
  onRegenerate: (platformId: PlatformSlot["platformId"]) => void;
  onCopy: (platformId: PlatformSlot["platformId"]) => void;
  onSchedule: (platformId: PlatformSlot["platformId"], scheduledAtIso: string) => Promise<void>;
  onClearAll: () => void;
}

export default function GeneratedResults({
  slots,
  onTextChange,
  onRegenerate,
  onCopy,
  onSchedule,
  onClearAll,
}: GeneratedResultsProps) {
  return (
    <div className={styles.resultsSection}>
      <div className={styles.resultsHeadRow}>
        <h2 className={styles.resultsTitle}>Generated variations</h2>
        {slots.length > 0 ? <span className={styles.resultsCount}>{slots.length}</span> : null}
        {slots.length > 0 ? (
          <button type="button" className={styles.clearLink} onClick={onClearAll}>
            Clear all
          </button>
        ) : null}
      </div>

      {slots.length === 0 ? (
        <div className={styles.emptyResults}>
          <div className={styles.emptyResultsIcon}>
            <Icon name="sparkle" size={28} />
          </div>
          <h3 className={styles.emptyResultsTitle}>Nothing generated yet</h3>
          <p className={styles.emptyResultsDesc}>
            Describe your idea above, pick your platforms and tone, then hit{" "}
            <strong>Generate content</strong> — SocialCraft AI will draft and save a caption for every
            channel here.
          </p>
        </div>
      ) : (
        <div className={styles.resultsGrid}>
          {slots.map((slot) => {
            if (slot.status === "pending") {
              return (
                <div key={slot.platformId} className={styles.skeletonCard}>
                  <div className={styles.skeletonRow}>
                    <div className={styles.skeletonAvatar} />
                    <div style={{ flex: 1 }}>
                      <div className={styles.skeletonLine} style={{ width: "40%", marginBottom: 6 }} />
                      <div className={styles.skeletonLine} style={{ width: "25%" }} />
                    </div>
                  </div>
                  <div className={styles.skeletonBlock} />
                  <div className={styles.skeletonLine} style={{ width: "60%" }} />
                </div>
              );
            }

            if (slot.status === "error") {
              const platform = platformById(slot.platformId);
              return (
                <div key={slot.platformId} className={styles.errorCard}>
                  <div className={styles.errorHead}>
                    <span className={styles.errorIcon}>
                      <Icon name="warning" size={16} />
                    </span>
                    <div className={styles.variationPlatformName}>{platform.label}</div>
                  </div>
                  <p className={styles.errorText}>{slot.error ?? "Something went wrong generating this one."}</p>
                  <button
                    type="button"
                    className={`${styles.variationActionBtn} ${styles.errorRetry}`}
                    onClick={() => onRegenerate(slot.platformId)}
                  >
                    <Icon name="refresh" size={14} />
                    Retry
                  </button>
                </div>
              );
            }

            if (!slot.variation) return null;

            return (
              <VariationCard
                key={slot.platformId}
                variation={slot.variation}
                onTextChange={(text) => onTextChange(slot.platformId, text)}
                onRegenerate={() => onRegenerate(slot.platformId)}
                onCopy={() => onCopy(slot.platformId)}
                onSchedule={(iso) => onSchedule(slot.platformId, iso)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
