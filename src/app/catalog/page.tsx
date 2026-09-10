import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { CatalogView } from "@/components/catalog/catalog-view";
import { Prisma } from "@prisma/client";
import { ProductDTO, CategoryDTO, SortOption } from "@/types";

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
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const category = params.category;
  const brand = params.brand;
  const model = params.model;
  const minPrice = params.minPrice;
  const maxPrice = params.maxPrice;
  const inStock = params.inStock === "true";
  const sort = (params.sort as SortOption) || "popular";
  const search = params.search;
  const sale = params.sale === "true";

  // Build Prisma Where Clause
  const where: Prisma.ProductWhereInput = {};

  if (category) {
    where.category = { slug: category };
  }

  if (brand) {
    where.brand = { equals: brand };
  }

  if (inStock) {
    where.stock = { gt: 0 };
  }

  if (sale) {
    where.isSale = true;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice && !isNaN(parseFloat(minPrice))) {
      where.price.gte = parseFloat(minPrice);
    }
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      where.price.lte = parseFloat(maxPrice);
    }
  }

  if (search && search.trim()) {
    const q = search.trim();
    where.OR = [
      { name: { contains: q } },
      { brand: { contains: q } },
      { sku: { contains: q } },
      { compatibleModels: { contains: q } },
      { description: { contains: q } },
    ];
  }

  if (model && model.trim()) {
    where.compatibleModels = { contains: model.trim() };
  }

  // Sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "popular") {
    orderBy = { isPopular: "desc" };
  } else if (sort === "new") {
    orderBy = { isNew: "desc" };
  } else if (sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { price: "desc" };
  }

  // Execute database queries
  const [products, dbCategories, allProductsForFilters] = await Promise.all([
    db.product.findMany({
      where,
      orderBy,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    }),
    db.category.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    }),
    db.product.findMany({
      select: {
        brand: true,
        compatibleModels: true,
      },
    }),
  ]);

  // Extract unique brands and phone models
  const brandsSet = new Set<string>();
  const modelsSet = new Set<string>();

  allProductsForFilters.forEach((p) => {
    if (p.brand) brandsSet.add(p.brand);
    try {
      const models = JSON.parse(p.compatibleModels) as string[];
      models.forEach((m) => {
        if (m && m.length < 30) modelsSet.add(m);
      });
    } catch {
      // ignore
    }
  });

  const uniqueBrands = Array.from(brandsSet).sort();
  const uniqueModels = Array.from(modelsSet).sort();

  // Transform Category and Product DTOs
  const categoriesDTO: CategoryDTO[] = dbCategories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    productCount: c._count.products,
  }));

  const productsDTO: ProductDTO[] = products.map((p) => ({
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
    specifications: p.specifications
      ? (JSON.parse(p.specifications) as Record<string, string>)
      : null,
  }));

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
