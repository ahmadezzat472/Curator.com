import { useApiMutation } from "@/hooks/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services";
import CookieService from "@/services/cookies";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useApiMutation<void, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      CookieService.clearAuth();
      queryClient.clear(); // wipe all cached queries
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    },
    onError: () => {
      // Logout locally even if server call fails
      CookieService.clearAuth();
      queryClient.clear();
      router.push("/login");
      router.refresh();
    },
  });
}
