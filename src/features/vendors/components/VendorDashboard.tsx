"use client";

import { useMemo } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { api } from "@/services/api";
import { useProfile } from "@/features/auth/hooks/useProfile";
import type { Product } from "@/features/products/types";

type PaginatedResponse<T> = {
  data?: T[];
  results?: T[];
  meta?: { total?: number; totalPages?: number };
  total?: number;
  pages?: number;
};

export default function VendorDashboard() {
  const { data: profile } = useProfile();
  const profileId =
    (profile as { id?: string; _id?: string } | undefined)?.id ??
    (profile as { id?: string; _id?: string } | undefined)?._id;
  const productsQuery = useApiQuery(["vendor-products"], () =>
    api<PaginatedResponse<Product>>("products?page=1&pageSize=50"),
  );

  const allProducts =
    productsQuery.data?.data ?? productsQuery.data?.results ?? [];

  const vendorProducts = useMemo(() => {
    if (!profileId) return allProducts;
    return allProducts.filter((product) => {
      const sellerId =
        typeof product.seller === "object"
          ? product.seller?._id ?? (product.seller as { id?: string })?.id
          : product.seller;
      return sellerId === profileId;
    });
  }, [allProducts, profileId]);

  const lowStock = vendorProducts.filter((p) => p.stock <= 5).length;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Total products</p>
          <p className="text-2xl font-semibold">
            {productsQuery.isLoading ? "..." : vendorProducts.length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Low stock</p>
          <p className="text-2xl font-semibold">
            {productsQuery.isLoading ? "..." : lowStock}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Active listings</p>
          <p className="text-2xl font-semibold">
            {productsQuery.isLoading ? "..." : vendorProducts.length - lowStock}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        Use the Products tab to create and update your listings.
      </div>
    </div>
  );
}
