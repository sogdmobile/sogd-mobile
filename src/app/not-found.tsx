import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="relative">
        <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#232A3B] to-transparent select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Страница не найдена
        </h1>
        <p className="text-sm text-slate-400">
          Возможно, товар был распродан или страница была перемещена. Вы можете найти нужный аксессуар в нашем каталоге.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link href="/catalog">
          <Button variant="primary" size="md" className="gap-2">
            <span>Перейти в каталог</span>
          </Button>
        </Link>
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
