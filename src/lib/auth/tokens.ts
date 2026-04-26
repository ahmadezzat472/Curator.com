import { createHash, randomUUID } from "crypto";

export function hashRefreshToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function newTokenFamily(): string {
  return randomUUID();
}

export function newJti(): string {
  return randomUUID();
}
