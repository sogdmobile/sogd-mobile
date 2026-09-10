import { NextResponse } from "next/server";
import { getStoreTradeIns, updateStoreTradeIn } from "@/lib/store-state";

const ADMIN_SECRET = "sogd_secret_admin_2026";

export async function GET(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const tradeIns = await getStoreTradeIns();
  return NextResponse.json({ success: true, tradeIns });
}

export async function PATCH(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  await updateStoreTradeIn(id, { status });
  return NextResponse.json({ success: true });
}
