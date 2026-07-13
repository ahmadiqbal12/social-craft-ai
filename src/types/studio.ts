/** Subset of the backend's Content platform enum that Studio can target. */
export type StudioPlatformId = "instagram" | "linkedin" | "twitter" | "facebook";

export interface StudioPlatform {
  id: StudioPlatformId;
  label: string;
  initials: string;
  bg: string;
  color: string;
  maxChars: number;
}

/** Matches the backend Content model's `tone` enum exactly. */
export type StudioToneId = "formal" | "casual" | "friendly" | "professional" | "humorous";

export interface StudioTone {
  id: StudioToneId;
  label: string;
  desc: string;
}

export interface GeneratedVariation {
  /** Real Content document _id once generated — used to schedule/copy it. */
  id: string;
  platformId: StudioPlatformId;
  tone: StudioToneId;
  text: string;
  hashtags: string[];
  scheduledAt?: string;
}

export type SlotStatus = "pending" | "done" | "error";

export interface PlatformSlot {
  platformId: StudioPlatformId;
  status: SlotStatus;
  variation?: GeneratedVariation;
  error?: string;
}
