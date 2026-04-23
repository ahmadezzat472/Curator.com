import { Suspense } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";
import type { ProductFilters as ProductFiltersParams } from "../types";
import type { ProductsPageSearchParams } from "../types/ProductsSearchParams";
import { getParamValue } from "../lib/getParamValue";
import { toNumber } from "../lib/toNumber";
import { toSort } from "../lib/toSort";

interface ProductsContainerProps {
  searchParams: ProductsPageSearchParams;
}

export default function ProductsContainer({
  searchParams,
}: ProductsContainerProps) {
  const q = getParamValue(searchParams.q);
  const category = getParamValue(searchParams.category);
  const minPrice = toNumber(getParamValue(searchParams.minPrice));
  const maxPrice = toNumber(getParamValue(searchParams.maxPrice));
  const sort = toSort(getParamValue(searchParams.sort));
  const page = toNumber(getParamValue(searchParams.page)) ?? 1;

  const filters: ProductFiltersParams = {
    q,
    category,
    minPrice,
    maxPrice,
    sort,
    page,
    limit: 12,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {q ? `Results for "${q}"` : "All Products"}
      </h1>

      <div className="flex gap-8">
        <Suspense fallback={<div className="w-64 shrink-0" />}>
          <ProductFilters />
        </Suspense>

        <div className="flex-1">
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  );
}
