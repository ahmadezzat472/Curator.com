"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cartService } from "../services";
import type { UpdateCartItemPayload } from "../types";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (payload: UpdateCartItemPayload) =>
      cartService.updateItem(payload),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(QUERY_KEYS.cart.mine, updatedCart);
      toast.success("Quantity updated");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Could not update quantity");
    },
  });
}
