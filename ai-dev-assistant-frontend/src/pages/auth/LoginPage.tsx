import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/feedback/ErrorMessage";

const LoginPage = (): React.ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData): Promise<void> => {
        console.log(data);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Welcome back 👋
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Sign in to continue to <span className="font-medium">AI Dev Assistant</span>
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {errors.email?.message && (
                        <ErrorMessage text={errors.email.message} />
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {errors.password?.message && (
                        <ErrorMessage text={errors.password.message} />
                    )}
                </div>

                {/* Login Button */}
                <Button loading={isSubmitting} type="submit">
                    Sign in
                </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google OAuth */}
            <button
                type="button"
                onClick={() =>
                    window.location.assign(
                        "http://localhost:4000/api/auth/google"
                    )
                }
                className="flex items-center justify-center gap-2 rounded-md border
          border-gray-300 px-4 py-2 text-sm font-medium text-gray-700
          hover:bg-gray-50 transition"
            >
                <svg
                    className="h-4 w-4"
                    viewBox="0 0 533.5 544.3"
                    aria-hidden="true"
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
        </div>
    );
};

export default LoginPage;
