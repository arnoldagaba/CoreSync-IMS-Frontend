import { cva } from "class-variance-authority";

export const navItemVariants = cva(
    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 font-medium",
    {
        variants: {
            active: {
                true: "bg-primary/10 text-primary",
                false:
                    "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
            },
            variant: {
                default: "",
                compact: "justify-center py-2 px-2",
            },
        },
        defaultVariants: {
            active: false,
            variant: "default",
        },
    },
);