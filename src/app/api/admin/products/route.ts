import { NextRequest, NextResponse } from "next/server";
import {
  getRuntimeProductsList,
  updateStoreProduct,
  createStoreProduct,
  deleteStoreProduct,
} from "@/lib/store-state";

function isAuthorized(req: NextRequest): boolean {
  const secretHeader = req.headers.get("x-admin-secret");
  const expectedSecret = process.env.ADMIN_SECRET_KEY || "sogd_secret_admin_2026";
  return secretHeader === expectedSecret;
}

// GET all products for admin
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = getRuntimeProductsList();
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("Error in GET admin products:", error);
    return NextResponse.json({ success: true, count: 0, products: [] });
  }
}

// POST create product
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.name || !data.price) {
      return NextResponse.json(
        { error: "Название и цена обязательны" },
        { status: 400 }
      );
    }

    const newProduct = await createStoreProduct(data);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Не удалось создать товар" },
      { status: 500 }
    );
  }
}

// PATCH update product price/stock/status
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { productId, price, stock, isPopular, isNew, isSale, name } = body;

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const updated = await updateStoreProduct(productId, {
      price,
      stock,
      isPopular,
      isNew,
      isSale,
      name,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении товара" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await deleteStoreProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
