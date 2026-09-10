import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-medium text-slate-300 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            type={type}
            ref={ref}
            className={cn(
              "w-full bg-[#131722] border border-[#232A3B] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500",
              "focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-all duration-150",
              error && "border-red-500/80 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
