import type { StudioPlatform, StudioPlatformId, StudioTone } from "@/types";

export const STUDIO_PLATFORMS: StudioPlatform[] = [
  {
    id: "instagram",
    label: "Instagram",
    initials: "Ig",
    bg: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
    color: "#fff",
    maxChars: 2200,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    initials: "in",
    bg: "#0A66C2",
    color: "#fff",
    maxChars: 3000,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    initials: "X",
    bg: "#15181E",
    color: "#fff",
    maxChars: 280,
  },
  {
    id: "facebook",
    label: "Facebook",
    initials: "f",
    bg: "#1877F2",
    color: "#fff",
    maxChars: 63206,
  },
];

/** Matches the backend Content model's `tone` enum exactly (see content.model.js). */
export const STUDIO_TONES: StudioTone[] = [
  { id: "professional", label: "Professional", desc: "Polished and confident" },
  { id: "friendly", label: "Friendly", desc: "Warm and approachable" },
  { id: "casual", label: "Casual", desc: "Relaxed, conversational" },
  { id: "formal", label: "Formal", desc: "Buttoned-up and precise" },
  { id: "humorous", label: "Humorous", desc: "Playful, witty, fun" },
];

export const STUDIO_IDEAS: string[] = [
  "Announcing our summer collection launch",
  "Behind the scenes of our design process",
  "3 tips for growing on social media",
  "Customer success story",
  "New feature: AI scheduling",
  "Celebrating a company milestone",
];

export function platformById(id: StudioPlatformId): StudioPlatform {
  return STUDIO_PLATFORMS.find((p) => p.id === id) ?? STUDIO_PLATFORMS[0];
}

/** Best-effort extraction of hashtags the AI wrote inline in the caption body. */
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\p{L}0-9_]+/gu) ?? [];
  return Array.from(new Set(matches)).slice(0, 6);
}
