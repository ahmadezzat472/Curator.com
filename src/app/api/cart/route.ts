import { cartService } from "@/features/cart/cart.service";
import { handleRouteError, noContent, ok } from "@/lib/api/response";
import { requireAuth } from "@/lib/rbac/guards";

export async function GET() {
  try {
    const currentUser = await requireAuth();
    const cart = await cartService.getCart(currentUser.sub);
    return ok(cart);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE() {
  try {
    const currentUser = await requireAuth();
    await cartService.clearCart(currentUser.sub);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
