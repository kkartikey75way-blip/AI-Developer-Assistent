export const chunkText = (
    text: string,
    options?: {
        chunkSize?: number;
        overlap?: number;
    }
): string[] => {
    const chunkSize = options?.chunkSize ?? 800;
    const overlap = options?.overlap ?? 100;

    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
        const end = Math.min(start + chunkSize, text.length);
        const chunk = text.slice(start, end).trim();

        if (chunk.length > 100) {
            chunks.push(chunk);
        }

        start = end - overlap;
        if (start < 0) start = 0;
    }

    return chunks;
};
