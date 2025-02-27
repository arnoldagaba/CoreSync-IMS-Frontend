import React, { useState, useRef, useEffect, JSX } from "react";
import { Link, useNavigate } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Bell,
    Sun,
    Moon,
    User,
    Settings,
    LogOut,
    ChevronDown,
    Package,
    Tag,
    ArrowLeftRight,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";
import { useSearch } from "@/hooks/useSearch";


const Navbar = (): JSX.Element => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const { query, results, isLoading, setQuery, search, clearResults } =
        useSearch();

    // State
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Refs
    const userMenuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Hooks
    const debouncedSearch = useDebounce(search, 300);

    // Effects
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (query) {
            debouncedSearch();
        } else {
            clearResults();
        }
    }, [query, debouncedSearch, clearResults]);

    // Handlers
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query && results.length > 0) {
            navigate(results[0].url);
            setQuery("");
            setIsSearchFocused(false);
        }
    };

    const handleSearchItemClick = (url: string) => {
        navigate(url);
        setQuery("");
        setIsSearchFocused(false);
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case "product":
                return <Package className="w-4 h-4" />;
            case "category":
                return <Tag className="w-4 h-4" />;
            case "transaction":
                return <ArrowLeftRight className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <nav className="bg-white border-b border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-lg" ref={searchRef}>
                        <form onSubmit={handleSearch} className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-neutral-400" />
                            </div>

                            <motion.input
                                initial={false}
                                whileFocus={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                className="block w-full py-2 pl-10 pr-4 border rounded-md focus:ring-primary-500 border-neutral-300 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                                placeholder="Search products, categories, transactions..."
                            />
                        </form>

                        <AnimatePresence>
                            {isSearchFocused && (query || isLoading) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute z-50 w-full mt-2 overflow-auto bg-white rounded-md shadow-lg ring-opacity-5 max-h-96 ring-1 ring-black dark:bg-neutral-800"
                                >
                                    {isLoading ? (
                                        <div className="p-4 text-center">
                                            <div className="w-8 h-8 mx-auto border-b-2 rounded-full border-primary-500 animate-spin"></div>
                                        </div>
                                    ) : results.length > 0 ? (
                                        <div className="py-2">
                                            {results.map((result) => (
                                                <motion.button
                                                    key={`${result.type}-${result.id}`}
                                                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                                                    onClick={() => handleSearchItemClick(result.url)}
                                                    className="flex items-start w-full gap-3 px-4 py-2 text-left"
                                                >
                                                    <div className="mt-1 text-neutral-400 dark:text-neutral-500">
                                                        {getIconForType(result.type)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                            {result.title}
                                                        </div>
                                                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                                            {result.description}
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    ) : query ? (
                                        <div className="p-4 text-sm text-center text-neutral-500 dark:text-neutral-400">
                                            No results found
                                        </div>
                                    ) : null}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: theme === "dark" ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </motion.div>
                            </Button>
                        </motion.div>

                        {/* Notifications */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                            >
                                <Bell className="w-5 h-5" />
                            </Button>
                        </motion.div>

                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-200"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20">
                                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        {user?.firstName + " " + user?.lastName}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </motion.div>
                                </Button>
                            </motion.div>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
                                        className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-opacity-5 ring-1 ring-black dark:bg-neutral-800"
                                    >
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <motion.div
                                                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                                            >
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <Settings className="w-4 h-4 mr-3" />
                                                    Settings
                                                </Link>
                                            </motion.div>
                                            <motion.button
                                                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Sign out
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
