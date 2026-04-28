"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/services/api";
import type { OrderStatus, PaymentStatus } from "@/features/orders/types";

type AdminOrder = {
  id?: string;
  _id?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  total: number;
  createdAt: string;
  trackingNumber?: string;
  user?: { name?: string; email?: string; _id?: string } | string;
};

type PaginatedResponse<T> = {
  data?: T[];
  results?: T[];
  meta?: { total?: number; totalPages?: number };
  total?: number;
  pages?: number;
};

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

const PAYMENT_OPTIONS: PaymentStatus[] = [
  "UNPAID",
  "PAID",
  "FAILED",
  "REFUNDED",
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [edits, setEdits] = useState<
    Record<string, { status: OrderStatus; paymentStatus: PaymentStatus }>
  >({});

  const ordersQuery = useApiQuery(["admin-orders", page], () =>
    api<PaginatedResponse<AdminOrder>>(`orders?page=${page}&pageSize=12`),
  );

  const updateOrder = useApiMutation({
    mutationFn: ({ id, payload }: { id: string; payload: unknown }) =>
      api<AdminOrder>(`orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("Order updated");
      ordersQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to update order");
    },
  });

  const orders = ordersQuery.data?.data ?? ordersQuery.data?.results ?? [];
  const totalPages =
    ordersQuery.data?.pages ?? ordersQuery.data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Review and update order statuses.
        </p>
      </div>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        {ordersQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 text-left">Order</th>
                  <th className="py-2 text-left">Customer</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Payment</th>
                  <th className="py-2 text-left">Total</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const id = order.id ?? order._id ?? "";
                  const edit = edits[id] ?? {
                    status: order.status,
                    paymentStatus: order.paymentStatus,
                  };

                  const customer =
                    typeof order.user === "string"
                      ? order.user
                      : (order.user?.email ?? order.user?.name ?? "—");

                  return (
                    <tr key={id} className="border-b last:border-0">
                      <td className="py-3 pr-3 font-medium">
                        #{String(id).slice(-8)}
                      </td>
                      <td className="py-3 pr-3 text-muted-foreground">
                        {customer}
                      </td>
                      <td className="py-3 pr-3">
                        <select
                          value={edit.status}
                          onChange={(e) =>
                            setEdits({
                              ...edits,
                              [id]: {
                                ...edit,
                                status: e.target.value as OrderStatus,
                              },
                            })
                          }
                          className="rounded-md border bg-background px-2 py-1 text-xs"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 pr-3">
                        <select
                          value={edit.paymentStatus}
                          onChange={(e) =>
                            setEdits({
                              ...edits,
                              [id]: {
                                ...edit,
                                paymentStatus: e.target.value as PaymentStatus,
                              },
                            })
                          }
                          className="rounded-md border bg-background px-2 py-1 text-xs"
                        >
                          {PAYMENT_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 pr-3">${order.total.toFixed(2)}</td>
                      <td className="py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateOrder.mutate({
                              id,
                              payload: {
                                status: edit.status,
                                paymentStatus: edit.paymentStatus,
                              },
                            })
                          }
                          disabled={updateOrder.isPending || !id}
                        >
                          Save
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
