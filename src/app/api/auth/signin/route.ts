import { LoginSchema } from "@/features/auth/auth.dto";
import { authService } from "@/features/auth/auth.service";
import { setAuthCookies } from "@/lib/auth/cookies";
import { handleRouteError, ok } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = LoginSchema.parse(body);
    const { user, accessToken, refreshToken } = await authService.login(data);
    await setAuthCookies(accessToken, refreshToken);
    return ok({ user, accessToken, refreshToken });
  } catch (error) {
    return handleRouteError(error);
  }
}
