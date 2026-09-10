"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatters";
import { storeConfig } from "@/config/store";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    getSubtotal,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const freeThreshold = storeConfig.delivery.freeDeliveryThreshold;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e121a] border-l border-[#232A3B] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#232A3B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00E5FF]" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Корзина ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1"
                >
                  Очистить
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Закрыть корзину"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery threshold progress bar */}
          {items.length > 0 && (
            <div className="bg-[#131722] px-5 py-3 border-b border-[#232A3B]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">
                  {remainingForFree === 0 ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      🎉 Доставка по Худжанду бесплатно!
                    </span>
                  ) : (
                    <>
                      До бесплатной доставки:{" "}
                      <span className="text-[#00E5FF] font-bold">
                        {formatPrice(remainingForFree)}
                      </span>
                    </>
                  )}
                </span>
                <span className="text-slate-400">{freeProgress}%</span>
              </div>
              <div className="w-full bg-[#1e2536] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00E5FF] to-[#0070F3] h-1.5 transition-all duration-300"
                  style={{ width: `${freeProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#232A3B]/40">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1A2030] flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Ваша корзина пуста
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Выберите стильные аксессуары для вашего телефона в каталоге
                  </p>
                </div>
                <Link href="/catalog" onClick={closeCart}>
                  <Button variant="primary" size="md">
                    Перейти в каталог
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.productId} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Image */}
                  <div className="w-18 h-18 rounded-xl bg-[#131722] border border-[#232A3B] overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-white hover:text-[#00E5FF] line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Удалить товар"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Арт: {item.sku}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-[#131722] border border-[#232A3B] rounded-lg p-0.5">
                        <button
                          onClick={() => decrement(item.productId)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5"
                          aria-label="Уменьшить количество"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.productId)}
                          disabled={item.quantity >= item.stock}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 disabled:opacity-30"
                          aria-label="Увеличить количество"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#232A3B] bg-[#111520] space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Сумма товаров:</span>
                  <span className="text-white font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Доставка по Худжанду:</span>
                  <span className="text-emerald-400 font-medium">
                    {remainingForFree === 0
                      ? "Бесплатно"
                      : `${storeConfig.delivery.inCityCost} сомони`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#232A3B]">
                  <span>Итого к оплате:</span>
                  <span className="text-[#00E5FF]">
                    {formatPrice(
                      subtotal +
                        (remainingForFree === 0
                          ? 0
                          : storeConfig.delivery.inCityCost)
                    )}
                  </span>
                </div>
              </div>

              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-between">
                  <span>Оформить заказ</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Оплата наличными или картой при получении</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
