"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cartService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(QUERY_KEYS.cart.mine, updatedCart);
      toast.success("Item removed");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Could not remove item");
    },
  });
}
