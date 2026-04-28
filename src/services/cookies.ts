import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/constants/CookiesKeys";
import Cookies from "js-cookie";

const CookieService = {
  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  set: (
    key: string,
    value: string,
    options?: Cookies.CookieAttributes,
  ): void => {
    Cookies.set(key, value, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      ...options,
    });
  },

  remove: (key: string): void => {
    Cookies.remove(key, { path: "/" });
  },

  clearAuth: (): void => {
    Cookies.remove(ACCESS_COOKIE, { path: "/" });
    Cookies.remove(REFRESH_COOKIE, { path: "/" });
    Cookies.remove("role", { path: "/" });
  },
};

export default CookieService;
