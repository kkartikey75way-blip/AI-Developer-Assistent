import { openrouter } from "../config/openrouter";
import { VectorService } from "./vector.service";
import { buildRepoPrompt } from "../utils/chatPrompt";
import { MemoryService } from "./memory.service";

export class ChatStreamService {
    static async streamRepo(params: {
        repoId: string;
        question: string;
        onToken: (token: string) => void;
    }): Promise<string> {
        const memory = await MemoryService.getRecent(params.repoId, 6);
        const context = await VectorService.search({
            repoId: params.repoId,
            query: params.question,
            topK: 6
        });

        const prompt = buildRepoPrompt({
            question: params.question,
            context,
            memory
        });

        let fullAnswer = "";

        const stream = await openrouter.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
            stream: true
        });

        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;
            if (token) {
                fullAnswer += token;
                params.onToken(token);
            }
        }

        await MemoryService.save(params.repoId, "user", params.question);
        await MemoryService.save(params.repoId, "assistant", fullAnswer);

        return fullAnswer;
    }
}
