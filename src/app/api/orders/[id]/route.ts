import { UpdateOrderSchema } from "@/features/orders/orders.dto";
import { ordersService } from "@/features/orders/orders.service";
import { ForbiddenError, NotFoundError } from "@/lib/api/errors";
import { handleRouteError, noContent, ok } from "@/lib/api/response";
import { ObjectIdSchema } from "@/lib/api/validation";
import { requireAuth, requireRoles } from "@/lib/rbac/guards";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireAuth();
    const { id } = await params;
    const orderId = ObjectIdSchema.parse(id);
    const order = await ordersService.getOrderById(orderId);
    if (!order) throw new NotFoundError("Order not found");
    const ownerId = String(
      (order.user as { _id?: unknown })?._id ?? order.user,
    );
    if (currentUser.role !== "admin" && ownerId !== currentUser.sub) {
      throw new ForbiddenError();
    }
    return ok(order);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await requireRoles("admin");
    const { id } = await params;
    const orderId = ObjectIdSchema.parse(id);
    const body = await request.json();
    const data = UpdateOrderSchema.parse(body);
    const updated = await ordersService.updateOrder(orderId, data);
    if (!updated) throw new NotFoundError("Order not found");
    return ok(updated);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    await requireRoles("admin");
    const { id } = await params;
    const orderId = ObjectIdSchema.parse(id);
    await ordersService.deleteOrderById(orderId);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
