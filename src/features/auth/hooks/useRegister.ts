import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { RegisterPayload } from "../types";
import { authService } from "../services";
import CookieService from "@/services/cookies";
import { formatValidationErrors } from "@/lib/formatValidationErrors";

export function useRegister() {
  const router = useRouter();

  return useApiMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      const results = data.data;

      CookieService.set("role", results.user.role);

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      const apiError = error as ApiError;
      const description = formatValidationErrors(apiError);

      toast.error(
        apiError.message ?? "Registration failed. Please try again.",
        description ? { description } : undefined,
      );
    },
  });
}
