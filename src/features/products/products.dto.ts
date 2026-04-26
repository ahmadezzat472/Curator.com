import { z } from "zod";
import { ObjectIdSchema } from "@/lib/api/validation";

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(220)
    .regex(/^[a-z0-9-]+$/, "Slug must be kebab-case"),
  description: z.string().min(1).max(5000),
  price: z.number().nonnegative(),
  comparePrice: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().default(0),
  images: z.array(z.string().url()).default([]),
  category: ObjectIdSchema,
  seller: ObjectIdSchema,
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
});
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
