"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Order, OrderStatus } from "@/features/orders/types";
import { useMyOrders } from "@/features/orders/hooks/useMyOrders";
import { useCancelOrder } from "@/features/orders/hooks/useCancelOrder";

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default function OrdersPage() {
  const [page, ] = useState(1);
  const { data, isLoading } = useMyOrders(page);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium mb-2">No orders yet</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your order history will appear here.
        </p>
        <Button asChild variant="outline">
          <Link href="/products">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">My Orders</h1>

      <div className="space-y-3">
        {data.data.map((order: Order) => (
          <div
            key={order.id}
            className="rounded-xl border bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Order ID</p>
                <p className="text-sm font-mono font-medium">
                  #{order.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              {order.items.slice(0, 2).map((item) => (
                <span key={item.id}>
                  {item.name} × {item.quantity}
                  {order.items.indexOf(item) <
                  Math.min(order.items.length, 2) - 1
                    ? ", "
                    : ""}
                </span>
              ))}
              {order.items.length > 2 && ` +${order.items.length - 2} more`}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 border-t pt-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-semibold">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">
                {order.status === "PENDING" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isCancelling}
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel
                  </Button>
                )}
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/orders/${order.id}`}>View details</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* {data.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.pages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page === data.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )} */}
    </div>
  );
}
