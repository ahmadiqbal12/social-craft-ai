"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme, toggleTheme as toggleThemeAction } from "@/store/slices/uiSlice";
import type { ThemeMode } from "@/types";

const STORAGE_KEY = "sc-theme";

/**
 * Reads/writes the active theme in Redux and keeps it in sync with
 * localStorage + the `data-theme` attribute the CSS variables key off of.
 */
export function useTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === "light" || stored === "dark") {
        dispatch(setTheme(stored));
      }
    } catch {
      // localStorage unavailable (private mode, SSR, etc.)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => dispatch(toggleThemeAction()), [dispatch]);

  return { theme, toggleTheme };
}
