import { searchService } from "./search.service";
import { openrouter } from "../config/openrouter";

export class ChatService {
    static async streamChat(params: {
        repoId: string;
        question: string;
    }) {
        const contextChunks = await searchService.search({
            repoId: params.repoId,
            query: params.question,
            topK: 6
        });

        const context = contextChunks.join("\n\n");

        const systemPrompt = `
You are an AI developer assistant.
Use the provided repository context to answer the question.
If the answer is not in context, say you don't know.

Repository Context:
${context}
        `;

        return openrouter.chat.completions.create({
            model: "openai/gpt-4o-mini",
            stream: true,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: params.question
                }
            ],
            temperature: 0.2
        });
    }
}
