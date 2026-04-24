import { productsRepository } from "./products.repository";
import { CreateProductDto, UpdateProductDto } from "./products.dto";
import type { IProduct } from "@/lib/db/models/Product";

export async function createProduct(data: CreateProductDto) {
  return productsRepository.createProduct(data as unknown as Partial<IProduct>);
}

export async function getProductById(id: string) {
  return productsRepository.getProductById(id);
}

export async function getProductBySlug(slug: string) {
  return productsRepository.getProductBySlug(slug);
}

export async function getAllProducts(params: {
  page: number;
  pageSize: number;
}) {
  return productsRepository.getAllProducts(params);
}

export async function deleteProductById(id: string) {
  await productsRepository.deleteProductById(id);
}

export async function updateProduct(id: string, data: UpdateProductDto) {
  return productsRepository.updateProduct(id, data as unknown as Partial<IProduct>);
}

export const productsService = {
  createProduct,
  getProductById,
  getProductBySlug,
  getAllProducts,
  deleteProductById,
  updateProduct,
};
