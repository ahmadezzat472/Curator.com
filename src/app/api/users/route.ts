import { CreateUserSchema } from "@/features/users/users.dto";
import { usersService } from "@/features/users/users.service";
import { created, handleRouteError, paginated } from "@/lib/api/response";
import { PaginationSchema } from "@/lib/api/validation";
import { requireRoles } from "@/lib/rbac/guards";

export async function GET(request: Request) {
  try {
    await requireRoles("admin");
    const { searchParams } = new URL(request.url);
    const { page, pageSize } = PaginationSchema.parse(
      Object.fromEntries(searchParams),
    );
    const { items, total } = await usersService.getAllUsers({ page, pageSize });
    return paginated(items, page, pageSize, total);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireRoles("admin");
    const body = await request.json();
    const data = CreateUserSchema.parse(body);
    const newUser = await usersService.createUser(data);
    return created(newUser);
  } catch (error) {
    return handleRouteError(error);
  }
}
