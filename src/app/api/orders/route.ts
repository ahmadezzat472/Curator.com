import { CreateOrderSchema } from "@/features/orders/orders.dto";
import { ordersService } from "@/features/orders/orders.service";
import { created, handleRouteError, paginated } from "@/lib/api/response";
import { PaginationSchema } from "@/lib/api/validation";
import { requireAuth, requireRoles } from "@/lib/rbac/guards";

export async function GET(request: Request) {
  try {
    await requireRoles("admin");
    const { searchParams } = new URL(request.url);
    const { page, pageSize } = PaginationSchema.parse(
      Object.fromEntries(searchParams),
    );
    const { items, total } = await ordersService.getAllOrders({
      page,
      pageSize,
    });
    return paginated(items, page, pageSize, total);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await requireAuth();
    const body = await request.json();
    const data = CreateOrderSchema.parse({ ...body, user: currentUser.sub });
    const order = await ordersService.createOrder(data);
    return created(order);
  } catch (error) {
    return handleRouteError(error);
  }
}
