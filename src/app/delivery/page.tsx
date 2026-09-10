import React from "react";
import Link from "next/link";
import { storeConfig } from "@/config/store";
import { Button } from "@/components/ui/button";
import {
  Truck,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Доставка и оплата в Худжанде",
  description:
    "Условия быстрой доставки мобильных аксессуаров по Худжанду и Согдийской области. Оплата при получении.",
};

export default function DeliveryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-widest">
          Информация для покупателей
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
          Доставка и оплата
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Мы организуем оперативную доставку ваших заказов по городу Худжанд и всей Согдийской области.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Box */}
        <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Доставка курьером</h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Сроки:</strong> Заказы по Худжанду доставляются в течение <strong>1–3 часов</strong> после подтверждения оператором.
            </p>
            <p>
              <strong>Стоимость:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li>По городу Худжанд: <strong>{storeConfig.delivery.inCityCost} сомони</strong></li>
              <li>При заказе от <strong>{storeConfig.delivery.freeDeliveryThreshold} сомони</strong> — <span className="text-emerald-400 font-semibold">БЕСПЛАТНО</span>!</li>
              <li>Пригород и другие города (Гафуров, Истаравшан, Канибадам) — от 20 до 35 сомони курьерской службой.</li>
            </ul>
          </div>
        </div>

        {/* Pickup Box */}
        <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-[#0070F3]/15 text-emerald-400 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Самовывоз из магазина</h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Стоимость:</strong> Бесплатно в любое время.
            </p>
            <p>
              <strong>Адрес пункта выдачи:</strong>
              <br />
              <span className="text-white">{storeConfig.address}</span>
            </p>
            <p>
              <strong>Время работы:</strong>
              <br />
              {storeConfig.workingHours.weekdays}
              <br />
              {storeConfig.workingHours.weekends}
            </p>
            <p className="text-emerald-400 text-xs font-semibold">
              ✓ Заказ резервируется и готов к выдаче через 15 минут.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Box */}
      <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">
            Способ оплаты — Оплата при получении
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          В интернет-магазине <strong>SOGD MOBILE</strong> вы не рискуете своими средствами. Оплата производится строго после проверки комплектации и примерки аксессуара к вашему телефону:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-400">
          <div className="p-4 rounded-xl bg-[#131722] border border-[#232A3B]">
            <strong className="text-white block mb-1">Наличный расчет</strong>
            Оплата сомони курьеру или кассиру в магазине при передаче заказа.
          </div>
          <div className="p-4 rounded-xl bg-[#131722] border border-[#232A3B]">
            <strong className="text-white block mb-1">Мобильный перевод</strong>
            Перевод через мобильные приложения банков Таджикистана (Dushanbe City, Alif Mobi, Эсхата).
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link href="/catalog">
          <Button variant="primary" size="lg">
            Перейти к выбору аксессуаров
          </Button>
        </Link>
      </div>
    </div>
  );
}
