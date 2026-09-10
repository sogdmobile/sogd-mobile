import React from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { storeConfig } from "@/config/store";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";

const FOOTER_CATEGORIES = [
  { label: "Чехлы для смартфонов", href: "/catalog?category=cases" },
  { label: "Защитные стекла 9H", href: "/catalog?category=screen-protectors" },
  { label: "Быстрые зарядки GaN", href: "/catalog?category=chargers" },
  { label: "Кабели Type-C / Lightning", href: "/catalog?category=cables" },
  { label: "Power Bank", href: "/catalog?category=power-banks" },
  { label: "Наушники TWS", href: "/catalog?category=headphones" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05060a] border-t border-[#111318] text-[#56627a] text-sm">

      {/* ── Advantages strip ── */}
      <div className="border-b border-[#111318] py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Truck className="w-5 h-5 text-[#2b7fff]" />,
                title: "Быстрая доставка",
                desc: `По Худжанду за 1–3 часа. Бесплатно от ${storeConfig.delivery.freeDeliveryThreshold} сомони`,
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#16a34a]" />,
                title: "Проверяем каждый товар",
                desc: "Входной контроль качества перед отправкой",
              },
              {
                icon: <RotateCcw className="w-5 h-5 text-[#2b7fff]" />,
                title: "Оплата при получении",
                desc: "Наличными или переводом курьеру после осмотра",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d0f14] border border-[#1c2030]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#111318] border border-[#1c2030] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#f1f3f7]">{item.title}</h4>
                  <p className="text-[11px] text-[#56627a] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="desktop" />
            <p className="text-[12px] text-[#56627a] leading-relaxed max-w-xs">
              {storeConfig.description}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[
                { href: storeConfig.socials.telegramUrl, label: "Telegram", icon: <Send className="w-4 h-4" />, hover: "hover:bg-[#2b7fff]" },
                { href: storeConfig.socials.whatsappUrl, label: "WhatsApp", icon: <MessageCircle className="w-4 h-4" />, hover: "hover:bg-[#16a34a]" },
                { href: storeConfig.socials.instagramUrl, label: "Instagram", icon: <InstagramIcon className="w-4 h-4" />, hover: "hover:bg-gradient-to-tr hover:from-amber-500 hover:to-fuchsia-600" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-xl bg-[#111318] border border-[#1c2030] text-[#56627a] hover:text-white ${s.hover} hover:border-transparent flex items-center justify-center transition-all`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#3a4356] mb-4">Разделы</h4>
            <ul className="space-y-2.5 text-[12px]">
              {[
                { label: "Весь каталог", href: "/catalog" },
                { label: "Акции и скидки", href: "/catalog?sale=true", cls: "text-[#e85454]/80 hover:text-[#e85454]" },
                { label: "Доставка и оплата", href: "/delivery" },
                { label: "О магазине", href: "/about" },
                { label: "Контакты", href: "/contacts" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`hover:text-[#f1f3f7] transition-colors ${l.cls ?? ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#3a4356] mb-4">Категории</h4>
            <ul className="space-y-2.5 text-[12px]">
              {FOOTER_CATEGORIES.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="hover:text-[#f1f3f7] transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#3a4356] mb-4">Контакты</h4>
            <ul className="space-y-3 text-[12px]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00d4ff] mt-0.5 shrink-0" />
                <span className="text-[#8a95a8]">{storeConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2b7fff] shrink-0" />
                <a
                  href={`tel:${storeConfig.phone}`}
                  className="text-[#f1f3f7] hover:text-[#5c9fff] font-medium transition-colors"
                >
                  {storeConfig.phoneFormatted}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#3a4356] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#56627a]">{storeConfig.workingHours.weekdays}</p>
                  <p className="text-[#56627a]">{storeConfig.workingHours.weekends}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-8 mt-8 border-t border-[#111318] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#3a4356]">
          <p>© {year} {storeConfig.name}. Все права защищены. Худжанд, Таджикистан.</p>
          <div className="flex items-center gap-4">
            <Link href="/delivery" className="hover:text-[#56627a] transition-colors">Условия доставки</Link>
            <span>·</span>
            <Link href="/contacts" className="hover:text-[#56627a] transition-colors">Самовывоз</Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#56627a] transition-colors opacity-30 hover:opacity-60">
              Админ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
