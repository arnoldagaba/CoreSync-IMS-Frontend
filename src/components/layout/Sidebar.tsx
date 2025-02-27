import { cn } from "@/lib/utils";
import { ChevronRight, LogOut, X } from "lucide-react";
import { Dispatch, JSX, SetStateAction } from "react";
import { Link } from "react-router";
import { NavItemProps } from "./navItems/NavItem";
import { navItemVariants } from "./navItems/navItemVariants";
import { navItems } from "./navItems/NavItems";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}

const NavItem = ({
  item,
  isCollapsed,
  active,
  className,
}: NavItemProps): JSX.Element => {
  return (
    <Link
      to={item.path}
      className={cn(
        navItemVariants({
          active,
          variant: isCollapsed ? "compact" : "default",
        }),
        className,
      )}
      title={isCollapsed ? item.title : undefined}
    >
      {item.icon}
      {!isCollapsed && <span>{item.title}</span>}
    </Link>
  );
};

const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-950",
        isSidebarCollapsed ? "w-16" : "w-64",
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0",
      )}
    >
      {/* Sidebar header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
        {!isSidebarCollapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            AppName
          </h1>
        )}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden rounded-md p-1 text-gray-500 hover:bg-gray-100 md:flex dark:hover:bg-gray-800"
        >
          <ChevronRight
            className={cn(
              "h-5 w-5 transition-transform",
              !isSidebarCollapsed && "rotate-180",
            )}
          />
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1 overflow-y-auto px-3 py-4",
          isSidebarCollapsed && "px-2",
        )}
      >
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isCollapsed={isSidebarCollapsed}
              active={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>

      {/* Sidebar footer */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <NavItem
          item={{
            title: "Logout",
            path: "/logout",
            icon: <LogOut size={20} />,
          }}
          isCollapsed={isSidebarCollapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
