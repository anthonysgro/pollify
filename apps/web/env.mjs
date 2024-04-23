import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        // This is optional because it's only used in development.
        // See https://next-auth.js.org/deployment.
        NODE_ENV: z.string(),
        AUTH_URL: z.string().url().optional(),
        AUTH_SECRET: z.string().min(1),
        AUTH_GOOGLE_ID: z.string().min(1),
        AUTH_GOOGLE_SECRET: z.string().min(1),
        DATABASE_URL: z.string().min(1),
        RDS_DATABASE: z.string().min(1),
        RDS_USERNAME: z.string().min(1),
        RDS_PASSWORD: z.string().min(1),
        RDS_ARN: z.string().min(1),
        AWS_PROFILE: z.string().min(1),
        AWS_SHARED_CREDENTIALS_FILE: z.string().min(1),
        AWS_CONFIG_FILE: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        AUTH_URL: process.env.AUTH_URL,
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        RDS_DATABASE: process.env.RDS_DATABASE,
        RDS_USERNAME: process.env.RDS_USERNAME,
        RDS_PASSWORD: process.env.RDS_PASSWORD,
        RDS_ARN: process.env.RDS_ARN,
        AWS_PROFILE: process.env.AWS_PROFILE,
        AWS_SHARED_CREDENTIALS_FILE: process.env.AWS_SHARED_CREDENTIALS_FILE,
        AWS_CONFIG_FILE: process.env.AWS_CONFIG_FILE
    },
});

