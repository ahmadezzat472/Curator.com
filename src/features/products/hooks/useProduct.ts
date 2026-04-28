"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { productsService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useProduct(id: string) {
  return useApiQuery(
    QUERY_KEYS.products.detail(id),
    () => productsService.getById(id),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 10,
    },
  );
}
