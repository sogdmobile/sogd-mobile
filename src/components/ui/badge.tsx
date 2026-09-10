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
  const variants: Record<string, string> = {
    default: "bg-[#181b22] text-[#8a95a8] border border-[#252d3d]",
    sale: "bg-[#e85454]/12 text-[#e85454] border border-[#e85454]/25",
    new: "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20",
    popular: "bg-amber-500/12 text-amber-300 border border-amber-500/25",
    stock: "bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20",
    outline: "border border-[#252d3d] text-[#56627a]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
