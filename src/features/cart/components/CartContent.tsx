"use client";

import Link from "next/link";
import Image from "next/image";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/hooks/useCart";
import { useUpdateCartItem } from "../hooks/useUpdateCartItem";
import { useRemoveCartItem } from "../hooks/useRemoveCartItem";

function CartContent() {
  const { data: cart, isLoading } = useCart();
  const { mutate: updateItem } = useUpdateCartItem();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!cart || cart.data.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Shopping cart ({cart.data.items.length})
      </h1>

      <div className="space-y-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.data.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 rounded-xl border bg-card"
            >
              {/* Image */}
              <Link
                href={`/products/${item.slug}`}
                className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                >
                  {item.name}
                </Link>
                <p className="text-sm font-semibold">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Qty + remove */}
              <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={isRemoving}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove item"
                >
                  <FiTrash2 size={15} />
                </button>

                <div className="flex items-center gap-1 border rounded-lg">
                  <button
                    onClick={() =>
                      updateItem({
                        itemId: item.id,
                        quantity: item.quantity - 1,
                      })
                    }
                    className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateItem({
                        itemId: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    disabled={item.quantity >= item.stock}
                    className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h2 className="font-medium">Order summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t pt-2">
                <span>Total</span>
                <span>${cart.data.total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartContent;
