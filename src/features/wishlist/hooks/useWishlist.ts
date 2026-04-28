"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import CookieService from "@/services/cookies";
import { QUERY_KEYS } from "@/constants/Querykeys";
import { wishlistService } from "../services";
import { ACCESS_COOKIE } from "@/constants/CookiesKeys";

export function useWishlist() {
  const isLoggedIn = !!CookieService.get(ACCESS_COOKIE);

  return useApiQuery(
    QUERY_KEYS.wishlist.mine,
    () => wishlistService.getWishlist(),
    { enabled: isLoggedIn, staleTime: 1000 * 60 * 5 },
  );
}
