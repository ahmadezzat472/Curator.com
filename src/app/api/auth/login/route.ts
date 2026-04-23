import { authService } from "@/features/auth/auth.service";
import { LoginSchema } from "@/features/auth/auth.dto";

import { handleRouteError, ok } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = LoginSchema.parse(body);
    const user = await authService.login(data);
    return ok(user);
  } catch (error) {
    return handleRouteError(error);
  }
}
