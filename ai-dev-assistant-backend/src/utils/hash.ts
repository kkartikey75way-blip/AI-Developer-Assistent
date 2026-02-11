import crypto from "crypto";

export const hashToken = (token: string): string => {
    if (!token) {
        throw new Error("Token is required for hashing");
    }

    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};
