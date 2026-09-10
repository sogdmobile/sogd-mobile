"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductDTO } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cart";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronRight,
  Sparkles,
  Layers,
  Smartphone,
} from "lucide-react";

interface ProductDetailViewProps {
  product: ProductDTO;
  relatedProducts: ProductDTO[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0] ||
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : null;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: selectedImage,
        sku: product.sku,
        stock: product.stock,
        brand: product.brand,
        categoryName: product.category?.name,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Главная
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/catalog" className="hover:text-white transition-colors">
          Каталог
        </Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link
              href={`/catalog?category=${product.category.slug}`}
              className="hover:text-white transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-3xl bg-[#131722] border border-[#232A3B] overflow-hidden group">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {discount && <Badge variant="sale">Скидка -{discount}%</Badge>}
              {product.isNew && <Badge variant="new">NEW ARRIVAL</Badge>}
              {product.isPopular && <Badge variant="popular">ХИТ ПРОДАЖ</Badge>}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl bg-[#131722] border-2 overflow-hidden flex-shrink-0 transition-all ${
                    selectedImage === img
                      ? "border-[#0070F3] shadow-md shadow-[#0070F3]/20 scale-105"
                      : "border-[#232A3B] opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Buying Information (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand and Stock Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-lg border border-[#00E5FF]/20">
              {product.brand}
            </span>

            {product.stock > 0 ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                В наличии ({product.stock} шт.)
              </span>
            ) : (
              <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/20">
                Под заказ
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Rating and SKU */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-[#232A3B]">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-200 text-sm">4.9</span>
              <span className="text-slate-500">(18 отзывов)</span>
            </div>
            <span>•</span>
            <span className="font-mono">Артикул: {product.sku}</span>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-[#131722] border border-[#232A3B] flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-black text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-lg text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {discount && (
              <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
                Экономия {formatPrice(product.oldPrice! - product.price)}
              </span>
            )}
          </div>

          {/* Color & Variants */}
          {product.color && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Цвет: <strong className="text-white normal-case">{product.color}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#1A2030] border border-[#0070F3] text-xs font-medium text-white shadow-sm">
                  {product.color}
                </span>
              </div>
            </div>
          )}

          {/* Compatible Models */}
          {product.compatibleModels.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Совместимость:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.compatibleModels.map((mod) => (
                  <span
                    key={mod}
                    className="px-2.5 py-1 rounded-lg bg-[#131722] border border-[#232A3B] text-xs text-slate-300 font-medium"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center border border-[#232A3B] bg-[#131722] rounded-xl p-1 h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-full flex items-center justify-center text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="w-10 h-full flex items-center justify-center text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                variant="primary"
                size="lg"
                className={`flex-1 h-12 transition-all ${
                  isAdded ? "bg-emerald-500 hover:bg-emerald-600" : ""
                }`}
              >
                {isAdded ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> Добавлено в корзину
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    {product.stock > 0
                      ? "Добавить в корзину"
                      : "Товара нет в наличии"}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Advantages / Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#232A3B] text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
              <span>Доставка по Худжанду за 1-3 часа</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Оплата при получении</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#0070F3] flex-shrink-0" />
              <span>14 дней на проверку</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Description & Specifications Tabs / Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-[#1a2030]">
        {/* Description (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00E5FF]" />
            <span>Описание товара</span>
          </h3>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 bg-[#131722]/60 border border-[#232A3B] rounded-2xl p-6">
            <p>{product.description}</p>
            <p className="text-slate-400 text-xs sm:text-sm">
              Все аксессуары SOGD MOBILE проходят входной контроль качества. Мы проверяем целостность материалов, работу разъемов и соответствие габаритов оригинальным устройствам.
            </p>
          </div>
        </div>

        {/* Specifications Table (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0070F3]" />
            <span>Характеристики</span>
          </h3>

          <div className="bg-[#131722] border border-[#232A3B] rounded-2xl overflow-hidden divide-y divide-[#232A3B]/60 text-xs sm:text-sm">
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">Бренд</span>
              <span className="font-semibold text-white">{product.brand}</span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">Категория</span>
              <span className="font-semibold text-white">
                {product.category?.name || "Аксессуары"}
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">Артикул</span>
              <span className="font-mono text-slate-300">{product.sku}</span>
            </div>

            {product.specifications &&
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3.5">
                  <span className="text-slate-400">{key}</span>
                  <span className="font-semibold text-white text-right max-w-[220px]">
                    {val}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 4. Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#1a2030] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Похожие аксессуары</h2>
            <Link
              href="/catalog"
              className="text-xs sm:text-sm text-[#00E5FF] hover:underline"
            >
              Смотреть весь каталог →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                id={rel.id}
                slug={rel.slug}
                name={rel.name}
                price={rel.price}
                oldPrice={rel.oldPrice}
                images={rel.images}
                brand={rel.brand}
                stock={rel.stock}
                isNew={rel.isNew}
                isPopular={rel.isPopular}
                isSale={rel.isSale}
                sku={rel.sku}
                categoryName={rel.category?.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
