import { JSX, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import {
	LayoutDashboard,
	Package,
	Tags,
	ClipboardList,
	BarChart3,
	FileText,
	Settings,
	ChevronLeft,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
	{ name: "Dashboard", href: "/", icon: LayoutDashboard },
	{ name: "Products", href: "/products", icon: Package },
	{ name: "Categories", href: "/categories", icon: Tags },
	{ name: "Transactions", href: "/transactions", icon: ClipboardList },
	{ name: "Analytics", href: "/analytics", icon: BarChart3 },
	{ name: "Reports", href: "/reports", icon: FileText },
	{ name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
	isMinimized: boolean;
	onToggleMinimize: () => void;
	onClose?: () => void;
}

const Sidebar = ({
	isMinimized,
	onToggleMinimize,
	onClose,
}: SidebarProps): JSX.Element => {
	const location = useLocation();

	// Close sidebar on route change in mobile view
	useEffect(() => {
		if (onClose && window.innerWidth < 1024) {
			onClose();
		}
	}, [location, onClose]);

	return (
		<div className="h-full bg-white border-r dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
			<div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
				<AnimatePresence mode="wait">
					{!isMinimized && (
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.2 }}
							className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
						>
							InvenEase
						</motion.h1>
					)}
				</AnimatePresence>
				<div className="flex items-center gap-2">
					{/* Close button - only on mobile */}
					{onClose && (
						<Button
							variant="ghost"
							size="sm"
							onClick={onClose}
							className="lg:hidden"
							aria-label="Close sidebar"
						>
							<X className="w-5 h-5" />
						</Button>
					)}
					{/* Minimize button - only on desktop */}
					<Button
						variant="ghost"
						size="sm"
						onClick={onToggleMinimize}
						className={cn("hidden lg:flex", !isMinimized && "ml-auto")}
						aria-label={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
					>
						<motion.div
							initial={false}
							animate={{ rotate: isMinimized ? 180 : 0 }}
							transition={{ duration: 0.3 }}
						>
							<ChevronLeft className="w-5 h-5" />
						</motion.div>
					</Button>
				</div>
			</div>
			<nav className="flex-1 p-2 space-y-1 overflow-y-auto">
				{navigation.map((item) => (
					<NavLink
						key={item.name}
						to={item.href}
						className={({ isActive }) =>
							cn(
								"flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
								isActive
									? "bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400"
									: "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50",
								isMinimized ? "justify-center" : "justify-start"
							)
						}
						title={item.name}
					>
						<item.icon
							className={cn(
								"flex-shrink-0",
								isMinimized ? "h-6 w-6" : "h-5 w-5"
							)}
						/>
						<AnimatePresence mode="wait">
							{!isMinimized && (
								<motion.span
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.2 }}
									className="ml-3"
								>
									{item.name}
								</motion.span>
							)}
						</AnimatePresence>
					</NavLink>
				))}
			</nav>
		</div>
	);
};

export default Sidebar;