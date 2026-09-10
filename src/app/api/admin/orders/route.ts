import { NextRequest, NextResponse } from "next/server";
import { getStoreOrders, updateStoreOrderStatus } from "@/lib/store-state";

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
    const orders = await getStoreOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error in GET admin orders:", error);
    return NextResponse.json({ success: true, count: 0, orders: [] });
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
        { error: "Некорректный статус заказа" },
        { status: 400 }
      );
    }

    const updated = await updateStoreOrderStatus(orderId, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Не удалось обновить статус заказа" },
      { status: 500 }
    );
  }
}
