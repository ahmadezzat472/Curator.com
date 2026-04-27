import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { UserRole } from "@/features/auth/types";

// Routes that require login (any role)
const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/orders",
  "/wishlist",
  "/checkout",
];

// Routes that require VENDOR or ADMIN
const VENDOR_ROUTES = ["/vendor"];

// Routes that require ADMIN only
const ADMIN_ROUTES = ["/admin"];

// Routes only accessible when NOT logged in
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value as UserRole | undefined;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isVendor = VENDOR_ROUTES.some((r) => pathname.startsWith(r));
  const isAdmin = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthPage = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Not logged in → redirect to login
  if (!token && (isProtected || isVendor || isAdmin)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("from", pathname); // so we can redirect back after login
    return NextResponse.redirect(url);
  }

  // Already logged in → redirect away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Vendor routes — only VENDOR or ADMIN
  if (isVendor && role !== "vendor" && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin routes — only ADMIN
  if (isAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static files, images, and api routes
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
