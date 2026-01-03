import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  pulsing?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, pulsing, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
      primary: "bg-gradient-to-r from-teal-600 to-emerald-500 text-white hover:opacity-90 shadow-lg shadow-teal-500/30 border border-transparent",
      secondary: "bg-white text-secondary hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors",
      outline: "border-2 border-primary text-primary hover:bg-primary/5",
      danger: "bg-danger text-white hover:bg-red-600 shadow-md shadow-danger/20",
      ghost: "text-secondary hover:bg-secondary/10 hover:text-primary",
    };

    const sizes = {
      sm: "h-8 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
      xl: "h-16 px-10 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          pulsing && "animate-pulse-slow shadow-xl shadow-primary/40 ring-4 ring-primary/20",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
