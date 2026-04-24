import { UpdateUserSchema } from "@/features/users/users.dto";
import { usersService } from "@/features/users/users.service";
import { NotFoundError } from "@/lib/api/errors";
import { handleRouteError, noContent, ok } from "@/lib/api/response";
import { ObjectIdSchema } from "@/lib/api/validation";
import { requireRoles } from "@/lib/rbac/guards";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  try {
    await requireRoles("admin");
    const { id } = await params;
    const userId = ObjectIdSchema.parse(id);
    const user = await usersService.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");
    return ok(user);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await requireRoles("admin");
    const { id } = await params;
    const userId = ObjectIdSchema.parse(id);
    const body = await request.json();
    const data = UpdateUserSchema.parse(body);
    const updatedUser = await usersService.updateUser(userId, data);
    if (!updatedUser) throw new NotFoundError("User not found");
    return ok(updatedUser);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    await requireRoles("admin");
    const { id } = await params;
    const userId = ObjectIdSchema.parse(id);
    await usersService.deleteUserById(userId);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
