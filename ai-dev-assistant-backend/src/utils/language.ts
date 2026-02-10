import path from "path";

const EXTENSION_MAP: Record<string, string> = {
    ".ts": "typescript",
    ".js": "javascript",
    ".tsx": "typescript",
    ".py": "python",
    ".java": "java",
    ".go": "go",
    ".rs": "rust"
};

export const detectLanguage = (filePath: string): string => {
    return EXTENSION_MAP[path.extname(filePath)] ?? "unknown";
};
