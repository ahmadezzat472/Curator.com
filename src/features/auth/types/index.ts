export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
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
  username: string;
  results: {
    token: string;
    role: UserRole;
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
  phone?: string;
};

export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  address?: Address;
  avatar?: File;
};
