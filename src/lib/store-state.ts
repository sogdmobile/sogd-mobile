import { db } from "@/lib/db";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "@/data/initial-catalog";
import { ProductDTO } from "@/types";

interface GlobalStore {
  runtimeProducts?: ProductDTO[];
  runtimeOrders?: any[];
  runtimeTradeIns?: any[];
}

const g = globalThis as unknown as GlobalStore;

if (!g.runtimeProducts || g.runtimeProducts.length === 0) {
  g.runtimeProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
}
if (!g.runtimeOrders) g.runtimeOrders = [];
if (!g.runtimeTradeIns) g.runtimeTradeIns = [];

export function getRuntimeProductsList(): ProductDTO[] {
  if (!g.runtimeProducts || g.runtimeProducts.length === 0) {
    g.runtimeProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  }
  return g.runtimeProducts!;
}

// 1. Update Product
export async function updateStoreProduct(
  id: string,
  updates: {
    price?: number;
    stock?: number;
    isPopular?: boolean;
    isNew?: boolean;
    isSale?: boolean;
    name?: string;
  }
) {
  let updatedInDb = null;
  try {
    const dataToUpdate: Record<string, unknown> = {};
    if (updates.price !== undefined) dataToUpdate.price = parseFloat(String(updates.price));
    if (updates.stock !== undefined) dataToUpdate.stock = parseInt(String(updates.stock), 10);
    if (updates.isPopular !== undefined) dataToUpdate.isPopular = Boolean(updates.isPopular);
    if (updates.isNew !== undefined) dataToUpdate.isNew = Boolean(updates.isNew);
    if (updates.isSale !== undefined) dataToUpdate.isSale = Boolean(updates.isSale);
    if (updates.name !== undefined) dataToUpdate.name = updates.name;

    updatedInDb = await db.product.update({
      where: { id },
      data: dataToUpdate,
      include: { category: true },
    });
  } catch (err) {
    console.warn("[StoreState] DB update skipped/failed, updating runtime memory store:", err);
  }

  const list = getRuntimeProductsList();
  const index = list.findIndex((p) => p.id === id);
  if (index !== -1) {
    list[index] = {
      ...list[index],
      ...updates,
      price: updates.price !== undefined ? parseFloat(String(updates.price)) : list[index].price,
      stock: updates.stock !== undefined ? parseInt(String(updates.stock), 10) : list[index].stock,
      isPopular: updates.isPopular !== undefined ? Boolean(updates.isPopular) : list[index].isPopular,
      isSale: updates.isSale !== undefined ? Boolean(updates.isSale) : list[index].isSale,
      isNew: updates.isNew !== undefined ? Boolean(updates.isNew) : list[index].isNew,
      name: updates.name !== undefined ? updates.name : list[index].name,
    };
    return list[index];
  }
  return updatedInDb || { id, ...updates };
}

