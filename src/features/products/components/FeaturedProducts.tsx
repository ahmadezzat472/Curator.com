import SuspenseLayoutHOC from "@/components/hoc/SuspenseLayoutHOC";
import { Button } from "@/components/ui/button";
import ProductCard from "@/features/products/components/ProductCard";
import { productsService } from "@/features/products/services";
import Link from "next/link";
import FeaturedProductsSkeleton from "./skeletons/FeaturedProductsSkeleton";
import NoDataMessage from "@/components/shared/Feedback/NoDataMessage";

async function FeaturedProducts() {
  const products = await productsService.getAll();

  console.log(products);

  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-semibold">Featured products</h2>
        <Button variant={"ghost"} size={"sm"}>
          <Link href="/products">View all</Link>
        </Button>
      </div>
      {products.data.length === 0 ? (
        <NoDataMessage message="No featured products available at the moment." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SuspenseLayoutHOC(FeaturedProducts, FeaturedProductsSkeleton);
