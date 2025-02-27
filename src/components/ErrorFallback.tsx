import { AlertTriangle } from "lucide-react";

export interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <AlertTriangle className="mb-4 h-16 w-16 text-red-500" />

            <h1 className="mb-2 text-3xl font-bold text-gray-800">
                Oops, something went wrong!
            </h1>

            <p className="mb-4 text-gray-600">
                {error?.message || "An unexpected error occurred."}
            </p>

            <button
                onClick={resetErrorBoundary}
                className="rounded-md bg-blue-500 px-6 py-2 text-white shadow transition-colors hover:bg-blue-600"
            >
                Try Again
            </button>
        </div>
    );
};

export default ErrorFallback;
