declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_TTL: string;
    JWT_REFRESH_TTL: string;
    COOKIE_DOMAIN: string;
    COOKIE_SECURE: string;
    NEXT_PUBLIC_APP_URL: string;
    S3_ENDPOINT: string;
    S3_REGION: string;
    S3_BUCKET: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;
  }
}
