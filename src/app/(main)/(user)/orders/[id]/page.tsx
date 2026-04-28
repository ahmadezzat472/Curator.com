"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/features/orders/hooks/useOrder";
import type { OrderStatus } from "@/features/orders/types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params?.id[0]
        : "";

  const { data, isLoading } = useOrder(orderId);
  const order = (data as { data?: unknown })?.data ?? data;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!order || !orderId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium mb-2">Order not found</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The order you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <Button asChild variant="outline">
          <Link href="/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  const orderData = order as {
    id: string;
    status: OrderStatus;
    paymentStatus: string;
    paymentMethod: string;
    items: Array<{
      id: string;
      productId: string;
      name: string;
      price: number;
      quantity: number;
      image?: string;
      slug?: string;
    }>;
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Order ID</p>
          <h1 className="text-xl font-semibold">#{orderData.id}</h1>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[orderData.status]}`}
        >
          {orderData.status}
        </span>
      </div>

      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Items
          </h2>

          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl border bg-card"
              >
                <Link
                  href={`/products/${item.slug ?? item.productId}`}
                  className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={item.image || "/no-img.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug ?? item.productId}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Qty {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-4 space-y-3 text-sm">
            <h2 className="font-medium">Summary</h2>
            <div className="flex justify-between text-muted-foreground">
              <span>Placed on</span>
              <span>{new Date(orderData.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Payment</span>
              <span>{orderData.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Payment status</span>
              <span>{orderData.paymentStatus}</span>
            </div>
            {orderData.trackingNumber && (
              <div className="flex justify-between text-muted-foreground">
                <span>Tracking</span>
                <span>{orderData.trackingNumber}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total</span>
              <span>${orderData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 space-y-2 text-sm">
            <h2 className="font-medium">Shipping</h2>
            <p>{orderData.shippingAddress.name}</p>
            <p className="text-muted-foreground">
              {orderData.shippingAddress.street},{" "}
              {orderData.shippingAddress.city}
            </p>
            <p className="text-muted-foreground">
              {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
            </p>
            <p className="text-muted-foreground">
              {orderData.shippingAddress.country}
            </p>
            <p className="text-muted-foreground">
              {orderData.shippingAddress.phone}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
