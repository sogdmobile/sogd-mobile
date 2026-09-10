import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
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
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer relative overflow-hidden";

    const variants: Record<string, string> = {
      primary:
        "bg-[var(--accent)] hover:bg-[#1d6be0] text-white shadow-[0_4px_20px_rgba(43,127,255,0.4)] hover:shadow-[0_8px_30px_rgba(43,127,255,0.6)] border border-white/10",
      secondary:
        "bg-[#181b22] hover:bg-[#1e222d] text-[#f1f3f7] border border-[var(--border-glass)] hover:border-[var(--border-strong)]",
      outline:
        "bg-transparent hover:bg-white/5 text-[#8a95a8] hover:text-[#f1f3f7] border border-[var(--border-glass)] hover:border-[var(--border-strong)]",
      ghost: "bg-transparent hover:bg-white/5 text-[#8a95a8] hover:text-[#f1f3f7]",
      danger:
        "bg-[var(--danger)]/15 hover:bg-[var(--danger)]/25 text-[var(--danger)] border border-[var(--danger)]/30",
      glass:
        "bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg hover:shadow-xl",
    };

    const sizes: Record<string, string> = {
      sm: "text-[12px] px-4 py-2 h-9 gap-1.5",
      md: "text-[14px] px-5 py-2.5 h-11 gap-2 rounded-xl",
      lg: "text-[15px] px-8 py-3.5 h-14 gap-2.5 font-semibold rounded-2xl",
      icon: "h-11 w-11 p-0 rounded-xl",
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
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
