import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const sort = searchParams.get("sort") || "popular";
    const search = searchParams.get("search");

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = { slug: category };
    }

    if (brand) {
      where.brand = { equals: brand };
    }

    if (inStock === "true") {
      where.stock = { gt: 0 };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
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

    const products = await db.product.findMany({
      where,
      orderBy,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    const parsedProducts = products.map((p) => ({
      ...p,
      images: JSON.parse(p.images) as string[],
      compatibleModels: JSON.parse(p.compatibleModels) as string[],
      specifications: p.specifications
        ? (JSON.parse(p.specifications) as Record<string, string>)
        : null,
    }));

    return NextResponse.json({
      success: true,
      count: parsedProducts.length,
      products: parsedProducts,
    });
  } catch (error) {
    console.error("Error querying products:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка при получении товаров" },
      { status: 500 }
    );
  }
}
