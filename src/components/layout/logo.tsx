import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "desktop" | "mobile" | "icon";
  className?: string;
  asLink?: boolean;
}

export function Logo({
  variant = "desktop",
  className = "",
  asLink = true,
}: LogoProps) {
  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 select-none transition-opacity hover:opacity-90",
        className
      )}
    >
      {/* Hexa-Monolith S Vector Mark */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 70 85"
          width={variant === "icon" ? 36 : variant === "mobile" ? 30 : 36}
          height={variant === "icon" ? 44 : variant === "mobile" ? 36 : 44}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="sogd_cyan_flow_svg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0070F3" />
            </linearGradient>
          </defs>

          {/* Top Segment (Cyan to Electric Blue) */}
          <path
            d="M40 0 L70 17 V35 L48 48 L35 40 L51 31 V22 L40 16 L14 16 L40 0 Z"
            fill="url(#sogd_cyan_flow_svg)"
          />

          {/* Bottom Segment (Pure Optical White) */}
          <path
            d="M30 85 L0 68 V50 L22 37 L35 45 L19 54 V63 L30 69 H56 L30 85 Z"
            fill="#FFFFFF"
          />

          {/* Energy Catalyst Center Spark */}
          <rect
            x="32"
            y="39"
            width="7"
            height="7"
            rx="2"
            transform="rotate(45 35.5 42.5)"
            fill="#00E5FF"
          />
        </svg>
      </div>

      {/* Typography: SOGD MOBILE */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              className={cn(
                "font-black tracking-wider text-white",
                variant === "mobile" ? "text-xl tracking-wider" : "text-2xl tracking-[0.15em]"
              )}
              style={{ fontFamily: "inherit" }}
            >
              SOGD
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] inline-block mb-1 shadow-[0_0_8px_#00E5FF]" />
          </div>

          <span
            className={cn(
              "font-bold uppercase text-[#94A3B8] tracking-[0.3em]",
              variant === "mobile" ? "text-[9px]" : "text-[10px]"
            )}
          >
            MOBILE
          </span>
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="SOGD MOBILE Главная" className="group inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
