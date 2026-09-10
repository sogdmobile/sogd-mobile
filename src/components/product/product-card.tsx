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
  const [isAdded, setIsAdded] = useState(false);

  const mainImage =
    images && images.length > 0
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

    addItem({
      productId: id,
      slug,
      name,
      price,
      image: mainImage,
      sku,
      stock,
      brand,
      categoryName,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between bg-[#131722] border border-[#232A3B] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0070F3]/60 hover:shadow-xl hover:shadow-[#0070F3]/10",
        className
      )}
    >
      {/* Top Image & Badges */}
      <Link href={`/product/${slug}`} className="block relative aspect-square w-full overflow-hidden bg-[#0e121a]">
        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          {discount ? (
            <Badge variant="sale">-{discount}%</Badge>
          ) : isSale ? (
            <Badge variant="sale">АКЦИЯ</Badge>
          ) : null}
          {isNew && <Badge variant="new">NEW</Badge>}
          {isPopular && !isNew && <Badge variant="popular">ХИТ</Badge>}
        </div>

        {/* Stock Status Indicator */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {stock > 0 ? (
            <span className="inline-flex items-center gap-1 bg-[#0b0d12]/80 backdrop-blur-md text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              В наличии
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#0b0d12]/80 backdrop-blur-md text-[10px] text-rose-400 font-medium px-2 py-0.5 rounded-full border border-rose-500/20">
              Под заказ
            </span>
          )}
        </div>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Brand Tag Pill */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
            {brand}
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <Link href={`/product/${slug}`} className="group-hover:text-[#00E5FF] transition-colors">
            <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-2 leading-snug">
              {name}
            </h3>
          </Link>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Арт: {sku}
          </p>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="pt-2 border-t border-[#232A3B]/60 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {oldPrice && oldPrice > price && (
              <span className="text-[11px] sm:text-xs text-slate-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
            <span className="font-bold text-sm sm:text-base text-white tracking-tight">
              {formatPrice(price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            aria-label={`Добавить в корзину ${name}`}
            className={cn(
              "h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
              isAdded
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                : "bg-[#0070F3] hover:bg-[#005bb5] text-white shadow-md shadow-[#0070F3]/30 hover:scale-105 active:scale-95"
            )}
          >
            {isAdded ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
