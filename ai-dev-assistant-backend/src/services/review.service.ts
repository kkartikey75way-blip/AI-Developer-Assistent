import { searchService } from "./search.service";
import { openrouter } from "../config/openrouter";
import { buildReviewPrompt } from "../utils/reviewPrompt";

interface ReviewResult {
    summary?: string;
    issues?: unknown[];
    suggestions?: unknown[];
    raw?: string;
}

export class ReviewService {
    static async reviewRepo(params: {
        repoId: string;
        focus?: "security" | "performance" | "style" | "general";
    }): Promise<ReviewResult> {

        const context = await searchService.search({
            repoId: params.repoId,
            query: params.focus ?? "code review",
            topK: 8
        });

        const prompt = buildReviewPrompt({
            context,
            focus: params.focus
        });

        const completion =
            await openrouter.chat.completions.create({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a senior software engineer performing structured code reviews. Always respond in valid JSON."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.1
            });

        const text =
            completion.choices[0]?.message?.content ?? "{}";

        try {
            return JSON.parse(text) as ReviewResult;
        } catch {
            return { raw: text };
        }
    }
}
