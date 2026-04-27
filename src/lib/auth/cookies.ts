import "server-only";

import { cookies } from "next/headers";
import { env } from "@/lib/config";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/constants/CookiesKeys";

function parseDurationSeconds(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error(`Invalid duration: ${duration}`);
  const mul = { s: 1, m: 60, h: 3600, d: 86400 }[
    match[2] as "s" | "m" | "h" | "d"
  ];
  return parseInt(match[1], 10) * mul;
}

function commonOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: env.COOKIE_SECURE,
    domain: env.COOKIE_DOMAIN || undefined,
    path: "/",
  };
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, {
    ...commonOptions(),
    maxAge: parseDurationSeconds(env.JWT_ACCESS_TTL),
  });
  store.set(REFRESH_COOKIE, refreshToken, {
    ...commonOptions(),
    maxAge: parseDurationSeconds(env.JWT_REFRESH_TTL),
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}
