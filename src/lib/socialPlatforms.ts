import type { SocialPlatformId } from "@/types";

export interface SocialPlatformMeta {
  id: SocialPlatformId;
  label: string;
  initials: string;
  bg: string;
  color: string;
}

/** Matches backend/src/config/socialPlatforms.js + the SocialAccount model's platform enum. */
export const SOCIAL_CONNECT_PLATFORMS: SocialPlatformMeta[] = [
  { id: "google", label: "Google", initials: "G", bg: "#fff", color: "#4285F4" },
  { id: "facebook", label: "Facebook", initials: "f", bg: "#1877F2", color: "#fff" },
  {
    id: "instagram",
    label: "Instagram",
    initials: "Ig",
    bg: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
    color: "#fff",
  },
  { id: "linkedin", label: "LinkedIn", initials: "in", bg: "#0A66C2", color: "#fff" },
];

export function socialPlatformById(id: SocialPlatformId): SocialPlatformMeta {
  return SOCIAL_CONNECT_PLATFORMS.find((p) => p.id === id) ?? SOCIAL_CONNECT_PLATFORMS[0];
}
