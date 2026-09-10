import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { INITIAL_PRODUCTS } from "@/data/initial-catalog";

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
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    if (products && products.length > 0) {
      return NextResponse.json({ success: true, products });
    }
    return NextResponse.json({ success: true, products: INITIAL_PRODUCTS });
  } catch (error) {
    console.warn("Error fetching admin products from DB, falling back to embedded catalog:", error);
    return NextResponse.json({ success: true, products: INITIAL_PRODUCTS });
  }
}

// POST create product
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const newProduct = await db.product.create({
      data: {
        name: data.name,
        slug: data.slug || `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`,
        description: data.description || "Оригинальный аксессуар SOGD MOBILE",
        price: parseFloat(data.price),
        oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
        categoryId: data.categoryId,
        brand: data.brand || "Apple",
        sku: data.sku || `SOGD-${Date.now().toString().slice(-6)}`,
        stock: parseInt(data.stock, 10) || 10,
        images: JSON.stringify(data.images || [
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
        ]),
        compatibleModels: JSON.stringify(data.compatibleModels || ["Все модели"]),
        isNew: Boolean(data.isNew),
        isPopular: Boolean(data.isPopular),
        isSale: Boolean(data.isSale),
        color: data.color || null,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// PATCH update product price/stock
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { productId, price, stock, isPopular, isNew, isSale } = body;

    const dataToUpdate: Record<string, unknown> = {};
    if (price !== undefined) dataToUpdate.price = parseFloat(price);
    if (stock !== undefined) dataToUpdate.stock = parseInt(stock, 10);
    if (isPopular !== undefined) dataToUpdate.isPopular = Boolean(isPopular);
    if (isNew !== undefined) dataToUpdate.isNew = Boolean(isNew);
    if (isSale !== undefined) dataToUpdate.isSale = Boolean(isSale);

    const updated = await db.product.update({
      where: { id: productId },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
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

    await db.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
