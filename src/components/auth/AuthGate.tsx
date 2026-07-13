"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import styles from "./AuthGate.module.css";

/**
 * Resolves the current session (GET /auth/profile) on mount and bounces to
 * /login if it turns out the user isn't actually authenticated — this is
 * the client-side safety net behind `src/middleware.ts`'s cookie check.
 */
export default function AuthGate({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, initialized, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized && status !== "loading") {
      dispatch(fetchCurrentUser());
    }
  }, [initialized, status, dispatch]);

  useEffect(() => {
    if (initialized && !user) {
      router.replace("/login");
    }
  }, [initialized, user, router]);

  if (!initialized || !user) {
    return (
      <div className={styles.loader}>
        <span className={styles.spinner} />
      </div>
    );
  }

  return <>{children}</>;
}
