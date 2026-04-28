"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useToggleWishlist } from "./hooks/useToggleWishlist";
import { Button } from "@/components/ui/button";

type Props = { productId: string };

export function WishlistButton({ productId }: Props) {
  const { toggle, isInWishlist, isPending } = useToggleWishlist();
  const active = isInWishlist(productId);

  return (
    <Button
      onClick={(e) => {
        e.preventDefault(); // prevent link navigation from parent <Link>
        toggle(productId);
      }}
      disabled={isPending}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors"
    >
      {active ? (
        <FaHeart size={14} className="text-destructive" />
      ) : (
        <FaRegHeart size={14} className="text-muted-foreground" />
      )}
    </Button>
  );
}
