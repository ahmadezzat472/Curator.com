import { api } from "@/services/api";
import type { Product, ProductFilters, Category } from "../types";
import { toParams } from "../lib/buildQueryParams";

export const productsService = {
  getAll: (filters?: ProductFilters): Promise<ApiResponse<Product[]>> =>
    api<ApiResponse<Product[]>>(`products${toParams(filters)}`),

  getById: (id: string): Promise<ApiResponse<Product>> =>
    api<ApiResponse<Product>>(`products/${id}`),

  getCategories: (): Promise<ApiResponse<Category[]>> =>
    api<ApiResponse<Category[]>>("categories", {
      next: { revalidate: 3600 }, // categories rarely change — 1 hour
    }),

  // Seller only
  createProduct: (payload: FormData): Promise<ApiResponse<Product>> =>
    api<ApiResponse<Product>>("products", { method: "POST", body: payload }),

  updateProduct: (
    id: string,
    payload: FormData,
  ): Promise<ApiResponse<Product>> =>
    api<ApiResponse<Product>>(`products/${id}`, {
      method: "PUT",
      body: payload,
    }),

  deleteProduct: (id: string): Promise<void> =>
    api<void>(`products/${id}`, { method: "DELETE" }),
};
