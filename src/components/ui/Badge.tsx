import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "success" | "warning" | "danger" | "neutral" | "info";
    size?: "sm" | "md";
}

export const Badge = ({ className, variant = "neutral", size = "md", children, ...props }: BadgeProps) => {
    const variants = {
        success: "bg-green-100 text-green-700 border-green-200",
        warning: "bg-amber-100 text-amber-700 border-amber-200",
        danger: "bg-red-100 text-red-700 border-red-200",
        neutral: "bg-gray-100 text-gray-700 border-gray-200",
        info: "bg-blue-100 text-blue-700 border-blue-200",
    };

    const sizes = {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center justify-center rounded-full font-medium border",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
