// MERGED: CORS (from main) + auth guards (from HEAD)
// Previously two separate middlewares — combined here since Next.js only supports one.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { UserRole } from "@/features/auth/types";
import { ACCESS_COOKIE } from "./constants/CookiesKeys";

// ─── CORS ──────────────────────────────────────────────────────────────────────

const ALLOWED_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";
const ALLOWED_HEADERS = "Content-Type, Authorization, X-Requested-With";

function buildCorsHeaders(origin: string | null): Headers {
  const headers = new Headers();
  if (!origin) return headers;

  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS);
  headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}

// ─── Route groups ──────────────────────────────────────────────────────────────

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/orders", "/wishlist", "/checkout"];
const VENDOR_ROUTES    = ["/vendor"];
const ADMIN_ROUTES     = ["/admin"];
const AUTH_ROUTES      = ["/auth/login", "/auth/register", "/auth/forgot-password"];

/** Webhook routes — bypass auth entirely (payment gateways POST here without cookies) */
const PUBLIC_API_ROUTES = ["/api/webhooks"];

// ─── Middleware ─────────────────────────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // ── 1. CORS preflight — must short-circuit before any auth logic ──
  if (request.method === "OPTIONS" && pathname.startsWith("/api/")) {
    return new NextResponse(null, {
      status: 204,
      headers: buildCorsHeaders(origin),
    });
  }

  // ── 2. Public API routes — attach CORS and skip auth ──
  if (PUBLIC_API_ROUTES.some((r) => pathname.startsWith(r))) {
    const response = NextResponse.next();
    buildCorsHeaders(origin).forEach((v, k) => response.headers.set(k, v));
    return response;
  }

  // ── 3. Auth guards — page routes only ──
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  const role  = request.cookies.get("role")?.value as UserRole | undefined;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isVendor    = VENDOR_ROUTES.some((r) => pathname.startsWith(r));
  const isAdmin     = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthPage  = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Not logged in → redirect to login
  if (!token && (isProtected || isVendor || isAdmin)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Already logged in → redirect away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Vendor routes — VENDOR or ADMIN only
  if (isVendor && role !== "vendor" && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin routes — ADMIN only
  if (isAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ── 4. Attach CORS headers on all API responses that passed auth ──
  const response = NextResponse.next();
  if (pathname.startsWith("/api/")) {
    buildCorsHeaders(origin).forEach((v, k) => response.headers.set(k, v));
  }
  return response;
}

export const config = {
  matcher: [
    // All routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};