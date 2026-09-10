import React from "react";
import Link from "next/link";
import { storeConfig } from "@/config/store";
import { Truck, MapPin, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Доставка и оплата — SOGD MOBILE",
  description: "Условия доставки по Худжанду и способы оплаты в магазине SOGD MOBILE.",
};

export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[12px] uppercase font-extrabold text-[var(--accent-cyan)] tracking-widest bg-[var(--accent-cyan)]/10 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/20 inline-block">
          УСЛОВИЯ И СЕРВИС
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#f1f3f7] tracking-tight">
          Доставка и оплата
        </h1>
        <p className="text-[#8a95a8] text-[15px] sm:text-[16px] leading-relaxed">
          Быстрая курьерская доставка по Худжанду и безопасная оплата при получении.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Box */}
        <div className="glass-card p-8">
          <div className="w-14 h-14 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center mb-6 shadow-[0_0_20px_-5px_var(--accent-cyan)]">
            <Truck className="w-6 h-6 text-[var(--accent-cyan)]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#f1f3f7] mb-4">Доставка по городу</h2>
          <ul className="space-y-4 text-[#8a95a8] text-[14px]">
            <li className="flex gap-3">
              <span className="text-[var(--accent-cyan)] font-bold mt-0.5">•</span>
              <span>
                <strong>Стоимость:</strong> {storeConfig.delivery.inCityCost} сомони.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--accent-cyan)] font-bold mt-0.5">•</span>
              <span>
                <strong>Бесплатно:</strong> при заказе от {storeConfig.delivery.freeDeliveryThreshold} сомони.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--accent-cyan)] font-bold mt-0.5">•</span>
              <span>
                <strong>Время доставки:</strong> От 1 до 3 часов с момента подтверждения.
              </span>
            </li>
          </ul>
        </div>

        {/* Pickup Box */}
        <div className="glass-card p-8">
          <div className="w-14 h-14 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center mb-6 shadow-[0_0_20px_-5px_rgba(22,163,74,0.5)]">
            <MapPin className="w-6 h-6 text-[#16a34a]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#f1f3f7] mb-4">Самовывоз (Бесплатно)</h2>
          <p className="text-[#8a95a8] text-[14px] leading-relaxed mb-4">
            Вы можете забрать свой заказ самостоятельно в нашем магазине. Заказ будет собран и готов к выдаче через 15 минут.
          </p>
          <div className="p-4 bg-[#0d0f14] border border-[#1c2030] rounded-xl text-[13px] text-[#f1f3f7]">
            <span className="block text-[#8a95a8] mb-1">Наш адрес:</span>
            {storeConfig.address}
          </div>
        </div>
      </div>

      <div className="glass-card p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="w-20 h-20 rounded-full bg-[#111318] border border-[#1c2030] flex items-center justify-center shrink-0 shadow-[0_0_30px_-5px_var(--accent)]">
            <CreditCard className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#f1f3f7] mb-3">
              Способы оплаты
            </h2>
            <p className="text-[#8a95a8] text-[15px] leading-relaxed mb-4">
              Мы не требуем предоплату при заказе онлайн. Вы оплачиваете заказ только после личной проверки товара.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px] text-[#f1f3f7]">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                Наличными курьеру
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                Перевод на карту
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                QR оплата (Алиф, Эсхата)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                Покупка в рассрочку (в магазине)
              </li>
            </ul>
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
