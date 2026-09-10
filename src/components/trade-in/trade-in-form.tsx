"use client";

import React, { useState } from "react";
import { submitTradeInRequest } from "@/app/trade-in/actions";
import { Button } from "@/components/ui/button";
import { PHONE_BRANDS } from "@/data/phone-brands";
import { Check, Upload, Smartphone, Battery, Info, AlertCircle } from "lucide-react";
import Link from "next/link";

export function TradeInForm() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [memory, setMemory] = useState("");
  const [condition, setCondition] = useState("");
  const [battery, setBattery] = useState("");
  const [accessories, setAccessories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleAccessoryToggle = (item: string) => {
    setAccessories((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("memory", memory);
    formData.append("condition", condition);
    formData.append("battery", battery);
    accessories.forEach((a) => formData.append("accessories", a));
    formData.append("description", description);
    formData.append("customerName", customerName);
    formData.append("phone", phone);

    try {
      const res = await submitTradeInRequest(formData);
      if (res.success) {
        setSuccessId(res.requestId);
        setStep(4);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successId) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-[#111318] border border-[#1c2030] rounded-3xl text-center space-y-6">
        <div className="w-20 h-20 bg-[#16a34a]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#16a34a]/20 shadow-[0_0_40px_-10px_rgba(22,163,74,0.3)]">
          <Check className="w-10 h-10 text-[#16a34a]" />
        </div>
        <h2 className="text-3xl font-bold text-[#f1f3f7]">Заявка принята</h2>
        <p className="text-[#8a95a8] text-[15px]">
          Мы получили вашу заявку на Trade-In. В ближайшее время наш специалист свяжется с вами для уточнения деталей.
        </p>
        <div className="bg-[#0d0f14] border border-[#1c2030] p-4 rounded-xl inline-block mt-4">
          <p className="text-[12px] text-[#56627a] uppercase tracking-widest font-bold mb-1">Номер заявки</p>
          <p className="text-xl font-mono text-[#f1f3f7]">{successId}</p>
        </div>
        <div className="pt-6">
          <Link href="/">
            <Button variant="primary" size="lg" className="px-8">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full bg-[#0d0f14] border border-[#1c2030] rounded-xl px-4 py-3 text-[14px] text-[#f1f3f7] placeholder-[#3a4356] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/25 transition-all";
  
  const radioCardCls = (active: boolean) =>
    `flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none ${
      active
        ? "bg-[var(--accent)]/10 border-[var(--accent)]/50 text-[#f1f3f7]"
        : "bg-[#0d0f14] border-[#1c2030] text-[#8a95a8] hover:border-[#252d3d] hover:text-[#f1f3f7]"
    }`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1c2030] rounded-full z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--accent)] rounded-full z-0 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] relative z-10 transition-colors ${
              step >= s
                ? "bg-[var(--accent)] text-white shadow-[0_0_20px_-5px_var(--accent)]"
                : "bg-[#111318] border border-[#1c2030] text-[#56627a]"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="bg-[#111318] border border-[#1c2030] p-6 sm:p-10 rounded-3xl shadow-2xl">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#f1f3f7] mb-6">Устройство</h2>
            
            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider">Бренд</span>
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setModel("");
                  }}
                  className={inputCls}
                >
                  <option value="">Выберите бренд...</option>
                  {PHONE_BRANDS.map((b) => (
                    <option key={b.slug} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider">Модель</span>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand}
                  className={`${inputCls} disabled:opacity-50`}
                >
                  <option value="">Выберите модель...</option>
                  {brand &&
                    PHONE_BRANDS.find((b) => b.name === brand)?.models.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider">Объем памяти</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"].map((mem) => (
                    <div
                      key={mem}
                      onClick={() => setMemory(mem)}
                      className={radioCardCls(memory === mem)}
                    >
                      <span className="font-medium text-center w-full">{mem}</span>
                    </div>
                  ))}
                </div>
              </label>
            </div>

            <div className="pt-6 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!brand || !model || !memory}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                Далее
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#f1f3f7] mb-6">Состояние</h2>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider block">Внешний вид</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "perfect", label: "Идеальное", desc: "Как новый, без царапин" },
                    { id: "good", label: "Хорошее", desc: "Мелкие царапины, потертости" },
                    { id: "average", label: "Среднее", desc: "Заметные царапины, сколы" },
                    { id: "bad", label: "Разбитый", desc: "Разбито стекло или корпус" }
                  ].map((cond) => (
                    <div
                      key={cond.id}
                      onClick={() => setCondition(cond.label)}
                      className={`${radioCardCls(condition === cond.label)} flex-col items-start p-5`}
                    >
                      <span className="font-bold text-[15px]">{cond.label}</span>
                      <span className="text-[12px] opacity-70 mt-1">{cond.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Состояние аккумулятора (%)
                </span>
                <input
                  type="number"
                  placeholder="Например, 85"
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                  className={inputCls}
                />
              </label>

              <div className="space-y-3">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider block">Комплектность</span>
                <div className="flex flex-wrap gap-3">
                  {["Коробка", "Кабель", "Зарядный блок", "Чек", "Гарантия"].map((item) => (
                    <div
                      key={item}
                      onClick={() => handleAccessoryToggle(item)}
                      className={radioCardCls(accessories.includes(item))}
                    >
                      <span className="font-medium px-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between gap-4">
              <Button onClick={() => setStep(1)} variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                Назад
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!condition}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                Далее
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#f1f3f7] mb-6">Детали и Контакты</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider block">Особенности или дефекты</span>
                <textarea
                  rows={3}
                  placeholder="Кратко опишите состояние, были ли ремонты..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputCls}
                />
              </label>

              <div className="p-5 bg-[#181b22] border border-[#252d3d] rounded-xl flex items-start gap-4">
                <Upload className="w-6 h-6 text-[#2b7fff] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#f1f3f7] text-[14px]">Фотографии устройства</h4>
                  <p className="text-[12px] text-[#8a95a8] mt-1 mb-3">Загрузка фото временно недоступна в демо-режиме, вы сможете отправить их нашему менеджеру в мессенджер.</p>
                  <Button disabled variant="outline" size="sm" className="opacity-50">Выбрать файлы</Button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#1c2030]">
                <h3 className="font-bold text-[#f1f3f7] text-[16px]">Ваши контакты</h3>
                <label className="block space-y-2">
                  <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider block">Имя</span>
                  <input
                    type="text"
                    required
                    placeholder="Как к вам обращаться?"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputCls}
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-[13px] font-semibold text-[#8a95a8] uppercase tracking-wider block">Телефон (WhatsApp/Telegram)</span>
                  <input
                    type="tel"
                    required
                    placeholder="+992 00 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                  />
                </label>
              </div>

              <div className="p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <p className="text-[12px] text-[#f1f3f7] leading-relaxed">
                  Отправляя заявку, вы получите <strong>примерную</strong> предварительную оценку устройства. Точная стоимость будет определена после диагностики в нашем магазине.
                </p>
              </div>

              <div className="pt-6 flex justify-between gap-4">
                <Button type="button" onClick={() => setStep(2)} variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                  Назад
                </Button>
                <Button
                  type="submit"
                  disabled={!customerName || !phone || isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-8"
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
