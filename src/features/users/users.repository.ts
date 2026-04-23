import { IUser, User } from "@/lib/db/models/User";

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

export async function getUserByEmail(email: string) {
  return User.findOne({ email }).exec();
}

export async function getUserById(id: string) {
  return User.findById(id).exec();
}

export async function getAllUsers() {
  return User.find().exec();
}

export async function deleteUserById(id: string) {
  await User.findByIdAndDelete(id).exec();
}

export async function updateUser(id: string, updateData: Partial<IUser>) {
  return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

export const usersRepository = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUser,
};
