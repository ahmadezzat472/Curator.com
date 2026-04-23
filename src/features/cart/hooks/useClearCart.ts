"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cartService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useClearCart() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.cart.mine, {
        items: [],
        subtotal: 0,
        total: 0,
        discount: 0,
      });
    },
  });
}
