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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080a0f] border-t border-[#1a2030] text-slate-400 text-sm">
      {/* Advantage badges banner */}
      <div className="border-b border-[#1a2030] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e121a] border border-[#1e2536]">
              <div className="w-12 h-12 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Быстрая доставка
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  По Худжанду за 1–3 часа. Бесплатно от {storeConfig.delivery.freeDeliveryThreshold} сомони
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e121a] border border-[#1e2536]">
              <div className="w-12 h-12 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  100% гарантия качества
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Проверяем каждый аксессуар перед отправкой покупателю
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e121a] border border-[#1e2536] sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Оплата при получении
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Наличными или переводом курьеру после осмотра товара
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="desktop" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {storeConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={storeConfig.socials.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#131722] hover:bg-[#0070F3] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-[#232A3B]"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={storeConfig.socials.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#131722] hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-[#232A3B]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={storeConfig.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#131722] hover:bg-gradient-to-tr hover:from-amber-600 hover:to-fuchsia-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-[#232A3B]"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Разделы
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Весь каталог
                </Link>
              </li>
              <li>
                <Link href="/catalog?sale=true" className="hover:text-red-400 text-red-400/90 transition-colors">
                  Акции и скидки
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О магазине
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Категории
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog?category=cases" className="hover:text-white transition-colors">
                  Чехлы для смартфонов
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=screen-protectors" className="hover:text-white transition-colors">
                  Защитные стекла 9H
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=chargers" className="hover:text-white transition-colors">
                  Быстрые GaN зарядки
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=cables" className="hover:text-white transition-colors">
                  Кабели Type-C / Lightning
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=power-banks" className="hover:text-white transition-colors">
                  Power Bank с MagSafe
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=headphones" className="hover:text-white transition-colors">
                  Беспроводные наушники
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts and Working hours */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Контакты в Худжанде
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{storeConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0070F3] flex-shrink-0" />
                <a
                  href={`tel:${storeConfig.phone}`}
                  className="text-white hover:text-[#00E5FF] font-medium transition-colors"
                >
                  {storeConfig.phoneFormatted}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400">{storeConfig.workingHours.weekdays}</p>
                  <p className="text-slate-400">{storeConfig.workingHours.weekends}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-[#1a2030] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {storeConfig.name}. Все права защищены. Худжанд, Таджикистан.</p>
          <div className="flex items-center gap-4">
            <Link href="/delivery" className="hover:text-slate-400 transition-colors">
              Условия доставки
            </Link>
            <span>•</span>
            <Link href="/contacts" className="hover:text-slate-400 transition-colors">
              Пункт самовывоза
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-400 transition-colors opacity-40 hover:opacity-100">
              Администратор
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
