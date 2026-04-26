import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().max(254).optional(),
  role: z.enum(["customer", "vendor", "admin"]).optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const CreateUserSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  role: z.enum(["customer", "vendor", "admin"]).optional().default("customer"),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
