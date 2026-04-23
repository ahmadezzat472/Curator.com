"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { ordersService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";

export function useMyOrders(page = 1) {
  return useApiQuery(
    [...QUERY_KEYS.orders.all, page],
    () => ordersService.getMyOrders(page),
    { staleTime: 1000 * 60 * 2 },
  );
}
