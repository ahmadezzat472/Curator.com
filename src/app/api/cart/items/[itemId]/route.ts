import { UpdateCartItemSchema } from "@/features/cart/cart.dto";
import { cartService } from "@/features/cart/cart.service";
import { handleRouteError, ok } from "@/lib/api/response";
import { ObjectIdSchema } from "@/lib/api/validation";
import { requireAuth } from "@/lib/rbac/guards";

type RouteContext = { params: Promise<{ itemId: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireAuth();
    const { itemId } = await params;
    const id = ObjectIdSchema.parse(itemId);
    const body = await request.json();
    const data = UpdateCartItemSchema.parse(body);
    const cart = await cartService.updateItem(currentUser.sub, id, data);
    return ok(cart);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireAuth();
    const { itemId } = await params;
    const id = ObjectIdSchema.parse(itemId);
    const cart = await cartService.removeItem(currentUser.sub, id);
    return ok(cart);
  } catch (error) {
    return handleRouteError(error);
  }
}
