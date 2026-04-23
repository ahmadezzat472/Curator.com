import { CreateUserSchema } from "@/features/users/users.dto";
import { usersService } from "@/features/users/users.service";
import { created, handleRouteError, ok } from "@/lib/api/response";

export async function GET() {
  try {
    const users = await usersService.getAllUsers();
    return ok(users);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateUserSchema.parse(body);
    const newUser = await usersService.createUser(data);
    return created(newUser);
  } catch (error) {
    return handleRouteError(error);
  }
}
