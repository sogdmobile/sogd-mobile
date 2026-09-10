"use server";

import { addStoreTradeIn } from "@/lib/store-state";

export async function submitTradeInRequest(formData: FormData) {
  const data = {
    id: `TR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    memory: formData.get("memory") as string,
    condition: formData.get("condition") as string,
    battery: formData.get("battery") as string,
    accessories: formData.getAll("accessories") as string[],
    description: formData.get("description") as string,
    customerName: formData.get("customerName") as string,
    phone: formData.get("phone") as string,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  await addStoreTradeIn(data);

  return { success: true, requestId: data.id };
}
