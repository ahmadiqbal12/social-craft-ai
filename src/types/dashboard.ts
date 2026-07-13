import type { IconName } from "./nav";

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  trend?: {
    label: string;
    positive: boolean;
  };
  meta?: string;
}

export interface ActivityItem {
  id: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  text: string;
  highlight: string;
  time: string;
}

export interface UpcomingPost {
  id: string;
  title: string;
  platform: string;
  platformColor: string;
  schedule: string;
  status: "Scheduled" | "Draft";
}

export interface ConnectedAccount {
  id: string;
  platform: string;
  handle: string;
  bg: string;
  color: string;
  initials: string;
  connected: boolean;
}

export interface ChartPoint {
  x: number;
  y: number;
  label: string;
}
