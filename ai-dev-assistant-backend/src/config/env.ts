import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("4000"),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    MONGO_URI: z.string(),
    REDIS_URL: z.string(),
    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    FRONTEND_URL: z.string(),
    OPENROUTER_API_KEY: z.string(),
    CHROMA_URL: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(parsedEnv.error.format(), null, 2)
    );
    process.exit(1);
}

console.log("✅ Environment variables validated");

export const env = parsedEnv.data;
