const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const isLocalAppUrl = !!appUrl && /localhost|127\.0\.0\.1/.test(appUrl);

const serverOrigin = isLocalAppUrl
  ? (vercelUrl ?? appUrl)
  : (appUrl ?? vercelUrl);

const INTERNAL_API_BASE_URL =
  typeof window !== "undefined"
    ? "/api"
    : serverOrigin
      ? `${serverOrigin}/api`
      : "http://localhost:3000/api";

export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? INTERNAL_API_BASE_URL;
