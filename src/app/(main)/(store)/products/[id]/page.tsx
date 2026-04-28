import type { Metadata } from "next";
import { productsService } from "@/features/products/services";
import ProductDetailContainer from "@/features/products/pages/ProductDetailContainer";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data } = await productsService.getById(id);
    return {
      title: data.name,
      description: data.description.slice(0, 160),
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  return <ProductDetailContainer id={id} />;
}
