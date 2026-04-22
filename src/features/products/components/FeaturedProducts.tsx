import SuspenseLayoutHOC from "@/components/shared/SuspenseLayoutHOC";
import { Button } from "@/components/ui/button";
import ProductCard from "@/features/products/components/ProductCard";
import { productsService } from "@/features/products/services";
import Link from "next/link";
import FeaturedProductsSkeleton from "./FeaturedProductsSkeleton";

async function FeaturedProducts() {
  const products = await productsService.getAll();

  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-semibold">Featured products</h2>
        <Button variant={"ghost"} size={"sm"}>
          <Link href="/products">View all</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.data.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default SuspenseLayoutHOC(FeaturedProducts, FeaturedProductsSkeleton);
