"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, logout, register } from "@/store/slices/authSlice";
import type { LoginPayload, RegisterPayload } from "@/types";

/** Convenience hook exposing auth state plus sign in/up/out actions. */
export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, status, error, initialized } = useAppSelector((state) => state.auth);

  const signIn = useCallback(
    async (payload: LoginPayload) => {
      const result = await dispatch(login(payload));
      if (login.fulfilled.match(result)) {
        router.push("/dashboard");
        router.refresh();
      }
      return result;
    },
    [dispatch, router]
  );

  const signUp = useCallback(
    async (payload: RegisterPayload) => dispatch(register(payload)),
    [dispatch]
  );

  const signOut = useCallback(async () => {
    await dispatch(logout());
    router.push("/login");
    router.refresh();
  }, [dispatch, router]);

  return {
    user,
    status,
    error,
    initialized,
    isAuthenticated: Boolean(user),
    isLoading: status === "loading",
    signIn,
    signUp,
    signOut,
  };
}
