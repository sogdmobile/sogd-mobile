import type { NextConfig } from "next";
import path from "path";

const fallbackDbUrl = `file:${path.join(process.cwd(), "prisma", "dev.db").replace(/\\/g, "/")}`;

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
  process.env.DATABASE_URL = fallbackDbUrl;
}

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL || fallbackDbUrl,
    ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY || "sogd_secret_admin_2026",
    NEXT_PUBLIC_STORE_NAME: process.env.NEXT_PUBLIC_STORE_NAME || "SOGD MOBILE",
  },
  outputFileTracingIncludes: {
    "/**": ["./prisma/**/*"],
  },
};


export default nextConfig;

