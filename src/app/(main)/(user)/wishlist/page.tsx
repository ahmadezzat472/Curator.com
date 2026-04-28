"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import ProductCard from "@/features/products/components/ProductCard";

export default function WishlistPage() {
  const { data, isLoading } = useWishlist();
  const items = data?.results ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium mb-2">Your wishlist is empty</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Save items you love and come back to them anytime.
        </p>
        <Button asChild variant="outline">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
