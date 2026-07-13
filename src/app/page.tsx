import { redirect } from "next/navigation";

/**
 * Defensive fallback — `src/middleware.ts` already redirects "/" to
 * /dashboard or /login based on session cookies before this ever renders.
 */
export default function RootPage() {
  redirect("/dashboard");
}
