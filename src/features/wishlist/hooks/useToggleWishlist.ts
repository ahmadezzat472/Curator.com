"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { QUERY_KEYS } from "@/constants/Querykeys";
import { wishlistService } from "../services";
import { useWishlist } from "./useWishlist";

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const { data: wishlist } = useWishlist();

  const addMutation = useApiMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(productId),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.wishlist.mine, data);
      toast.success("Added to wishlist");
    },
  });

  const removeMutation = useApiMutation({
    mutationFn: (productId: string) =>
      wishlistService.removeFromWishlist(productId),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.wishlist.mine, data);
      toast.success("Removed from wishlist");
    },
  });

  const isInWishlist = (productId: string) =>
    wishlist?.results.some((p) => p._id === productId) ?? false;

  const toggle = (productId: string) => {
    if (isInWishlist(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return {
    toggle,
    isInWishlist,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
}
