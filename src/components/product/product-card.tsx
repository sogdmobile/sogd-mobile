"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cart";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
  brand: string;
  stock: number;
  isNew?: boolean;
  isPopular?: boolean;
  isSale?: boolean;
  sku: string;
  categoryName?: string;
  className?: string;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  oldPrice,
  images,
  brand,
  stock,
  isNew,
  isPopular,
  isSale,
  sku,
  categoryName,
  className,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const mainImage =
    images?.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80";

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (stock <= 0) return;

    addItem({ productId: id, slug, name, price, image: mainImage, sku, stock, brand, categoryName });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-[#111318] border border-[#1c2030] rounded-2xl overflow-hidden transition-all duration-220",
        "hover:border-[#252d3d] hover:shadow-[0_12px_40px_-8px_rgba(43,127,255,0.18)]",
        className
      )}
      style={{ transition: "border-color 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      {/* ── Image area ── */}
      <Link href={`/product/${slug}`} className="block relative aspect-square w-full overflow-hidden bg-[#0d0f14] shrink-0">
        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {discount ? (
            <Badge variant="sale">−{discount}%</Badge>
          ) : isSale ? (
            <Badge variant="sale">АКЦИЯ</Badge>
          ) : null}
          {isNew && <Badge variant="new">NEW</Badge>}
          {isPopular && !isNew && <Badge variant="popular">ХИТ</Badge>}
        </div>

        {/* Stock indicator top-right */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {stock > 0 ? (
            <span className="inline-flex items-center gap-1 bg-[#08090c]/80 backdrop-blur-sm text-[10px] text-[#16a34a] font-medium px-2 py-0.5 rounded-full border border-[#16a34a]/25">
              <span className="w-1 h-1 rounded-full bg-[#16a34a] inline-block" />
              В наличии
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#08090c]/80 backdrop-blur-sm text-[10px] text-[#dc2626] font-medium px-2 py-0.5 rounded-full border border-[#dc2626]/25">
              Под заказ
            </span>
          )}
        </div>

        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Brand label bottom-left */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a95a8] bg-[#08090c]/75 backdrop-blur-sm px-2 py-0.5 rounded-md">
            {brand}
          </span>
        </div>
      </Link>

      {/* ── Info area ── */}
      <div className="flex flex-col flex-1 justify-between p-3 sm:p-3.5 gap-2.5">
        {/* Product name */}
        <Link href={`/product/${slug}`}>
          <h3 className="text-[13px] sm:text-sm font-semibold text-[#f1f3f7] line-clamp-2 leading-snug hover:text-[#5c9fff] transition-colors">
            {name}
          </h3>
        </Link>

        {/* Price row + cart button */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1c2030]">
          <div className="flex flex-col leading-none">
            {oldPrice && oldPrice > price && (
              <span className="text-[10px] text-[#56627a] line-through mb-0.5">
                {formatPrice(oldPrice)}
              </span>
            )}
            <span className="text-[14px] sm:text-[15px] font-bold text-[#f1f3f7] tracking-tight">
              {formatPrice(price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            aria-label={`Добавить в корзину: ${name}`}
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0",
              added
                ? "bg-[#16a34a] text-white shadow-[0_4px_16px_-4px_rgba(22,163,74,0.5)] scale-105"
                : "bg-[#2b7fff] hover:bg-[#1d6be0] text-white shadow-[0_4px_16px_-4px_rgba(43,127,255,0.4)] hover:scale-105 active:scale-95"
            )}
          >
            {added ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
