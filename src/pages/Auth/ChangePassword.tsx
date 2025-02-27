import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock, Shield, Save } from "lucide-react";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { changePassword, isLoading } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }

        // Validate password strength
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            toast.error(
                "Password must be at least 8 characters and include a number and special character",
            );
            return;
        }

        // Make sure new password is different from current password
        if (currentPassword === newPassword) {
            toast.error("New password must be different from your current password");
            return;
        }

        try {
            await changePassword({
                currentPassword,
                newPassword,
            });

            toast.success("Password changed successfully");

            // Reset form
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(
                "Failed to change password. Please check your current password.",
            );
            console.log(error);
            // Error is already set in the auth context
        }
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Change your password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Update your password to keep your account secure
                    </p>
                </div>

                <div className="flex items-center rounded-lg bg-blue-50 p-4 dark:bg-blue-900">
                    <Shield className="mr-3 h-6 w-6 text-blue-500 dark:text-blue-300" />
                    <div>
                        <p className="text-sm text-blue-700 dark:text-blue-200">
                            For security reasons, please enter your current password before
                            setting a new one.
                        </p>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Current password
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-10 pl-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="button"
                                        onClick={toggleCurrentPasswordVisibility}
                                        className="focus:outline-none"
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                New password
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-10 pl-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="button"
                                        onClick={toggleNewPasswordVisibility}
                                        className="focus:outline-none"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Minimum 8 characters with at least 1 number and 1 special
                                character
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Confirm new password
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Save className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                            </span>
                            {isLoading ? "Updating password..." : "Update password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
