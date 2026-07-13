import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode, UIState } from "@/types";

const initialState: UIState = {
  theme: "light",
  sidebarCollapsed: false,
  userMenuOpen: false,
  notificationsOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleUserMenu(state) {
      state.userMenuOpen = !state.userMenuOpen;
      if (state.userMenuOpen) state.notificationsOpen = false;
    },
    toggleNotifications(state) {
      state.notificationsOpen = !state.notificationsOpen;
      if (state.notificationsOpen) state.userMenuOpen = false;
    },
    closeMenus(state) {
      state.userMenuOpen = false;
      state.notificationsOpen = false;
    },
    showToast(state, action: PayloadAction<string>) {
      state.toast = { message: action.payload, visible: true };
    },
    hideToast(state) {
      state.toast = null;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSidebarCollapsed,
  toggleSidebar,
  toggleUserMenu,
  toggleNotifications,
  closeMenus,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
