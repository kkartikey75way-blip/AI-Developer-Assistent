
export interface StreamChatParams {
    repoId: string;
    question: string;
    onToken: (token: string) => void;
}

interface StreamPayload {
    token?: string;
}

export const streamChat = async (
    params: StreamChatParams
): Promise<void> => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        "http://localhost:4000/api/chat-stream/ask-stream",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify({
                repoId: params.repoId,
                question: params.question
            })
        }
    );

    if (!response.body) {
        throw new Error("Streaming not supported by the browser");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
            if (!line.startsWith("data: ")) {
                continue;
            }

            const raw = line.replace("data: ", "").trim();
            if (!raw) {
                continue;
            }

            let payload: StreamPayload;
            try {
                payload = JSON.parse(raw) as StreamPayload;
            } catch {
                continue;
            }

            if (payload.token) {
                params.onToken(payload.token);
            }
        }
    }
};


