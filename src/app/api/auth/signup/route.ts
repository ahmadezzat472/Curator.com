import { RegisterSchema } from "@/features/auth/auth.dto";
import { authService } from "@/features/auth/auth.service";
import { setAuthCookies } from "@/lib/auth/cookies";
import { created, handleRouteError } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = RegisterSchema.parse(body);
    const { user, accessToken, refreshToken } =
      await authService.register(data);
    await setAuthCookies(accessToken, refreshToken);
    return created({ user, accessToken, refreshToken });
  } catch (error) {
    return handleRouteError(error);
  }
}
