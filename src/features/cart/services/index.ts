import { api } from "@/services/api";
import type { Cart, AddToCartPayload, UpdateCartItemPayload } from "../types";

export const cartService = {
  getCart: (): Promise<Cart> => api<Cart>("cart"),

  addItem: (payload: AddToCartPayload): Promise<Cart> =>
    api<Cart>("cart/items", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateItem: ({ itemId, quantity }: UpdateCartItemPayload): Promise<Cart> =>
    api<Cart>(`cart/items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }),

  removeItem: (itemId: string): Promise<Cart> =>
    api<Cart>(`cart/items/${itemId}`, { method: "DELETE" }),

  clearCart: (): Promise<void> => api<void>("cart", { method: "DELETE" }),

  // applyPromoCode: (code: string): Promise<Cart> =>
  //   api<Cart>("cart/promo", {
  //     method: "POST",
  //     body: JSON.stringify({ code }),
  //   }),

  // removePromoCode: (): Promise<Cart> =>
  //   api<Cart>("cart/promo", { method: "DELETE" }),
};
