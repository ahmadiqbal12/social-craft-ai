import { API_BASE_URL, apiClient } from "@/lib/apiClient";
import type { SocialAccountDoc, SocialPlatformId } from "@/types";

/** Wraps GET/DELETE /social and the OAuth connect redirect — see backend/src/routes/social.route.js. */
export const socialApi = {
  list: () => apiClient.get<SocialAccountDoc[]>("/social"),
  disconnect: (platform: SocialPlatformId) => apiClient.delete<void>(`/social/${platform}`),
  /**
   * The connect flow is a Passport OAuth redirect, not a fetch call — the
   * browser has to navigate here directly so it can follow the provider's
   * consent screen and come back to the backend's callback route.
   */
  connectUrl: (platform: SocialPlatformId) => `${API_BASE_URL}/social/${platform}`,
};
