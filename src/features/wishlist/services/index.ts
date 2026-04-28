import type { Product } from "@/features/products/types";
import { api } from "@/services/api";

export type WishlistResponse = {
  results: Product[];
};

export const wishlistService = {
  getWishlist: (): Promise<WishlistResponse> =>
    api<WishlistResponse>("wishlist"),

  addToWishlist: (productId: string): Promise<WishlistResponse> =>
    api<WishlistResponse>("wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    }),

  removeFromWishlist: (productId: string): Promise<WishlistResponse> =>
    api<WishlistResponse>(`wishlist/${productId}`, { method: "DELETE" }),
};
