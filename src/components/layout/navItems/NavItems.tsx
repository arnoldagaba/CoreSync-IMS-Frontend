import {
  BarChart2,
  Folder,
  HelpCircle,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

export interface NavItemType {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const navItems: NavItemType[] = [
  { title: "Dashboard", path: "/", icon: <Home size={20} /> },
  { title: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
  { title: "Customers", path: "/customers", icon: <Users size={20} /> },
  { title: "Projects", path: "/projects", icon: <Folder size={20} /> },
  { title: "Messages", path: "/messages", icon: <MessageSquare size={20} /> },
  { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  { title: "Help", path: "/help", icon: <HelpCircle size={20} /> },
];
