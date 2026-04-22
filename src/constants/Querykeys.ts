export const QUERY_KEYS = {
  auth: {
    profile: ["auth", "profile"] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters?: object) => ["products", "list", filters] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  cart: {
    mine: ["cart"] as const,
  },
  orders: {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", id] as const,
  },
  wishlist: {
    mine: ["wishlist"] as const,
  },
  reviews: {
    byProduct: (productId: string) => ["reviews", productId] as const,
  },
} as const;
