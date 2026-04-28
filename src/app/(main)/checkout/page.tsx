import type { Metadata } from "next";
import CheckoutForm from "@/features/checkout/components/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
