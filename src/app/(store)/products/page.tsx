import type { Metadata } from "next";
import ProductsPageContent, {
  type ProductsPageSearchParams,
} from "@/features/products/components/ProductsPageContent";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full product catalog",
};

type Props = {
  searchParams: Promise<ProductsPageSearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  return <ProductsPageContent searchParams={resolvedSearchParams} />;
}
