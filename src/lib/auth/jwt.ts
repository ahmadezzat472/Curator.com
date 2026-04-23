import { SignJWT, jwtVerify, JWTPayload } from "jose";
import type { Role } from "@/lib/db/models/User";

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!,
);
const ACCESS_TTL = process.env.JWT_ACCESS_TTL || "15m";
const REFRESH_TTL = process.env.JWT_REFRESH_TTL || "30d";

export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  role: Role;
}

export interface RefreshTokenPayload extends JWTPayload {
  sub: string;
  family: string;
  jti: string; // unique per token — used for rotation tracking
}

export async function signAccessToken(
  payload: Omit<AccessTokenPayload, keyof JWTPayload>,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .setIssuer("marketplace")
    .setAudience("marketplace-web")
    .sign(ACCESS_SECRET);
}

export async function signRefreshToken(
  payload: Omit<RefreshTokenPayload, keyof JWTPayload>,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TTL)
    .setIssuer("marketplace")
    .setAudience("marketplace-refresh")
    .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, ACCESS_SECRET, {
    issuer: "marketplace",
    audience: "marketplace-web",
  });
  return payload as AccessTokenPayload;
}

export async function verifyRefreshToken(
  token: string,
): Promise<RefreshTokenPayload> {
  const { payload } = await jwtVerify(token, REFRESH_SECRET, {
    issuer: "marketplace",
    audience: "marketplace-refresh",
  });
  return payload as RefreshTokenPayload;
}
