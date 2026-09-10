import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/formatters";
import { storeConfig } from "@/config/store";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import {
  CheckCircle2,
  Package,
  MapPin,
  Truck,
  Send,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface OrderSuccessPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { orderNumber } = await params;

  let dbOrder = null;
  try {
    dbOrder = await db.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
      },
    });
  } catch {
    dbOrder = null;
  }

  const order = dbOrder || {
    id: "ord_preview",
    orderNumber,
    customerName: "Уважаемый покупатель",
    phone: storeConfig.phoneFormatted,
    messenger: null,
    deliveryType: "PICKUP" as const,
    city: storeConfig.city,
    address: null,
    comment: null,
    paymentMethod: "CASH_ON_DELIVERY",
    status: "NEW",
    subtotal: 0,
    deliveryCost: 0,
    total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Success Card */}
      <div className="bg-[#0e121a] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-widest">
            Заказ принят в обработку
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Спасибо за покупку, {order.customerName}!
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span>Номер вашего заказа:</span>
            <strong className="text-white font-mono text-base bg-[#131722] px-3 py-1 rounded-lg border border-[#232A3B]">
              {order.orderNumber}
            </strong>
            <CopyButton text={order.orderNumber} label="Копировать" />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#131722] border border-[#232A3B] max-w-lg mx-auto text-xs text-slate-300 flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>
            Наш менеджер свяжется с вами по номеру{" "}
            <strong className="text-white">{order.phone}</strong> для подтверждения в течение 10–15 минут.
          </span>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start">
        {/* Items List (7 cols) */}
        <div className="md:col-span-7 bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-white text-base pb-3 border-b border-[#232A3B] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#00E5FF]" />
            <span>Состав заказа</span>
          </h3>

          <div className="divide-y divide-[#232A3B]/50 space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {item.productName}
                  </h4>
                  <p className="text-slate-500">
                    {item.quantity} шт. × {formatPrice(item.price)}
                  </p>
                </div>
                <span className="font-bold text-white text-sm">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#232A3B] space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Сумма товаров:</span>
              <span className="text-white">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Доставка:</span>
              <span className="text-emerald-400 font-semibold">
                {order.deliveryCost === 0 ? "Бесплатно" : formatPrice(order.deliveryCost)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#232A3B]">
              <span>Всего к оплате:</span>
              <span className="text-xl text-[#00E5FF]">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Destination / Pickup Info (5 cols) */}
        <div className="md:col-span-5 bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="font-bold text-white text-base pb-3 border-b border-[#232A3B] flex items-center gap-2">
            {order.deliveryType === "DELIVERY" ? (
              <Truck className="w-4 h-4 text-[#0070F3]" />
            ) : (
              <MapPin className="w-4 h-4 text-emerald-400" />
            )}
            <span>
              {order.deliveryType === "DELIVERY"
                ? "Адрес доставки"
                : "Пункт самовывоза"}
            </span>
          </h3>

          <div className="text-xs text-slate-300 space-y-3">
            {order.deliveryType === "DELIVERY" ? (
              <>
                <p>
                  <strong className="text-white">Город:</strong> {order.city}
                </p>
                <p>
                  <strong className="text-white">Адрес:</strong> {order.address}
                </p>
                {order.comment && (
                  <p className="text-slate-400 italic">
                    «{order.comment}»
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  <strong className="text-white">Магазин:</strong> {storeConfig.name}
                </p>
                <p className="text-slate-400">{storeConfig.address}</p>
                <p className="text-emerald-400 font-semibold">
                  Готов к выдаче ежедневно с 09:00 до 20:00
                </p>
              </>
            )}

            <div className="pt-3 border-t border-[#232A3B]">
              <p className="text-slate-500">
                Дата заказа: {formatDate(order.createdAt)}
              </p>
              <p className="text-slate-500 mt-0.5">
                Способ оплаты: Оплата при получении
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#232A3B] space-y-2">
            <a
              href={`https://t.me/${storeConfig.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="secondary" size="md" className="w-full text-xs gap-2">
                <Send className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Написать в Telegram поддержки</span>
              </Button>
            </a>
            <Link href="/catalog" className="w-full block">
              <Button variant="outline" size="md" className="w-full text-xs gap-2">
                <span>Продолжить покупки</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
