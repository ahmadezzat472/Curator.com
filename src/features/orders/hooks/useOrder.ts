"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { ordersService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

// ─── Get single order ─────────────────────────────────────────────────────────
export function useOrder(id: string) {
  return useApiQuery(
    QUERY_KEYS.orders.detail(id),
    () => ordersService.getOrderById(id),
    {
      enabled: !!id,
      staleTime: 1000 * 60,
    },
  );
}
