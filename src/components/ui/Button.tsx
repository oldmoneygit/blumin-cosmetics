import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  children: ReactNode;
  isLoading?: boolean;
}

// Spinner SVG constant for reusability
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = memo(({
  variant = "primary",
  size = "medium",
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-full font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-pink-400 text-white hover:bg-pink-500 hover:shadow-lg active:scale-95",
    secondary:
      "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg active:scale-95",
    outline:
      "bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white active:scale-95",
    ghost:
      "bg-transparent text-gray-900 hover:bg-pink-50 active:scale-95",
  };

  const sizes = {
    small: "px-6 py-2 text-xs",
    medium: "px-8 py-3 text-sm",
    large: "px-12 py-4 text-base",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-live={isLoading ? "polite" : undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          <span>Carregando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});

// Display name for debugging
Button.displayName = "Button";
