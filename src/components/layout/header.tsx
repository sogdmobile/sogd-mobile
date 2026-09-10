"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { useCartStore } from "@/store/cart";
import { storeConfig } from "@/config/store";
import { INITIAL_PRODUCTS } from "@/data/initial-catalog";
import { formatPrice } from "@/lib/formatters";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Percent,
  Truck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const NAV_CATEGORIES = [
  { name: "Чехлы", href: "/catalog?category=cases" },
  { name: "Стекла", href: "/catalog?category=screen-protectors" },
  { name: "Зарядки", href: "/catalog?category=chargers" },
  { name: "Кабели", href: "/catalog?category=cables" },
  { name: "Power Bank", href: "/catalog?category=power-banks" },
  { name: "Наушники", href: "/catalog?category=headphones" },
  { name: "Авто", href: "/catalog?category=car-accessories" },
  { name: "Smart Watch", href: "/catalog?category=smart-watches" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const liveResults =
    query.trim().length >= 2
      ? INITIAL_PRODUCTS.filter((p) => {
          const q = query.trim().toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.compatibleModels.some((m) => m.toLowerCase().includes(q))
          );
        }).slice(0, 5)
      : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/catalog?search=${encodeURIComponent(q)}`);
      setQuery("");
      setSearchOpen(false);
      setFocused(false);
    }
  };

  return (
    <>
      {/* ── Top micro-bar ── */}
      <div className="hidden md:block bg-[#080a0e] border-b border-[#1c2030]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between text-[11px] text-[#56627a]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-[#8a95a8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
              {storeConfig.city} — {storeConfig.address}
            </span>
            <span className="text-[#3a4356]">·</span>
            <span>{storeConfig.workingHours.weekdays}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[#2b7fff] font-medium flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Бесплатная доставка от {storeConfig.delivery.freeDeliveryThreshold} сомони
            </span>
            <a
              href={`tel:${storeConfig.phone}`}
              className="text-[#8a95a8] hover:text-[#f1f3f7] transition-colors font-medium flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {storeConfig.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#08090c]/96 backdrop-blur-xl border-b border-[#1c2030] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]"
            : "bg-[#08090c] border-b border-[#1c2030]/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-14 sm:h-16">

            {/* ── Left: Hamburger + Logo ── */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 -ml-1 rounded-xl text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
                aria-label="Открыть меню"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Logo variant="desktop" className="hidden sm:inline-flex" />
              <Logo variant="mobile" className="sm:hidden" />
            </div>

            {/* ── Center: Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1 shrink-0">
              {/* Catalog dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 h-9 px-3 rounded-xl text-[13px] font-medium text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors cursor-pointer">
                  Каталог
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-[#56627a]" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div className="w-52 bg-[#111318] border border-[#252d3d] rounded-2xl p-1.5 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.7)]">
                    {NAV_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-3 py-2 text-[12px] font-medium text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22] rounded-xl transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="mt-1 pt-1 border-t border-[#1c2030]">
                      <Link
                        href="/catalog"
                        className="block px-3 py-2 text-[12px] font-semibold text-[#2b7fff] hover:text-[#5c9fff] hover:bg-[#181b22] rounded-xl transition-colors flex items-center gap-1"
                      >
                        <span>Весь каталог</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/catalog?sale=true"
                className="h-9 px-3 rounded-xl text-[13px] font-semibold text-[#e85454] hover:text-[#f87171] hover:bg-[#e85454]/8 transition-colors flex items-center gap-1"
              >
                <Percent className="w-3.5 h-3.5" />
                Акции
              </Link>
              <Link
                href="/delivery"
                className="h-9 px-3 rounded-xl text-[13px] font-medium text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
              >
                Доставка
              </Link>
              <Link
                href="/about"
                className="h-9 px-3 rounded-xl text-[13px] font-medium text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
              >
                О магазине
              </Link>
            </nav>

            {/* ── Center: Desktop Search ── */}
            <div className="hidden md:block flex-1 relative max-w-sm xl:max-w-md">
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Поиск: iPhone 16 Pro, чехол, стекло..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 180)}
                  className="w-full h-9 bg-[#111318] border border-[#252d3d] rounded-xl pl-9 pr-4 text-[12px] text-[#f1f3f7] placeholder-[#56627a] focus:outline-none focus:border-[#2b7fff] focus:ring-1 focus:ring-[#2b7fff]/30 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-[#56627a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>

              {/* Live results */}
              {focused && liveResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#111318] border border-[#252d3d] rounded-2xl shadow-[0_16px_48px_-8px_rgba(0,0,0,0.7)] overflow-hidden animate-slide-down z-50">
                  {liveResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={() => { setFocused(false); setQuery(""); }}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#181b22] transition-colors group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-9 h-9 rounded-lg object-cover bg-[#181b22] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#f1f3f7] truncate group-hover:text-[#5c9fff] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#56627a]">
                          {item.brand} ·{" "}
                          <span className="text-[#2b7fff] font-semibold">
                            {formatPrice(item.price)}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleSearchSubmit(e as any); }}
                    className="w-full px-3 py-2.5 text-[11px] font-semibold text-[#2b7fff] hover:text-[#5c9fff] border-t border-[#1c2030] text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Все результаты для «{query}»</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: Mobile Search + Cart ── */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Mobile search toggle */}
              <button
                onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => searchRef.current?.focus(), 80); }}
                className="md:hidden p-2 rounded-xl text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
                aria-label="Поиск"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                aria-label="Корзина"
                className="relative flex items-center gap-2 h-9 px-3 bg-[#111318] hover:bg-[#181b22] border border-[#252d3d] hover:border-[#2b7fff]/50 rounded-xl transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-[#2b7fff]" />
                <span className="hidden sm:block text-[12px] font-medium text-[#f1f3f7]">
                  Корзина
                </span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2b7fff] text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none px-1">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── Mobile Search Bar ── */}
          {searchOpen && (
            <div className="md:hidden pb-3 animate-slide-down">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  autoFocus
                  placeholder="Поиск модели (iPhone, Samsung, Xiaomi)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-10 bg-[#111318] border border-[#2b7fff]/50 rounded-xl pl-9 pr-4 text-[13px] text-[#f1f3f7] placeholder-[#56627a] focus:outline-none focus:ring-1 focus:ring-[#2b7fff]/30"
                />
                <Search className="w-4 h-4 text-[#2b7fff] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute inset-y-0 left-0 w-72 bg-[#0d0f14] border-r border-[#1c2030] flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#1c2030] shrink-0">
              <Logo variant="desktop" />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-xl text-[#56627a] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Primary links */}
            <div className="flex-1 px-3 py-4 space-y-1">
              <Link
                href="/catalog"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-semibold text-[#f1f3f7] hover:bg-white/5 transition-colors"
              >
                <span>Весь каталог</span>
                <ArrowRight className="w-4 h-4 text-[#56627a]" />
              </Link>
              <Link
                href="/catalog?sale=true"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[14px] font-semibold text-[#e85454] hover:bg-[#e85454]/8 transition-colors"
              >
                <Percent className="w-4 h-4" />
                <span>Акции и скидки</span>
              </Link>
              <Link
                href="/delivery"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
              >
                <Truck className="w-4 h-4 text-[#2b7fff]" />
                <span>Доставка и самовывоз</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-[13px] text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
              >
                О магазине
              </Link>
              <Link
                href="/contacts"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-[13px] text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
              >
                Контакты
              </Link>
            </div>

            {/* Category quick links */}
            <div className="px-3 pb-4 border-t border-[#1c2030] pt-4">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#3a4356]">
                Категории
              </p>
              <div className="grid grid-cols-2 gap-1">
                {NAV_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-[12px] text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-white/5 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact footer */}
            <div className="px-5 py-5 border-t border-[#1c2030] shrink-0">
              <a
                href={`tel:${storeConfig.phone}`}
                className="flex items-center gap-2.5 text-[13px] font-semibold text-[#f1f3f7] hover:text-[#2b7fff] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#2b7fff]" />
                {storeConfig.phoneFormatted}
              </a>
              <p className="text-[11px] text-[#3a4356] mt-1.5">
                {storeConfig.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
