import React from "react";
import { storeConfig } from "@/config/store";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  Mail,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";

export const metadata = {
  title: "Контакты магазина SOGD MOBILE в Худжанде",
  description:
    "Адрес, телефон, время работы и мессенджеры магазина SOGD MOBILE в Худжанде. Консультация и помощь с выбором аксессуаров.",
};

export default function ContactsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-widest">
          Связь с нами
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
          Контакты
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Мы всегда рады помочь вам с выбором чехла, стекла или зарядного устройства. Приходите в наш магазин или пишите в мессенджеры.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contacts Info */}
        <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white pb-3 border-b border-[#232A3B]">
            Магазин в Худжанде
          </h2>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Адрес:</strong>
                <p className="text-slate-400 mt-0.5">{storeConfig.address}</p>
                <p className="text-xs text-slate-500 mt-1">Ориентир: ТЦ «Худжанд Плаза», центральный вход, 1 этаж</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#0070F3] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Телефон:</strong>
                <a
                  href={`tel:${storeConfig.phone}`}
                  className="text-white hover:text-[#00E5FF] font-semibold transition-colors"
                >
                  {storeConfig.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Режим работы:</strong>
                <p className="text-slate-400 mt-0.5">{storeConfig.workingHours.weekdays}</p>
                <p className="text-slate-400">{storeConfig.workingHours.weekends}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Электронная почта:</strong>
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {storeConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Messengers & Fast Support */}
        <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white pb-3 border-b border-[#232A3B]">
              Быстрая консультация
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Не знаете, подойдет ли чехол к вашему смартфону? Пришлите нам фото или название модели в любой мессенджер — оператор ответит за 2 минуты!
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={storeConfig.socials.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#131722] hover:bg-[#1A2030] border border-[#232A3B] hover:border-[#0070F3] transition-all text-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0070F3]/20 text-[#00E5FF] flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Telegram</h4>
                    <p className="text-xs text-slate-500">@{storeConfig.telegram}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#00E5FF] group-hover:translate-x-1 transition-transform">
                  Написать →
                </span>
              </a>

              <a
                href={storeConfig.socials.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#131722] hover:bg-[#1A2030] border border-[#232A3B] hover:border-emerald-500/50 transition-all text-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">WhatsApp</h4>
                    <p className="text-xs text-slate-500">{storeConfig.phoneFormatted}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Написать →
                </span>
              </a>

              <a
                href={storeConfig.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#131722] hover:bg-[#1A2030] border border-[#232A3B] hover:border-fuchsia-500/50 transition-all text-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Instagram</h4>
                    <p className="text-xs text-slate-500">@{storeConfig.instagram}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-fuchsia-400 group-hover:translate-x-1 transition-transform">
                  Подписаться →
                </span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#131722] border border-[#232A3B] text-xs text-slate-400">
            Пункт выдачи заказов SOGD MOBILE находится в пешей доступности от Театра Камоли Худжанди и парка им. Камоли.
          </div>
        </div>
      </div>
    </div>
  );
}
