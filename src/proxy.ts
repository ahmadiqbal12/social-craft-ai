import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/studio",
  "/calendar",
  "/analytics",
  "/accounts",
  "/settings",
  "/admin",
];

const AUTH_ROUTES = ["/login", "/register"];

/**
 * The backend issues httpOnly `accessToken` / `refreshToken` cookies scoped
 * to the shared "localhost" host, so they are readable here even though the
 * cookies aren't accessible from client-side JS. Presence of either cookie
 * is treated as "looks authenticated" for routing purposes; the real check
 * happens client-side via GET /auth/profile (see `useAuth`/`AuthGate`),
 * which also recovers from an expired access token.
 */
function hasSession(request: NextRequest): boolean {
  return Boolean(
    request.cookies.get("accessToken")?.value || request.cookies.get("refreshToken")?.value
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasSession(request);

  if (pathname === "/") {
    return NextResponse.redirect(new URL(authenticated ? "/dashboard" : "/login", request.url));
  }

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = AUTH_ROUTES.some((prefix) => pathname.startsWith(prefix));
  if (isAuthRoute && authenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
