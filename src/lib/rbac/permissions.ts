import type { Role } from "./roles";

export type Permission =
  | "users:manage"
  | "categories:manage"
  | "products:write"
  | "orders:list-all"
  | "orders:create"
  | "orders:read-own"
  | "orders:manage-any";

const MATRIX: Record<Role, Permission[]> = {
  customer: ["orders:create", "orders:read-own"],
  vendor: ["products:write", "orders:create", "orders:read-own"],
  admin: [
    "users:manage",
    "categories:manage",
    "products:write",
    "orders:list-all",
    "orders:manage-any",
    "orders:create",
    "orders:read-own",
  ],
};

export function can(role: Role, permission: Permission): boolean {
  return MATRIX[role].includes(permission);
}
