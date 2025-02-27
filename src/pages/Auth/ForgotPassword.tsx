import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, Send } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { requestPasswordReset, isLoading } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await requestPasswordReset({ email });
            setSubmitted(true);
            toast.success("Password reset instructions sent to your email");
        } catch (error) {
            toast.error("Failed to send reset instructions. Please try again.");
            // Error is already set in the auth context
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {submitted
                            ? "Check your email for reset instructions"
                            : "Enter your email and we'll send you instructions"}
                    </p>
                </div>

                {!submitted ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email address
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Send className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                                </span>
                                {isLoading ? "Sending..." : "Send reset instructions"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-8 space-y-6">
                        <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900">
                            <p className="text-sm text-blue-700 dark:text-blue-200">
                                We've sent password reset instructions to{" "}
                                <strong>{email}</strong>. Please check your email inbox and spam
                                folder.
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                <Send className="mr-2 h-5 w-5 text-gray-500" />
                                Try with a different email
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-4 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
