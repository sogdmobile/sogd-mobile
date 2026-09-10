"use client";

import React, { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { CategoryDTO, ProductDTO, SortOption } from "@/types";
import { Button } from "@/components/ui/button";
import { PHONE_BRANDS } from "@/data/phone-brands";
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

interface CatalogViewProps {
  initialProducts: ProductDTO[];
  categories: CategoryDTO[];
  brands: string[];
  models: string[];
  totalCount: number;
}

export function CatalogView({
  initialProducts,
  categories,
  totalCount,
}: CatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentModel = searchParams.get("model") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentInStock = searchParams.get("inStock") === "true";
  const currentSort = (searchParams.get("sort") as SortOption) || "popular";
  const currentSearch = searchParams.get("search") || "";
  const currentSale = searchParams.get("sale") === "true";

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [minPriceInput, setMinPriceInput] = useState(currentMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(currentMaxPrice);
  const [brandOpen, setBrandOpen] = useState(true);
  const [modelOpen, setModelOpen] = useState(true);

  const updateFilters = (params: Record<string, string | null | undefined>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim() || null });
  };

  const handlePriceApply = () => {
    updateFilters({ minPrice: minPriceInput || null, maxPrice: maxPriceInput || null });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    router.push(pathname);
  };

  const hasActiveFilters =
    Boolean(currentCategory) || Boolean(currentBrand) || Boolean(currentModel) ||
    Boolean(currentMinPrice) || Boolean(currentMaxPrice) || currentInStock ||
    Boolean(currentSearch) || currentSale;

  // Models for current brand, if one is selected
  const modelsForBrand = currentBrand
    ? PHONE_BRANDS.find((b) => b.slug === currentBrand)?.models ?? []
    : [];

  // Quick-access popular models (shown when no brand is selected)
  const popularModels = [
    "iPhone 16 Pro", "iPhone 15 Pro", "iPhone 14",
    "Galaxy S24 Ultra", "Redmi Note 13", "Xiaomi 14",
  ];

  const inputCls =
    "w-full bg-[#111318] border border-[#1c2030] rounded-xl px-3 py-2 text-[12px] text-[#f1f3f7] placeholder-[#3a4356] focus:outline-none focus:border-[#2b7fff] focus:ring-1 focus:ring-[#2b7fff]/25 transition-all";

  const FilterContent = (
    <div className="space-y-5 text-[12px]">

      {/* Categories */}
      <div>
        <h3 className="font-bold text-[#f1f3f7] text-[10px] uppercase tracking-widest mb-2.5">
          Категория
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilters({ category: null })}
            className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
              !currentCategory
                ? "bg-[#2b7fff] text-white"
                : "text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22]"
            }`}
          >
            Все категории
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilters({ category: cat.slug })}
              className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                currentCategory === cat.slug
                  ? "bg-[#2b7fff] text-white"
                  : "text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22]"
              }`}
            >
              <span>{cat.name}</span>
              {cat.productCount !== undefined && (
                <span className="opacity-55 text-[10px]">{cat.productCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="border-t border-[#1c2030] pt-4">
        <button
          onClick={() => setBrandOpen((v) => !v)}
          className="w-full flex items-center justify-between mb-2.5 group"
        >
          <h3 className="font-bold text-[#f1f3f7] text-[10px] uppercase tracking-widest">
            Бренд
          </h3>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#56627a] transition-transform ${brandOpen ? "rotate-180" : ""}`}
          />
        </button>
        {brandOpen && (
          <div className="flex flex-wrap gap-1.5">
            {PHONE_BRANDS.map((b) => (
              <button
                key={b.slug}
                onClick={() =>
                  updateFilters({
                    brand: currentBrand === b.slug ? null : b.slug,
                    model: null, // reset model on brand change
                  })
                }
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all border ${
                  currentBrand === b.slug
                    ? "bg-[#2b7fff] border-[#2b7fff] text-white"
                    : "bg-[#111318] border-[#1c2030] text-[#8a95a8] hover:text-[#f1f3f7] hover:border-[#252d3d]"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Model — contextual to brand */}
      <div className="border-t border-[#1c2030] pt-4">
        <button
          onClick={() => setModelOpen((v) => !v)}
          className="w-full flex items-center justify-between mb-2.5"
        >
          <h3 className="font-bold text-[#f1f3f7] text-[10px] uppercase tracking-widest">
            Модель
          </h3>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#56627a] transition-transform ${modelOpen ? "rotate-180" : ""}`}
          />
        </button>
        {modelOpen && (
          <>
            {modelsForBrand.length > 0 ? (
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-none">
                <button
                  onClick={() => updateFilters({ model: null })}
                  className={`w-full text-left px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    !currentModel
                      ? "bg-[#2b7fff] text-white"
                      : "text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22]"
                  }`}
                >
                  Все модели {currentBrand}
                </button>
                {modelsForBrand.map((m) => (
                  <button
                    key={m}
                    onClick={() => updateFilters({ model: currentModel === m ? null : m })}
                    className={`w-full text-left px-3 py-1.5 rounded-xl font-medium transition-colors ${
                      currentModel === m
                        ? "bg-[#2b7fff] text-white"
                        : "text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            ) : (
              <select
                value={currentModel}
                onChange={(e) => updateFilters({ model: e.target.value || null })}
                className={inputCls}
              >
                <option value="">Любая модель</option>
                {popularModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            )}
          </>
        )}
      </div>

      {/* Price */}
      <div className="border-t border-[#1c2030] pt-4">
        <h3 className="font-bold text-[#f1f3f7] text-[10px] uppercase tracking-widest mb-2.5">
          Цена (сомони)
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="От"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            className={inputCls}
          />
          <span className="text-[#3a4356]">—</span>
          <input
            type="number"
            placeholder="До"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            className={inputCls}
          />
        </div>
        <Button onClick={handlePriceApply} variant="secondary" size="sm" className="w-full mt-2 text-[11px]">
          Применить
        </Button>
      </div>

      {/* Toggles */}
      <div className="border-t border-[#1c2030] pt-4 space-y-2">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) => updateFilters({ inStock: e.target.checked ? "true" : null })}
            className="w-4 h-4 rounded border-[#252d3d] bg-[#111318] text-[#2b7fff] focus:ring-[#2b7fff]/25 accent-[#2b7fff]"
          />
          <span className="text-[12px] text-[#8a95a8]">Только в наличии</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={currentSale}
            onChange={(e) => updateFilters({ sale: e.target.checked ? "true" : null })}
            className="w-4 h-4 rounded border-[#252d3d] bg-[#111318] text-[#e85454] focus:ring-[#e85454]/25 accent-[#e85454]"
          />
          <span className="text-[12px] text-[#e85454]">Со скидкой / Акции</span>
        </label>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <div className="border-t border-[#1c2030] pt-4">
          <Button
            onClick={handleResetFilters}
            variant="ghost"
            size="sm"
            className="w-full text-[11px] gap-1.5 text-[#56627a] hover:text-[#f1f3f7]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Сбросить все фильтры
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1c2030]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f3f7] tracking-tight">
            Каталог товаров
          </h1>
          <p className="text-[12px] text-[#56627a] mt-1">
            {totalCount} аксессуар{totalCount === 1 ? "" : totalCount < 5 ? "а" : "ов"} в SOGD MOBILE
          </p>
        </div>
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Поиск: iPhone 16 Pro, чехол, стекло..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full h-10 bg-[#111318] border border-[#1c2030] rounded-xl pl-9 pr-8 text-[12px] text-[#f1f3f7] placeholder-[#3a4356] focus:outline-none focus:border-[#2b7fff] focus:ring-1 focus:ring-[#2b7fff]/25"
          />
          <Search className="w-4 h-4 text-[#56627a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchInput && (
            <button
              type="button"
              onClick={() => { setSearchInput(""); updateFilters({ search: null }); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#3a4356] hover:text-[#f1f3f7] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* ── Model quick chips ── */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#3a4356] shrink-0">
          Модели:
        </span>
        <button
          onClick={() => updateFilters({ model: null })}
          className={`shrink-0 h-7 px-3 rounded-full border text-[11px] font-medium transition-all whitespace-nowrap ${
            !currentModel
              ? "bg-[#2b7fff] border-[#2b7fff] text-white shadow-sm"
              : "bg-[#111318] border-[#1c2030] text-[#56627a] hover:text-[#f1f3f7] hover:border-[#252d3d]"
          }`}
        >
          Все модели
        </button>
        {popularModels.map((m) => {
          const active = currentModel.toLowerCase() === m.toLowerCase();
          return (
            <button
              key={m}
              onClick={() => updateFilters({ model: active ? null : m })}
              className={`shrink-0 h-7 px-3 rounded-full border text-[11px] font-medium transition-all whitespace-nowrap ${
                active
                  ? "bg-[#2b7fff] border-[#2b7fff] text-white shadow-sm"
                  : "bg-[#111318] border-[#1c2030] text-[#56627a] hover:text-[#f1f3f7] hover:border-[#252d3d]"
              }`}
            >
              {m}
            </button>
          );
        })}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        {/* Mobile filter trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            onClick={() => setMobileFiltersOpen(true)}
            variant="secondary"
            size="sm"
            className="gap-2 text-[11px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2b7fff]" />
            Фильтры
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#2b7fff] inline-block" />
            )}
          </Button>
        </div>

        {/* Active filter chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {currentCategory && (
            <span className="inline-flex items-center gap-1 bg-[#111318] border border-[#1c2030] text-[11px] text-[#8a95a8] px-2.5 py-1 rounded-lg">
              {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}
              <button onClick={() => updateFilters({ category: null })} className="text-[#56627a] hover:text-[#f1f3f7]"><X className="w-3 h-3" /></button>
            </span>
          )}
          {currentBrand && (
            <span className="inline-flex items-center gap-1 bg-[#111318] border border-[#1c2030] text-[11px] text-[#8a95a8] px-2.5 py-1 rounded-lg">
              {currentBrand}
              <button onClick={() => updateFilters({ brand: null, model: null })} className="text-[#56627a] hover:text-[#f1f3f7]"><X className="w-3 h-3" /></button>
            </span>
          )}
          {currentModel && (
            <span className="inline-flex items-center gap-1 bg-[#2b7fff]/10 border border-[#2b7fff]/25 text-[11px] text-[#5c9fff] px-2.5 py-1 rounded-lg">
              {currentModel}
              <button onClick={() => updateFilters({ model: null })} className="text-[#5c9fff]/60 hover:text-[#f1f3f7]"><X className="w-3 h-3" /></button>
            </span>
          )}
          {currentSearch && (
            <span className="inline-flex items-center gap-1 bg-[#111318] border border-[#1c2030] text-[11px] text-[#8a95a8] px-2.5 py-1 rounded-lg">
              «{currentSearch}»
              <button onClick={() => { setSearchInput(""); updateFilters({ search: null }); }} className="text-[#56627a] hover:text-[#f1f3f7]"><X className="w-3 h-3" /></button>
            </span>
          )}
          {currentSale && (
            <span className="inline-flex items-center gap-1 bg-[#e85454]/10 border border-[#e85454]/25 text-[11px] text-[#e85454] px-2.5 py-1 rounded-lg">
              Скидки
              <button onClick={() => updateFilters({ sale: null })} className="text-[#e85454]/60 hover:text-white"><X className="w-3 h-3" /></button>
            </span>
          )}
          {hasActiveFilters && (
            <button onClick={handleResetFilters} className="text-[11px] text-[#3a4356] hover:text-[#f1f3f7] underline ml-1 transition-colors">
              Сбросить всё
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[11px] text-[#3a4356] hidden sm:block">Сортировка:</span>
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="appearance-none bg-[#111318] border border-[#1c2030] text-[#8a95a8] text-[11px] rounded-xl pl-3 pr-7 py-2 focus:outline-none focus:border-[#2b7fff] cursor-pointer hover:border-[#252d3d] transition-colors"
            >
              <option value="popular">По популярности</option>
              <option value="new">Сначала новинки</option>
              <option value="price_asc">Цена ↑</option>
              <option value="price_desc">Цена ↓</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#56627a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2 items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-[#0d0f14] border border-[#1c2030] rounded-2xl p-5 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-[#1c2030] mb-4">
            <div className="flex items-center gap-2 font-bold text-[#f1f3f7] text-[13px]">
              <Filter className="w-4 h-4 text-[#2b7fff]" />
              Фильтры
            </div>
            {hasActiveFilters && (
              <button onClick={handleResetFilters} className="text-[11px] text-[#56627a] hover:text-[#f1f3f7] transition-colors">
                Сброс
              </button>
            )}
          </div>
          {FilterContent}
        </aside>

        {/* Product grid */}
        <div className="lg:col-span-3">
          {initialProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-[#111318] border border-[#1c2030] min-h-[350px]">
              <div className="w-14 h-14 rounded-full bg-[#181b22] flex items-center justify-center text-[#3a4356] mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#f1f3f7]">Товары не найдены</h3>
              <p className="text-[13px] text-[#56627a] max-w-sm mt-1 mb-6">
                Попробуйте изменить параметры поиска или сбросить фильтры
              </p>
              <Button onClick={handleResetFilters} variant="primary" size="md">
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {initialProducts.map((product) => (
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
                  categoryName={product.category?.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-80 bg-[#0d0f14] border-l border-[#1c2030] flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 h-14 border-b border-[#1c2030] shrink-0">
              <div className="flex items-center gap-2 font-bold text-[#f1f3f7] text-[14px]">
                <Filter className="w-4 h-4 text-[#2b7fff]" />
                Фильтры
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-[#56627a] hover:text-[#f1f3f7] hover:bg-white/5 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto">
              {FilterContent}
            </div>
            <div className="px-5 py-4 border-t border-[#1c2030] shrink-0">
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Показать товары ({totalCount})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
