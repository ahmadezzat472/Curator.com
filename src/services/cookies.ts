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
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });
    Cookies.remove("username", { path: "/" });
  },
};

export default CookieService;
