import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { RegisterPayload } from "../types";
import { authService } from "../services";
import CookieService from "@/services/cookies";

export function useRegister() {
  const router = useRouter();

  return useApiMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      const { results, username } = data;

      CookieService.set("token", results.token);
      CookieService.set("role", results.role);
      CookieService.set("username", username);

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Registration failed. Please try again.");
    },
  });
}
