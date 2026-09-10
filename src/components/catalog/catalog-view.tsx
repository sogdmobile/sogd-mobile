"use client";

import React, { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { CategoryDTO, ProductDTO, SortOption } from "@/types";
import { Button } from "@/components/ui/button";
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
  brands,
  models,
  totalCount,
}: CatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Current active parameters from URL
  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentModel = searchParams.get("model") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentInStock = searchParams.get("inStock") === "true";
  const currentSort = (searchParams.get("sort") as SortOption) || "popular";
  const currentSearch = searchParams.get("search") || "";
  const currentSale = searchParams.get("sale") === "true";

  // Search input state
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [minPriceInput, setMinPriceInput] = useState(currentMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(currentMaxPrice);

  const updateFilters = (params: Record<string, string | null | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim() || null });
  };

  const handlePriceApply = () => {
    updateFilters({
      minPrice: minPriceInput ? minPriceInput : null,
      maxPrice: maxPriceInput ? maxPriceInput : null,
    });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    router.push(pathname);
  };

  const hasActiveFilters =
    Boolean(currentCategory) ||
    Boolean(currentBrand) ||
    Boolean(currentModel) ||
    Boolean(currentMinPrice) ||
    Boolean(currentMaxPrice) ||
    currentInStock ||
    Boolean(currentSearch) ||
    currentSale;

  const FilterContent = (
    <div className="space-y-6 text-sm">
      {/* Categories Filter */}
      <div>
        <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
          Категория
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilters({ category: null })}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !currentCategory
                ? "bg-[#0070F3] text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Все категории
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilters({ category: cat.slug })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                currentCategory === cat.slug
                  ? "bg-[#0070F3] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{cat.name}</span>
              {cat.productCount !== undefined && (
                <span className="text-[10px] opacity-70">
                  {cat.productCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="pt-4 border-t border-[#232A3B]">
        <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
          Бренд смартфона
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() =>
                updateFilters({
                  brand: currentBrand === brand ? null : brand,
                })
              }
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentBrand === brand
                  ? "bg-[#00E5FF] text-black font-semibold shadow-md shadow-[#00E5FF]/20"
                  : "bg-[#131722] text-slate-300 border border-[#232A3B] hover:border-slate-500"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Compatible Models Filter */}
      {models.length > 0 && (
        <div className="pt-4 border-t border-[#232A3B]">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
            Модель устройства
          </h3>
          <select
            value={currentModel}
            onChange={(e) => updateFilters({ model: e.target.value || null })}
            className="w-full bg-[#131722] border border-[#232A3B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0070F3]"
          >
            <option value="">Любая модель</option>
            {models.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-[#232A3B]">
        <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
          Цена (сомони)
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="От"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            className="w-full bg-[#131722] border border-[#232A3B] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3]"
          />
          <span className="text-slate-500">—</span>
          <input
            type="number"
            placeholder="До"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            className="w-full bg-[#131722] border border-[#232A3B] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3]"
          />
        </div>
        <Button
          onClick={handlePriceApply}
          variant="secondary"
          size="sm"
          className="w-full mt-2 text-xs h-8"
        >
          Применить цену
        </Button>
      </div>

      {/* Availability / In Stock */}
      <div className="pt-4 border-t border-[#232A3B] space-y-2">
        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateFilters({ inStock: e.target.checked ? "true" : null })
            }
            className="w-4 h-4 rounded border-slate-700 bg-[#131722] text-[#0070F3] focus:ring-[#0070F3]"
          />
          <span>Только в наличии</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={currentSale}
            onChange={(e) =>
              updateFilters({ sale: e.target.checked ? "true" : null })
            }
            className="w-4 h-4 rounded border-slate-700 bg-[#131722] text-red-500 focus:ring-red-500"
          />
          <span className="text-red-400">Со скидкой / Акция</span>
        </label>
      </div>

      {/* Reset all filters */}
      {hasActiveFilters && (
        <div className="pt-4">
          <Button
            onClick={handleResetFilters}
            variant="outline"
            size="sm"
            className="w-full text-xs h-9 gap-1.5 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить все фильтры</span>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2030]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Каталог товаров
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Найдено {totalCount} аксессуаров в каталоге SOGD MOBILE
          </p>
        </div>

        {/* Search inside catalog */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full md:max-w-sm"
        >
          <input
            type="text"
            placeholder="Поиск по названию, модели, бренду..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-[#131722] border border-[#232A3B] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3]"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                updateFilters({ search: null });
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Control Bar: Sorting + Mobile Filter Trigger + Active Chips */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-3">
        {/* Mobile filter button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            onClick={() => setMobileFiltersOpen(true)}
            variant="secondary"
            size="sm"
            className="text-xs gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#00E5FF]" />
            <span>Фильтры</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            )}
          </Button>
        </div>

        {/* Active Filter Chips */}
        <div className="hidden sm:flex flex-wrap items-center gap-1.5">
          {currentCategory && (
            <span className="inline-flex items-center gap-1 bg-[#131722] border border-[#232A3B] text-xs text-slate-300 px-2.5 py-1 rounded-lg">
              Категория:{" "}
              {categories.find((c) => c.slug === currentCategory)?.name ||
                currentCategory}
              <button
                onClick={() => updateFilters({ category: null })}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {currentBrand && (
            <span className="inline-flex items-center gap-1 bg-[#131722] border border-[#232A3B] text-xs text-slate-300 px-2.5 py-1 rounded-lg">
              Бренд: {currentBrand}
              <button
                onClick={() => updateFilters({ brand: null })}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {currentSearch && (
            <span className="inline-flex items-center gap-1 bg-[#131722] border border-[#232A3B] text-xs text-slate-300 px-2.5 py-1 rounded-lg">
              Поиск: &quot;{currentSearch}&quot;
              <button
                onClick={() => {
                  setSearchInput("");
                  updateFilters({ search: null });
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {currentSale && (
            <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-xs text-red-400 px-2.5 py-1 rounded-lg">
              Только скидки
              <button
                onClick={() => updateFilters({ sale: null })}
                className="text-red-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-white underline ml-1"
            >
              Сбросить все
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-slate-500 hidden sm:inline-block">
            Сортировка:
          </span>
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="appearance-none bg-[#131722] border border-[#232A3B] text-slate-200 text-xs rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:border-[#0070F3] cursor-pointer"
            >
              <option value="popular">По популярности</option>
              <option value="new">Сначала новинки</option>
              <option value="price_asc">Сначала дешевле (Цена ↑)</option>
              <option value="price_desc">Сначала дороже (Цена ↓)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid with Left Sidebar on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4 items-start">
        {/* Left Filter Sidebar for Desktop */}
        <aside className="hidden lg:block lg:col-span-1 bg-[#0e121a] border border-[#1e2536] rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#232A3B] mb-5">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Filter className="w-4 h-4 text-[#00E5FF]" />
              <span>Фильтры</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-white"
              >
                Сброс
              </button>
            )}
          </div>

          {FilterContent}
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {initialProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-[#131722]/50 border border-[#232A3B] min-h-[350px]">
              <div className="w-16 h-16 rounded-full bg-[#1A2030] flex items-center justify-center text-slate-500 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Товары не найдены
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mt-1 mb-6">
                Попробуйте изменить параметры поиска, снять фильтры или выбрать другой бренд
              </p>
              <Button onClick={handleResetFilters} variant="primary" size="md">
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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

      {/* Mobile Drawer Sheet for Filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-[#0e121a] border-l border-[#232A3B] p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#232A3B] mb-5">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <Filter className="w-5 h-5 text-[#00E5FF]" />
                  <span>Фильтры</span>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {FilterContent}
            </div>

            <div className="pt-6 border-t border-[#232A3B] mt-6">
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
