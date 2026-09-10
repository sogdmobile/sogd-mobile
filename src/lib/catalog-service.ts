import { db } from "@/lib/db";
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
} from "@/data/initial-catalog";
import { getRuntimeProductsList } from "@/lib/store-state";
import { CategoryDTO, ProductDTO } from "@/types";

// Helper to convert DB product or fallback product to ProductDTO
export function formatProductDTO(p: any): ProductDTO {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice ?? null,
    currency: p.currency || "TJS",
    images: Array.isArray(p.images)
      ? p.images
      : typeof p.images === "string"
      ? JSON.parse(p.images)
      : [],
    categoryId: p.categoryId,
    category: p.category
      ? {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
          description: p.category.description ?? null,
          image: p.category.image ?? null,
        }
      : undefined,
    brand: p.brand,
    compatibleModels: Array.isArray(p.compatibleModels)
      ? p.compatibleModels
      : typeof p.compatibleModels === "string"
      ? JSON.parse(p.compatibleModels)
      : [],
    sku: p.sku,
    stock: p.stock ?? 10,
    isNew: Boolean(p.isNew),
    isPopular: Boolean(p.isPopular),
    isSale: Boolean(p.isSale),
    color: p.color ?? null,
    specifications:
      typeof p.specifications === "string"
        ? JSON.parse(p.specifications)
        : p.specifications ?? null,
  };
}

// 1. Get all categories with product counts
export async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const dbCategories = await db.category.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (dbCategories && dbCategories.length > 0) {
      return dbCategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
        productCount: c._count.products,
      }));
    }
  } catch (err) {
    console.warn("Database fetch failed for categories, falling back to embedded data:", err);
  }

  // Fallback to embedded categories
  const runtimeList = getRuntimeProductsList();
  return INITIAL_CATEGORIES.map((c) => {
    const count = runtimeList.filter((p) => p.categoryId === c.id || p.category?.slug === c.slug).length;
    return {
      ...c,
      productCount: count,
    };
  });
}

export interface ProductFilterOptions {
  category?: string;
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isSale?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  sort?: string;
  search?: string;
  take?: number;
  material?: string;
  color?: string;
  capacity?: string;
}

// 2. Get products with filters and search
export async function getProducts(options: ProductFilterOptions = {}): Promise<ProductDTO[]> {
  try {
    const where: any = {};

    if (options.category) {
      where.category = { slug: options.category };
    }
    if (options.brand) {
      where.brand = { equals: options.brand };
    }
    if (options.inStock) {
      where.stock = { gt: 0 };
    }
    if (options.isSale) {
      where.isSale = true;
    }
    if (options.isNew) {
      where.isNew = true;
    }
    if (options.isPopular) {
      where.isPopular = true;
    }
    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      where.price = {};
      if (options.minPrice !== undefined) where.price.gte = options.minPrice;
      if (options.maxPrice !== undefined) where.price.lte = options.maxPrice;
    }
    if (options.search && options.search.trim()) {
      const q = options.search.trim();
      where.OR = [
        { name: { contains: q } },
        { brand: { contains: q } },
        { sku: { contains: q } },
        { compatibleModels: { contains: q } },
        { description: { contains: q } },
      ];
    }
    if (options.model && options.model.trim()) {
      where.compatibleModels = { contains: options.model.trim() };
    }
    
    // SQLite JSON filtering is complex with Prisma stringified fields, 
    // we'll rely on in-memory fallback for these advanced filters if they are passed.
    const needInMemorySpecs = Boolean(options.material || options.capacity || options.color);
    
    if (!needInMemorySpecs) {
      let orderBy: any = { createdAt: "desc" };
      if (options.sort === "popular") orderBy = { isPopular: "desc" };
      else if (options.sort === "new") orderBy = { isNew: "desc" };
      else if (options.sort === "price_asc") orderBy = { price: "asc" };
      else if (options.sort === "price_desc") orderBy = { price: "desc" };

      const dbProducts = await db.product.findMany({
        where,
        orderBy,
        take: options.take,
        include: { category: true },
      });

      if (dbProducts && dbProducts.length > 0) {
        return dbProducts.map(formatProductDTO);
      }
    }
  } catch (err) {
    console.warn("Database fetch failed for products, using embedded fallback data:", err);
  }

  // Fallback: Filter runtime products in-memory
  let list = [...getRuntimeProductsList()];

  if (options.category) {
    list = list.filter((p) => p.category?.slug === options.category || p.categoryId === options.category);
  }
  if (options.brand) {
    list = list.filter((p) => p.brand.toLowerCase() === options.brand!.toLowerCase());
  }
  if (options.inStock) {
    list = list.filter((p) => p.stock > 0);
  }
  if (options.isSale) {
    list = list.filter((p) => p.isSale);
  }
  if (options.isNew) {
    list = list.filter((p) => p.isNew);
  }
  if (options.isPopular) {
    list = list.filter((p) => p.isPopular);
  }
  if (options.minPrice !== undefined) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }
  if (options.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }
  if (options.search && options.search.trim()) {
    const q = options.search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.compatibleModels.some((m) => m.toLowerCase().includes(q))
    );
  }
  if (options.model && options.model.trim()) {
    const m = options.model.trim().toLowerCase();
    list = list.filter((p) =>
      p.compatibleModels.some((mod) => mod.toLowerCase().includes(m))
    );
  }
  
  if (options.color) {
    const c = options.color.toLowerCase();
    list = list.filter((p) => p.color?.toLowerCase().includes(c));
  }
  
  if (options.material) {
    const m = options.material.toLowerCase();
    list = list.filter((p) => {
      const spec = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications;
      return spec && spec['Материал'] && spec['Материал'].toLowerCase().includes(m);
    });
  }
  
  if (options.capacity) {
    const c = options.capacity.toLowerCase();
    list = list.filter((p) => {
      const spec = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications;
      return spec && spec['Емкость'] && spec['Емкость'].toLowerCase().includes(c);
    });
  }

  // Sort
  if (options.sort === "popular") {
    list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  } else if (options.sort === "new") {
    list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else if (options.sort === "price_asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (options.sort === "price_desc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (options.take) {
    list = list.slice(0, options.take);
  }

  return list.map(formatProductDTO);
}

// 3. Get single product by slug
export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  try {
    const dbProduct = await db.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (dbProduct) {
      return formatProductDTO(dbProduct);
    }
  } catch (err) {
    console.warn("Database fetch failed for product slug, using fallback:", err);
  }

  const fallback = getRuntimeProductsList().find((p) => p.slug === slug);
  return fallback ? formatProductDTO(fallback) : null;
}

// 4. Get related products
export async function getRelatedProducts(categoryId: string, currentProductId: string, limit = 4): Promise<ProductDTO[]> {
  try {
    const dbProducts = await db.product.findMany({
      where: {
        categoryId,
        id: { not: currentProductId },
      },
      take: limit,
      include: { category: true },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map(formatProductDTO);
    }
  } catch (err) {
    console.warn("Database fetch failed for related products, using fallback:", err);
  }

  const fallback = getRuntimeProductsList().filter(
    (p) => (p.categoryId === categoryId || p.category?.id === categoryId) && p.id !== currentProductId
  ).slice(0, limit);

  return fallback.map(formatProductDTO);
}
