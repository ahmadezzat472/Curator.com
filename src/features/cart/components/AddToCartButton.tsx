"use client";

import { Button } from "@/components/ui/button";
import { useAddToCart } from "../hooks/useAddToCart";

type Props = {
  productId: string;
  disabled?: boolean;
};

export function AddToCartButton({ productId, disabled }: Props) {
  const { mutate: addToCart, isPending } = useAddToCart();

  return (
    <Button
      size="sm"
      className="w-full"
      disabled={disabled || isPending}
      isLoading={isPending}
      onClick={() => addToCart({ productId, quantity: 1 })}
    >
      {disabled ? "Out of stock" : "Add to cart"}
    </Button>
  );
}
