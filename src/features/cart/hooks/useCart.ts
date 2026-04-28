"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { cartService } from "../services";
import { QUERY_KEYS } from "@/constants/Querykeys";
import CookieService from "@/services/cookies";
import { ACCESS_COOKIE } from "@/constants/CookiesKeys";

export function useCart() {
  const isLoggedIn = !!CookieService.get(ACCESS_COOKIE);

  return useApiQuery(QUERY_KEYS.cart.mine, () => cartService.getCart(), {
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 2,
  });
}
