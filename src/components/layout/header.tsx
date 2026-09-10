"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { useCartStore } from "@/store/cart";
import { storeConfig } from "@/config/store";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Phone,
  ChevronDown,
  Percent,
  Truck,
  MapPin,
  Sparkles,
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Чехлы", href: "/catalog?category=cases" },
    { name: "Защитные стекла", href: "/catalog?category=screen-protectors" },
    { name: "Зарядки", href: "/catalog?category=chargers" },
    { name: "Кабели", href: "/catalog?category=cables" },
    { name: "Power Bank", href: "/catalog?category=power-banks" },
    { name: "Наушники", href: "/catalog?category=headphones" },
    { name: "Автоаксессуары", href: "/catalog?category=car-accessories" },
    { name: "Smart Watch", href: "/catalog?category=smart-watches" },
    { name: "Все аксессуары", href: "/catalog" },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#10141e] border-b border-[#232A3B] text-[11px] text-slate-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
              {storeConfig.city}, {storeConfig.address}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              {storeConfig.workingHours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3" />
              Бесплатная доставка по Худжанду от {storeConfig.delivery.freeDeliveryThreshold} сомони
            </span>
            <a
              href={`tel:${storeConfig.phone}`}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-[#0070F3]" />
              {storeConfig.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0b0d12]/95 backdrop-blur-md border-b border-[#232A3B] shadow-lg shadow-black/20"
            : "bg-[#0b0d12] border-b border-[#232A3B]/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Left: Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-300 hover:text-white lg:hidden rounded-lg hover:bg-white/5"
                aria-label="Открыть меню"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Logo variant="desktop" className="hidden sm:inline-flex" />
              <Logo variant="mobile" className="sm:hidden" />
            </div>

            {/* Middle: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors cursor-pointer py-1">
                  <span>Каталог</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-64 bg-[#131722] border border-[#232A3B] rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#1A2030] rounded-xl transition-colors font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/catalog?sale=true"
                className="hover:text-red-400 transition-colors flex items-center gap-1 text-red-400 font-semibold"
              >
                <Percent className="w-3.5 h-3.5" />
                Акции
              </Link>
              <Link href="/delivery" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#00E5FF]" />
                Доставка
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                О магазине
              </Link>
              <Link href="/contacts" className="hover:text-white transition-colors">
                Контакты
              </Link>
            </nav>

            {/* Center Desktop Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative"
            >
              <input
                type="text"
                placeholder="Поиск чехлов, стекол, зарядок..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131722] border border-[#232A3B] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-all"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Right: Search Mobile Toggle & Cart Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-slate-300 hover:text-white md:hidden rounded-lg hover:bg-white/5"
                aria-label="Поиск товаров"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button with Count Badge */}
              <button
                onClick={toggleCart}
                aria-label="Открыть корзину"
                className="relative flex items-center gap-2 bg-[#131722] hover:bg-[#1A2030] text-white border border-[#232A3B] px-3.5 py-2 rounded-xl transition-all hover:border-[#0070F3] cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#00E5FF]" />
                <span className="hidden sm:inline-block text-xs font-semibold">
                  Корзина
                </span>
                {totalCount > 0 && (
                  <span className="bg-[#0070F3] text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center animate-pulse">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Dropdown */}
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="pb-3 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Поиск модели (например: iPhone 15 Pro)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#131722] border border-[#0070F3] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-[#00E5FF] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </form>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#0e121a] border-r border-[#232A3B] p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#232A3B]">
                <Logo variant="desktop" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                  aria-label="Закрыть меню"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="space-y-1">
                <Link
                  href="/catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-white hover:bg-white/5 rounded-xl"
                >
                  Весь каталог
                </Link>
                <Link
                  href="/catalog?sale=true"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-red-400 hover:bg-white/5 rounded-xl"
                >
                  🔥 Акции и скидки
                </Link>
                <Link
                  href="/delivery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl"
                >
                  Доставка и самовывоз
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl"
                >
                  О магазине
                </Link>
                <Link
                  href="/contacts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl"
                >
                  Контакты
                </Link>
              </div>

              {/* Categories list in mobile drawer */}
              <div className="pt-4 border-t border-[#232A3B]">
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider px-3 mb-2">
                  Категории
                </h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer in Drawer */}
            <div className="pt-6 border-t border-[#232A3B] space-y-3">
              <a
                href={`tel:${storeConfig.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[#00E5FF]"
              >
                <Phone className="w-4 h-4 text-[#0070F3]" />
                {storeConfig.phoneFormatted}
              </a>
              <p className="text-xs text-slate-500">
                г. {storeConfig.city}, {storeConfig.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
