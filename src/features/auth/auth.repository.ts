import { User } from "@/lib/db/models/User";

async function createUser(
  name: string,
  email: string,
  password: string,
  role: "customer" | "vendor" | "admin" = "customer",
) {
  const user = new User({ name, email, password, role });
  await user.save();
  return user;
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email }).exec();
}

export async function findUserByEmailWithPassword(email: string) {
  return User.findOne({ email }).select("+password").exec();
}

export async function findUserById(id: string) {
  return User.findById(id).exec();
}

export async function saveHashedRefreshToken(
  userId: string,
  hashedToken: string,
) {
  await User.findByIdAndUpdate(userId, { hashedRefreshToken: hashedToken });
}

export async function invalidateRefreshTokens(userId: string) {
  await User.findByIdAndUpdate(userId, { hashedRefreshToken: null });
}

async function updatePassword(userId: string, newPassword: string) {
  const user = await User.findById(userId).select("+password").exec();
  if (!user) throw new Error("User not found");
  user.password = newPassword;
  await user.save();
}

export const authRepository = {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
  saveHashedRefreshToken,
  invalidateRefreshTokens,
  updatePassword,
};
