import { Suspense } from "react";
import ProductGrid from "./ProductGrid";
import { ProductFilters } from "./ProductFilters";
import type { ProductFilters as ProductFiltersParams } from "../types";

type SearchParamValue = string | string[] | undefined;

export type ProductsPageSearchParams = {
  q?: SearchParamValue;
  category?: SearchParamValue;
  minPrice?: SearchParamValue;
  maxPrice?: SearchParamValue;
  sort?: SearchParamValue;
  page?: SearchParamValue;
};

type ProductsPageContentProps = {
  searchParams: ProductsPageSearchParams;
};

const SORT_VALUES: ProductFiltersParams["sort"][] = [
  "newest",
  "price_asc",
  "price_desc",
  "rating",
];

const getParamValue = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const toNumber = (value: string | undefined): number | undefined => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const toSort = (
  value: string | undefined,
): ProductFiltersParams["sort"] | undefined => {
  if (!value) {
    return undefined;
  }

  return SORT_VALUES.includes(value as ProductFiltersParams["sort"])
    ? (value as ProductFiltersParams["sort"])
    : undefined;
};

export default function ProductsPageContent({
  searchParams,
}: ProductsPageContentProps) {
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
