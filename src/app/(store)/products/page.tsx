// SERVER Component — no "use client"
// Fetches data on the server, great for SEO and initial load

import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import ProductCard from "@/features/products/components/ProductCard";
import { productsService } from "@/features/products/services";
import type { ProductFilters as ProductFiltersParams } from "@/features/products/types";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full product catalog",
};

type Props = {
  searchParams: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  // Direct async call in a Server Component — no useQuery needed here
  const {
    data: products,
    meta: { total },
  } = await productsService.getAll({
    q: searchParams.q,
    category: searchParams.category,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sort: searchParams.sort as ProductFiltersParams["sort"],
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {searchParams.q ? `Results for "${searchParams.q}"` : "All Products"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {total} products found
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters — Client Component (needs interactivity) */}
        <Suspense fallback={<div className="w-64 shrink-0" />}>
          <ProductFilters />
        </Suspense>

        {/* Grid — Server rendered */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
