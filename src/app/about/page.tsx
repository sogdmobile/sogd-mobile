import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, MapPin } from "lucide-react";

export const metadata = {
  title: "О магазине SOGD MOBILE",
  description:
    "SOGD MOBILE — современный магазин премиальных мобильных аксессуаров в городе Худжанд, Таджикистан.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-widest">
          О бренде
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          SOGD MOBILE
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Магазин мобильных технологий и аксессуаров нового поколения в Худжанде.
        </p>
      </div>

      <div className="rounded-3xl bg-[#0e121a] border border-[#1e2536] p-8 sm:p-12 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-bold text-white">
          Наша миссия и принципы
        </h2>
        <p>
          Мы создали <strong>SOGD MOBILE</strong> с четкой целью: избавить пользователей от бесконечного поиска качественных аксессуаров и риска купить дешевую подделку, которая сломает порт зарядки или испортит дисплей телефона.
        </p>
        <p>
          Мы тестируем каждый тип защитного стекла на олеофобность и прочность, проверяем каждый GaN адаптер на стабильность протоколов Power Delivery и замеряем реальную емкость повербанков.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#232A3B]">
          <div className="space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#00E5FF]" />
            <h4 className="font-bold text-white text-base">Контроль качества</h4>
            <p className="text-xs text-slate-400">
              Никакого низкопробного пластика. Только проверенные бренды и сертифицированные материалы.
            </p>
          </div>
          <div className="space-y-2">
            <Sparkles className="w-6 h-6 text-[#0070F3]" />
            <h4 className="font-bold text-white text-base">Современный дизайн</h4>
            <p className="text-xs text-slate-400">
              Аксессуары, которые дополняют премиальный внешний вид вашего смартфона.
            </p>
          </div>
          <div className="space-y-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-white text-base">Всегда рядом</h4>
            <p className="text-xs text-slate-400">
              Удобный оффлайн-магазин в самом центре Худжанда и быстрая курьерская доставка.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link href="/catalog">
          <Button variant="primary" size="lg">
            Перейти в каталог аксессуаров
          </Button>
        </Link>
      </div>
    </div>
  );
}
