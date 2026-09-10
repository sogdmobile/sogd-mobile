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
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#131722] border border-[#232A3B] flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Ваша корзина пока пуста
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            В каталоге SOGD MOBILE вас ждут сотни качественных аксессуаров для смартфонов всех популярных брендов.
          </p>
        </div>
        <Link href="/catalog">
          <Button variant="primary" size="lg">
            Перейти к покупкам
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-6 border-b border-[#1a2030] mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Корзина товаров
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Вы выбрали {items.reduce((acc, i) => acc + i.quantity, 0)} аксессуаров
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 divide-y divide-[#232A3B]/60 space-y-6">
          {items.map((item) => (
            <div key={item.productId} className="pt-6 first:pt-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-[#131722] border border-[#232A3B] overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#00E5FF]">
                    {item.brand}
                  </span>
                  <Link
                    href={`/product/${item.slug}`}
                    className="block font-semibold text-white hover:text-[#00E5FF] text-sm sm:text-base leading-snug line-clamp-2 mt-0.5"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Артикул: {item.sku}
                  </p>
                </div>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#232A3B]">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#232A3B] bg-[#131722] rounded-xl p-0.5">
                  <button
                    onClick={() => decrement(item.productId)}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.productId)}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/5 disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for item */}
                <div className="text-right min-w-[100px]">
                  <p className="text-base font-bold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatPrice(item.price)} / шт.
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-slate-500 hover:text-red-400 p-2 transition-colors"
                  aria-label="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Proceed to Checkout (4 cols) */}
        <div className="lg:col-span-4 bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-white pb-3 border-b border-[#232A3B]">
            Детали заказа
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Сумма товаров:</span>
              <span className="text-white font-medium">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-slate-400 text-xs">
              <span>Доставка по Худжанду:</span>
              <span className="text-emerald-400 font-semibold">
                {isFreeDelivery ? "Бесплатно" : formatPrice(deliveryCost)}
              </span>
            </div>

            {!isFreeDelivery && (
              <div className="p-2.5 rounded-xl bg-[#131722] border border-[#232A3B] text-[11px] text-slate-400">
                Добавьте товаров еще на{" "}
                <strong className="text-[#00E5FF]">
                  {formatPrice(freeThreshold - subtotal)}
                </strong>{" "}
                для бесплатной доставки по городу!
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-[#232A3B]">
              <span>Всего к оплате:</span>
              <span className="text-2xl text-[#00E5FF] font-black">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <Link href="/checkout" className="block w-full">
            <Button variant="primary" size="lg" className="w-full justify-between">
              <span>Перейти к оформлению</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <div className="pt-4 border-t border-[#232A3B] space-y-2.5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Оплата при получении (наличными или перевод)</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
              <span>Быстрая курьерская доставка по Худжанду</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#0070F3] flex-shrink-0" />
              <span>Бесплатный самовывоз из ТЦ «Худжанд Плаза»</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
