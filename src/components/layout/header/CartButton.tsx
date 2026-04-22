"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
// import { useCart } from "@/features/cart/hooks/useCart";

function CartButton() {
  //   const { data: cart } = useCart();
  const itemCount = 6;
  // cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors"
      aria-label={`Cart (${itemCount} items)`}
    >
      <FiShoppingCart size={18} />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}

export default CartButton;
