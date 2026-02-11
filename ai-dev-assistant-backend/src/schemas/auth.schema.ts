import { z } from "zod";

export const googleAuthSchema = z.object({
    query: z.object({
        code: z.string().min(1, "Code is required")
    })
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, "Refresh token is required")
    })
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>["body"];
