import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

const MainLayout = () => {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

    // Set initial sidebar state based on screen size
    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth < 1024;
            if (isSmallScreen) {
                setIsSidebarMinimized(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMinimize = () => {
        setIsSidebarMinimized((prev) => !prev);
    };

    return (
        <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Sidebar - hidden on mobile */}
            <div
                className={cn(
                    "relative hidden lg:block",
                    isSidebarMinimized ? "w-16" : "w-64",
                    "transition-all duration-300 ease-in-out",
                )}
            >
                <Sidebar
                    isMinimized={isSidebarMinimized}
                    onToggleMinimize={toggleMinimize}
                />
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0">
                <Navbar />

                <main className="flex-1 p-6 pb-24 overflow-y-auto lg:pb-6">
                    <Outlet />
                </main>

                <BottomNav />
            </div>
        </div>
    );
};

export default MainLayout;
