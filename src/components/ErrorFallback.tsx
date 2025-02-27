import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                {/* Error header with icon */}
                <div className="flex items-center border-b border-red-100 bg-red-50 p-6">
                    <div className="mr-4 rounded-full bg-red-100 p-3">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Something went wrong
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            We encountered an unexpected error
                        </p>
                    </div>
                </div>

                {/* Error details */}
                <div className="p-6">
                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <p className="font-mono text-sm break-words text-gray-700">
                            {error.message}
                        </p>

                        {error.stack && (
                            <details className="mt-2">
                                <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                                    View error details
                                </summary>

                                <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-2 font-mono text-xs">
                                    {error.stack.split("\n").slice(1, 4).join("\n")}
                                </pre>
                            </details>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <button
                            onClick={resetErrorBoundary}
                            className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </button>
                        
                        <button
                            onClick={() => navigate("/")}
                            className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Home
                        </button>
                    </div>
                </div>

                {/* Footer with helpful message */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <p className="text-center text-xs text-gray-500">
                        If this issue persists, please contact support or try again later.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
