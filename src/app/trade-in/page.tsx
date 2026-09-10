import React from "react";
import { Metadata } from "next";
import { TradeInForm } from "@/components/trade-in/trade-in-form";

export const metadata: Metadata = {
  title: "Trade-In — Обмен старого смартфона на новый",
  description: "Обменяйте старый смартфон на новый с доплатой в SOGD MOBILE. Быстрая оценка, выгодные условия, перенос данных в подарок.",
};

export default function TradeInPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-block py-1.5 px-3 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[12px] font-bold tracking-widest uppercase border border-[var(--accent)]/20">
            SOGD MOBILE TRADE-IN
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f1f3f7] tracking-tight">
            Обменяйте старый <br className="hidden sm:block" />
            на новый с доплатой
          </h1>
          <p className="text-lg text-[#8a95a8] max-w-2xl mx-auto">
            Сдайте ваше старое устройство, получите скидку на новое и перенос всех данных в подарок. Заполните форму, чтобы узнать примерную стоимость.
          </p>
        </div>

        {/* Features / Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8">
          {[
            {
              title: "1. Заявка",
              desc: "Заполните форму, укажите состояние и получите примерную оценку онлайн."
            },
            {
              title: "2. Диагностика",
              desc: "Принесите устройство в магазин. Мы проведем быструю проверку за 15 минут."
            },
            {
              title: "3. Новый телефон",
              desc: "Выберите новое устройство, доплатите разницу и мы перенесем все ваши данные."
            }
          ].map((f) => (
            <div key={f.title} className="p-6 bg-[#111318] border border-[#1c2030] rounded-2xl text-center">
              <h3 className="font-bold text-[#f1f3f7] mb-2">{f.title}</h3>
              <p className="text-[13px] text-[#8a95a8] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <TradeInForm />
      </div>
    </div>
  );
}
