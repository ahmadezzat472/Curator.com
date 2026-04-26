import { ordersRepository } from "./orders.repository";
import { CreateOrderDto, UpdateOrderDto } from "./orders.dto";
import type { IOrder } from "@/lib/db/models/Order";

export async function createOrder(data: CreateOrderDto) {
  return ordersRepository.createOrder(data as unknown as Partial<IOrder>);
}

export async function getOrderById(id: string) {
  return ordersRepository.getOrderById(id);
}

export async function getAllOrders(params: {
  page: number;
  pageSize: number;
}) {
  return ordersRepository.getAllOrders(params);
}

export async function deleteOrderById(id: string) {
  await ordersRepository.deleteOrderById(id);
}

export async function updateOrder(id: string, data: UpdateOrderDto) {
  return ordersRepository.updateOrder(id, data as unknown as Partial<IOrder>);
}

export const ordersService = {
  createOrder,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateOrder,
};
