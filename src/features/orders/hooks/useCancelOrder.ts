"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { ordersService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (id: string) => ordersService.cancelOrder(id),
    onSuccess: (updatedOrder) => {
      // Update the single order cache directly — no refetch
      queryClient.setQueryData(
        QUERY_KEYS.orders.detail(updatedOrder.id),
        updatedOrder,
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
      toast.success("Order cancelled");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Could not cancel order");
    },
  });
}
