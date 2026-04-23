"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/features/cart/hooks/useCart";
import { checkoutSchema, type CheckoutFormValues } from "../validation";
import { usePlaceOrder } from "@/features/orders/hooks/usePlaceOrder";

const PAYMENT_METHODS = [
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "PAYPAL", label: "PayPal" },
  { value: "CASH_ON_DELIVERY", label: "Cash on Delivery" },
  { value: "WALLET", label: "Wallet" },
] as const;

const CheckoutForm = () => {
  const { data: cart } = useCart();
  const { mutate: placeOrder, isPending } = usePlaceOrder();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "CASH_ON_DELIVERY",
      country: "Egypt",
    },
  });

  const selectedPayment = useWatch({
    control,
    name: "paymentMethod",
  });

  const onSubmit = (values: CheckoutFormValues) => {
    const { paymentMethod, ...address } = values;
    placeOrder({
      paymentMethod,
      shippingAddress: address,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* ── Shipping Address ── */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Shipping address</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+20 10 0000 0000"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="street">Street address</Label>
            <Input
              id="street"
              placeholder="123 Main St, Apt 4"
              aria-invalid={!!errors.street}
              {...register("street")}
            />
            {errors.street && (
              <p className="text-xs text-destructive">
                {errors.street.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Cairo"
              aria-invalid={!!errors.city}
              {...register("city")}
            />
            {errors.city && (
              <p className="text-xs text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="state">State / Governorate</Label>
            <Input
              id="state"
              placeholder="Cairo"
              aria-invalid={!!errors.state}
              {...register("state")}
            />
            {errors.state && (
              <p className="text-xs text-destructive">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="zip">ZIP / Postal code</Label>
            <Input
              id="zip"
              placeholder="11511"
              aria-invalid={!!errors.zip}
              {...register("zip")}
            />
            {errors.zip && (
              <p className="text-xs text-destructive">{errors.zip.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Egypt"
              aria-invalid={!!errors.country}
              {...register("country")}
            />
            {errors.country && (
              <p className="text-xs text-destructive">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Payment Method ── */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Payment method</h2>

        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.value}
              className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors
                ${
                  selectedPayment === method.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
            >
              <input
                type="radio"
                value={method.value}
                className="accent-primary"
                {...register("paymentMethod")}
              />
              <span className="text-sm font-medium">{method.label}</span>
            </label>
          ))}
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-destructive">
            {errors.paymentMethod.message}
          </p>
        )}
      </section>

      {/* ── Order Summary ── */}
      {cart && (
        <section className="rounded-lg border p-4 space-y-3 text-sm">
          <h2 className="font-medium">Order summary</h2>
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal ({cart.items.length} items)</span>
            {/* <span>${cart.subtotal.toFixed(2)}</span> */}
          </div>
          {/* {cart.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${cart.discount.toFixed(2)}</span>
            </div>
          )} */}
          <div className="flex justify-between font-medium border-t pt-3">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
        </section>
      )}

      <Button
        type="submit"
        className="w-full h-12 text-base"
        disabled={isPending || !cart?.items.length}
      >
        {isPending
          ? "Placing order..."
          : `Place order · $${cart?.total.toFixed(2) ?? "0.00"}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
