"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { api } from "@/services/api";

type PaginatedResponse<T> = {
  data?: T[];
  results?: T[];
  meta?: { total?: number; totalPages?: number };
  total?: number;
  pages?: number;
};

function getTotal<T>(response?: PaginatedResponse<T>) {
  if (!response) return 0;
  if (typeof response.total === "number") return response.total;
  if (typeof response.meta?.total === "number") return response.meta.total;
  return (response.data ?? response.results ?? []).length;
}

export default function AdminDashboard() {
  const usersQuery = useApiQuery(["admin-stats", "users"], () =>
    api<PaginatedResponse<unknown>>("users?page=1&pageSize=1"),
  );
  const ordersQuery = useApiQuery(["admin-stats", "orders"], () =>
    api<PaginatedResponse<unknown>>("orders?page=1&pageSize=1"),
  );
  const productsQuery = useApiQuery(["admin-stats", "products"], () =>
    api<PaginatedResponse<unknown>>("products?page=1&pageSize=1"),
  );
  const categoriesQuery = useApiQuery(["admin-stats", "categories"], () =>
    api<{ data?: unknown[]; results?: unknown[] }>("categories"),
  );

  const isLoading =
    usersQuery.isLoading ||
    ordersQuery.isLoading ||
    productsQuery.isLoading ||
    categoriesQuery.isLoading;

  const stats = [
    { label: "Total users", value: getTotal(usersQuery.data) },
    { label: "Total products", value: getTotal(productsQuery.data) },
    { label: "Total orders", value: getTotal(ordersQuery.data) },
    {
      label: "Categories",
      value: (categoriesQuery.data?.data ?? categoriesQuery.data?.results ?? [])
        .length,
    },
  ];

  const statItems = isLoading
    ? Array.from({ length: 4 }).map(() => ({ label: "Loading", value: "..." }))
    : stats;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, i) => (
          <div
            key={`${stat.label}-${i}`}
            className="rounded-xl border bg-card p-4 space-y-1"
          >
            <p className="text-xs text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
