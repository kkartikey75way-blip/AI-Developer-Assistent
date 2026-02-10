export const buildReviewPrompt = (params: {
    context: string[];
    focus?: "security" | "performance" | "style" | "general";
}): string => {
    const focus = params.focus ?? "general";

    return `
You are a senior software engineer performing a ${focus} code review.
Use ONLY the context below. Be concise and specific.
If something cannot be inferred, say "Not enough context".

Context:
${params.context.join("\n\n")}

Return your review in this JSON format:
{
  "issues": [
    { "severity": "low|medium|high", "title": string, "detail": string }
  ],
  "suggestions": [ string ]
}
`.trim();
};
