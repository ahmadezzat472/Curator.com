import type { Metadata } from "next";
import VendorProducts from "@/features/vendors/components/VendorProducts";

export const metadata: Metadata = { title: "Vendor Products" };

export default function VendorProductsPage() {
  return <VendorProducts />;
}
