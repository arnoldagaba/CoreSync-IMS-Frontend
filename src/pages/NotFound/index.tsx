const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Page not found
            </p>
            <button
                onClick={() => window.history.back()}
                className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
            >
                Go back
            </button>
        </div>
    );
};

export default NotFound;
