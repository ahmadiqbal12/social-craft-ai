"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { platformById } from "@/lib/studioContent";
import { cx } from "@/lib/utils";
import type { GeneratedVariation } from "@/types";
import styles from "./Studio.module.css";

/** yyyy-MM-ddThh:mm in the browser's local time, suitable for <input type="datetime-local" min>. */
function nowLocalInputValue(): string {
  const d = new Date(Date.now() + 5 * 60 * 1000); // at least 5 minutes out
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface VariationCardProps {
  variation: GeneratedVariation;
  onTextChange: (text: string) => void;
  onRegenerate: () => void;
  onCopy: () => void;
  onSchedule: (scheduledAtIso: string) => Promise<void>;
}

export default function VariationCard({
  variation,
  onTextChange,
  onRegenerate,
  onCopy,
  onSchedule,
}: VariationCardProps) {
  const platform = platformById(variation.platformId);
  const over = variation.text.length > platform.maxChars;
  const [isScheduling, setIsScheduling] = useState(false);
  const [when, setWhen] = useState(nowLocalInputValue());
  const [submitting, setSubmitting] = useState(false);

  const isScheduled = Boolean(variation.scheduledAt);

  async function confirmSchedule() {
    if (!when) return;
    setSubmitting(true);
    try {
      await onSchedule(new Date(when).toISOString());
      setIsScheduling(false);
    } catch {
      // StudioView already surfaced a toast — keep the popover open so the user can retry.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.variationCard}>
      <div className={styles.variationHead}>
        <span className={styles.variationBadge} style={{ background: platform.bg, color: platform.color }}>
          {platform.initials}
        </span>
        <div>
          <div className={styles.variationPlatformName}>{platform.label}</div>
          <div className={styles.variationToneTag}>{variation.tone} tone</div>
        </div>
        {isScheduled ? (
          <span className={styles.scheduledBadge}>
            <Icon name="clock" size={12} />
            {new Date(variation.scheduledAt as string).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        ) : (
          <span className={cx(styles.variationMeta, over && styles.variationMetaOver)}>
            {variation.text.length}/{platform.maxChars}
          </span>
        )}
      </div>

      <textarea
        className={styles.variationTextarea}
        value={variation.text}
        disabled={isScheduled}
        onChange={(e) => onTextChange(e.target.value)}
      />

      {variation.hashtags.length > 0 ? (
        <div className={styles.hashtagsRow}>
          {variation.hashtags.map((tag) => (
            <span key={tag} className={styles.hashtagPill}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {isScheduling ? (
        <div className={styles.schedulePopover}>
          <input
            type="datetime-local"
            className={styles.scheduleInput}
            value={when}
            min={nowLocalInputValue()}
            onChange={(e) => setWhen(e.target.value)}
          />
          <button
            type="button"
            className={cx(styles.variationActionBtn, styles.variationActionPrimary)}
            onClick={confirmSchedule}
            disabled={submitting}
          >
            {submitting ? <span className={styles.spinner} style={{ borderTopColor: "#fff" }} /> : <Icon name="check" size={13} />}
            Confirm
          </button>
          <button type="button" className={styles.variationActionBtn} onClick={() => setIsScheduling(false)} disabled={submitting}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.variationFooter}>
          <button type="button" className={styles.variationActionBtn} onClick={onCopy}>
            <Icon name="copy" size={14} />
            Copy
          </button>
          <button type="button" className={styles.variationActionBtn} onClick={onRegenerate} disabled={isScheduled}>
            <Icon name="refresh" size={14} />
            Regenerate
          </button>
          {!isScheduled ? (
            <button
              type="button"
              className={cx(styles.variationActionBtn, styles.variationActionPrimary)}
              onClick={() => setIsScheduling(true)}
            >
              <Icon name="send" size={13} />
              Schedule
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
