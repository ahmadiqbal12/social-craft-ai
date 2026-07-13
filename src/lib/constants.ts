import type {
  ActivityItem,
  ChartPoint,
  ConnectedAccount,
  NavItem,
  PlaceholderContent,
  StatCardData,
  UpcomingPost,
} from "@/types";

export const MAIN_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { id: "studio", label: "Content Studio", href: "/studio", icon: "studio", badge: "AI" },
  { id: "calendar", label: "Calendar", href: "/calendar", icon: "calendar" },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: "analytics" },
  { id: "accounts", label: "Social Accounts", href: "/accounts", icon: "accounts" },
];

export const BOTTOM_NAV: NavItem[] = [
  { id: "settings", label: "Settings", href: "/settings", icon: "settings" },
  { id: "admin", label: "Admin", href: "/admin", icon: "admin" },
];

export const PLACEHOLDER_CONTENT: Record<string, PlaceholderContent> = {
  studio: {
    title: "Content Studio",
    desc: "Generate on-brand posts, captions and visuals with AI.",
    action: "New generation",
    icon: "studio",
    emptyTitle: "Your AI content studio is next",
    emptyDesc:
      "Draft captions, hashtags and images from a single prompt, then send them straight to your calendar. This workspace lands in the next build slice.",
  },
  calendar: {
    title: "Content Calendar",
    desc: "Plan and schedule content across every platform.",
    action: "Schedule post",
    icon: "calendar",
    emptyTitle: "Nothing on the calendar yet",
    emptyDesc:
      "A drag-and-drop month, week and day view for all your scheduled posts — color-coded by platform — shows up here next.",
  },
  analytics: {
    title: "Analytics",
    desc: "Track reach, engagement and follower growth.",
    action: "Export report",
    icon: "analytics",
    emptyTitle: "Analytics are being wired up",
    emptyDesc:
      "Performance charts, top-post tables and per-platform filters will live here, powered by your connected accounts.",
  },
  accounts: {
    title: "Social Accounts",
    desc: "Connect and manage your channels in one place.",
    action: "Connect account",
    icon: "accounts",
    emptyTitle: "Manage all your channels here",
    emptyDesc:
      "Connect Instagram, LinkedIn, Twitter/X and Facebook, then publish and schedule across all of them from a single studio.",
  },
  settings: {
    title: "Settings",
    desc: "Manage your workspace, security and preferences.",
    action: "Save changes",
    icon: "settings",
    emptyTitle: "Workspace settings",
    emptyDesc:
      "Profile, security, notifications, billing and API keys — organized into clean tabbed forms — are coming to this page.",
  },
  admin: {
    title: "Admin",
    desc: "Users, moderation and platform-wide health.",
    action: "Invite user",
    icon: "admin",
    emptyTitle: "Admin control center",
    emptyDesc:
      "User management, a content moderation queue and platform analytics for your team will be available here.",
  },
};

export const STAT_CARDS: StatCardData[] = [
  {
    id: "posts",
    label: "Total posts published",
    value: "248",
    icon: "dashboard",
    iconBg: "var(--primary-tint)",
    iconColor: "var(--primary)",
    trend: { label: "12%", positive: true },
  },
  {
    id: "scheduled",
    label: "Scheduled posts",
    value: "18",
    icon: "calendar",
    iconBg: "rgba(20,184,166,0.14)",
    iconColor: "#14B8A6",
    meta: "Next in 2h",
  },
  {
    id: "engagement",
    label: "Avg engagement rate",
    value: "6.4%",
    icon: "sparkle",
    iconBg: "rgba(236,72,153,0.13)",
    iconColor: "#EC4899",
    trend: { label: "0.8%", positive: true },
  },
  {
    id: "accounts",
    label: "Connected accounts",
    value: "5",
    icon: "accounts",
    iconBg: "rgba(16,185,129,0.14)",
    iconColor: "#10B981",
    meta: "4 platforms",
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    icon: "sparkle",
    iconBg: "var(--primary-tint)",
    iconColor: "var(--primary)",
    text: "AI generated",
    highlight: "3 caption variations",
    time: "12m ago",
  },
  {
    id: "2",
    icon: "check",
    iconBg: "rgba(16,185,129,0.14)",
    iconColor: "#10B981",
    text: "Your LinkedIn post",
    highlight: '"Q3 product roadmap" was published',
    time: "1h ago",
  },
  {
    id: "3",
    icon: "calendar",
    iconBg: "rgba(20,184,166,0.14)",
    iconColor: "#14B8A6",
    text: "",
    highlight: "5 posts scheduled",
    time: "3h ago",
  },
  {
    id: "4",
    icon: "external",
    iconBg: "rgba(245,158,11,0.16)",
    iconColor: "#F59E0B",
    text: "Your Twitter/X post crossed",
    highlight: "1,000 impressions",
    time: "5h ago",
  },
];

export const UPCOMING_POSTS: UpcomingPost[] = [
  {
    id: "1",
    title: "Summer collection teaser",
    platform: "Instagram",
    platformColor: "#E1306C",
    schedule: "Today, 4:30 PM",
    status: "Scheduled",
  },
  {
    id: "2",
    title: "How we cut churn by 30%",
    platform: "LinkedIn",
    platformColor: "#0A66C2",
    schedule: "Tomorrow, 9:00 AM",
    status: "Scheduled",
  },
  {
    id: "3",
    title: "Feature thread: AI scheduling",
    platform: "Twitter/X",
    platformColor: "#1DA1F2",
    schedule: "Jul 3, 12:15 PM",
    status: "Draft",
  },
];

export const CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  {
    id: "1",
    platform: "Instagram",
    handle: "@socialcraft",
    bg: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
    color: "#fff",
    initials: "Ig",
    connected: true,
  },
  {
    id: "2",
    platform: "LinkedIn",
    handle: "SocialCraft AI",
    bg: "#0A66C2",
    color: "#fff",
    initials: "in",
    connected: true,
  },
  {
    id: "3",
    platform: "Twitter / X",
    handle: "@socialcraft",
    bg: "#15181E",
    color: "#fff",
    initials: "X",
    connected: true,
  },
];

/** Weekly engagement trend used to draw the dashboard performance chart (SVG viewBox 0 0 640 224). */
export const CHART_POINTS: ChartPoint[] = [
  { x: 40, y: 124, label: "Mon" },
  { x: 133, y: 101, label: "Tue" },
  { x: 227, y: 114, label: "Wed" },
  { x: 320, y: 70, label: "Thu" },
  { x: 413, y: 81, label: "Fri" },
  { x: 507, y: 49, label: "Sat" },
  { x: 600, y: 56, label: "Sun" },
];

/** Last week's comparison line (dashed) on the same chart. */
export const CHART_COMPARE_POINTS: ChartPoint[] = [
  { x: 40, y: 146, label: "Mon" },
  { x: 133, y: 128, label: "Tue" },
  { x: 227, y: 121, label: "Wed" },
  { x: 320, y: 106, label: "Thu" },
  { x: 413, y: 112, label: "Fri" },
  { x: 507, y: 92, label: "Sat" },
  { x: 600, y: 85, label: "Sun" },
];
