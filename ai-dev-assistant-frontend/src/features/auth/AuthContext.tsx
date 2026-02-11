import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(
    null
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children
}: AuthProviderProps): ReactNode => {
    const [isAuthenticated, setIsAuthenticated] =
        useState<boolean>(false);

    const [isLoading, setIsLoading] =
        useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        setIsAuthenticated(Boolean(token));
        setIsLoading(false);
    }, []);

    const login = (
        accessToken: string,
        refreshToken: string
    ): void => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        setIsAuthenticated(true);
    };

    const logout = (): void => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
};
