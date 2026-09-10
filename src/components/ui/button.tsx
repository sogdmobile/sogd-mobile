import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff]/50 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97] select-none cursor-pointer";

    const variants: Record<string, string> = {
      primary:
        "bg-[#2b7fff] hover:bg-[#1d6be0] text-white shadow-[0_4px_24px_-6px_rgba(43,127,255,0.5)] border border-[#2b7fff]/20",
      secondary:
        "bg-[#181b22] hover:bg-[#1e222d] text-[#f1f3f7] border border-[#252d3d] hover:border-[#323d52]",
      outline:
        "bg-transparent hover:bg-white/4 text-[#8a95a8] hover:text-[#f1f3f7] border border-[#252d3d] hover:border-[#323d52]",
      ghost: "bg-transparent hover:bg-white/5 text-[#8a95a8] hover:text-[#f1f3f7]",
      danger:
        "bg-[#dc2626]/12 hover:bg-[#dc2626]/20 text-[#e85454] border border-[#dc2626]/25",
    };

    const sizes: Record<string, string> = {
      sm: "text-[11px] px-3 py-1.5 h-8 gap-1.5",
      md: "text-[13px] px-4 py-2.5 h-10 gap-2",
      lg: "text-[14px] px-6 py-3 h-12 gap-2.5 font-semibold",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
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
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
