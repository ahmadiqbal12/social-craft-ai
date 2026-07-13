import type { AdminStatCard, HealthMetric, ModerationItem } from "@/types";

/**
 * Illustrative-only stat cards — the backend has no session-tracking,
 * moderation, or uptime models yet. "Total users" is injected live from
 * GET /auth/users (see AdminView) instead of hardcoded here.
 */
export const ADMIN_STATS: AdminStatCard[] = [
  {
    id: "active-today",
    label: "Active today",
    value: "—",
    icon: "sparkle",
    iconBg: "rgba(16,185,129,0.14)",
    iconColor: "#10B981",
    meta: "Not tracked yet",
  },
  {
    id: "moderation",
    label: "Pending moderation",
    value: "3",
    icon: "flag",
    iconBg: "rgba(245,158,11,0.16)",
    iconColor: "#F59E0B",
    meta: "Demo data",
  },
  {
    id: "uptime",
    label: "Platform uptime",
    value: "—",
    icon: "admin",
    iconBg: "rgba(20,184,166,0.14)",
    iconColor: "#14B8A6",
    meta: "Not tracked yet",
  },
];

export const MODERATION_QUEUE: ModerationItem[] = [
  {
    id: "1",
    platform: "Instagram",
    platformColor: "#E1306C",
    author: "@northfield_co",
    snippet: "Flash sale — everything must go before midnight! Link in bio for 70% off...",
    reason: "Reported: misleading discount claim",
    reportedAt: "22m ago",
  },
  {
    id: "2",
    platform: "Twitter / X",
    platformColor: "#1DA1F2",
    author: "@leestudio",
    snippet: "This competitor's product is basically a scam, don't waste your money...",
    reason: "Reported: negative brand mention",
    reportedAt: "1h ago",
  },
  {
    id: "3",
    platform: "LinkedIn",
    platformColor: "#0A66C2",
    author: "Marcus Webb",
    snippet: "Hiring! DM me your resume and $50 application fee to be considered...",
    reason: "Auto-flagged: possible scam pattern",
    reportedAt: "4h ago",
  },
];

export const PLATFORM_HEALTH: HealthMetric[] = [
  { id: "api", label: "API latency (p95)", value: "184ms", detail: "Within normal range", tone: "good" },
  { id: "queue", label: "Publish queue backlog", value: "3 jobs", detail: "Processing normally", tone: "good" },
  { id: "webhooks", label: "Failed webhooks (24h)", value: "12", detail: "Slightly elevated", tone: "warn" },
  { id: "storage", label: "Media storage used", value: "68%", detail: "412GB of 600GB", tone: "good" },
];
