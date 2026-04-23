import type { Metadata } from "next";
import { productsService } from "@/features/products/services";
import ProductDetailContainer from "@/features/products/pages/ProductDetailContainer";

type Props = { params: Promise<{ slug: string }> };

//** metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await productsService.getBySlug(slug);
    return {
      title: product.name,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  return <ProductDetailContainer slug={slug} />;
}
