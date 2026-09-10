import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, MapPin, Smartphone } from "lucide-react";

export const metadata = {
  title: "О нас — SOGD MOBILE",
  description: "SOGD MOBILE — премиальный магазин аксессуаров и смартфонов в Худжанде.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[12px] uppercase font-extrabold text-[var(--accent-cyan)] tracking-widest bg-[var(--accent-cyan)]/10 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/20 inline-block">
          О КОМПАНИИ
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#f1f3f7] tracking-tight">
          SOGD MOBILE
        </h1>
        <p className="text-[#8a95a8] text-[15px] sm:text-[16px] leading-relaxed">
          Ваш надежный партнер в мире премиальных гаджетов и аксессуаров в Худжанде.
        </p>
      </div>

      <div className="glass-card p-8 sm:p-12 space-y-6 text-[#8a95a8] leading-relaxed text-[15px]">
        <h2 className="text-2xl font-extrabold text-[#f1f3f7]">
          Наша миссия и подход
        </h2>
        <p>
          Мы создали <strong>SOGD MOBILE</strong> с одной целью: сделать премиальные технологии и аксессуары доступными для жителей Худжанда, сохраняя при этом высочайший уровень сервиса.
        </p>
        <p>
          Мы тщательно отбираем каждый чехол, защитное стекло и зарядное устройство. Никаких дешевых подделок — только проверенные бренды и оригинальная продукция.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#1c2030] mt-8">
          <div className="space-y-3">
            <ShieldCheck className="w-8 h-8 text-[var(--accent-cyan)]" />
            <h4 className="font-bold text-[#f1f3f7] text-[15px]">Оригинальность</h4>
            <p className="text-[13px]">Только подлинная продукция известных брендов.</p>
          </div>
          <div className="space-y-3">
            <Sparkles className="w-8 h-8 text-[var(--accent)]" />
            <h4 className="font-bold text-[#f1f3f7] text-[15px]">Уникальный стиль</h4>
            <p className="text-[13px]">Аксессуары, которые подчеркивают дизайн вашего устройства.</p>
          </div>
          <div className="space-y-3">
            <Smartphone className="w-8 h-8 text-[#a855f7]" />
            <h4 className="font-bold text-[#f1f3f7] text-[15px]">Trade-In</h4>
            <p className="text-[13px]">Выгодный обмен старых устройств на новые с доплатой.</p>
          </div>
          <div className="space-y-3">
            <MapPin className="w-8 h-8 text-[#16a34a]" />
            <h4 className="font-bold text-[#f1f3f7] text-[15px]">Удобная локация</h4>
            <p className="text-[13px]">Наш офлайн-магазин находится в самом центре Худжанда.</p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link href="/catalog">
          <Button variant="primary" size="lg" className="px-8 h-14 text-[15px] shadow-[0_0_24px_-6px_var(--accent)]">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    </div>
  );
}
