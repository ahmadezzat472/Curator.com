import { z } from "zod";
import { ObjectIdSchema } from "@/lib/api/validation";

export const AddCartItemSchema = z.object({
  productId: ObjectIdSchema,
  quantity: z.number().int().positive().default(1),
});
export type AddCartItemDto = z.infer<typeof AddCartItemSchema>;

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().positive(),
});
export type UpdateCartItemDto = z.infer<typeof UpdateCartItemSchema>;
