import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog-service";
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
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Товар не найден",
      description: "Запрашиваемый товар не найден в каталоге SOGD MOBILE",
    };
  }

  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb";

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

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products (same category or brand)
  const parsedRelated = await getRelatedProducts(product.categoryId, product.id, 4);

  const parsedProduct = product;


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
