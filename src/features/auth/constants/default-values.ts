import type { RegisterFormValues } from "../validation";

export const REGISTER_DEFAULT_VALUE: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "customer",
  phone: "",
};

export const LOGIN_DEFAULT_VALUE = { email: "", password: "" };