// 2. Create Product
export async function createStoreProduct(data: any) {
  const id = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const slug = data.slug || `${(data.name || "accessory").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;

  let createdInDb = null;
  try {
    createdInDb = await db.product.create({
      data: {
        id,
        name: data.name,
        slug,
        description: data.description || "Оригинальный аксессуар SOGD MOBILE",
        price: parseFloat(data.price),
        oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
        categoryId: data.categoryId || "cases",
        brand: data.brand || "Apple",
        sku: data.sku || `SOGD-${Date.now().toString().slice(-6)}`,
        stock: parseInt(data.stock, 10) || 10,
        images: JSON.stringify(data.images || ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb"]),
        compatibleModels: JSON.stringify(data.compatibleModels || ["Все модели"]),
        isNew: Boolean(data.isNew),
        isPopular: Boolean(data.isPopular),
        isSale: Boolean(data.isSale),
        color: data.color || null,
      },
    });
  } catch (err) {
    console.warn("[StoreState] DB create skipped/failed, adding to runtime memory store:", err);
  }

  const category = INITIAL_CATEGORIES.find((c) => c.id === data.categoryId || c.slug === data.categoryId) || INITIAL_CATEGORIES[0];
  const newProductDTO: ProductDTO = {
    id: createdInDb?.id || id,
    slug,
    name: data.name,
    description: data.description || "Оригинальный аксессуар SOGD MOBILE",
    price: parseFloat(data.price),
    oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
    currency: "TJS",
    images: Array.isArray(data.images) ? data.images : ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb"],
    categoryId: category.id,
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
    },
    brand: data.brand || "Apple",
    compatibleModels: Array.isArray(data.compatibleModels) ? data.compatibleModels : ["Все модели"],
    sku: data.sku || `SOGD-${Date.now().toString().slice(-6)}`,
    stock: parseInt(data.stock, 10) || 10,
    isNew: Boolean(data.isNew),
    isPopular: Boolean(data.isPopular),
    isSale: Boolean(data.isSale),
    color: data.color || null,
    specifications: null,
  };

  const list = getRuntimeProductsList();
  list.unshift(newProductDTO);
  return newProductDTO;
}

// 3. Delete Product
export async function deleteStoreProduct(id: string) {
  try {
    await db.product.delete({ where: { id } });
  } catch (err) {
    console.warn("[StoreState] DB delete skipped/failed:", err);
  }
  if (g.runtimeProducts) {
    g.runtimeProducts = g.runtimeProducts.filter((p) => p.id !== id);
  }
  return true;
}

// 4. Get Orders
export async function getStoreOrders() {
  let dbOrders: any[] = [];
  try {
    dbOrders = await db.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: true } });
  } catch (err) {
    console.warn("[StoreState] DB orders fetch skipped/failed:", err);
  }
  const existingIds = new Set(dbOrders.map((o) => o.id));
  const merged = [...dbOrders];
  if (g.runtimeOrders) {
    for (const rOrder of g.runtimeOrders) {
      if (!existingIds.has(rOrder.id) && !existingIds.has(rOrder.orderNumber)) {
        merged.push(rOrder);
      }
    }
  }
  merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return merged;
}

// 5. Add Order
export function addStoreOrder(order: any) {
  if (!g.runtimeOrders) g.runtimeOrders = [];
  g.runtimeOrders.unshift({
    ...order,
    id: order.id || `ord_${Date.now()}`,
    createdAt: order.createdAt || new Date().toISOString(),
    statusHistory: [{ status: order.status || "NEW", date: new Date().toISOString(), reason: "Заказ создан" }],
  });
}

// 6. Update Order Status
export async function updateStoreOrderStatus(orderId: string, status: string, reason?: string) {
  let updatedInDb = null;
  try {
    updatedInDb = await db.order.update({ where: { id: orderId }, data: { status } });
  } catch (err) {
    console.warn("[StoreState] DB order update skipped/failed:", err);
  }
  if (g.runtimeOrders) {
    const ord = g.runtimeOrders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (ord) {
      ord.status = status;
      if (!ord.statusHistory) ord.statusHistory = [];
      ord.statusHistory.push({ status, date: new Date().toISOString(), reason: reason || "" });
      
      // Update stock if CANCELLED
      if (status === "CANCELLED" && ord.items) {
          const products = getRuntimeProductsList();
          ord.items.forEach((item: any) => {
              const p = products.find(prod => prod.id === item.productId);
              if (p) p.stock += item.quantity;
          });
      }
    }
  }
  return updatedInDb || { id: orderId, status };
}

// 7. Get Trade-In Requests
export function getStoreTradeIns() {
  if (!g.runtimeTradeIns) g.runtimeTradeIns = [];
  return [...g.runtimeTradeIns].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// 8. Add Trade-In Request
export function addStoreTradeIn(data: any) {
  if (!g.runtimeTradeIns) g.runtimeTradeIns = [];
  const req = {
    ...data,
    id: `trd_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    requestNumber: `TIN-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    status: "NEW",
    statusHistory: [{ status: "NEW", date: new Date().toISOString(), note: "Заявка создана" }],
  };
  g.runtimeTradeIns.unshift(req);
  return req;
}

// 9. Update Trade-In Request
export function updateStoreTradeIn(id: string, updates: any) {
  if (!g.runtimeTradeIns) return null;
  const index = g.runtimeTradeIns.findIndex(t => t.id === id);
  if (index !== -1) {
    const oldStatus = g.runtimeTradeIns[index].status;
    g.runtimeTradeIns[index] = { ...g.runtimeTradeIns[index], ...updates };
    
    if (updates.status && updates.status !== oldStatus) {
        if (!g.runtimeTradeIns[index].statusHistory) g.runtimeTradeIns[index].statusHistory = [];
        g.runtimeTradeIns[index].statusHistory.push({
            status: updates.status,
            date: new Date().toISOString(),
            note: updates.reason || ""
        });
    }
    return g.runtimeTradeIns[index];
  }
  return null;
}
