const INTERNAL_API_BASE_URL =
  typeof window !== "undefined"
    ? "/api"
    : process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")}/api`
      : "http://localhost:3000/api";

export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? INTERNAL_API_BASE_URL;
