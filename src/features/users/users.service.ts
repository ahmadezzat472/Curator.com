import { usersRepository } from "./users.repository";
import { UpdateUserDto, CreateUserDto } from "./users.dto";

export async function createUser(data: CreateUserDto) {
  return usersRepository.createUser(
    data.name,
    data.email,
    data.password,
    data.role,
  );
}

export async function getUserByEmail(email: string) {
  return usersRepository.getUserByEmail(email);
}

export async function getUserById(id: string) {
  return usersRepository.getUserById(id);
}

export async function getAllUsers(params: { page: number; pageSize: number }) {
  return usersRepository.getAllUsers(params);
}

export async function deleteUserById(id: string) {
  await usersRepository.deleteUserById(id);
}

export async function updateUser(id: string, updateData: UpdateUserDto) {
  return usersRepository.updateUser(id, updateData);
}

export const usersService = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUser,
};
