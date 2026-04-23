"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { productsService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";
import type { ProductFilters } from "../types";

export function useProducts(filters?: ProductFilters) {
  return useApiQuery(
    QUERY_KEYS.products.list(filters),
    () => productsService.getAll(filters),
    {
      staleTime: 1000 * 60 * 5,
      placeholderData: (prev) => prev, // keep old data while fetching new page
    },
  );
}
