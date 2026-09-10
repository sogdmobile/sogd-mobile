"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatters";
import { storeConfig } from "@/config/store";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Info
} from "lucide-react";

export default function CartPage() {
  const { items, increment, decrement, removeItem, clearCart, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const freeThreshold = storeConfig.delivery.freeDeliveryThreshold;
  const isFreeDelivery = subtotal >= freeThreshold;
  const deliveryCost = isFreeDelivery ? 0 : storeConfig.delivery.inCityCost;
  const total = subtotal + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#111318] border border-[#1c2030] flex items-center justify-center text-[#56627a] mx-auto shadow-2xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f3f7] tracking-tight">
            Ваша корзина пуста
          </h1>
          <p className="text-[#8a95a8] text-[15px] max-w-md mx-auto leading-relaxed">
            В каталоге SOGD MOBILE вас ждут премиальные аксессуары для вашего устройства.
          </p>
        </div>
        <div className="pt-4">
          <Link href="/catalog">
            <Button variant="primary" size="lg" className="px-8 shadow-[0_0_24px_-6px_var(--accent)]">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between pb-6 border-b border-[#1c2030] mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f1f3f7] tracking-tight">
            Корзина
          </h1>
          <p className="text-[13px] text-[#56627a] mt-2">
            Выбрано {items.reduce((acc, i) => acc + i.quantity, 0)} товаров
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-[12px] font-medium text-[#56627a] hover:text-[#e85454] transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Очистить корзину</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between group">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-2xl bg-[#111318] border border-[#1c2030] overflow-hidden flex-shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-cyan)]">
                    {item.brand}
                  </span>
                  <Link
                    href={`/product/${item.slug}`}
                    className="block font-bold text-[#f1f3f7] hover:text-[var(--accent-light)] text-[14px] sm:text-[15px] leading-snug line-clamp-2 mt-0.5"
                  >
                    {item.name}
                  </Link>
                  <p className="text-[11px] text-[#56627a] font-mono mt-1">
                    SKU: {item.sku}
                  </p>
                </div>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-4 sm:pt-0 border-t border-[#1c2030] sm:border-0">
                {/* Quantity Controls */}
                <div className="flex items-center bg-[#111318] border border-[#1c2030] rounded-xl h-10 overflow-hidden">
                  <button
                    onClick={() => decrement(item.productId)}
                    className="w-9 h-full flex items-center justify-center text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-[13px] font-bold text-[#f1f3f7]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.productId)}
                    disabled={item.quantity >= item.stock}
                    className="w-9 h-full flex items-center justify-center text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22] transition-colors disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <p className="text-[16px] font-extrabold text-[#f1f3f7]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-[11px] text-[#56627a] mt-0.5">
                    {formatPrice(item.price)} / шт.
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-[#3a4356] hover:text-[#e85454] p-2 transition-colors -mr-2"
                  aria-label="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 glass-card p-6 space-y-6 sticky top-24">
          <h2 className="text-[18px] font-extrabold text-[#f1f3f7] tracking-tight pb-4 border-b border-[#1c2030]">
            Ваш заказ
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#8a95a8]">Сумма товаров:</span>
              <span className="text-[#f1f3f7] font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-[14px]">
              <span className="text-[#8a95a8]">Доставка:</span>
              <span className="text-[#16a34a] font-bold">
                {isFreeDelivery ? "Бесплатно" : formatPrice(deliveryCost)}
              </span>
            </div>

            {!isFreeDelivery && (
              <div className="p-3 rounded-xl bg-[#111318] border border-[#1c2030] text-[12px] text-[#8a95a8] leading-relaxed">
                Добавьте товаров на <strong className="text-[var(--accent-cyan)] font-bold">{formatPrice(freeThreshold - subtotal)}</strong> для бесплатной доставки!
              </div>
            )}

            <div className="flex justify-between items-end pt-4 border-t border-[#1c2030]">
              <span className="text-[14px] font-bold text-[#8a95a8]">Итого к оплате:</span>
              <span className="text-3xl font-black text-[#f1f3f7] tracking-tight">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <Link href="/checkout" className="block w-full">
            <Button variant="primary" size="lg" className="w-full justify-between h-14 text-[15px] shadow-[0_0_24px_-6px_var(--accent)] hover:shadow-[0_0_32px_-4px_var(--accent)]">
              <span>Оформить заказ</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <div className="p-3 bg-[#181b22] border border-[#252d3d] rounded-xl flex items-start gap-2.5 mt-2">
            <Info className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#8a95a8] leading-relaxed">
              <strong className="text-[#f1f3f7] block mb-0.5">Доступна рассрочка</strong>
              Можно приобрести товары в рассрочку через банк-партнёр. Спросите у оператора при подтверждении заказа.
            </p>
          </div>

          <div className="pt-2 space-y-3 text-[12px] text-[#56627a]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>Безопасная оплата при получении</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[var(--accent-cyan)] shrink-0" />
              <span>Быстрая доставка по Худжанду</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>Бесплатный самовывоз из магазина</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
