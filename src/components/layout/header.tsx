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
  ArrowRight,
  Heart,
  RefreshCw,
} from "lucide-react";

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
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const liveResults = query.trim().length >= 2
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
      <div className="hidden md:block bg-[var(--bg-base)] border-b border-[var(--border-glass)] text-[11px] text-[var(--text-muted)] h-9">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] inline-block shadow-[0_0_8px_var(--success)]" />
              {storeConfig.city} — {storeConfig.address}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[var(--accent)] font-medium flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Бесплатная доставка от {storeConfig.delivery.freeDeliveryThreshold} TJS
            </span>
            <a href={`tel:${storeConfig.phone}`} className="text-[var(--text-secondary)] hover:text-white transition-colors font-medium flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {storeConfig.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-glass)] shadow-[var(--shadow-glass)]"
            : "bg-[var(--bg-surface)] border-b border-[var(--border-glass)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            
            {/* ── Left: Hamburger + Logo ── */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Logo variant="desktop" className="hidden sm:inline-flex" />
              <Logo variant="mobile" className="sm:hidden" />
            </div>

            {/* ── Center: Desktop Nav (V3.1 Layout) ── */}
            <nav className="hidden lg:flex items-center gap-2 mx-auto">
              <Link href="/catalog" className="px-3 py-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all">
                Catalog
              </Link>
              <Link href="/catalog?brand=Apple" className="px-3 py-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all">
                For iPhone
              </Link>
              <Link href="/catalog?brand=Samsung" className="px-3 py-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all">
                For Samsung
              </Link>
              <Link href="/catalog?category=accessories" className="px-3 py-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all">
                Accessories
              </Link>
              <Link href="/catalog?sale=true" className="px-3 py-2 rounded-xl text-[13px] font-semibold text-[var(--accent-sale)] hover:bg-[var(--accent-sale)]/10 transition-all flex items-center gap-1">
                <Percent className="w-3 h-3" />
                Sale
              </Link>
              <Link href="/trade-in" className="px-3 py-2 rounded-xl text-[13px] font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Trade-In
              </Link>
            </nav>

            {/* ── Right: Utilities ── */}
            <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
              {/* Desktop Search */}
              <div className="hidden lg:block relative w-48 xl:w-64">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                    className="w-full h-10 bg-white/5 border border-[var(--border-glass)] rounded-xl pl-9 pr-4 text-[13px] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
                  />
                  <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </form>

                {/* Live Search Results */}
                {focused && liveResults.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-80 glass-panel overflow-hidden animate-slide-down z-50">
                    {liveResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.slug}`}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 transition-colors group border-b border-[var(--border-glass)] last:border-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.images[0]} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-white/5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium text-white truncate group-hover:text-[var(--accent-light)] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)]">
                            <span className="text-[var(--accent-light)] font-semibold">{formatPrice(item.price)}</span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => searchRef.current?.focus(), 80); }}
                className="lg:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link href="/catalog" className="hidden sm:flex p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-magenta)] hover:bg-white/5 transition-colors relative">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex items-center justify-center p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-white/5 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute 1 top-1 right-1 bg-[var(--accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_var(--accent)]">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Input Dropdown */}
          {searchOpen && (
            <div className="lg:hidden pb-4 animate-slide-down">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="iPhone 15 Pro..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 bg-white/5 border border-[var(--accent)]/50 rounded-xl pl-10 pr-4 text-[14px] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 shadow-[var(--shadow-glow)]"
                  autoFocus
                />
                <Search className="w-5 h-5 text-[var(--accent-light)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[80%] max-w-sm glass-panel !rounded-none !rounded-r-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border-glass)] shrink-0">
              <Logo variant="desktop" />
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl text-[var(--text-muted)] hover:text-white bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 px-4 py-6 space-y-2">
              <Link href="/catalog" onClick={() => setMenuOpen(false)} className="flex items-center justify-between p-3 rounded-xl text-[15px] font-medium text-white hover:bg-white/10">
                Catalog <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </Link>
              <Link href="/catalog?brand=Apple" onClick={() => setMenuOpen(false)} className="block p-3 rounded-xl text-[15px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5">
                For iPhone
              </Link>
              <Link href="/catalog?brand=Samsung" onClick={() => setMenuOpen(false)} className="block p-3 rounded-xl text-[15px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5">
                For Samsung
              </Link>
              <Link href="/catalog?category=accessories" onClick={() => setMenuOpen(false)} className="block p-3 rounded-xl text-[15px] font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5">
                Accessories
              </Link>
              <Link href="/catalog?sale=true" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl text-[15px] font-medium text-[var(--accent-sale)] hover:bg-[var(--accent-sale)]/10">
                <Percent className="w-4 h-4" /> Sale
              </Link>
              <Link href="/trade-in" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl text-[15px] font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10">
                <RefreshCw className="w-4 h-4" /> Trade-In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

