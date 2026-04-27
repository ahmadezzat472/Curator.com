import { cartRepository } from "./cart.repository";
import { AddCartItemDto, UpdateCartItemDto } from "./cart.dto";
import { BadRequestError, NotFoundError } from "@/lib/api/errors";
import { Product, IProduct } from "@/lib/db/models/Product";
import type { ICart } from "@/lib/db/models/Cart";

export type PublicCartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  slug: string;
};

export type PublicCart = {
  items: PublicCartItem[];
  total: number;
};

function isPopulatedProduct(value: unknown): value is IProduct {
  return (
    typeof value === "object" &&
    value !== null &&
    "price" in value &&
    "name" in value
  );
}

export function toPublicCart(cart: ICart | null): PublicCart {
  if (!cart) return { items: [], total: 0 };
  const items: PublicCartItem[] = [];
  let total = 0;
  for (const item of cart.items) {
    const product = item.product as unknown;
    if (!isPopulatedProduct(product)) continue;
    const price = product.price;
    const qty = item.quantity;
    total += price * qty;
    items.push({
      id: String(item._id),
      productId: String(product._id),
      name: product.name,
      price,
      quantity: qty,
      image: product.images?.[0] ?? "",
      stock: product.stock,
      slug: product.slug,
    });
  }
  return { items, total };
}

async function assertStock(productId: string, quantity: number) {
  const product = await Product.findById(productId).exec();
  if (!product) throw new NotFoundError("Product not found");
  if (quantity > product.stock) {
    throw new BadRequestError(
      `Only ${product.stock} item(s) of "${product.name}" in stock`,
    );
  }
}

async function getCart(userId: string): Promise<PublicCart> {
  await cartRepository.getOrCreateByUser(userId);
  const cart = await cartRepository.getPopulatedByUser(userId);
  return toPublicCart(cart);
}

async function addItem(
  userId: string,
  data: AddCartItemDto,
): Promise<PublicCart> {
  const cart = await cartRepository.getOrCreateByUser(userId);
  const existing = cart.items.find(
    (item) => String(item.product) === data.productId,
  );
  const nextQuantity = (existing?.quantity ?? 0) + data.quantity;
  await assertStock(data.productId, nextQuantity);
  if (existing) {
    existing.quantity = nextQuantity;
  } else {
    cart.items.push({ product: data.productId, quantity: data.quantity } as never);
  }
  await cart.save();
  const populated = await cartRepository.getPopulatedByUser(userId);
  return toPublicCart(populated);
}

async function updateItem(
  userId: string,
  itemId: string,
  data: UpdateCartItemDto,
): Promise<PublicCart> {
  const cart = await cartRepository.getOrCreateByUser(userId);
  const item = cart.items.id(itemId);
  if (!item) throw new NotFoundError("Cart item not found");
  await assertStock(String(item.product), data.quantity);
  item.quantity = data.quantity;
  await cart.save();
  const populated = await cartRepository.getPopulatedByUser(userId);
  return toPublicCart(populated);
}

async function removeItem(
  userId: string,
  itemId: string,
): Promise<PublicCart> {
  const cart = await cartRepository.getOrCreateByUser(userId);
  const item = cart.items.id(itemId);
  if (!item) throw new NotFoundError("Cart item not found");
  item.deleteOne();
  await cart.save();
  const populated = await cartRepository.getPopulatedByUser(userId);
  return toPublicCart(populated);
}

async function clearCart(userId: string) {
  await cartRepository.deleteByUser(userId);
}

export const cartService = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};
