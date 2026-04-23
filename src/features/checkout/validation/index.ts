import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-()]{7,15}$/, "Invalid phone number"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),

  paymentMethod: z.enum(
    ["CREDIT_CARD", "PAYPAL", "CASH_ON_DELIVERY", "WALLET"],
    { message: "Please select a payment method" },
  ),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
