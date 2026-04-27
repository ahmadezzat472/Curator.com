// No "use client" — this is a Server Component
// SERVER because: pure display, no state, no events, SEO matters

import Link from "next/link";
import Image from "next/image";
import type { Product } from "../types";
// import { AddToCartButton } from "./AddToCartButton"; // Client island
// import { WishlistButton } from "./WishlistButton"; // Client island

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100,
      )
    : null;

  return (
    <div className="group relative flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <Image
          src={product.images[0] || "/no-img.png"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Wishlist — Client island inside Server Component */}
        <div className="absolute top-2 right-2">
          {/* <WishlistButton productId={product.id} /> */}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <Link href={`/products/${product.slug}`}>
          <p className="text-xs text-muted-foreground">
            {product.category.name}
          </p>
          <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xs">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          {product.comparePrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.comparePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart — Client island */}
        {/* <AddToCartButton
          productId={product.id}
          disabled={product.stock === 0}
        /> */}
      </div>
    </div>
  );
}

export default ProductCard;
