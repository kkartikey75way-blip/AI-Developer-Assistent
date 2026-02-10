import { VectorService } from "./vector.service";
import { openrouter } from "../config/openrouter";
import { buildReviewPrompt } from "../utils/reviewPrompt";

export class ReviewService {
    static async reviewRepo(params: {
        repoId: string;
        focus?: "security" | "performance" | "style" | "general";
    }): Promise<unknown> {
        // Pull representative chunks
        const context = await VectorService.search({
            repoId: params.repoId,
            query: params.focus ?? "code review",
            topK: 8
        });

        const prompt = buildReviewPrompt({
            context,
            focus: params.focus
        });

        const completion = await openrouter.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1
        });

        // Return parsed JSON if possible, else raw
        const text = completion.choices[0].message.content ?? "{}";
        try {
            return JSON.parse(text);
        } catch {
            return { raw: text };
        }
    }
}
