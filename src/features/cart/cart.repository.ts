import { Cart, ICart } from "@/lib/db/models/Cart";

async function getOrCreateByUser(userId: string): Promise<ICart> {
  const existing = await Cart.findOne({ user: userId }).exec();
  if (existing) return existing;
  return Cart.create({ user: userId, items: [] });
}

async function getPopulatedByUser(userId: string) {
  return Cart.findOne({ user: userId }).populate("items.product").exec();
}

async function deleteByUser(userId: string) {
  await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }).exec();
}

export const cartRepository = {
  getOrCreateByUser,
  getPopulatedByUser,
  deleteByUser,
};
