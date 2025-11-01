import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  size = "medium",
  className,
}: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold uppercase tracking-wide rounded-full transition-all duration-300";

  const variants = {
    default: "bg-pink-100 text-pink-700 border border-pink-200",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    error: "bg-red-100 text-red-700 border border-red-200",
    info: "bg-blue-100 text-blue-700 border border-blue-200",
  };

  const sizes = {
    small: "px-2 py-1 text-[10px]",
    medium: "px-3 py-1.5 text-xs",
    large: "px-4 py-2 text-sm",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
