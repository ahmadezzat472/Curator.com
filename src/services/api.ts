import { BACKEND_BASE_URL } from "@/constants/BackendApisConfig";
import CookieService from "@/services/cookies";

// Extend native RequestInit with Next.js fetch cache options
type ApiOptions = RequestInit & {
  next?: NextFetchRequestConfig; // revalidate, tags — used in Server Components
};

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const normalizedEndpoint = endpoint.replace(/^\/+/, "");

  // Read token — works in Client Components and Server Components (via cookies())
  // CookieService.get uses js-cookie on client, which reads document.cookie
  const token = CookieService.get("accessToken");

  const headers: HeadersInit = {
    ...(token && { token: `${token}` }), // your backend expects "token" header
    ...(!isFormData && {
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    ...(options.headers ?? {}),
  };

  const response = await fetch(
    `${BACKEND_BASE_URL}/${normalizedEndpoint}`.replace(/([^:]\/)\/+/g, "$1"), // prevent double slashes
    {
      ...options,
      method: options.method ?? "GET",
      headers,
      // next.revalidate / next.tags flow through here for Server Components
    },
  );

  // 401 — token expired or invalid
  if (response.status === 401) {
    CookieService.clearAuth();

    const isAuthEndpoint =
      /^auth\/(signin|signup|forgot-password|reset-password|refresh)$/.test(
        normalizedEndpoint,
      );

    if (typeof window !== "undefined" && !isAuthEndpoint) {
      window.location.href = "/auth/login";

      throw {
        message: "Session expired, please login again",
        statusCode: 401,
      } as ApiError;
    }
  }

  // All other HTTP errors
  if (!response.ok) {
    let errorBody: ApiError;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: response.statusText, statusCode: response.status };
    }
    throw errorBody;
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const data: T = await response.json();
  return data;
}
