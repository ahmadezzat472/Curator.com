import ProductCard from "./ProductCard";
import { productsService } from "../services";
import SuspenseLayoutHOC from "@/components/hoc/SuspenseLayoutHOC";
import type { ProductFilters } from "../types";
import ProductGridSkeleton from "./skeletons/ProductGridSkeleton";
import NoDataMessage from "@/components/shared/Feedback/NoDataMessage";

async function ProductGrid({ filters }: { filters: ProductFilters }) {
  const { data: products } = await productsService.getAll(filters);

  if (products.length === 0) {
    return (
      <NoDataMessage message="No products found with the selected filters." />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default SuspenseLayoutHOC(ProductGrid, ProductGridSkeleton);
