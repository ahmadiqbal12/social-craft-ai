"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { contentApi } from "@/lib/api/contentApi";
import { JobFailedError, JobTimeoutError, pollJob } from "@/lib/api/jobsApi";
import type { ContentDoc } from "@/types";
import styles from "./Studio.module.css";

interface VisualIdeasProps {
  prompt: string;
}

export default function VisualIdeas({ prompt }: VisualIdeasProps) {
  const { show } = useToast();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function generate() {
    if (!prompt.trim()) {
      show("Describe your post above first");
      return;
    }

    setIsGenerating(true);
    try {
      const { jobId } = await contentApi.generate({
        title: prompt.trim(),
        tone: "professional",
        platform: ["instagram"],
        type: "image",
      });
      const content = await pollJob<ContentDoc>(jobId, { timeoutMs: 90000 });
      if (!content.imageUrl) throw new Error("No image was returned");
      setImageUrl(content.imageUrl);
    } catch (err) {
      if (err instanceof JobTimeoutError) {
        show("Image generation is taking longer than expected — try again shortly");
      } else if (err instanceof JobFailedError) {
        show("Image generation failed");
      } else {
        show(err instanceof Error ? err.message : "Couldn't generate an image");
      }
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className={styles.visualCard}>
      <div className={styles.visualHeadRow}>
        <div>
          <h3 className={styles.visualTitle}>Visual idea</h3>
          <p className={styles.visualSubtitle}>Generate an AI cover image for this post (OpenAI image generation).</p>
        </div>
        <button type="button" className={styles.visualRefresh} onClick={generate} disabled={isGenerating}>
          {isGenerating ? <span className={styles.spinner} style={{ borderTopColor: "var(--text)" }} /> : <Icon name="refresh" size={14} />}
          {imageUrl ? "Generate another" : "Generate visual"}
        </button>
      </div>

      <div className={styles.visualSingle}>
        {isGenerating ? (
          <div className={styles.visualSkeleton} />
        ) : imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="AI generated visual for this post" className={styles.visualImage} />
        ) : (
          <div className={styles.visualPlaceholder}>
            <Icon name="image" size={26} strokeWidth={1.75} />
            <span>No visual yet</span>
          </div>
        )}
      </div>
    </div>
  );
}
