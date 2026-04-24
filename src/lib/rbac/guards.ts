import "server-only";

import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/auth/cookies";
import {
  verifyAccessToken,
  type AccessTokenPayload,
} from "@/lib/auth/jwt";
import { ForbiddenError, UnauthorizedError } from "@/lib/api/errors";
import type { Role } from "./roles";
import { can, type Permission } from "./permissions";

export async function getCurrentUser(): Promise<AccessTokenPayload | null> {
  const store = await cookies();
  const token = store.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifyAccessToken(token);
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AccessTokenPayload> {
  const user = await getCurrentUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

export async function requireRoles(
  ...roles: Role[]
): Promise<AccessTokenPayload> {
  const user = await requireAuth();
  if (!roles.includes(user.role)) throw new ForbiddenError();
  return user;
}

export async function requirePermission(
  permission: Permission,
): Promise<AccessTokenPayload> {
  const user = await requireAuth();
  if (!can(user.role, permission)) throw new ForbiddenError();
  return user;
}
