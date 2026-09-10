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
  Info
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

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digits = val.replace(/\D/g, "");

    if (!digits) {
      setValue("phone", "", { shouldValidate: true });
      return;
    }

    let coreDigits = digits;
    if (coreDigits.startsWith("992")) {
      coreDigits = coreDigits.slice(3);
    }
    coreDigits = coreDigits.slice(0, 9);

    let formatted = "+992";
    if (coreDigits.length > 0) {
      formatted += " (" + coreDigits.slice(0, 2);
    }
    if (coreDigits.length >= 2) {
      formatted += ") " + coreDigits.slice(2, 5);
    }
    if (coreDigits.length >= 5) {
      formatted += "-" + coreDigits.slice(5, 7);
    }
    if (coreDigits.length >= 7) {
      formatted += "-" + coreDigits.slice(7, 9);
    }

    setValue("phone", formatted, { shouldValidate: true });
  };

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
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#111318] border border-[#1c2030] flex items-center justify-center text-[#56627a] mx-auto shadow-2xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#f1f3f7] tracking-tight">Корзина пуста</h1>
        <p className="text-[15px] text-[#8a95a8]">
          Для оформления заказа перейдите в каталог и добавьте нужные товары.
        </p>
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
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f1f3f7] tracking-tight">
          Оформление заказа
        </h1>
        <p className="text-[13px] text-[#56627a] mt-2">
          Быстрое оформление без регистрации. Безопасная оплата при получении.
        </p>
      </div>

      {serverError && (
        <div className="mb-8 p-4 rounded-2xl bg-[#e85454]/10 border border-[#e85454]/30 text-[#e85454] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[14px] font-bold">Внимание</h4>
            <p className="text-[12px] opacity-90 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="glass-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1c2030]">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-extrabold text-[15px]">
                  1
                </div>
                <h2 className="text-[18px] font-extrabold text-[#f1f3f7]">
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
                  placeholder="+992 (92) 000-00-00"
                  {...register("phone")}
                  onChange={handlePhoneInputChange}
                  error={errors.phone?.message}
                />

                <Input
                  id="messenger"
                  label="Telegram / WhatsApp (по желанию)"
                  placeholder="@username или номер"
                  {...register("messenger")}
                  error={errors.messenger?.message}
                />
              </div>
            </div>

            {/* Step 2: Delivery Method */}
            <div className="glass-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1c2030]">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-extrabold text-[15px]">
                  2
                </div>
                <h2 className="text-[18px] font-extrabold text-[#f1f3f7]">Способ получения</h2>
              </div>

              {/* Delivery / Pickup Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setValue("deliveryType", "DELIVERY")}
                  className={`flex flex-col justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === "DELIVERY"
                      ? "bg-[#111318] border-[var(--accent)] shadow-[0_0_24px_-6px_var(--accent)]"
                      : "bg-[#0d0f14] border-[#1c2030] hover:border-[#252d3d]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#f1f3f7] font-bold text-[14px]">
                      <Truck className="w-4 h-4 text-[var(--accent)]" />
                      <span>Курьерская доставка</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        deliveryType === "DELIVERY"
                          ? "border-[var(--accent)] bg-[var(--accent)]"
                          : "border-[#3a4356]"
                      }`}
                    >
                      {deliveryType === "DELIVERY" && (
                        <div className="w-2 h-2 rounded-full bg-[#111318]" />
                      )}
                    </div>
                  </div>
                  <p className="text-[12px] text-[#8a95a8]">
                    По Худжанду за 1–3 часа. <strong className="text-[var(--accent-cyan)]">{isFree ? "Бесплатно!" : `${storeConfig.delivery.inCityCost} сомони`}</strong>
                  </p>
                </label>

                <label
                  onClick={() => setValue("deliveryType", "PICKUP")}
                  className={`flex flex-col justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === "PICKUP"
                      ? "bg-[#111318] border-[var(--accent)] shadow-[0_0_24px_-6px_var(--accent)]"
                      : "bg-[#0d0f14] border-[#1c2030] hover:border-[#252d3d]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#f1f3f7] font-bold text-[14px]">
                      <MapPin className="w-4 h-4 text-[#16a34a]" />
                      <span>Самовывоз (Бесплатно)</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        deliveryType === "PICKUP"
                          ? "border-[var(--accent)] bg-[var(--accent)]"
                          : "border-[#3a4356]"
                      }`}
                    >
                      {deliveryType === "PICKUP" && (
                        <div className="w-2 h-2 rounded-full bg-[#111318]" />
                      )}
                    </div>
                  </div>
                  <p className="text-[12px] text-[#8a95a8]">
                    ТЦ «Худжанд Плаза», 1 этаж (09:00 - 20:00)
                  </p>
                </label>
              </div>

              {/* Conditional address fields if delivery is selected */}
              {deliveryType === "DELIVERY" ? (
                <div className="space-y-4 pt-2">
                  <Input
                    id="city"
                    label="Город / Населенный пункт *"
                    placeholder="Худжанд"
                    {...register("city")}
                    error={errors.city?.message}
                  />

                  <Input
                    id="address"
                    label="Адрес доставки *"
                    placeholder="улица, дом, ориентир..."
                    {...register("address")}
                    error={errors.address?.message}
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#111318] border border-[#1c2030] text-[13px] text-[#8a95a8] space-y-1.5 mt-2">
                  <p className="font-bold text-[#f1f3f7]">Адрес пункта выдачи:</p>
                  <p>{storeConfig.address}</p>
                  <p className="text-[var(--accent-cyan)] font-medium pt-1">Заказ будет готов к выдаче через 15 минут.</p>
                </div>
              )}

              {/* Order comment */}
              <div className="pt-2">
                <label
                  htmlFor="comment"
                  className="block text-[13px] font-semibold text-[#8a95a8] mb-2 uppercase tracking-wider"
                >
                  Комментарий (опционально)
                </label>
                <textarea
                  id="comment"
                  rows={2}
                  placeholder="Дополнительные пожелания к заказу..."
                  {...register("comment")}
                  className="w-full bg-[#0d0f14] border border-[#1c2030] rounded-xl px-4 py-3 text-[14px] text-[#f1f3f7] placeholder-[#3a4356] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/25 transition-all"
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="glass-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1c2030]">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-extrabold text-[15px]">
                  3
                </div>
                <h2 className="text-[18px] font-extrabold text-[#f1f3f7]">Способ оплаты</h2>
              </div>

              <div className="p-5 rounded-2xl bg-[#16a34a]/5 border border-[#16a34a]/20 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#16a34a] flex-shrink-0" />
                <div>
                  <h4 className="text-[15px] font-bold text-[#16a34a]">
                    Оплата при получении
                  </h4>
                  <p className="text-[13px] text-[#8a95a8] mt-1.5 leading-relaxed">
                    Вы оплачиваете заказ только после проверки товара (наличными или переводом на карту).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 space-y-6 sticky top-24">
            <h3 className="text-[18px] font-extrabold text-[#f1f3f7] pb-4 border-b border-[#1c2030]">
              Детали заказа
            </h3>

            {/* Items mini list */}
            <div className="max-h-[30vh] overflow-y-auto space-y-4 pr-2 scrollbar-none">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-3 text-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-[#111318] border border-[#1c2030] overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#f1f3f7] line-clamp-1 max-w-[150px]">
                        {item.name}
                      </h4>
                      <p className="text-[#8a95a8] mt-0.5">
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#f1f3f7]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-5 border-t border-[#1c2030] space-y-3 text-[14px]">
              <div className="flex justify-between text-[#8a95a8]">
                <span>Сумма товаров:</span>
                <span className="text-[#f1f3f7] font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#8a95a8]">
                <span>Доставка:</span>
                <span className="text-[#16a34a] font-bold">
                  {deliveryType === "PICKUP"
                    ? "Самовывоз"
                    : isFree
                    ? "Бесплатно"
                    : formatPrice(deliveryCost)}
                </span>
              </div>
              
              <div className="p-3 bg-[#181b22] border border-[#252d3d] rounded-xl flex items-start gap-2.5 mt-2">
                <Info className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#8a95a8] leading-relaxed">
                  <strong className="text-[#f1f3f7] block mb-0.5">Доступна рассрочка</strong>
                  Рассрочка оформляется при получении через банк-партнёр. Спросите у оператора при подтверждении заказа.
                </p>
              </div>

              <div className="flex justify-between items-end pt-5 border-t border-[#1c2030]">
                <span className="font-bold text-[#8a95a8]">Итого:</span>
                <span className="text-3xl text-[var(--accent)] font-black tracking-tight">
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
              className="w-full h-14 text-[15px] shadow-[0_0_24px_-6px_var(--accent)] hover:shadow-[0_0_32px_-4px_var(--accent)]"
            >
              {isSubmitting ? "Обработка..." : "Подтвердить заказ"}
            </Button>

            <p className="text-[11px] text-center text-[#56627a] leading-relaxed">
              Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
