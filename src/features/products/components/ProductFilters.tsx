"use client";

import { useCategories } from "@/features/products/hooks/useCategories";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import SuspenseLayoutHOC from "@/components/hoc/SuspenseLayoutHOC";
// import ProductFiltersSkeleton from "./skeletons/ProductFiltersSkeleton";
import { useSetParam } from "@/hooks/useSetParam";
import { useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "../constants/sortOptions";
import { SEARCH_PARAMS_KEYS } from "../constants/searchParamsKeys";

function ProductFilters() {
  const searchParams = useSearchParams();
  const { setParam, clearAll, hasActiveFilters } = useSetParam();

  const { data: categories } = useCategories();

  const isFiltered = hasActiveFilters(...SEARCH_PARAMS_KEYS);

  return (
    <aside className="w-64 shrink-0 space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Category</Label>
        <div className="space-y-1">
          <label className="flex items-center gap-2 cursor-pointer py-1 text-sm">
            <input
              type="radio"
              name="category"
              value=""
              onChange={() => setParam("category", "")}
              checked={!searchParams.get("category")}
              className="accent-primary"
            />
            All categories
          </label>

          {categories?.data?.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center gap-2 cursor-pointer py-1 text-sm"
            >
              <input
                type="radio"
                name="category"
                value={cat.slug}
                onChange={(e) => setParam("category", e.target.value)}
                checked={searchParams.get("category") === cat.slug}
                className="accent-primary"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Price range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="h-8 text-sm"
            defaultValue={searchParams.get("minPrice") ?? ""}
            onBlur={(e) => setParam("minPrice", e.target.value)}
          />
          <span className="text-muted-foreground text-sm">–</span>
          <Input
            type="number"
            placeholder="Max"
            className="h-8 text-sm"
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onBlur={(e) => setParam("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Sort by</Label>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer py-1 text-sm"
            >
              <input
                type="radio"
                name="sort"
                value={opt.value}
                onChange={(e) => setParam("sort", e.target.value)}
                checked={searchParams.get("sort") === opt.value}
                className="accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {isFiltered && (
        <Button
          variant="secondary"
          size="sm"
          className="w-full "
          onClick={clearAll}
        >
          Clear all filters
        </Button>
      )}
    </aside>
  );
}

// export default SuspenseLayoutHOC(ProductFilters, ProductFiltersSkeleton);
export default ProductFilters;
