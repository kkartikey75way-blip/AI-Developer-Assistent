import { VectorService } from "./vector.service";
import { openrouter } from "../config/openrouter";
import { buildRepoPrompt } from "../utils/chatPrompt";
import { MemoryService } from "./memory.service";

export class ChatService {
    static async askRepo(params: { repoId: string; question: string }): Promise<string> {
        const memory = await MemoryService.getRecent(params.repoId, 6);

        const contextChunks = await VectorService.search({
            repoId: params.repoId,
            query: params.question,
            topK: 6
        });

        const prompt = buildRepoPrompt({
            question: params.question,
            context: contextChunks,
            memory
        });

        const completion = await openrouter.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2
        });

        const answer = completion.choices[0].message.content ?? "";

        // persist memory
        await MemoryService.save(params.repoId, "user", params.question);
        await MemoryService.save(params.repoId, "assistant", answer);

        return answer;
    }
}
