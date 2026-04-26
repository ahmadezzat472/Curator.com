import { BadRequestError } from "@/lib/api/errors";
import { Product, IProduct } from "@/lib/db/models/Product";

async function createProduct(data: Partial<IProduct>) {
  const existingProduct = await Product.findOne({ slug: data.slug }).exec();
  if (existingProduct) {
    throw new BadRequestError("Product with this slug already exists");
  }
  const product = new Product(data);
  await product.save();
  return product;
}

export async function getProductById(id: string) {
  return Product.findById(id).populate("category").populate("seller").exec();
}

export async function getProductBySlug(slug: string) {
  return Product.findOne({ slug })
    .populate("category")
    .populate("seller")
    .exec();
}

export async function getAllProducts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const [items, total] = await Promise.all([
    Product.find()
      .populate("category")
      .populate("seller")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec(),
    Product.countDocuments().exec(),
  ]);
  return { items, total };
}

export async function deleteProductById(id: string) {
  await Product.findByIdAndDelete(id).exec();
}

export async function updateProduct(id: string, updateData: Partial<IProduct>) {
  return Product.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

export const productsRepository = {
  createProduct,
  getProductById,
  getProductBySlug,
  getAllProducts,
  deleteProductById,
  updateProduct,
};
