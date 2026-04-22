"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { productsService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

// ─── Delete product (seller/admin) ────────────────────────────────────────────
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to delete product");
    },
  });
}
