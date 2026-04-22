import { api } from "@/services/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from "../types";

export const authService = {
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    api<AuthResponse>("auth/signin", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    api<AuthResponse>("auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: (): Promise<void> => api<void>("auth/logout", { method: "POST" }),

  getProfile: (): Promise<User> => api<User>("auth/me"),

  updateProfile: (payload: UpdateProfilePayload): Promise<User> => {
    // FormData if avatar is included, JSON otherwise
    if (payload.avatar) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value),
          );
        }
      });
      return api<User>("auth/profile", { method: "PUT", body: formData });
    }
    return api<User>("auth/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  forgotPassword: (email: string): Promise<{ message: string }> =>
    api<{ message: string }>("auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (payload: {
    token: string;
    password: string;
  }): Promise<{ message: string }> =>
    api<{ message: string }>("auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
