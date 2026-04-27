import { api } from "@/services/api";
import type { Product, ProductFilters, Category } from "../types";

// Build query string from filters object
const toParams = (filters?: ProductFilters): string => {
  if (!filters) return "";
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });
  const str = params.toString();
  return str ? `?${str}` : "";
};

export const productsService = {
  getAll: (filters?: ProductFilters): Promise<ApiResponse<Product[]>> =>
    api<ApiResponse<Product[]>>(`products${toParams(filters)}`),

  getBySlug: (slug: string): Promise<Product> =>
    api<Product>(`products?slug=${slug}`),

  getCategories: (): Promise<ApiResponse<Category[]>> =>
    api<ApiResponse<Category[]>>("categories", {
      next: { revalidate: 3600 }, // categories rarely change — 1 hour
    }),

  // Seller only
  createProduct: (payload: FormData): Promise<Product> =>
    api<Product>("products", { method: "POST", body: payload }),

  updateProduct: (id: string, payload: FormData): Promise<Product> =>
    api<Product>(`products/${id}`, { method: "PUT", body: payload }),

  deleteProduct: (id: string): Promise<void> =>
    api<void>(`products/${id}`, { method: "DELETE" }),
};
