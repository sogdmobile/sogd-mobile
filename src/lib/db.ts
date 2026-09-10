import { PrismaClient } from "@prisma/client";
import path from "path";

const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "") {
    return process.env.DATABASE_URL;
  }
  // Fallback to SQLite dev.db in prisma directory
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  return `file:${dbPath}`;
};

const databaseUrl = getDatabaseUrl();
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ||
  new PrismaClient({
    datasourceUrl: databaseUrl,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

