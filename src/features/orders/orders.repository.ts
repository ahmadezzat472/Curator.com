import { Order, IOrder } from "@/lib/db/models/Order";

async function createOrder(data: Partial<IOrder>) {
  const order = new Order(data);
  await order.save();
  return order;
}

export async function getOrderById(id: string) {
  return Order.findById(id).populate("user").populate("items.product").exec();
}

export async function getAllOrders({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const [items, total] = await Promise.all([
    Order.find()
      .populate("user")
      .populate("items.product")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec(),
    Order.countDocuments().exec(),
  ]);
  return { items, total };
}

export async function deleteOrderById(id: string) {
  await Order.findByIdAndDelete(id).exec();
}

export async function updateOrder(id: string, updateData: Partial<IOrder>) {
  return Order.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

export const ordersRepository = {
  createOrder,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateOrder,
};
