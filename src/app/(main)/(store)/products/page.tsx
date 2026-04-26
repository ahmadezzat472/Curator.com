import ProductsContainer from "@/features/products/pages/ProductsContainer";
import { ProductsPageSearchParams } from "@/features/products/types/ProductsSearchParams";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full product catalog",
};

type Props = {
  searchParams: Promise<ProductsPageSearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  return <ProductsContainer searchParams={resolvedSearchParams} />;
}
