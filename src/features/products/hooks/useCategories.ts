"use client";

import { QUERY_KEYS } from "@/constants/Querykeys";
import { useApiQuery } from "@/hooks/useApiQuery";
import { productsService } from "../services";

export function useCategories() {
  return useApiQuery(
    QUERY_KEYS.categories.all,
    () => productsService.getCategories(),
    { staleTime: 1000 * 60 * 60 }, 
  );
}
