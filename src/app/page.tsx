import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { storeConfig } from "@/config/store";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Truck,
  MapPin,
  Phone,
  Flame,
  Zap,
  Tag,
} from "lucide-react";

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  // Fetch categories with product counts
  const categories = await db.category.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  // Fetch popular products
  const popularProducts = await db.product.findMany({
    where: { isPopular: true },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  // Fetch new products
  const newProducts = await db.product.findMany({
    where: { isNew: true },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  // Fetch sale products
  const saleProducts = await db.product.findMany({
    where: { isSale: true },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  // Brand logos / pills
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Redmi",
    "Honor",
    "Huawei",
    "Tecno",
    "Infinix",
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-[#1a2030]">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0070F3]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131722] border border-[#232A3B] text-xs text-slate-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Премиальный магазин аксессуаров в Худжанде</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Аксессуары для <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00E5FF]">
                  твоего смартфона
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Чехлы, стекла, зарядки и электроника в одном месте. Гарантия качества, примерка и быстрая доставка по городу.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/catalog" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <span>Смотреть каталог</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/catalog?sale=true" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <Tag className="w-4 h-4" />
                    <span>Специальные акции</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Signals */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#1e2536] max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-slate-500">Оригинальное качество</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#00E5FF]">1–3 ч</p>
                  <p className="text-xs text-slate-500">Доставка по Худжанду</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white">1000+</p>
                  <p className="text-xs text-slate-500">Моделей в наличии</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/4] rounded-3xl bg-gradient-to-tr from-[#131722] to-[#1A2030] p-1 border border-[#232A3B] shadow-2xl overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80"
                  alt="SOGD MOBILE Аксессуары"
                  className="w-full h-full object-cover rounded-[22px] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B0D12]/85 backdrop-blur-md border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#00E5FF]">
                        Флагманская коллекция
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        SOGD Titan & MagSafe 2026
                      </h4>
                    </div>
                    <Link href="/catalog?category=cases">
                      <span className="text-xs font-semibold text-[#0070F3] hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                        Выбрать →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHONE BRANDS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Аксессуары для брендов:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/catalog?brand=${encodeURIComponent(brand)}`}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-[#131722] hover:bg-[#1A2030] text-slate-300 hover:text-white border border-[#232A3B] transition-colors"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-wider">
              Разделы
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Популярные категории
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
          >
            Все категории →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group relative flex flex-col justify-between h-44 sm:h-52 rounded-2xl bg-[#131722] border border-[#232A3B] p-4 overflow-hidden transition-all duration-300 hover:border-[#0070F3]/60 hover:shadow-lg hover:shadow-[#0070F3]/10"
            >
              {/* Background category image with gradient overlay */}
              {cat.image && (
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-[#131722]/80 to-transparent" />
                </div>
              )}

              {/* Count badge */}
              <div className="relative z-10 self-start">
                <span className="text-[11px] font-semibold text-slate-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
                  {cat._count.products} товаров
                </span>
              </div>

              {/* Title & Arrow */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00E5FF] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 hidden sm:block">
                    {cat.description}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#0070F3] text-slate-300 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs uppercase font-bold tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Хиты продаж</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Популярные товары
            </h2>
          </div>
          <Link
            href="/catalog?sort=popular"
            className="text-sm text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
          >
            Смотреть все →
          </Link>
        </div>

        {/* 4 cols desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              images={JSON.parse(product.images)}
              brand={product.brand}
              stock={product.stock}
              isNew={product.isNew}
              isPopular={product.isPopular}
              isSale={product.isSale}
              sku={product.sku}
              categoryName={product.category.name}
            />
          ))}
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[#00E5FF] text-xs uppercase font-bold tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Свежие поступления</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Новинки недели
            </h2>
          </div>
          <Link
            href="/catalog?sort=new"
            className="text-sm text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
          >
            Все новинки →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              images={JSON.parse(product.images)}
              brand={product.brand}
              stock={product.stock}
              isNew={product.isNew}
              isPopular={product.isPopular}
              isSale={product.isSale}
              sku={product.sku}
              categoryName={product.category.name}
            />
          ))}
        </div>
      </section>

      {/* 6. SPECIAL OFFERS / SALE */}
      {saleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-red-400 text-xs uppercase font-bold tracking-wider">
                <Tag className="w-4 h-4" />
                <span>Выгодные цены</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Специальные предложения
              </h2>
            </div>
            <Link
              href="/catalog?sale=true"
              className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
            >
              Все акции →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                images={JSON.parse(product.images)}
                brand={product.brand}
                stock={product.stock}
                isNew={product.isNew}
                isPopular={product.isPopular}
                isSale={product.isSale}
                sku={product.sku}
                categoryName={product.category.name}
              />
            ))}
          </div>
        </section>
      )}

      {/* 7. DELIVERY & PICKUP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-b from-[#131722] to-[#0e121a] border border-[#232A3B] p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-wider">
              Сервис и логистика
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Удобное получение заказа
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Мы ценим ваше время. Заказывайте на сайте и забирайте в нашем магазине в центре Худжанда или оформляйте курьерскую доставку прямо до двери.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d12] border border-[#1e2536] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Доставка курьером</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    <span><strong>Срок:</strong> {storeConfig.delivery.inCityTime}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    <span><strong>Стоимость по городу:</strong> {storeConfig.delivery.inCityCost} сомони (Бесплатно от {storeConfig.delivery.freeDeliveryThreshold} сомони)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    <span>Стоимость доставки за пределы города уточняется при подтверждении заказа оператором</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#1e2536] text-xs text-slate-500">
                Оплата наличными или переводом курьеру при получении
              </div>
            </div>

            {/* Pickup card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d12] border border-[#1e2536] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Самовывоз из магазина</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>Бесплатно:</strong> В любое удобное время в часы работы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                    <span><strong>Адрес:</strong> {storeConfig.address}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>График:</strong> {storeConfig.workingHours.weekdays}, {storeConfig.workingHours.weekends}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#1e2536] flex items-center justify-between text-xs text-slate-400">
                <span>Готовность заказа: через 15 минут</span>
                <a href={`tel:${storeConfig.phone}`} className="text-[#00E5FF] hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ABOUT STORE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs uppercase font-bold text-[#00E5FF] tracking-wider">
              О магазине
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              SOGD MOBILE — технологии и комфорт для вашего устройства
            </h2>
            <div className="space-y-3.5 text-sm sm:text-base text-slate-400 leading-relaxed">
              <p>
                <strong>SOGD MOBILE</strong> — это специализированный магазин мобильных аксессуаров в городе Худжанд. Мы отбираем надежные чехлы, сертифицированные блоки питания, прочные бронестекла и качественные гаджеты для ведущих брендов: Apple, Samsung, Xiaomi, Honor, Huawei, Tecno и других.
              </p>
              <p>
                Мы стремимся дать жителям Согдийской области современный европейский уровень ритейла: удобный онлайн-каталог с актуальными остатками, профессиональную консультацию, быструю примерку в магазине и оперативную доставку до двери.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/about">
                <Button variant="outline" size="md">
                  Подробнее о нас
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#232A3B] overflow-hidden bg-[#131722] aspect-video sm:aspect-[4/3] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
              alt="Магазин SOGD MOBILE в Худжанде"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
