"use client";

import type { RefObject } from "react";
import Icon from "@/components/common/Icon";
import { STUDIO_IDEAS, STUDIO_PLATFORMS, STUDIO_TONES } from "@/lib/studioContent";
import { cx } from "@/lib/utils";
import type { StudioPlatformId, StudioToneId } from "@/types";
import styles from "./Studio.module.css";

const PROMPT_MAX = 400;

interface PromptComposerProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  platforms: StudioPlatformId[];
  onTogglePlatform: (id: StudioPlatformId) => void;
  tone: StudioToneId;
  onToneChange: (id: StudioToneId) => void;
  keywords: string;
  onKeywordsChange: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function PromptComposer({
  prompt,
  onPromptChange,
  textareaRef,
  platforms,
  onTogglePlatform,
  tone,
  onToneChange,
  keywords,
  onKeywordsChange,
  isGenerating,
  onGenerate,
}: PromptComposerProps) {
  return (
    <div className={styles.composerCard}>
      <div className={styles.composerTop}>
        <span className={styles.composerLabel}>What do you want to post about?</span>
        <span className={styles.charCount}>
          {prompt.length}/{PROMPT_MAX}
        </span>
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        placeholder="e.g. We just launched a redesigned onboarding flow that cuts setup time in half…"
        value={prompt}
        maxLength={PROMPT_MAX}
        onChange={(e) => onPromptChange(e.target.value)}
      />

      <div className={styles.chipsRow}>
        {STUDIO_IDEAS.map((idea) => (
          <button key={idea} type="button" className={styles.chip} onClick={() => onPromptChange(idea)}>
            {idea}
          </button>
        ))}
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Platforms</span>
          <div className={styles.pillsRow}>
            {STUDIO_PLATFORMS.map((platform) => {
              const active = platforms.includes(platform.id);
              return (
                <button
                  key={platform.id}
                  type="button"
                  className={cx(styles.platformPill, active && styles.platformPillActive)}
                  onClick={() => onTogglePlatform(platform.id)}
                  aria-pressed={active}
                >
                  <span className={styles.platformBadge} style={{ background: platform.bg, color: platform.color }}>
                    {platform.initials}
                  </span>
                  {platform.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Tone</span>
          <div className={styles.pillsRow}>
            {STUDIO_TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.desc}
                className={cx(styles.tonePill, tone === t.id && styles.tonePillActive)}
                onClick={() => onToneChange(t.id)}
                aria-pressed={tone === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Keywords</span>
          <input
            type="text"
            className={styles.keywordsInput}
            placeholder="e.g. launch, discount, summer"
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.composerFooter}>
        <span className={styles.generateHint}>
          {platforms.length} platform{platforms.length === 1 ? "" : "s"} selected — generations save as drafts
          automatically
        </span>
        <button type="button" className={styles.generateButton} onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <span className={styles.spinner} />
              Generating…
            </>
          ) : (
            <>
              <Icon name="sparkle" size={17} />
              Generate content
            </>
          )}
        </button>
      </div>
    </div>
  );
}
