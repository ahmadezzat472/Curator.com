import { authRepository } from "./auth.repository";
import { RegisterDto, LoginDto } from "./auth.dto";

export async function register(data: RegisterDto) {
  const existingUser = await authRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already in use");
  }
  return authRepository.createUser(
    data.name,
    data.email,
    data.password,
    data.role,
  );
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
  return user;
}

export const authService = {
  register,
  login,
};
