import fs from "fs";
import path from "path";

const IGNORED_FOLDERS = new Set([
    "node_modules",
    ".git",
    "dist",
    "build"
]);

export const walkFiles = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.flatMap(entry => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (IGNORED_FOLDERS.has(entry.name)) return [];
            return walkFiles(fullPath);
        }

        return [fullPath];
    });
};
