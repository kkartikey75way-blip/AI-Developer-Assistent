import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";

const HomePage = (): ReactNode => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-24 text-center">
                <h1 className="text-5xl font-semibold text-gray-900 leading-tight">
                    Understand Your Codebase
                    <br />
                    <span className="text-gray-500">
                        Like Never Before
                    </span>
                </h1>

                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                    AI Dev Assistant uses Retrieval-Augmented Generation (RAG)
                    and vector databases to analyze repositories,
                    generate documentation, and help developers
                    navigate complex codebases effortlessly.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
                    >
                        Login
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

                    <div className="p-6 border border-gray-200 rounded-2xl">
                        <h3 className="font-semibold text-lg">
                            AI Repo Chat
                        </h3>
                        <p className="text-sm text-gray-600 mt-3">
                            Ask natural language questions about your repository
                            and receive context-aware explanations instantly.
                        </p>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-2xl">
                        <h3 className="font-semibold text-lg">
                            Auto Documentation
                        </h3>
                        <p className="text-sm text-gray-600 mt-3">
                            Automatically generate README files and
                            architecture summaries from your project.
                        </p>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-2xl">
                        <h3 className="font-semibold text-lg">
                            Intelligent Code Review
                        </h3>
                        <p className="text-sm text-gray-600 mt-3">
                            Detect bad practices, security risks,
                            and performance issues using AI analysis.
                        </p>
                    </div>

                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-900">
                    Ready to Upgrade Your Development Workflow?
                </h2>

                <button
                    onClick={() => navigate("/signup")}
                    className="mt-6 bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                >
                    Start Building with AI
                </button>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;
