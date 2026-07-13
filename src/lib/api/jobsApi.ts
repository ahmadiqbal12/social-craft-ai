import { apiClient } from "@/lib/apiClient";
import type { JobResult } from "@/types";

/**
 * AI work (caption + image generation, prompt suggestions) runs on a BullMQ
 * queue on the backend. Endpoints that kick a job off return `{ jobId }`
 * immediately (202 Accepted); the actual result is fetched by polling
 * GET /jobs/:jobId until its state settles.
 */
export function getJob<T = unknown>(jobId: string): Promise<JobResult<T>> {
  return apiClient.get<JobResult<T>>(`/jobs/${jobId}`);
}

export class JobFailedError extends Error {
  constructor(message = "The AI job failed") {
    super(message);
    this.name = "JobFailedError";
  }
}

export class JobTimeoutError extends Error {
  constructor(message = "Timed out waiting for the AI job to finish") {
    super(message);
    this.name = "JobTimeoutError";
  }
}

interface PollOptions {
  intervalMs?: number;
  timeoutMs?: number;
}

/** Polls GET /jobs/:jobId until it completes, fails, or `timeoutMs` elapses. */
export async function pollJob<T = unknown>(jobId: string, options: PollOptions = {}): Promise<T> {
  const { intervalMs = 1500, timeoutMs = 60000 } = options;
  const deadline = Date.now() + timeoutMs;

  while (true) {
    const job = await getJob<T>(jobId);

    if (job.state === "completed") return job.result as T;
    if (job.state === "failed") throw new JobFailedError();

    if (Date.now() >= deadline) throw new JobTimeoutError();
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}
