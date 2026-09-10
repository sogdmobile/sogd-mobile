import React from "react";
import { storeConfig } from "@/config/store";
import { Phone, MapPin, Clock, Send, Mail } from "lucide-react";

export const metadata = {
  title: "Контакты — SOGD MOBILE",
  description: "Свяжитесь с нами: телефоны, адрес магазина SOGD MOBILE в Худжанде.",
};

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[12px] uppercase font-extrabold text-[var(--accent-cyan)] tracking-widest bg-[var(--accent-cyan)]/10 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/20 inline-block">
          КОНТАКТЫ
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#f1f3f7] tracking-tight">
          Свяжитесь с нами
        </h1>
        <p className="text-[#8a95a8] text-[15px] sm:text-[16px] leading-relaxed">
          Мы всегда на связи и готовы помочь с выбором или ответить на ваши вопросы.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#16a34a]" />
            </div>
            <div>
              <h3 className="font-bold text-[#f1f3f7] text-[16px]">Магазин в Худжанде</h3>
              <p className="text-[#8a95a8] text-[14px] mt-1">{storeConfig.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[var(--accent-cyan)]" />
            </div>
            <div>
              <h3 className="font-bold text-[#f1f3f7] text-[16px]">Режим работы</h3>
              <p className="text-[#8a95a8] text-[14px] mt-1">{storeConfig.workingHours.weekdays} {storeConfig.workingHours.weekends}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="font-bold text-[#f1f3f7] text-[16px]">Телефон</h3>
              <a href={`tel:${storeConfig.phone}`} className="text-[#8a95a8] hover:text-[#f1f3f7] text-[14px] mt-1 block transition-colors">
                {storeConfig.phoneFormatted}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center shrink-0">
              <Send className="w-5 h-5 text-[#a855f7]" />
            </div>
            <div>
              <h3 className="font-bold text-[#f1f3f7] text-[16px]">Telegram</h3>
              <a href={`https://t.me/${storeConfig.telegram}`} target="_blank" rel="noopener noreferrer" className="text-[#8a95a8] hover:text-[#f1f3f7] text-[14px] mt-1 block transition-colors">
                @{storeConfig.telegram}
              </a>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-[#f1f3f7] mb-4">Напишите нам</h3>
            <p className="text-[#8a95a8] text-[14px] leading-relaxed mb-6">
              По вопросам оптовых закупок, сотрудничества или жалоб пишите напрямую в Telegram или звоните по телефону. Мы стараемся отвечать в течение 10 минут в рабочее время.
            </p>
          </div>
          <a
            href={`https://t.me/${storeConfig.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-[#111318] py-4 rounded-xl font-bold transition-all shadow-[0_0_24px_-6px_var(--accent)]"
          >
            <Send className="w-5 h-5" />
            <span>Перейти в Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
