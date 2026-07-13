export type ThemeMode = "light" | "dark";

export interface ToastState {
  message: string;
  visible: boolean;
}

export interface UIState {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
  userMenuOpen: boolean;
  notificationsOpen: boolean;
  toast: ToastState | null;
}
