import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to check admin authorization
function isAuthorized(req: NextRequest): boolean {
  const secretHeader = req.headers.get("x-admin-secret");
  const expectedSecret = process.env.ADMIN_SECRET_KEY || "sogd_secret_admin_2026";
  return secretHeader === expectedSecret;
}

// GET all orders
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// PATCH update order status
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId, status } = body;

    const validStatuses = [
      "NEW",
      "CONFIRMED",
      "PROCESSING",
      "DELIVERING",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = await db.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
