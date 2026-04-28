import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import CookieService from "@/services/cookies";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    CookieService.clearAuth(); // ✅ clear cookies only
    queryClient.clear(); // optional (recommended)
    toast.success("Logged out successfully");
    router.push("/auth/login");
    router.refresh();
  };

  return { logout };
}
