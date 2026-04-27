import { AddCartItemSchema } from "@/features/cart/cart.dto";
import { cartService } from "@/features/cart/cart.service";
import { handleRouteError, ok } from "@/lib/api/response";
import { requireAuth } from "@/lib/rbac/guards";

export async function POST(request: Request) {
  try {
    const currentUser = await requireAuth();
    const body = await request.json();
    const data = AddCartItemSchema.parse(body);
    const cart = await cartService.addItem(currentUser.sub, data);
    return ok(cart);
  } catch (error) {
    return handleRouteError(error);
  }
}
