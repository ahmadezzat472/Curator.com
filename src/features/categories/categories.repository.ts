import { BadRequestError } from "@/lib/api/errors";
import { Category, ICategory } from "@/lib/db/models/Category";

async function createCategory(data: Partial<ICategory>) {
  const existingCategory = await Category.findOne({ slug: data.slug }).exec();
  if (existingCategory) {
    throw new BadRequestError("Category with this slug already exists");
  }
  const category = new Category(data);
  await category.save();
  return category;
}

export async function getCategoryById(id: string) {
  return Category.findById(id).exec();
}

export async function getCategoryBySlug(slug: string) {
  return Category.findOne({ slug }).exec();
}

export async function getAllCategories() {
  return Category.find().exec();
}

export async function deleteCategoryById(id: string) {
  await Category.findByIdAndDelete(id).exec();
}

export async function updateCategory(
  id: string,
  updateData: Partial<ICategory>,
) {
  return Category.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

export const categoriesRepository = {
  createCategory,
  getCategoryById,
  getCategoryBySlug,
  getAllCategories,
  deleteCategoryById,
  updateCategory,
};
