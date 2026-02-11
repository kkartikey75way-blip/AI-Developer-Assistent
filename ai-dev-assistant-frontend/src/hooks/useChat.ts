import { useCallback, useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";
import { streamChat } from "../services/chatStream.service";

export const useChat = (repoId: string | null) => {
    const [messages, setMessages] =
        useState<ChatMessage[]>([]);
    const [isStreaming, setIsStreaming] =
        useState<boolean>(false);

    // Reset chat when repo changes
    useEffect(() => {
        setMessages([]);
    }, [repoId]);

    const sendMessage = useCallback(
        async (question: string): Promise<void> => {
            if (!repoId || isStreaming) return;

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

            setMessages((prev) => [
                ...prev,
                userMessage,
                assistantMessage
            ]);

            setIsStreaming(true);

            try {
                await streamChat({
                    repoId,
                    question,
                    onToken: (token: string) => {
                        setMessages((prev) =>
                            prev.map((m) =>
                                m.id === assistantMessage.id
                                    ? {
                                        ...m,
                                        content: m.content + token
                                    }
                                    : m
                            )
                        );
                    }
                });
            } finally {
                setIsStreaming(false);
            }
        },
        [repoId, isStreaming]
    );

    return {
        messages,
        sendMessage,
        isStreaming
    };
};
