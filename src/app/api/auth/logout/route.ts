import { cookies } from "next/headers";
import { authService } from "@/features/auth/auth.service";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { handleRouteError, ok } from "@/lib/api/response";
import { ACCESS_COOKIE } from "@/constants/CookiesKeys";
import { UnauthorizedError } from "@/lib/api/errors";

export async function POST() {
  try {
    const store = await cookies();
    const accessToken = store.get(ACCESS_COOKIE)?.value;

    if (!accessToken) {
      throw new UnauthorizedError("Not authenticated");
    }

    const payload = await verifyAccessToken(accessToken);
    const userId = payload.sub;

    await authService.logout(userId);
    await clearAuthCookies();

    return ok({ message: "Logged out successfully" });
  } catch (error) {
    return handleRouteError(error);
  }
}
