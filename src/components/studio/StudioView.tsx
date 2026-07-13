"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { contentApi } from "@/lib/api/contentApi";
import { JobFailedError, JobTimeoutError, pollJob } from "@/lib/api/jobsApi";
import { ApiRequestError } from "@/lib/apiClient";
import { extractHashtags } from "@/lib/studioContent";
import type { ContentDoc, GeneratedVariation, PlatformSlot, StudioPlatformId, StudioToneId } from "@/types";
import GeneratedResults from "./GeneratedResults";
import PromptComposer from "./PromptComposer";
import VisualIdeas from "./VisualIdeas";
import styles from "./Studio.module.css";

function jobErrorMessage(err: unknown): string {
  if (err instanceof JobTimeoutError) return "This is taking longer than expected — try again shortly";
  if (err instanceof JobFailedError) return "Generation failed on the server";
  if (err instanceof ApiRequestError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

export default function StudioView() {
  const { show } = useToast();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [platforms, setPlatforms] = useState<StudioPlatformId[]>(["instagram", "linkedin"]);
  const [tone, setTone] = useState<StudioToneId>("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [slots, setSlots] = useState<PlatformSlot[]>([]);

  function togglePlatform(id: StudioPlatformId) {
    setPlatforms((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((p) => p !== id);
      }
      return [...prev, id];
    });
  }

  async function generateForPlatform(platformId: StudioPlatformId): Promise<GeneratedVariation> {
    const keywordList = keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const { jobId } = await contentApi.generate({
      title: prompt.trim(),
      tone,
      keywords: keywordList,
      platform: [platformId],
      type: "text",
    });

    const content = await pollJob<ContentDoc>(jobId, { timeoutMs: 60000 });
    const text = content.body ?? "";

    return {
      id: content._id,
      platformId,
      tone,
      text,
      hashtags: content.hashtags?.length ? content.hashtags : extractHashtags(text),
    };
  }

  async function runSlot(platformId: StudioPlatformId) {
    try {
      const variation = await generateForPlatform(platformId);
      setSlots((prev) => prev.map((s) => (s.platformId === platformId ? { platformId, status: "done", variation } : s)));
    } catch (err) {
      setSlots((prev) =>
        prev.map((s) => (s.platformId === platformId ? { platformId, status: "error", error: jobErrorMessage(err) } : s))
      );
    }
  }

  async function handleGenerate() {
    if (!prompt.trim()) {
      show("Describe what you'd like to post about first");
      textareaRef.current?.focus();
      return;
    }
    if (platforms.length === 0) {
      show("Select at least one platform");
      return;
    }

    setIsGenerating(true);
    setSlots(platforms.map((platformId) => ({ platformId, status: "pending" })));

    await Promise.all(platforms.map((platformId) => runSlot(platformId)));

    setIsGenerating(false);
  }

  function handleRegenerate(platformId: StudioPlatformId) {
    setSlots((prev) => prev.map((s) => (s.platformId === platformId ? { platformId, status: "pending" } : s)));
    runSlot(platformId);
  }

  function handleTextChange(platformId: StudioPlatformId, text: string) {
    setSlots((prev) =>
      prev.map((s) => (s.platformId === platformId && s.variation ? { ...s, variation: { ...s.variation, text } } : s))
    );
  }

  async function handleCopy(platformId: StudioPlatformId) {
    const variation = slots.find((s) => s.platformId === platformId)?.variation;
    if (!variation) return;
    const payload = variation.hashtags.length
      ? `${variation.text}\n\n${variation.hashtags.join(" ")}`
      : variation.text;
    try {
      await navigator.clipboard.writeText(payload);
      show("Caption copied to clipboard");
    } catch {
      show("Couldn't copy automatically — select the text manually");
    }
  }

  async function handleSchedule(platformId: StudioPlatformId, scheduledAtIso: string) {
    const variation = slots.find((s) => s.platformId === platformId)?.variation;
    if (!variation) return;
    try {
      const updated = await contentApi.schedule(variation.id, scheduledAtIso);
      setSlots((prev) =>
        prev.map((s) =>
          s.platformId === platformId && s.variation
            ? { ...s, variation: { ...s.variation, scheduledAt: updated.scheduledAt ?? scheduledAtIso } }
            : s
        )
      );
      show(`Scheduled for ${new Date(scheduledAtIso).toLocaleString()}`);
    } catch (err) {
      show(err instanceof ApiRequestError ? err.message : "Couldn't schedule this post");
      throw err;
    }
  }

  function handleClearAll() {
    setSlots([]);
  }

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>
            Content Studio
            <span className={styles.badge}>✦ AI</span>
          </h1>
          <p className={styles.subheading}>Generate on-brand posts and visuals with AI, saved straight to your drafts.</p>
        </div>
        <button type="button" className={styles.ghostButton} onClick={() => router.push("/calendar")}>
          View calendar
        </button>
      </div>

      <PromptComposer
        prompt={prompt}
        onPromptChange={setPrompt}
        textareaRef={textareaRef}
        platforms={platforms}
        onTogglePlatform={togglePlatform}
        tone={tone}
        onToneChange={setTone}
        keywords={keywords}
        onKeywordsChange={setKeywords}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />

      <VisualIdeas prompt={prompt} />

      <GeneratedResults
        slots={slots}
        onTextChange={handleTextChange}
        onRegenerate={handleRegenerate}
        onCopy={handleCopy}
        onSchedule={handleSchedule}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
