import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sale" | "new" | "popular" | "stock" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[#1E2536] text-slate-300 border border-slate-700/50",
    sale: "bg-red-500/15 text-red-400 border border-red-500/30",
    new: "bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30",
    popular: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    stock: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    outline: "border border-slate-700 text-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
