import { apiClient } from "@/lib/apiClient";
import type { ContentDoc, ContentPlatform, ContentTone, ContentType } from "@/types";

interface GenerateContentPayload {
  title: string;
  tone: ContentTone;
  keywords?: string[];
  platform: ContentPlatform[];
  type?: ContentType;
}

interface ManualContentPayload {
  title: string;
  body: string;
  tone?: ContentTone;
  keywords?: string[];
  hashtags?: string[];
  platform: ContentPlatform[];
}

/** Wraps POST /content/generate, /content/manual, GET/PATCH/DELETE /content — see backend/src/routes/content.route.js. */
export const contentApi = {
  generate: (payload: GenerateContentPayload) =>
    apiClient.post<{ jobId: string }>("/content/generate", payload),
  createManual: (payload: ManualContentPayload) => apiClient.post<ContentDoc>("/content/manual", payload),
  list: () => apiClient.get<ContentDoc[]>("/content"),
  schedule: (contentId: string, scheduledAt: string) =>
    apiClient.patch<ContentDoc>(`/content/schedule/${contentId}`, { scheduledAt }),
  remove: (contentId: string) => apiClient.delete<void>(`/content/${contentId}`),
};
