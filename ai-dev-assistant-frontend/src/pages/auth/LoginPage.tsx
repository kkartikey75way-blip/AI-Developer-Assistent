import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

const LoginPage = (): ReactNode => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (
        data: LoginFormData
    ): Promise<void> => {
        console.log("Login data:", data);

        // TODO: Call login API
    };

    const handleGoogleLogin = (): void => {
        window.location.href =
            "http://localhost:4000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

            <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 p-10">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        AI Dev Assistant
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Intelligent code understanding powered by AI
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Signing in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-xs text-gray-400">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full border border-gray-300 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 533.5 544.3"
                    >
                        <path
                            fill="#4285F4"
                            d="M533.5 278.4c0-18.3-1.5-36.1-4.3-53.3H272v100.8h146.9c-6.3 34-25 62.8-53.3 82v68h86.2c50.5-46.5 81.7-115.1 81.7-197.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M272 544.3c72.6 0 133.6-24.1 178.1-65.3l-86.2-68c-24 16.1-54.6 25.6-91.9 25.6-70.6 0-130.5-47.6-152-111.5H33.5v69.9C77.8 475.2 168.4 544.3 272 544.3z"
                        />
                        <path
                            fill="#FBBC04"
                            d="M120 325.1c-10.4-30.9-10.4-64.1 0-95l-86.5-69.9C-7.8 239.2-7.8 305.1 33.5 394.9l86.5-69.8z"
                        />
                        <path
                            fill="#EA4335"
                            d="M272 107.7c39.5-.6 77.6 14.5 106.6 42.2l79.4-79.4C407.6 24.2 346.6-.1 272 0 168.4 0 77.8 69.1 33.5 160.2l86.5 69.9C141.5 155.3 201.4 107.7 272 107.7z"
                        />
                    </svg>
                    Continue with Google
                </button>

                {/* Signup Link */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="text-black font-medium hover:underline"
                    >
                        Sign Up
                    </button>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;
