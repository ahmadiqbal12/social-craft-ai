"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideToast, showToast } from "@/store/slices/uiSlice";

const AUTO_HIDE_MS = 2600;

/** Reads the active toast and exposes a `show` helper; auto-hides itself. */
export function useToast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.ui.toast);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (toast?.visible) {
      timerRef.current = setTimeout(() => dispatch(hideToast()), AUTO_HIDE_MS);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast, dispatch]);

  const show = useCallback((message: string) => dispatch(showToast(message)), [dispatch]);

  return { toast, show };
}
