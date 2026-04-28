export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod =
  | "CREDIT_CARD"
  | "PAYPAL"
  | "CASH_ON_DELIVERY"
  | "WALLET";

export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

export type OrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

export type PlaceOrderItem = {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
};

export type PlaceOrderPayload = {
  items: PlaceOrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Order["shippingAddress"];
};

export type OrdersResponse = {
  results: Order[];
  pages: number;
  currentPage: number;
  total?: number;
};
