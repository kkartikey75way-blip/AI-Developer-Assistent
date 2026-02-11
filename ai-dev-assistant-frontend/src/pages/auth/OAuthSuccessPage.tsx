import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import type { ReactNode } from "react";

const OAuthSuccessPage = (): ReactNode => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken && refreshToken) {
            login(accessToken, refreshToken);

            const timer = setTimeout(() => {
                navigate("/dashboard", { replace: true });
            }, 1200);

            return () => clearTimeout(timer);
        }

        navigate("/login", { replace: true });
    }, [params, login, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md text-center">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                        <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                    Authentication Successful
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Redirecting you to your dashboard...
                </p>

                <div className="mt-6">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-black animate-pulse"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OAuthSuccessPage;
