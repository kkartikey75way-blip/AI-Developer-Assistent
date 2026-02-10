export const buildRepoPrompt = (params: {
    question: string;
    context: string[];
    memory?: string[];
}): string => {
    return `
You are an AI developer assistant.
Use ONLY the context and memory below. If unsure, say "I don't know".

Conversation memory:
${params.memory?.join("\n") ?? "None"}

Context:
${params.context.join("\n\n")}

Question:
${params.question}

Answer:
`.trim();
};
