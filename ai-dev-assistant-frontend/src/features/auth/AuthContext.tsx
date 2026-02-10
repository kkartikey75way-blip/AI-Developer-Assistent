import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("access_token")
    );

    const login = (newToken: string) => {
        localStorage.setItem("access_token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: Boolean(token), login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
