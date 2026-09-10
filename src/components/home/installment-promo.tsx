import React from "react";
import { CreditCard, CheckCircle2 } from "lucide-react";

export function InstallmentPromo() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="glass-card p-6 sm:p-10 border border-[var(--border-glass)] flex flex-col md:flex-row items-center gap-8 bg-[var(--bg-raised)]">
        
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
          <CreditCard className="w-8 h-8" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Доступна покупка в рассрочку
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
            Вы можете приобрести любой смартфон или крупные аксессуары в рассрочку через наших банковских партнёров. Оформление происходит в магазине при наличии необходимых документов.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[13px] text-[var(--text-muted)]">
            <CheckCircle2 className="w-4 h-4 text-[var(--success)]" /> Без лишних справок
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-[13px] text-[var(--text-muted)]">
            <CheckCircle2 className="w-4 h-4 text-[var(--success)]" /> Удобный график
          </div>
        </div>

      </div>
    </section>
  );
}
