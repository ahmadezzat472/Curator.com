export type Role = "customer" | "vendor" | "admin";

export const ROLES = {
  CUSTOMER: "customer",
  VENDOR: "vendor",
  ADMIN: "admin",
} as const satisfies Record<string, Role>;

const RANK: Record<Role, number> = {
  customer: 1,
  vendor: 2,
  admin: 3,
};

export function hasAtLeast(actual: Role, required: Role): boolean {
  return RANK[actual] >= RANK[required];
}

export function isOneOf(actual: Role, allowed: Role[]): boolean {
  return allowed.includes(actual);
}
