import { z } from "zod";

export const streamChatSchema = z.object({
    body: z.object({
        repoId: z.string().min(1, "Repository ID is required"),
        question: z.string().min(1, "Question is required")
    })
});

export type StreamChatInput = z.infer<typeof streamChatSchema>["body"];
