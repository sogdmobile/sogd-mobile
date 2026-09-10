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
    customerName: "Покупатель",
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
      <div className="bg-[#111318] border border-[#16a34a]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-[0_0_60px_-15px_rgba(22,163,74,0.15)] relative overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-[#16a34a]/10 border border-[#16a34a]/30 flex items-center justify-center text-[#16a34a] mx-auto shadow-[0_0_40px_-10px_rgba(22,163,74,0.3)]">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <span className="text-[12px] uppercase font-extrabold text-[var(--accent-cyan)] tracking-widest bg-[var(--accent-cyan)]/10 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/20 inline-block">
            Заказ принят
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#f1f3f7] tracking-tight">
            Спасибо за покупку, {order.customerName}!
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <span className="text-[#8a95a8] text-[15px]">Номер заказа:</span>
            <div className="flex items-center gap-2 bg-[#0d0f14] border border-[#1c2030] px-4 py-2 rounded-xl">
              <strong className="text-[#f1f3f7] font-mono text-lg tracking-wider">
                {order.orderNumber}
              </strong>
              <CopyButton text={order.orderNumber} label="Копировать" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#16a34a]/5 border border-[#16a34a]/20 max-w-lg mx-auto text-[13px] text-[#f1f3f7] flex items-center justify-center gap-3 mt-4">
          <ShieldCheck className="w-5 h-5 text-[#16a34a] flex-shrink-0" />
          <span className="leading-relaxed text-left">
            Менеджер свяжется с вами по номеру <strong className="text-white">{order.phone}</strong> для подтверждения в течение 15 минут.
          </span>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-start">
        {/* Items List */}
        <div className="md:col-span-7 glass-card p-6 sm:p-8 space-y-4">
          <h3 className="font-extrabold text-[#f1f3f7] text-[16px] pb-4 border-b border-[#1c2030] flex items-center gap-2">
            <Package className="w-5 h-5 text-[var(--accent)]" />
            <span>Состав заказа</span>
          </h3>

          <div className="divide-y divide-[#1c2030] space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="pt-4 first:pt-0 flex items-center justify-between gap-4 text-[14px]"
              >
                <div>
                  <h4 className="font-bold text-[#f1f3f7]">
                    {item.productName}
                  </h4>
                  <p className="text-[#8a95a8] mt-0.5 text-[13px]">
                    {item.quantity} шт. × {formatPrice(item.price)}
                  </p>
                </div>
                <span className="font-extrabold text-[#f1f3f7]">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-5 border-t border-[#1c2030] space-y-3 text-[14px]">
            <div className="flex justify-between text-[#8a95a8]">
              <span>Сумма:</span>
              <span className="text-[#f1f3f7]">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#8a95a8]">
              <span>Доставка:</span>
              <span className="text-[#16a34a] font-bold">
                {order.deliveryCost === 0 ? "Бесплатно" : formatPrice(order.deliveryCost)}
              </span>
            </div>
            <div className="flex justify-between items-end pt-3 border-t border-[#1c2030]">
              <span className="font-bold text-[#8a95a8]">Итого:</span>
              <span className="text-2xl text-[var(--accent)] font-black tracking-tight">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Destination / Pickup Info */}
        <div className="md:col-span-5 glass-card p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-[#f1f3f7] text-[16px] pb-4 border-b border-[#1c2030] flex items-center gap-2">
            {order.deliveryType === "DELIVERY" ? (
              <Truck className="w-5 h-5 text-[var(--accent-cyan)]" />
            ) : (
              <MapPin className="w-5 h-5 text-[#16a34a]" />
            )}
            <span>
              {order.deliveryType === "DELIVERY"
                ? "Доставка"
                : "Самовывоз"}
            </span>
          </h3>

          <div className="text-[13px] text-[#8a95a8] space-y-3">
            {order.deliveryType === "DELIVERY" ? (
              <>
                <p>
                  <strong className="text-[#f1f3f7]">Город:</strong> {order.city}
                </p>
                <p className="leading-relaxed">
                  <strong className="text-[#f1f3f7]">Адрес:</strong> {order.address}
                </p>
                {order.comment && (
                  <p className="text-[var(--accent-cyan)] italic p-3 bg-[var(--accent-cyan)]/10 rounded-xl border border-[var(--accent-cyan)]/20">
                    «{order.comment}»
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  <strong className="text-[#f1f3f7]">Магазин:</strong> {storeConfig.name}
                </p>
                <p className="leading-relaxed">{storeConfig.address}</p>
                <p className="text-[var(--accent-cyan)] font-semibold pt-1">
                  Заказ будет собран через 15 минут.
                </p>
              </>
            )}

            <div className="pt-4 border-t border-[#1c2030] space-y-1.5">
              <p>Дата: {formatDate(order.createdAt)}</p>
              <p>Оплата: При получении</p>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <a
              href={`https://t.me/${storeConfig.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="secondary" className="w-full text-[13px] gap-2 h-12 shadow-[0_0_15px_-5px_var(--accent-cyan)] hover:shadow-[0_0_20px_-5px_var(--accent-cyan)] border-[var(--accent-cyan)]/30">
                <Send className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>Написать в Telegram</span>
              </Button>
            </a>
            <Link href="/catalog" className="w-full block">
              <Button variant="outline" className="w-full text-[13px] gap-2 h-12">
                <span>Продолжить покупки</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
