"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormData,
} from "@/lib/validation/checkout";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatters";
import { storeConfig } from "@/config/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Truck,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const subtotal = getSubtotal();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      messenger: "",
      deliveryType: "DELIVERY",
      city: storeConfig.city,
      address: "",
      comment: "",
      paymentMethod: "CASH_ON_DELIVERY",
    },
  });

  const deliveryType = watch("deliveryType");

  const freeThreshold = storeConfig.delivery.freeDeliveryThreshold;
  const isFree = subtotal >= freeThreshold;
  const deliveryCost =
    deliveryType === "PICKUP" ? 0 : isFree ? 0 : storeConfig.delivery.inCityCost;
  const total = subtotal + deliveryCost;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setServerError("Ваша корзина пуста. Добавьте товары перед оформлением заказа.");
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        customerName: data.customerName.trim(),
        phone: data.phone.trim(),
        messenger: data.messenger ? data.messenger.trim() : null,
        deliveryType: data.deliveryType,
        city: data.deliveryType === "DELIVERY" ? data.city?.trim() || null : null,
        address: data.deliveryType === "DELIVERY" ? data.address?.trim() || null : null,
        comment: data.comment ? data.comment.trim() : null,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        let msg = result.message || "Не удалось оформить заказ. Попробуйте снова.";
        if (result.errors) {
          const detail = Object.entries(result.errors)
            .map(([field, errs]) => `${field}: ${(errs as string[]).join(", ")}`)
            .join("; ");
          msg = `${msg} (${detail})`;
        }
        throw new Error(msg);
      }

      // Clear local cart
      clearCart();

      // Redirect to Order Success Page
      router.push(`/order-success/${result.orderNumber}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Произошла неизвестная ошибка при создании заказа.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#131722] border border-[#232A3B] flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">В корзине нет товаров</h1>
        <p className="text-sm text-slate-400">
          Для оформления заказа перейдите в каталог и добавьте нужные товары.
        </p>
        <Link href="/catalog">
          <Button variant="primary" size="md">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Оформление заказа
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Быстрое оформление без обязательной регистрации. Оплата при получении.
        </p>
      </div>

      {serverError && (
        <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-300">Внимание</h4>
            <p className="text-xs text-red-400/90 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Information */}
            <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#232A3B]">
                <div className="w-8 h-8 rounded-lg bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-lg font-bold text-white">
                  Контактные данные
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  id="customerName"
                  label="Ваше имя *"
                  placeholder="Исмоил"
                  {...register("customerName")}
                  error={errors.customerName?.message}
                />

                <Input
                  id="phone"
                  label="Номер телефона *"
                  placeholder="92 000 0000 или +992..."
                  {...register("phone")}
                  error={errors.phone?.message}
                />

                <Input
                  id="messenger"
                  label="Telegram / WhatsApp (для подтверждения и чека)"
                  placeholder="@username или номер в мессенджере"
                  {...register("messenger")}
                  error={errors.messenger?.message}
                />
              </div>
            </div>

            {/* Step 2: Delivery Method */}
            <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#232A3B]">
                <div className="w-8 h-8 rounded-lg bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-lg font-bold text-white">Способ получения</h2>
              </div>

              {/* Delivery / Pickup Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setValue("deliveryType", "DELIVERY")}
                  className={`flex flex-col justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === "DELIVERY"
                      ? "bg-[#131722] border-[#0070F3] shadow-md shadow-[#0070F3]/15"
                      : "bg-[#0b0d12] border-[#232A3B] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <Truck className="w-4 h-4 text-[#00E5FF]" />
                      <span>Курьерская доставка</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        deliveryType === "DELIVERY"
                          ? "border-[#0070F3] bg-[#0070F3]"
                          : "border-slate-600"
                      }`}
                    >
                      {deliveryType === "DELIVERY" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    По Худжанду за 1–3 часа. {isFree ? "Бесплатно!" : `${storeConfig.delivery.inCityCost} сомони`}
                  </p>
                </label>

                <label
                  onClick={() => setValue("deliveryType", "PICKUP")}
                  className={`flex flex-col justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === "PICKUP"
                      ? "bg-[#131722] border-[#0070F3] shadow-md shadow-[#0070F3]/15"
                      : "bg-[#0b0d12] border-[#232A3B] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>Самовывоз (Бесплатно)</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        deliveryType === "PICKUP"
                          ? "border-[#0070F3] bg-[#0070F3]"
                          : "border-slate-600"
                      }`}
                    >
                      {deliveryType === "PICKUP" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    ТЦ «Худжанд Плаза», 1 этаж (09:00 - 20:00)
                  </p>
                </label>
              </div>

              {/* Conditional address fields if delivery is selected */}
              {deliveryType === "DELIVERY" ? (
                <div className="space-y-4 pt-3">
                  <Input
                    id="city"
                    label="Город / Населенный пункт *"
                    placeholder="Худжанд (или Б.Гафуров, Канибадам...)"
                    {...register("city")}
                    error={errors.city?.message}
                  />

                  <Input
                    id="address"
                    label="Адрес доставки (улица, дом, ориентир) *"
                    placeholder="пр. И. Сомони, д. 12, кв. 45 (возле театра Камоли)"
                    {...register("address")}
                    error={errors.address?.message}
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#131722] border border-[#232A3B] text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-white">Адрес пункта выдачи:</p>
                  <p className="text-slate-400">{storeConfig.address}</p>
                  <p className="text-[#00E5FF]">Заказ будет собран и готов к выдаче через 15 минут.</p>
                </div>
              )}

              {/* Order comment */}
              <div className="pt-2">
                <label
                  htmlFor="comment"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Комментарий к заказу (по желанию)
                </label>
                <textarea
                  id="comment"
                  rows={2}
                  placeholder="Например: удобное время доставки, код домофона, модель телефона..."
                  {...register("comment")}
                  className="w-full bg-[#131722] border border-[#232A3B] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3]"
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#232A3B]">
                <div className="w-8 h-8 rounded-lg bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-lg font-bold text-white">Способ оплаты</h2>
              </div>

              <div className="p-4 rounded-2xl bg-[#131722] border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Оплата при получении (наличными или перевод)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Вы оплачиваете заказ только после личной проверки товара при получении у курьера или в магазине.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-[#232A3B]">
              Ваш заказ ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>

            {/* Items mini list */}
            <div className="max-h-64 overflow-y-auto space-y-3 divide-y divide-[#232A3B]/40 pr-1">
              {items.map((item) => (
                <div key={item.productId} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#131722] border border-[#232A3B] overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-slate-500">
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-200">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-[#232A3B] space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Сумма товаров:</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Доставка:</span>
                <span className="text-emerald-400 font-semibold">
                  {deliveryType === "PICKUP"
                    ? "Бесплатно (Самовывоз)"
                    : isFree
                    ? "Бесплатно"
                    : formatPrice(deliveryCost)}
                </span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-black text-white pt-3 border-t border-[#232A3B]">
                <span>Итого к оплате:</span>
                <span className="text-2xl text-[#00E5FF] font-black">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Submit Order Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {isSubmitting ? "Создание заказа..." : "Подтвердить заказ"}
            </Button>

            <p className="text-[11px] text-center text-slate-500">
              Нажимая кнопку, вы подтверждаете согласие на обработку контактных данных для связи оператора магазина SOGD MOBILE.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
