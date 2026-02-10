import { z } from "zod";

export const githubAuthSchema = z.object({
    code: z.string().min(1)
});

export type GithubAuthDTO = z.infer<typeof githubAuthSchema>;
