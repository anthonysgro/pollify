import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        // This is optional because it's only used in development.
        // See https://next-auth.js.org/deployment.
        NODE_ENV: z.string(),
        AUTH0_SECRET: z.string().min(1),
        AUTH0_BASE_URL: z.string().min(1),
        AUTH0_ISSUER_BASE_URL: z.string().min(1),
        AUTH0_CLIENT_ID: z.string().min(1),
        AUTH0_CLIENT_SECRET: z.string().min(1),
        AUTH0_AUDIENCE: z.string().optional(),
        AUTH0_SCOPE: z.string().min(1),
        AUTH_URL: z.string().url().optional(),
        AUTH_SECRET: z.string().min(1),
        AUTH_GOOGLE_ID: z.string().min(1),
        AUTH_GOOGLE_SECRET: z.string().min(1),
        DB_HOST: z.string().min(1),
        DB_PORT: z.string().min(1),
        DB_NAME: z.string().min(1),
        DB_USERNAME: z.string().min(1),
        DB_PASSWORD: z.string().min(1),
        DB_URL: z.string().min(1),
        AWS_PROFILE: z.string().min(1),
        AWS_SHARED_CREDENTIALS_FILE: z.string().min(1),
        AWS_CONFIG_FILE: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        AUTH0_SECRET: process.env.AUTH0_SECRET,
        AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
        AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
        AUTH0_SCOPE: process.env.AUTH0_SCOPE,
        AUTH_URL: process.env.AUTH_URL,
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_URL: process.env.DB_URL,
        AWS_PROFILE: process.env.AWS_PROFILE,
        AWS_SHARED_CREDENTIALS_FILE: process.env.AWS_SHARED_CREDENTIALS_FILE,
        AWS_CONFIG_FILE: process.env.AWS_CONFIG_FILE
    },
});

