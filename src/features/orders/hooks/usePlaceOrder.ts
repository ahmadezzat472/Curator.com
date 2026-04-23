"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { ordersService } from "../services";
import type { PlaceOrderPayload } from "../types";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function usePlaceOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (payload: PlaceOrderPayload) =>
      ordersService.placeOrder(payload),
    onSuccess: (order) => {
      // Invalidate orders list and wipe cart
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
      queryClient.setQueryData(QUERY_KEYS.cart.mine, {
        items: [],
        subtotal: 0,
        total: 0,
        discount: 0,
      });
      toast.success("Order placed successfully!");
      router.push(`/orders/${order.id}`);
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to place order");
    },
  });
}
