import { NextResponse } from "next/server";
import { getCategories } from "@/lib/catalog-service";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка при получении категорий" },
      { status: 500 }
    );
  }
}
