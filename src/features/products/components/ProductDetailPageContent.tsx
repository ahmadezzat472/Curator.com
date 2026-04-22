import Image from "next/image";
import { notFound } from "next/navigation";
import { productsService } from "../services";

// import { AddToCartButton } from "./AddToCartButton";
// import { WishlistButton } from "./WishlistButton";
// import { ReviewsSection } from "@/features/reviews/components/ReviewsSection";

type ProductDetailPageContentProps = {
  slug: string;
};

async function getProduct(slug: string) {
  try {
    return await productsService.getBySlug(slug);
  } catch {
    notFound();
  }
}

export default async function ProductDetailPageContent({
  slug,
}: ProductDetailPageContentProps) {
  const product = await getProduct(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(0, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted border"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
            <h1 className="text-2xl font-semibold mt-1">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <p
            className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}
          >
            {product.stock > 10
              ? "In stock"
              : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of stock"}
          </p>

          <div className="flex gap-3">
            {/* <AddToCartButton
              productId={product.id}
              disabled={product.stock === 0}
            /> */}
            {/* <WishlistButton productId={product.id} /> */}
          </div>

          <div className="rounded-lg border p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              {product.seller.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sold by</p>
              <p className="text-sm font-medium">{product.seller.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {/* <ReviewsSection productId={product.id} /> */}
      </div>
    </div>
  );
}
