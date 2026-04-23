import { RegisterSchema } from "@/features/auth/auth.dto";
import { authService } from "@/features/auth/auth.service";
import { created, handleRouteError } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = RegisterSchema.parse(body);
    const newUser = await authService.register(data);
    return created(newUser);
  } catch (error) {
    return handleRouteError(error);
  }
}
