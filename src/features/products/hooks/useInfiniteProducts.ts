"use client";

import { useApiInfiniteQuery } from "@/hooks/useApiInfiniteQuery";
import { productsService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";
import type { ProductFilters } from "../types";

// ─── Get paginated products (load-more / infinite scroll) ─────────────────────
export function useInfiniteProducts(filters?: Omit<ProductFilters, "page">) {
  return useApiInfiniteQuery(
    QUERY_KEYS.products.list(filters),
    ({ pageParam }) =>
      productsService.getAll({ ...filters, page: pageParam, limit: 12 }),
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < lastPage.meta.pages ? allPages.length + 1 : undefined,
      staleTime: 1000 * 60 * 5,
    },
  );
}
