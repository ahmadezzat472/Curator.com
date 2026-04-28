import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function ProductFiltersSkeleton() {
  return (
    <aside className="w-64 shrink-0 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
    </aside>
  );
}

export default ProductFiltersSkeleton;
