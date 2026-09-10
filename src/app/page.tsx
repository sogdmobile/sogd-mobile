import React from "react";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/catalog-service";
import { storeConfig } from "@/config/store";
import { ProductCard } from "@/components/product/product-card";
import { PHONE_BRANDS } from "@/data/phone-brands";
import {
  ArrowRight,
  Truck,
  MapPin,
  Phone,
  Flame,
  Zap,
  Tag,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getCategories();
  const popularProducts = await getProducts({ isPopular: true, take: 8 });
  const newProducts = await getProducts({ isNew: true, take: 4 });
  const saleProducts = await getProducts({ isSale: true, take: 4 });

  // De-duplicate: remove from newProducts & saleProducts any IDs already in popularProducts
  const popularIds = new Set(popularProducts.map((p) => p.id));
  const uniqueNew = newProducts.filter((p) => !popularIds.has(p.id));
  const uniqueSale = saleProducts.filter((p) => !popularIds.has(p.id));

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-24">

      {/* ━━━ 1. HERO ━━━ */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2b7fff]/8 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#00d4ff]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* ── Left: Copy ── */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111318] border border-[#252d3d] text-[11px] text-[#8a95a8] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block shrink-0" />
                {storeConfig.city} — аксессуары для смартфонов
              </div>

              {/* Headline */}
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-extrabold text-[#f1f3f7] leading-[1.08] tracking-tight">
                Всё для&nbsp;вашего{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5c9fff] to-[#00d4ff]">
                  смартфона
                </span>
              </h1>

              {/* Sub */}
              <p className="text-base sm:text-lg text-[#8a95a8] max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Чехлы, стекла, зарядки, кабели и электроника. Самовывоз сразу или
                доставка по Худжанду.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#2b7fff] hover:bg-[#1d6be0] text-white font-semibold text-sm rounded-xl transition-colors w-full sm:w-auto shadow-[0_4px_24px_-4px_rgba(43,127,255,0.45)]"
                >
                  Смотреть каталог
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/catalog?sale=true"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-transparent hover:bg-[#e85454]/8 text-[#e85454] font-semibold text-sm rounded-xl border border-[#e85454]/30 hover:border-[#e85454]/60 transition-all w-full sm:w-auto"
                >
                  <Tag className="w-4 h-4" />
                  Акции
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 border-t border-[#1c2030] text-[#56627a] text-[12px]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2b7fff]" />
                  Доставка 1–3 ч
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                  Оплата при получении
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00d4ff]" />
                  Самовывоз бесплатно
                </span>
              </div>
            </div>

            {/* ── Right: Visual ── */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden border border-[#1c2030] bg-[#0d0f14] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80"
                  alt="SOGD MOBILE — аксессуары для смартфонов"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                />
                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#08090c]/88 backdrop-blur-md border border-[#252d3d] shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#2b7fff] mb-0.5">
                        Чехлы и защита 2025
                      </p>
                      <p className="text-[13px] font-bold text-[#f1f3f7]">
                        iPhone, Samsung, Xiaomi
                      </p>
                    </div>
                    <Link
                      href="/catalog?category=cases"
                      className="text-[12px] font-semibold text-[#5c9fff] hover:text-[#00d4ff] transition-colors flex items-center gap-1"
                    >
                      Выбрать →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 2. BRAND SELECTOR ━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="section-label mb-1">Выберите бренд</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] tracking-tight">
              Найти аксессуар для вашего телефона
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden sm:flex items-center gap-1 text-[13px] text-[#56627a] hover:text-[#f1f3f7] font-medium transition-colors"
          >
            Весь каталог <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Brand pills */}
        <div className="flex flex-wrap gap-2">
          {PHONE_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/catalog?brand=${encodeURIComponent(brand.slug)}`}
              className="group inline-flex items-center gap-2 h-10 px-4 bg-[#111318] hover:bg-[#181b22] border border-[#1c2030] hover:border-[#2b7fff]/50 rounded-xl text-[13px] font-medium text-[#8a95a8] hover:text-[#f1f3f7] transition-all"
            >
              <span>{brand.name}</span>
              <span className="text-[10px] text-[#56627a] group-hover:text-[#2b7fff] transition-colors flex items-center gap-0.5">
                {brand.models.length}
                <span className="hidden sm:inline"> мод.</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Popular model quick chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["iPhone 16 Pro", "iPhone 15 Pro", "Galaxy S24 Ultra", "Redmi Note 13", "Xiaomi 14"].map((model) => (
            <Link
              key={model}
              href={`/catalog?model=${encodeURIComponent(model)}`}
              className="inline-flex items-center h-7 px-3 bg-[#0d0f14] hover:bg-[#111318] border border-[#1c2030] hover:border-[#252d3d] rounded-full text-[11px] font-medium text-[#56627a] hover:text-[#8a95a8] transition-all"
            >
              {model}
            </Link>
          ))}
        </div>
      </section>

      {/* ━━━ 3. CATEGORY GRID ━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="section-label mb-1">Категории</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] tracking-tight">
              Что вы ищете?
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-[13px] text-[#56627a] hover:text-[#f1f3f7] font-medium transition-colors flex items-center gap-1"
          >
            Все категории <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group relative flex flex-col justify-between h-40 sm:h-48 rounded-2xl bg-[#111318] border border-[#1c2030] p-4 overflow-hidden transition-all duration-220 hover:border-[#252d3d] hover:shadow-[0_8px_32px_-8px_rgba(43,127,255,0.15)]"
            >
              {/* BG image */}
              {cat.image && (
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-400 group-hover:scale-105"
                    style={{ transition: "opacity 400ms ease, transform 400ms ease" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/75 to-transparent" />
                </div>
              )}

              {/* Count badge */}
              <div className="relative z-10 self-start">
                <span className="text-[10px] font-semibold text-[#56627a] bg-[#08090c]/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
                  {cat.productCount ?? 0} товаров
                </span>
              </div>

              {/* Name + arrow */}
              <div className="relative z-10 flex items-end justify-between">
                <h3 className="font-bold text-[14px] sm:text-base text-[#f1f3f7] group-hover:text-[#5c9fff] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <div className="w-7 h-7 rounded-lg bg-[#1c2030] group-hover:bg-[#2b7fff] text-[#8a95a8] group-hover:text-white flex items-center justify-center transition-all shrink-0 ml-2">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ━━━ 4. POPULAR PRODUCTS ━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 section-label mb-1 text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              <span>Хиты продаж</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] tracking-tight">
              Популярные товары
            </h2>
          </div>
          <Link
            href="/catalog?sort=popular"
            className="text-[13px] text-[#56627a] hover:text-[#f1f3f7] font-medium transition-colors flex items-center gap-1"
          >
            Смотреть все <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ━━━ 5. NEW ARRIVALS ━━━ */}
      {uniqueNew.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 section-label mb-1 text-[#00d4ff]">
                <Zap className="w-3.5 h-3.5" />
                <span>Свежие поступления</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] tracking-tight">
                Новинки
              </h2>
            </div>
            <Link
              href="/catalog?sort=new"
              className="text-[13px] text-[#56627a] hover:text-[#f1f3f7] font-medium transition-colors flex items-center gap-1"
            >
              Все новинки <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {uniqueNew.map((product) => (
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
      )}

      {/* ━━━ 6. SALE ━━━ */}
      {uniqueSale.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 section-label mb-1 text-[#e85454]">
                <Tag className="w-3.5 h-3.5" />
                <span>Выгодные цены</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] tracking-tight">
                Специальные предложения
              </h2>
            </div>
            <Link
              href="/catalog?sale=true"
              className="text-[13px] text-[#e85454] hover:text-[#f87171] font-medium transition-colors flex items-center gap-1"
            >
              Все акции <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {uniqueSale.map((product) => (
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
      )}

      {/* ━━━ 7. DELIVERY & PICKUP ━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-[#111318] border border-[#1c2030] overflow-hidden">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="max-w-2xl mb-10">
              <p className="section-label mb-2">Сервис</p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#f1f3f7] tracking-tight">
                Удобное получение заказа
              </h2>
              <p className="text-[14px] sm:text-base text-[#8a95a8] mt-3 leading-relaxed">
                Оформите заказ онлайн — заберите в магазине за 15 минут или
                получите курьером в удобное время.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Delivery */}
              <div className="p-6 rounded-2xl bg-[#0d0f14] border border-[#1c2030] space-y-5">
                <div className="w-11 h-11 rounded-xl bg-[#2b7fff]/12 text-[#2b7fff] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f1f3f7] mb-3">Доставка курьером</h3>
                  <ul className="space-y-2 text-[13px] text-[#8a95a8]">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2b7fff] mt-1.5 shrink-0" />
                      <span><strong className="text-[#f1f3f7]">Срок:</strong> {storeConfig.delivery.inCityTime}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2b7fff] mt-1.5 shrink-0" />
                      <span>
                        <strong className="text-[#f1f3f7]">Стоимость:</strong>{" "}
                        {storeConfig.delivery.inCityCost} сомони. Бесплатно от{" "}
                        {storeConfig.delivery.freeDeliveryThreshold} сомони
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2b7fff] mt-1.5 shrink-0" />
                      <span>Оплата наличными или переводом при получении</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pickup */}
              <div className="p-6 rounded-2xl bg-[#0d0f14] border border-[#1c2030] space-y-5">
                <div className="w-11 h-11 rounded-xl bg-[#16a34a]/12 text-[#16a34a] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f1f3f7] mb-3">Самовывоз из магазина</h3>
                  <ul className="space-y-2 text-[13px] text-[#8a95a8]">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-[#f1f3f7]">Бесплатно</strong> — в удобное время в часы работы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-[#f1f3f7]">Адрес:</strong> {storeConfig.address}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-[#f1f3f7]">График:</strong> {storeConfig.workingHours.weekdays}, {storeConfig.workingHours.weekends}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#1c2030] flex items-center justify-between text-[12px] text-[#56627a]">
                  <span>Готовность заказа: 15 минут</span>
                  <a href={`tel:${storeConfig.phone}`} className="text-[#2b7fff] hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Позвонить
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 8. ABOUT STORE ━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="section-label">О магазине</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#f1f3f7] leading-tight tracking-tight">
              SOGD MOBILE — аксессуары в Худжанде
            </h2>
            <div className="space-y-3.5 text-[14px] sm:text-base text-[#8a95a8] leading-relaxed">
              <p>
                <strong className="text-[#f1f3f7]">SOGD MOBILE</strong> — специализированный магазин
                мобильных аксессуаров в городе Худжанд. Мы подбираем чехлы,
                защитные стекла, сертифицированные зарядки и гаджеты для
                популярных брендов: Apple, Samsung, Xiaomi, Honor, Huawei, Tecno
                и других.
              </p>
              <p>
                Удобный каталог с актуальными остатками, примерка в магазине и
                доставка по Согдийской области.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 h-10 px-5 border border-[#252d3d] hover:border-[#2b7fff]/50 text-[#8a95a8] hover:text-[#f1f3f7] text-[13px] font-medium rounded-xl transition-all"
            >
              Подробнее о нас
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#1c2030] overflow-hidden aspect-video relative bg-[#0d0f14]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
              alt="Магазин SOGD MOBILE в Худжанде"
              className="w-full h-full object-cover opacity-75"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
