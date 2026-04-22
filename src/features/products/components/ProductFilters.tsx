"use client";
// CLIENT because: manages URL search params on user interaction,
// uses useSearchParams, useRouter — all browser/navigation APIs

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCategories } from "@/features/products/hooks/useCategories";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: categories } = useCategories();

  // Generic helper — updates one param and preserves the rest
  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1 on any filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const clearAll = () => router.push(pathname);

  const hasActiveFilters =
    searchParams.has("category") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice") ||
    searchParams.has("sort");

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

          {categories?.map((cat) => (
            <label
              key={cat.id}
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

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground"
          onClick={clearAll}
        >
          Clear all filters
        </Button>
      )}
    </aside>
  );
}
