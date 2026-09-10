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
  ChevronRight,
  Smartphone,
  MessageCircle,
  Send,
} from "lucide-react";
import { PHONE_BRANDS } from "@/data/phone-brands";

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
  const [added, setAdded] = useState(false);
  const [compatBrand, setCompatBrand] = useState("");
  const [compatModel, setCompatModel] = useState("");
  const [compatResult, setCompatResult] = useState<"yes" | "no" | null>(null);

  const addItem = useCartStore((s) => s.addItem);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-8 space-y-16">

      {/* ── 1. Breadcrumb ── */}
      <nav aria-label="Навигация по разделам" className="flex items-center gap-1.5 text-[11px] text-[#56627a] flex-wrap">
        <Link href="/" className="hover:text-[#f1f3f7] transition-colors">Главная</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/catalog" className="hover:text-[#f1f3f7] transition-colors">Каталог</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/catalog?category=${product.category.slug}`}
              className="hover:text-[#f1f3f7] transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#8a95a8] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* ── 2. Main Product Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Gallery — left 6 cols */}
        <div className="lg:col-span-6 space-y-3">
          {/* Main image */}
          <div className="relative aspect-square w-full rounded-3xl bg-[#111318] border border-[#1c2030] overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              {discount && <Badge variant="sale">−{discount}%</Badge>}
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {product.isPopular && <Badge variant="popular">ХИТ</Badge>}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-18 h-18 rounded-xl bg-[#111318] border-2 overflow-hidden shrink-0 transition-all ${
                    selectedImage === img
                      ? "border-[#2b7fff] shadow-[0_4px_16px_-4px_rgba(43,127,255,0.4)] scale-105"
                      : "border-[#1c2030] opacity-60 hover:opacity-100 hover:border-[#252d3d]"
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

        {/* Details — right 6 cols */}
        <div className="lg:col-span-6 space-y-5">
          {/* Brand + stock */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2b7fff] bg-[#2b7fff]/10 px-3 py-1.5 rounded-xl border border-[#2b7fff]/20">
              {product.brand}
            </span>
            {product.stock > 0 ? (
              <span className="text-[11px] font-semibold text-[#16a34a] flex items-center gap-1.5 bg-[#16a34a]/10 px-3 py-1.5 rounded-xl border border-[#16a34a]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
                В наличии ({product.stock} шт.)
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-[#dc2626] bg-[#dc2626]/10 px-3 py-1.5 rounded-xl border border-[#dc2626]/20">
                Под заказ
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] leading-tight tracking-tight">
            {product.name}
          </h1>

          {/* Price block */}
          <div className="flex items-baseline gap-4 p-5 rounded-2xl bg-[#111318] border border-[#1c2030]">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#f1f3f7] tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-[17px] text-[#56627a] line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {discount && (
              <span className="text-[11px] font-bold text-[#e85454] bg-[#e85454]/10 px-2.5 py-1 rounded-lg border border-[#e85454]/20">
                Экономия {formatPrice(product.oldPrice! - product.price)}
              </span>
            )}
          </div>

          {/* Color */}
          {product.color && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#56627a] uppercase tracking-wider">
                Цвет: <strong className="text-[#f1f3f7] normal-case">{product.color}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#181b22] border border-[#2b7fff]/50 text-[12px] font-medium text-[#f1f3f7]">
                  {product.color}
                </span>
              </div>
            </div>
          )}

          {/* Compatible models */}
          {product.compatibleModels.length > 0 && (
            <div className="space-y-4 bg-[#111318] border border-[#1c2030] p-5 rounded-2xl">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#2b7fff]" />
                <h3 className="font-bold text-[#f1f3f7] text-[14px]">Подходит ли это вашему телефону?</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={compatBrand}
                  onChange={(e) => {
                    setCompatBrand(e.target.value);
                    setCompatModel("");
                    setCompatResult(null);
                  }}
                  className="flex-1 bg-[#181b22] border border-[#252d3d] rounded-xl px-3 py-2.5 text-[13px] text-[#f1f3f7] focus:border-[#2b7fff] focus:outline-none"
                >
                  <option value="">Выберите бренд...</option>
                  {PHONE_BRANDS.map((b) => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </select>
                <select
                  value={compatModel}
                  onChange={(e) => {
                    setCompatModel(e.target.value);
                    setCompatResult(null);
                  }}
                  disabled={!compatBrand}
                  className="flex-1 bg-[#181b22] border border-[#252d3d] rounded-xl px-3 py-2.5 text-[13px] text-[#f1f3f7] focus:border-[#2b7fff] focus:outline-none disabled:opacity-50"
                >
                  <option value="">Выберите модель...</option>
                  {compatBrand &&
                    PHONE_BRANDS.find((b) => b.slug === compatBrand)?.models.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <Button
                  onClick={() => {
                    if (!compatModel) return;
                    const isCompatible = product.compatibleModels.some(
                      (m) => m.toLowerCase() === compatModel.toLowerCase()
                    );
                    setCompatResult(isCompatible ? "yes" : "no");
                  }}
                  disabled={!compatModel}
                  variant="primary"
                  className="px-6 h-11 sm:h-auto"
                >
                  Проверить
                </Button>
              </div>

              {compatResult === "yes" && (
                <div className="flex items-center gap-2 text-[#16a34a] bg-[#16a34a]/10 p-3 rounded-xl border border-[#16a34a]/20">
                  <Check className="w-5 h-5" />
                  <span className="text-[13px] font-medium">Да, отлично подходит к {compatModel}!</span>
                </div>
              )}
              {compatResult === "no" && (
                <div className="flex items-center gap-2 text-[#e85454] bg-[#e85454]/10 p-3 rounded-xl border border-[#e85454]/20">
                  <span className="w-5 h-5 flex items-center justify-center font-bold">✕</span>
                  <span className="text-[13px] font-medium">К сожалению, не подходит к {compatModel}.</span>
                </div>
              )}
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              {/* Qty picker */}
              <div className="flex items-center bg-[#111318] border border-[#1c2030] rounded-xl h-12 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-full text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22] transition-colors text-lg font-medium"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-[#f1f3f7] text-[14px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="w-11 h-full text-[#8a95a8] hover:text-[#f1f3f7] hover:bg-[#181b22] transition-colors text-lg font-medium disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {/* Add to cart CTA */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                variant="primary"
                size="lg"
                className={`flex-1 h-12 font-semibold transition-all ${
                  added ? "!bg-[#16a34a] hover:!bg-[#15803d]" : ""
                }`}
              >
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Добавлено в корзину
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    {product.stock > 0 ? "Добавить в корзину" : "Нет в наличии"}
                  </span>
                )}
              </Button>
            </div>

            {/* Quick order via messenger */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`https://wa.me/992920000000?text=${encodeURIComponent(
                  `Здравствуйте! Хочу заказать "${product.name}" (${quantity} шт.) — ${product.price * quantity} сомони`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-[#16a34a]/30 text-[#16a34a] hover:bg-[#16a34a]/8 hover:border-[#16a34a]/60 text-[12px] font-semibold gap-2 h-11"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
              <a
                href={`https://t.me/sogdmobile_support?text=${encodeURIComponent(
                  `Здравствуйте! Хочу заказать "${product.name}" (${quantity} шт.) — ${product.price * quantity} сомони`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-[#2b7fff]/30 text-[#5c9fff] hover:bg-[#2b7fff]/8 hover:border-[#2b7fff]/60 text-[12px] font-semibold gap-2 h-11"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </Button>
              </a>
            </div>
          </div>

          {/* Service guarantees strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1c2030] text-[11px] text-[#56627a]">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2b7fff]" />
              <span>Доставка 1–3 ч по Худжанду</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
              <span>Оплата при получении</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#2b7fff]" />
              <span>14 дней на проверку</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Description + Specs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#1c2030]">
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-xl font-bold text-[#f1f3f7]">Описание</h2>
          <div className="bg-[#111318] border border-[#1c2030] rounded-2xl p-5 sm:p-6 text-[14px] sm:text-[15px] text-[#8a95a8] leading-relaxed space-y-3">
            <p>{product.description}</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xl font-bold text-[#f1f3f7]">Характеристики</h2>
          <div className="bg-[#111318] border border-[#1c2030] rounded-2xl overflow-hidden divide-y divide-[#1c2030] text-[13px]">
            <div className="flex justify-between px-4 py-3">
              <span className="text-[#56627a]">Бренд</span>
              <span className="font-semibold text-[#f1f3f7]">{product.brand}</span>
            </div>
            {product.category && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[#56627a]">Категория</span>
                <span className="font-semibold text-[#f1f3f7]">{product.category.name}</span>
              </div>
            )}
            <div className="flex justify-between px-4 py-3">
              <span className="text-[#56627a]">Артикул</span>
              <span className="font-mono text-[#8a95a8] text-[12px]">{product.sku}</span>
            </div>
            {product.specifications &&
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between px-4 py-3">
                  <span className="text-[#56627a]">{key}</span>
                  <span className="font-semibold text-[#f1f3f7] text-right max-w-[200px]">{val}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ── 4. Related Products ── */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#1c2030] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#f1f3f7]">Похожие аксессуары</h2>
            <Link href="/catalog" className="text-[13px] text-[#5c9fff] hover:text-[#00d4ff] font-medium flex items-center gap-1 transition-colors">
              Весь каталог <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ── 5. Sticky Mobile CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0d0f14]/80 backdrop-blur-md border-t border-[#1c2030] z-40 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          variant="primary"
          size="lg"
          className={`w-full h-12 font-semibold transition-all ${
            added ? "!bg-[#16a34a] hover:!bg-[#15803d]" : "shadow-[0_4px_24px_-4px_rgba(43,127,255,0.4)]"
          }`}
        >
          {added ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Добавлено
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {product.stock > 0 ? `В корзину — ${formatPrice(product.price * quantity)}` : "Нет в наличии"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
