import React from "react";
import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/catalog-service";
import { CatalogView } from "@/components/catalog/catalog-view";
import { SortOption } from "@/types";

export const metadata: Metadata = {
  title: "Каталог мобильных аксессуаров в Худжанде",
  description:
    "Большой выбор чехлов, защитных стекол 9H, быстрых зарядок, кабелей и повербанков для Apple, Samsung, Xiaomi и других брендов в SOGD MOBILE.",
};

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    model?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sort?: string;
    search?: string;
    sale?: string;
    material?: string;
    color?: string;
    capacity?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const category = params.category;
  const brand = params.brand;
  const model = params.model;
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;
  const inStock = params.inStock === "true";
  const sort = (params.sort as SortOption) || "popular";
  const search = params.search;
  const sale = params.sale === "true";
  const material = params.material;
  const color = params.color;
  const capacity = params.capacity;

  // Fetch filtered products and categories with fallback
  const [productsDTO, categoriesDTO, allProducts] = await Promise.all([
    getProducts({
      category,
      brand,
      model,
      minPrice: isNaN(minPrice!) ? undefined : minPrice,
      maxPrice: isNaN(maxPrice!) ? undefined : maxPrice,
      inStock: inStock || undefined,
      isSale: sale || undefined,
      sort,
      search,
      material,
      color,
      capacity,
    }),
    getCategories(),
    getProducts(), // all products for brand/model filter list
  ]);

  // Extract unique brands and phone models
  const brandsSet = new Set<string>();
  const modelsSet = new Set<string>();

  allProducts.forEach((p) => {
    if (p.brand) brandsSet.add(p.brand);
    p.compatibleModels?.forEach((m) => {
      if (m && m.length < 30) modelsSet.add(m);
    });
  });

  const uniqueBrands = Array.from(brandsSet).sort();
  const uniqueModels = Array.from(modelsSet).sort();

  return (
    <CatalogView
      initialProducts={productsDTO}
      categories={categoriesDTO}
      brands={uniqueBrands}
      models={uniqueModels}
      totalCount={productsDTO.length}
    />
  );
}

