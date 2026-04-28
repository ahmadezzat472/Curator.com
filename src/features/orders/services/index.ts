import { api } from "@/services/api";
import type { Order, PlaceOrderPayload } from "../types";

export const ordersService = {
  getMyOrders: (page = 1): Promise<ApiResponse<Order[]>> =>
    api<ApiResponse<Order[]>>(`orders?page=${page}`),

  getOrderById: (id: string): Promise<Order> => api<Order>(`orders/${id}`),

  placeOrder: (payload: PlaceOrderPayload): Promise<Order> =>
    api<Order>("orders", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  cancelOrder: (id: string): Promise<Order> =>
    api<Order>(`orders/${id}/cancel`, { method: "PUT" }),

  // Admin only
  getAllOrders: (page = 1): Promise<ApiResponse<Order[]>> =>
    api<ApiResponse<Order[]>>(`admin/orders?page=${page}`),

  updateOrderStatus: (id: string, status: string): Promise<Order> =>
    api<Order>(`admin/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};
