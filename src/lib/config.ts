import "server-only";

import { z } from "zod";

export const EnvSchema = z.object({
  MONGODB_URI: z.string().regex(/^mongodb(\+srv)?:\/\//),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL: z.string().default("30d"),
  COOKIE_DOMAIN: z.string(),
  COOKIE_SECURE: z.enum(["true", "false"]).transform((v) => v === "true"),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_APP_URL: z.url(),

  // S3 is optional (for file uploads)
  S3_ENDPOINT: z.string().url().optional(),
  S3_REGION: z.string().min(1).optional(),
  S3_BUCKET: z.string().min(1).optional(),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),

  // SMTP is optional (for email notifications)
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.string().regex(/^\d+$/).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().min(1).optional(),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
