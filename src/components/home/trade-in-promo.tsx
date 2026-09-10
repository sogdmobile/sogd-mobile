import React from "react";
import Link from "next/link";
import { RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TradeInPromo() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="glass-card p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Background Decorative Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--accent-purple)]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--accent-cyan)]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-[var(--accent-light)] mb-4">
            <RefreshCw className="w-3.5 h-3.5" /> Обмен старого на новое
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Trade-In: Обновите свой телефон с выгодой
          </h2>
          <p className="text-[var(--text-secondary)] text-base mb-8 max-w-xl mx-auto md:mx-0">
            Сдайте старый смартфон, мы оценим его онлайн или в магазине, и вы получите скидку на покупку нового устройства или аксессуаров. Это быстро и безопасно.
          </p>
          <Link href="/trade-in">
            <Button variant="primary" size="lg" className="shadow-[0_0_20px_rgba(43,127,255,0.3)]">
              Оценить старое устройство <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Visual Element */}
        <div className="relative z-10 w-full max-w-xs shrink-0 flex justify-center">
          <div className="relative w-48 h-64 bg-gradient-to-tr from-[var(--bg-base)] to-[var(--bg-surface)] border border-[var(--border-glass)] rounded-3xl shadow-2xl overflow-hidden animate-float">
             {/* Fake screen content */}
             <div className="absolute inset-2 bg-[var(--bg-raised)] rounded-2xl border border-[var(--border-glass)] flex flex-col items-center justify-center p-4">
                <RefreshCw className="w-12 h-12 text-[var(--accent-light)] mb-4 opacity-80" />
                <div className="w-20 h-2 bg-white/10 rounded-full mb-2" />
                <div className="w-16 h-2 bg-white/5 rounded-full" />
             </div>
             {/* Screen glare */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent opacity-50" />
          </div>
        </div>

      </div>
    </section>
  );
}
