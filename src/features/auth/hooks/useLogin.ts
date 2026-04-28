"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { LoginPayload } from "../types";
import { authService } from "../services";
import CookieService from "@/services/cookies";

export function useLogin() {
  const router = useRouter();

  return useApiMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      const results = data.data;
      CookieService.set("role", results.user.role);

      toast.success(`Welcome back, ${results.user.name}!`);

      const redirectMap: Record<string, string> = {
        admin: "/admin/dashboard",
        vendor: "/vendor",
        customer: "/",
      };
      router.push(redirectMap[results.user.role] ?? "/");
      // router.refresh(); // re-run Server Components with the new cookie
    },
    onError: (error) => {
      toast.error(error?.message ?? "Login failed. Please try again.");
    },
  });
}
