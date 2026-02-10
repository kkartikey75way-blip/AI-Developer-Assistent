import { useCallback, useState } from "react";
import type { ChatMessage } from "../types/chat";
import { streamChat } from "../services/chatStream.service";

export const useChat = (repoId: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    const sendMessage = useCallback(
        async (question: string) => {
            const userMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "user",
                content: question
            };

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: ""
            };

            setMessages((prev) => [...prev, userMessage, assistantMessage]);
            setIsStreaming(true);

            await streamChat({
                repoId,
                question,
                onToken: (token) => {
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === assistantMessage.id
                                ? { ...m, content: m.content + token }
                                : m
                        )
                    );
                }
            });

            setIsStreaming(false);
        },
        [repoId]
    );

    return { messages, sendMessage, isStreaming };
};
