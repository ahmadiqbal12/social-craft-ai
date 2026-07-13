"use client";

import { useCallback, useEffect, useState } from "react";
import { socialApi } from "@/lib/api/socialApi";
import { ApiRequestError } from "@/lib/apiClient";
import type { SocialAccountDoc, SocialPlatformId } from "@/types";

function loadErrorMessage(err: unknown): string {
  return err instanceof ApiRequestError ? err.message : "Couldn't load connected accounts";
}

/** Fetches the signed-in user's connected accounts from GET /social. */
export function useSocialAccounts() {
  const [accounts, setAccounts] = useState<SocialAccountDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await socialApi.list();
        if (!cancelled) setAccounts(data);
      } catch (err) {
        if (!cancelled) setError(loadErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await socialApi.list();
      setAccounts(data);
    } catch (err) {
      setError(loadErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  async function disconnect(platform: SocialPlatformId) {
    await socialApi.disconnect(platform);
    setAccounts((prev) => prev.filter((a) => a.platform !== platform));
  }

  return { accounts, loading, error, refetch, disconnect };
}
