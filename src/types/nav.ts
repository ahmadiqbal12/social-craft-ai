export type IconName =
  | "sidebar"
  | "dashboard"
  | "studio"
  | "calendar"
  | "analytics"
  | "accounts"
  | "settings"
  | "admin"
  | "sun"
  | "moon"
  | "search"
  | "bell"
  | "chevronDown"
  | "plus"
  | "check"
  | "sparkle"
  | "external"
  | "logout"
  | "user"
  | "gear"
  | "card"
  | "copy"
  | "refresh"
  | "image"
  | "trash"
  | "flag"
  | "send"
  | "warning"
  | "key"
  | "clock"
  | "close"
  | "edit";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: IconName;
  badge?: string;
}

export interface PlaceholderContent {
  title: string;
  desc: string;
  action: string;
  icon: IconName;
  emptyTitle: string;
  emptyDesc: string;
}
