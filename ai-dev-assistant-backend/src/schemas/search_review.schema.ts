import { z } from "zod";

export const searchSchema = z.object({
    body: z.object({
        repoId: z.string().min(1, "Repository ID is required"),
        query: z.string().min(1, "Search query is required")
    })
});

export const reviewSchema = z.object({
    body: z.object({
        repoId: z.string().min(1, "Repository ID is required"),
        focus: z.enum(["security", "performance", "style", "general"]).optional()
    })
});

export type SearchInput = z.infer<typeof searchSchema>["body"];
export type ReviewInput = z.infer<typeof reviewSchema>["body"];
