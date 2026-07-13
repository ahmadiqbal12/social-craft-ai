import type { IconName } from "./nav";

export interface ModerationItem {
  id: string;
  platform: string;
  platformColor: string;
  author: string;
  snippet: string;
  reason: string;
  reportedAt: string;
}

export interface AdminStatCard {
  id: string;
  label: string;
  value: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  meta: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: "good" | "warn";
}
