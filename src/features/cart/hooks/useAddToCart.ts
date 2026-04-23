"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cartService } from "../services";

import type { AddToCartPayload } from "../types";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (payload: AddToCartPayload) => cartService.addItem(payload),
    onSuccess: (updatedCart) => {
      // Replace the entire cart cache with the response — no refetch needed
      queryClient.setQueryData(QUERY_KEYS.cart.mine, updatedCart);
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Could not add to cart");
    },
  });
}
