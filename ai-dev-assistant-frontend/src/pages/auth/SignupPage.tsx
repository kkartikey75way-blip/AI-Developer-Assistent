import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    signupSchema,
    type SignupFormData
} from "../../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

const SignupPage = (): ReactNode => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (
        data: SignupFormData
    ): Promise<void> => {
        console.log("Signup data:", data);

        // TODO: Call signup API here

        // After successful signup
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Create an Account
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            {...register("name")}
                            className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-black font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
