import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { ProductDTO } from "@/types";
import { storeConfig } from "@/config/store";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    return {
      title: "Товар не найден",
      description: "Запрашиваемый товар не найден в каталоге SOGD MOBILE",
    };
  }

  const images = JSON.parse(product.images) as string[];
  const mainImage = images[0] || "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb";

  return {
    title: `${product.name} — купить в Худжанде по цене ${product.price} сомони`,
    description: `${product.description.slice(0, 160)}... Доставка по Худжанду за 1–3 часа. Магазин SOGD MOBILE.`,
    openGraph: {
      title: `${product.name} | SOGD MOBILE`,
      description: product.description,
      images: [{ url: mainImage, width: 800, height: 800, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (same category or brand)
  const dbRelated = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
  });

  const parsedProduct: ProductDTO = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    oldPrice: product.oldPrice,
    currency: product.currency,
    images: JSON.parse(product.images) as string[],
    categoryId: product.categoryId,
    category: product.category,
    brand: product.brand,
    compatibleModels: JSON.parse(product.compatibleModels) as string[],
    sku: product.sku,
    stock: product.stock,
    isNew: product.isNew,
    isPopular: product.isPopular,
    isSale: product.isSale,
    color: product.color,
    specifications: product.specifications
      ? (JSON.parse(product.specifications) as Record<string, string>)
      : null,
  };

  const parsedRelated: ProductDTO[] = dbRelated.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice,
    currency: p.currency,
    images: JSON.parse(p.images) as string[],
    categoryId: p.categoryId,
    category: p.category,
    brand: p.brand,
    compatibleModels: JSON.parse(p.compatibleModels) as string[],
    sku: p.sku,
    stock: p.stock,
    isNew: p.isNew,
    isPopular: p.isPopular,
    isSale: p.isSale,
    color: p.color,
  }));

  // JSON-LD Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: parsedProduct.name,
    image: parsedProduct.images,
    description: parsedProduct.description,
    sku: parsedProduct.sku,
    brand: {
      "@type": "Brand",
      name: parsedProduct.brand,
    },
    offers: {
      "@type": "Offer",
      price: parsedProduct.price,
      priceCurrency: "TJS",
      availability:
        parsedProduct.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: storeConfig.name,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={parsedProduct} relatedProducts={parsedRelated} />
    </>
  );
}
