import { categoriesRepository } from "./categories.repository";
import { CreateCategoryDto, UpdateCategoryDto } from "./categories.dto";

export async function createCategory(data: CreateCategoryDto) {
  return categoriesRepository.createCategory(data);
}

export async function getCategoryById(id: string) {
  return categoriesRepository.getCategoryById(id);
}

export async function getCategoryBySlug(slug: string) {
  return categoriesRepository.getCategoryBySlug(slug);
}

export async function getAllCategories() {
  return categoriesRepository.getAllCategories();
}

export async function deleteCategoryById(id: string) {
  await categoriesRepository.deleteCategoryById(id);
}

export async function updateCategory(id: string, data: UpdateCategoryDto) {
  return categoriesRepository.updateCategory(id, data);
}

export const categoriesService = {
  createCategory,
  getCategoryById,
  getCategoryBySlug,
  getAllCategories,
  deleteCategoryById,
  updateCategory,
};
