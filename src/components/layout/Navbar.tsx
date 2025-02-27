import { Bell, Menu, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface NavbarProps {
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setIsMobileMenuOpen }: NavbarProps) => {
  return (
    <header className="fixed top-0 right-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 md:w-[calc(100%-theme(width.16))] md:px-6 xl:w-[calc(100%-theme(width.64))] dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="mr-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-medium md:hidden">CoreSync</h2>
      </div>

      <div className="flex items-center space-x-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button className="flex items-center space-x-2 rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
          <User className="h-5 w-5" />
          <span className="hidden font-medium md:inline">John Doe</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
