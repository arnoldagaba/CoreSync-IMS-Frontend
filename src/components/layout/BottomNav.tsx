import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Package,
	Tag,
	ArrowLeftRight,
	BarChart3,
} from "lucide-react";

const navItems = [
	{
		name: "Dashboard",
		path: "/",
		icon: LayoutDashboard,
	},
	{
		name: "Products",
		path: "/products",
		icon: Package,
	},
	{
		name: "Categories",
		path: "/categories",
		icon: Tag,
	},
	{
		name: "Transactions",
		path: "/transactions",
		icon: ArrowLeftRight,
	},
	{
		name: "Reports",
		path: "/reports",
		icon: BarChart3,
	},
];

export const BottomNav = () => {
	const location = useLocation();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
			<div className="max-w-md px-4 mx-auto">
				<div className="flex items-center justify-between h-16">
					{navItems.map((item) => {
						const isActive = location.pathname === item.path;
						const Icon = item.icon;

						return (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"flex flex-col items-center justify-center w-16 h-16 relative",
									"text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
									isActive && "text-primary-500 dark:text-primary-400"
								)}
							>
								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center"
								>
									<Icon className="w-5 h-5" />
									<span className="mt-1 text-xs">{item.name}</span>
									{isActive && (
										<motion.div
											layoutId="bottomNavIndicator"
											className="absolute -bottom-0.5 w-12 h-0.5 bg-primary-500 dark:bg-primary-400 rounded-full"
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
								</motion.div>
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
};