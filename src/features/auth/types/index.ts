export type UserRole = "customer" | "vendor" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address?: Address;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type AuthResponse = {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "vendor";
  phone?: string;
};

export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  address?: Address;
  avatar?: File;
};
