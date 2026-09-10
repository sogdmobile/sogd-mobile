import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const model = searchParams.get("model") || undefined;
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const inStock = searchParams.get("inStock") === "true";
    const sort = searchParams.get("sort") || "popular";
    const search = searchParams.get("search") || undefined;

    const products = await getProducts({
      category,
      brand,
      model,
      minPrice: isNaN(minPrice!) ? undefined : minPrice,
      maxPrice: isNaN(maxPrice!) ? undefined : maxPrice,
      inStock: inStock || undefined,
      sort,
      search,
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error querying products:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка при получении товаров" },
      { status: 500 }
    );
  }
}
