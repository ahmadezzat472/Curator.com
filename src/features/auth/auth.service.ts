import { authRepository } from "./auth.repository";
import { RegisterDto, LoginDto } from "./auth.dto";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { hashRefreshToken, newJti, newTokenFamily } from "@/lib/auth/tokens";
import type { IUser } from "@/lib/db/models/User";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: IUser["role"];
  createdAt: Date;
  updatedAt: Date;
};

export function toPublicUser(user: IUser): PublicUser {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function issueTokens(user: IUser) {
  const userId = String(user._id);
  const accessToken = await signAccessToken({
    sub: userId,
    email: user.email,
    role: user.role,
  });
  const refreshToken = await signRefreshToken({
    sub: userId,
    family: newTokenFamily(),
    jti: newJti(),
  });
  await authRepository.saveHashedRefreshToken(
    userId,
    hashRefreshToken(refreshToken),
  );
  return { accessToken, refreshToken };
}

export async function register(data: RegisterDto) {
  const existingUser = await authRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const user = await authRepository.createUser(
    data.name,
    data.email,
    data.password,
    data.role,
  );
  const tokens = await issueTokens(user);
  return { user: toPublicUser(user), ...tokens };
}

export async function login(data: LoginDto) {
  const user = await authRepository.findUserByEmailWithPassword(data.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await user.verifyPassword(data.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const tokens = await issueTokens(user);
  return { user: toPublicUser(user), ...tokens };
}

export const authService = {
  register,
  login,
  issueTokens,
  toPublicUser,
};
