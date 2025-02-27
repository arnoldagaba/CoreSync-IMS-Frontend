import { useState, useEffect, JSX } from "react";
import { Outlet, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    className?: string;
}

const MainLayout = ({ className }: MainLayoutProps): JSX.Element => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu when screen size is larger than mobile breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={cn("min-h-screen bg-gray-50 dark:bg-gray-900", className)}>
            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
            />

            {/* Main content */}
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    isSidebarCollapsed ? "md:ml-16" : "md:ml-64",
                )}
            >
                {/* Navbar */}
                <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

                {/* Content */}
                <main
                    className={cn(
                        "min-h-screen pt-16",
                        "animate-in fade-in duration-300",
                    )}
                >
                    <div className="container mx-auto p-4 md:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
