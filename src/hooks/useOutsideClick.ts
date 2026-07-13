"use client";

import { useEffect, type RefObject } from "react";

/** Invokes `handler` when a mousedown happens outside of `ref`. */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;

    function onMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler, active]);
}
