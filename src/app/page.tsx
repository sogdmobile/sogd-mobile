import React from "react";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/catalog-service";
import { storeConfig } from "@/config/store";
import { ProductCard } from "@/components/product/product-card";
import { PhoneFinder } from "@/components/home/phone-finder";
import { TradeInPromo } from "@/components/home/trade-in-promo";
import { InstallmentPromo } from "@/components/home/installment-promo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Truck,
  MapPin,
  Flame,
  Zap,
  Tag,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getCategories();
  const popularProducts = await getProducts({ isPopular: true, take: 8 });
  const newProducts = await getProducts({ isNew: true, take: 4 });
  const saleProducts = await getProducts({ isSale: true, take: 4 });

  const popularIds = new Set(popularProducts.map((p) => p.id));
  const uniqueNew = newProducts.filter((p) => !popularIds.has(p.id));
  const uniqueSale = saleProducts.filter((p) => !popularIds.has(p.id));

  return (
    <div className="flex flex-col pb-24">

      {/* ━━━ 1. HERO ━━━ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 pb-20">
        {/* Deep Graphite Gradient BG */}
        <div className="absolute inset-0 bg-[var(--bg-base)]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent" />
        
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--accent-cyan)]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center mt-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[12px] text-[var(--text-secondary)] font-medium mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-[var(--success)] shadow-[0_0_10px_var(--success)]" />
            SOGD MOBILE | Худжанд
          </div>

          <h1 className="text-[3.5rem] sm:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ваш смартфон. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent-cyan)] to-[var(--accent-light)]">
              Ваш стиль.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Премиальные аксессуары, оригинальные зарядные устройства и гаджеты, идеально подходящие для вашего устройства.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/catalog">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-[var(--shadow-glow)]">
                Смотреть каталог <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/catalog?sale=true">
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                Специальные предложения
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ━━━ 2. PHONE FINDER ━━━ */}
      <div className="-mt-16 sm:-mt-24 relative z-20">
        <PhoneFinder />
      </div>

      <div className="flex flex-col gap-20 sm:gap-32 pt-10">
        
        {/* ━━━ 3. FEATURED PRODUCTS ━━━ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4" /> Хиты продаж
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Популярные товары
              </h2>
            </div>
            <Link href="/catalog?sort=popular" className="hidden sm:flex text-[14px] font-medium text-[var(--text-secondary)] hover:text-white transition-colors items-center gap-1">
              Смотреть все <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                images={product.images}
                brand={product.brand}
                stock={product.stock}
                isNew={product.isNew}
                isPopular={product.isPopular}
                isSale={product.isSale}
                sku={product.sku}
                categoryName={product.category?.name || "Аксессуары"}
              />
            ))}
          </div>
        </section>

        {/* ━━━ 4. CATEGORIES ━━━ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-2">Каталог</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Категории
              </h2>
            </div>
            <Link href="/catalog" className="text-[14px] font-medium text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1">
              Все категории <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.slug}`}
                className="glass-card group flex flex-col justify-between h-48 sm:h-56 p-5 transition-all duration-300 hover:shadow-[var(--shadow-hover)]"
              >
                {cat.image && (
                  <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-surface)]/80 to-transparent" />
                  </div>
                )}
                <div className="relative z-10 self-start">
                  <span className="text-[11px] font-semibold text-white bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {cat.productCount ?? 0} товаров
                  </span>
                </div>
                <div className="relative z-10 flex items-end justify-between">
                  <h3 className="font-bold text-lg text-white group-hover:text-[var(--accent-light)] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[var(--accent)] text-[var(--text-secondary)] group-hover:text-white flex items-center justify-center transition-all shrink-0 ml-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ━━━ 5. INSTALLMENT INFO ━━━ */}
        <InstallmentPromo />

        {/* ━━━ 6. TRADE-IN PROMO ━━━ */}
        <TradeInPromo />

        {/* ━━━ 7. DELIVERY & PICKUP ━━━ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="glass-card p-6 sm:p-12">
            <div className="max-w-2xl mb-12">
              <p className="section-label mb-2">Сервис</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Удобное получение
              </h2>
              <p className="text-base text-[var(--text-secondary)] mt-4">
                Заберите заказ в магазине через 15 минут или выберите быструю доставку курьером по Худжанду.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-[var(--border-glass)] backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(43,127,255,0.2)]">
                  <Truck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Доставка курьером</h3>
                <ul className="space-y-3 text-[14px] text-[var(--text-secondary)]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                    <span><strong className="text-white">Срок:</strong> {storeConfig.delivery.inCityTime}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-white">Стоимость:</strong>{" "}
                      {storeConfig.delivery.inCityCost} сомони. Бесплатно от{" "}
                      {storeConfig.delivery.freeDeliveryThreshold} сомони
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                    <span>Оплата наличными или картой курьеру</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-[var(--border-glass)] backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Самовывоз из магазина</h3>
                <ul className="space-y-3 text-[14px] text-[var(--text-secondary)]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] mt-1.5 shrink-0" />
                    <span><strong className="text-white">Бесплатно</strong> в рабочие часы</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] mt-1.5 shrink-0" />
                    <span><strong className="text-white">Адрес:</strong> {storeConfig.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] mt-1.5 shrink-0" />
                    <span><strong className="text-white">График:</strong> {storeConfig.workingHours.weekdays}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ 8. NEW ARRIVALS (If exists) ━━━ */}
        {uniqueNew.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-2 flex items-center gap-2 text-[var(--accent-cyan)]">
                  <Zap className="w-4 h-4" /> Свежие поступления
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Новинки</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {uniqueNew.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  categoryName={product.category?.name || "Аксессуары"}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
