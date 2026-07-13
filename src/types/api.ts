/**
 * Types mirroring the real backend documents (see ../../backend/src/models).
 * Kept separate from the mock `dashboard.ts` types, which back the still-static
 * parts of the dashboard.
 */
import type { User } from "./auth";

export type ContentTone = "formal" | "casual" | "friendly" | "professional" | "humorous";

export type ContentPlatform = "facebook" | "instagram" | "twitter" | "linkedin" | "tiktok";

export type ContentStatus = "draft" | "scheduled" | "published";

export type ContentType = "text" | "image" | "video";

export interface ContentDoc {
  _id: string;
  user: string;
  title: string;
  body?: string;
  aiGenerated: boolean;
  tone?: ContentTone;
  keywords?: string[];
  hashtags?: string[];
  imageUrl?: string;
  platform: ContentPlatform[];
  status: ContentStatus;
  scheduledAt?: string;
  publishedAt?: string;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
}

export type SocialPlatformId = "google" | "facebook" | "instagram" | "linkedin";

export interface SocialAccountDoc {
  _id: string;
  user: string;
  platform: SocialPlatformId;
  providerId?: string;
  username?: string;
  email?: string;
  avatar?: string;
  profileUrl?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobState = "waiting" | "active" | "completed" | "failed" | "delayed" | "unknown";

export interface JobResult<T = unknown> {
  jobId: string;
  state: JobState;
  result: T | null;
}

export interface UsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  searchBy?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}

export interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
