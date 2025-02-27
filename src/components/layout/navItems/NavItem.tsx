import { Link } from "react-router";
import {  NavItemType } from "./NavItems";
import { cn } from "@/lib/utils";
import { navItemVariants } from "./navItemVariants";
import { VariantProps } from "class-variance-authority";
import { JSX } from "react";

export interface NavItemProps extends VariantProps<typeof navItemVariants> {
    item: NavItemType;
    isCollapsed: boolean;
    className?: string;
}

export const NavItem = ({
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
