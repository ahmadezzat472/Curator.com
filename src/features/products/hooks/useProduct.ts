"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { productsService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

// ─── Get single product by slug ───────────────────────────────────────────────
export function useProduct(slug: string) {
  return useApiQuery(
    QUERY_KEYS.products.detail(slug),
    () => productsService.getBySlug(slug),
    {
      enabled: !!slug,
      staleTime: 1000 * 60 * 10,
    },
  );
}
