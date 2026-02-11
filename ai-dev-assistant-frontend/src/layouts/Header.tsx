import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import type { ReactNode } from "react";

export const Header = (): ReactNode => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = (): void => {
        logout();
        navigate("/login");
    };

    return (
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

            {/* Logo */}
            <div
                className="font-semibold text-gray-900 cursor-pointer"
                onClick={() => navigate("/")}
            >
                AI Dev Assistant
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 text-sm">

                {!isAuthenticated && (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-gray-600 hover:text-black transition"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
                        >
                            Sign Up
                        </button>
                    </>
                )}

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-black transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};
