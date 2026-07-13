import type { IconName } from "./nav";

export type SettingsTabId = "profile" | "security" | "notifications" | "billing" | "api";

export interface SettingsTab {
  id: SettingsTabId;
  label: string;
  icon: IconName;
}

export interface NotificationPref {
  id: string;
  label: string;
  desc: string;
  enabled: boolean;
}

export interface SessionItem {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface ApiKeyItem {
  id: string;
  label: string;
  createdAt: string;
  lastUsed: string;
  value: string;
}

export interface BillingHistoryItem {
  id: string;
  date: string;
  desc: string;
  amount: string;
  status: "Paid" | "Pending";
}
