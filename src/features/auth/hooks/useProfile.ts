import { QUERY_KEYS } from "@/constants/Querykeys";
import { useApiQuery } from "@/hooks/useApiQuery";
import CookieService from "@/services/cookies";
import { authService } from "../services";

export function useProfile() {
  const isLoggedIn = !!(
    CookieService.get("accessToken") 
  );

  return useApiQuery(QUERY_KEYS.auth.profile, () => authService.getProfile(), {
    enabled: isLoggedIn, // only fetch if token exists
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // don't retry on 401
  });
}
