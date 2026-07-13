import type { ApiKeyItem, BillingHistoryItem, NotificationPref, SessionItem, SettingsTab } from "@/types";

export const SETTINGS_TABS: SettingsTab[] = [
  { id: "profile", label: "Profile", icon: "user" },
  { id: "security", label: "Security", icon: "admin" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "billing", label: "Billing", icon: "card" },
  { id: "api", label: "API Keys", icon: "key" },
];

export const DEFAULT_NOTIFICATION_PREFS: NotificationPref[] = [
  {
    id: "post-published",
    label: "Post published alerts",
    desc: "Get notified the moment a scheduled post goes live.",
    enabled: true,
  },
  {
    id: "weekly-digest",
    label: "Weekly performance digest",
    desc: "A Monday-morning summary of reach, engagement and top posts.",
    enabled: true,
  },
  {
    id: "ai-ready",
    label: "AI generation ready",
    desc: "Let me know when a Content Studio generation finishes.",
    enabled: true,
  },
  {
    id: "product-updates",
    label: "Product updates",
    desc: "New features and improvements to SocialCraft AI.",
    enabled: false,
  },
  {
    id: "marketing",
    label: "Marketing emails",
    desc: "Tips, best practices and occasional offers.",
    enabled: false,
  },
];

export const DEFAULT_SESSIONS: SessionItem[] = [
  { id: "1", device: "Chrome on macOS", location: "Lahore, PK", lastActive: "Active now", current: true },
  { id: "2", device: "Safari on iPhone", location: "Lahore, PK", lastActive: "2 hours ago", current: false },
  { id: "3", device: "Chrome on Windows", location: "Karachi, PK", lastActive: "5 days ago", current: false },
];

export const DEFAULT_API_KEYS: ApiKeyItem[] = [
  {
    id: "1",
    label: "Production key",
    createdAt: "Mar 2, 2026",
    lastUsed: "2h ago",
    value: "sk_live_51Hn2f••••••••••••Qm3a",
  },
  {
    id: "2",
    label: "Zapier integration",
    createdAt: "Jan 18, 2026",
    lastUsed: "3 days ago",
    value: "sk_live_29Kp8••••••••••••Xr7c",
  },
];

export const BILLING_HISTORY: BillingHistoryItem[] = [
  { id: "1", date: "Jun 1, 2026", desc: "Pro plan — monthly", amount: "$29.00", status: "Paid" },
  { id: "2", date: "May 1, 2026", desc: "Pro plan — monthly", amount: "$29.00", status: "Paid" },
  { id: "3", date: "Apr 1, 2026", desc: "Pro plan — monthly", amount: "$29.00", status: "Paid" },
];

export const USAGE_METRICS = [
  { id: "generations", label: "AI generations", used: 42, total: 50, unit: "" },
  { id: "accounts", label: "Connected accounts", used: 5, total: 5, unit: "" },
  { id: "scheduled", label: "Scheduled posts", used: 18, total: 100, unit: "" },
];

export function maskKey(key: string): string {
  return `sk_live_${"•".repeat(20)}${key.slice(-4)}`;
}
