"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-white">
          Произошла непредвиденная ошибка
        </h1>
        <p className="text-sm text-slate-400">
          Мы уже зафиксировали проблему. Попробуйте обновить страницу или вернуться на главную.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={() => reset()} variant="primary" size="md" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Попробовать снова</span>
        </Button>
        <Link href="/">
          <Button variant="outline" size="md" className="gap-2">
            <Home className="w-4 h-4" />
            <span>На главную</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
