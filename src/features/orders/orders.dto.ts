import { z } from "zod";
import { ObjectIdSchema } from "@/lib/api/validation";

const OrderStatusEnum = z.enum([
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
]);

const PaymentStatusEnum = z.enum(["UNPAID", "PAID", "FAILED", "REFUNDED"]);

const PaymentMethodEnum = z.enum([
  "CREDIT_CARD",
  "PAYPAL",
  "CASH_ON_DELIVERY",
  "WALLET",
]);

const ShippingAddressSchema = z.object({
  name: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
});

const OrderItemSchema = z.object({
  product: ObjectIdSchema,
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string().url().optional(),
  slug: z.string().optional(),
});

export const CreateOrderSchema = z.object({
  user: ObjectIdSchema,
  items: z.array(OrderItemSchema).min(1),
  total: z.number().nonnegative(),
  paymentMethod: PaymentMethodEnum,
  shippingAddress: ShippingAddressSchema,
  status: OrderStatusEnum.optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  trackingNumber: z.string().optional(),
});
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderSchema = z.object({
  status: OrderStatusEnum.optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  trackingNumber: z.string().optional(),
  shippingAddress: ShippingAddressSchema.partial().optional(),
});
export type UpdateOrderDto = z.infer<typeof UpdateOrderSchema>;
