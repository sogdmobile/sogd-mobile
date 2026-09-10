"use client";

import React, { useState, useEffect } from "react";
import { formatPrice, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Lock,
  Search,
  Trash2,
  RefreshCw,
  Phone,
  Truck,
  MapPin,
} from "lucide-react";

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  messenger?: string | null;
  deliveryType: "DELIVERY" | "PICKUP";
  city?: string | null;
  address?: string | null;
  comment?: string | null;
  status: string;
  subtotal: number;
  deliveryCost: number;
  total: number;
  createdAt: string;
  items: Array<{
    id: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
}

interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  stock: number;
  brand: string;
  sku: string;
  isPopular: boolean;
  isNew: boolean;
  isSale: boolean;
  category: {
    name: string;
  };
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");

  // Orders state
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState("ALL");

  // Products state
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  // Notification / message
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Check saved key on mount
  useEffect(() => {
    const saved = localStorage.getItem("sogd_admin_key");
    if (saved === "sogd_secret_admin_2026") {
      setTimeout(() => {
        setAdminKey(saved);
        setIsAuthenticated(true);
      }, 0);
    }
  }, []);

  // Fetch orders
  const fetchOrders = async (key: string = adminKey) => {
    setOrdersLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-secret": key },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch products
  const fetchProducts = async (key: string = adminKey) => {
    setProductsLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        headers: { "x-admin-secret": key },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "sogd_secret_admin_2026") {
      setIsAuthenticated(true);
      localStorage.setItem("sogd_admin_key", adminKey);
      fetchOrders(adminKey);
      fetchProducts(adminKey);
      showNotification("Успешная авторизация в системе");
    } else {
      alert("Неверный ключ доступа администратора. Проверьте .env файл.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey("");
    localStorage.removeItem("sogd_admin_key");
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminKey,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        showNotification(`Статус заказа обновлен на ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Quick update product price or stock
  const handleUpdateProduct = async (
    productId: string,
    updates: { price?: number; stock?: number }
  ) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminKey,
        },
        body: JSON.stringify({ productId, ...updates }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
        );
        showNotification("Товар успешно обновлен");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Вы действительно хотите удалить этот товар из базы?")) return;

    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, {
        method: "DELETE",
        headers: { "x-admin-secret": adminKey },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        showNotification("Товар удален");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "ALL") return true;
    return o.status === orderFilter;
  });

  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl p-8 space-y-6 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Панель управления
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Вход для администратора магазина SOGD MOBILE
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <Input
              id="adminKey"
              type="password"
              label="Секретный ключ администратора"
              placeholder="Введите ключ доступа..."
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />
            <Button variant="primary" size="lg" className="w-full">
              Войти в панель
            </Button>
            <p className="text-[11px] text-slate-500 text-center">
              Ключ по умолчанию: <code className="text-[#00E5FF]">sogd_secret_admin_2026</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1a2030]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">
            Администрирование
          </span>
          <h1 className="text-3xl font-black text-white mt-0.5">
            SOGD MOBILE Admin
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              if (activeTab === "orders") fetchOrders();
              else fetchProducts();
            }}
            variant="secondary"
            size="sm"
            className="text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Обновить данные</span>
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-xs text-slate-400"
          >
            Выйти
          </Button>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0e121a] border border-[#1e2536] space-y-1">
          <span className="text-xs text-slate-400">Всего заказов</span>
          <p className="text-2xl font-black text-white">{orders.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0e121a] border border-[#1e2536] space-y-1">
          <span className="text-xs text-slate-400">Новых заказов</span>
          <p className="text-2xl font-black text-amber-400">
            {orders.filter((o) => o.status === "NEW").length}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0e121a] border border-[#1e2536] space-y-1">
          <span className="text-xs text-slate-400">Товаров в базе</span>
          <p className="text-2xl font-black text-[#00E5FF]">{products.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0e121a] border border-[#1e2536] space-y-1">
          <span className="text-xs text-slate-400">Общая выручка</span>
          <p className="text-2xl font-black text-white">{formatPrice(totalRevenue)}</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-[#232A3B]">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "orders"
              ? "border-[#0070F3] text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Заказы ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "products"
              ? "border-[#0070F3] text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Товары и остатки ({products.length})
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: "Все" },
              { id: "NEW", label: "Новые" },
              { id: "CONFIRMED", label: "Подтверждены" },
              { id: "PROCESSING", label: "В сборке" },
              { id: "DELIVERING", label: "В доставке" },
              { id: "COMPLETED", label: "Выполнены" },
              { id: "CANCELLED", label: "Отменены" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setOrderFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  orderFilter === f.id
                    ? "bg-[#0070F3] text-white"
                    : "bg-[#131722] text-slate-400 hover:text-white border border-[#232A3B]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Orders Table / Cards */}
          {ordersLoading ? (
            <div className="py-12 text-center text-slate-400">Загрузка заказов...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-[#0e121a] rounded-2xl border border-[#232A3B]">
              Заказов с таким статусом не найдено.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#0e121a] border border-[#1e2536] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#232A3B]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-black text-white bg-[#131722] px-3 py-1 rounded-lg border border-[#232A3B]">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Статус:</span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.id, e.target.value)
                        }
                        className="bg-[#131722] border border-[#232A3B] text-xs font-semibold rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#0070F3] cursor-pointer"
                      >
                        <option value="NEW">🟢 NEW (Новый)</option>
                        <option value="CONFIRMED">🔵 CONFIRMED (Подтвержден)</option>
                        <option value="PROCESSING">🟡 PROCESSING (В сборке)</option>
                        <option value="DELIVERING">🟣 DELIVERING (Доставляется)</option>
                        <option value="COMPLETED">✅ COMPLETED (Выполнен)</option>
                        <option value="CANCELLED">❌ CANCELLED (Отменен)</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer and Delivery details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                    <div>
                      <p className="text-slate-500">Клиент:</p>
                      <p className="font-bold text-white text-sm">
                        {order.customerName}
                      </p>
                      <a
                        href={`tel:${order.phone}`}
                        className="text-[#00E5FF] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" /> {order.phone}
                      </a>
                      {order.messenger && (
                        <p className="text-slate-400 mt-0.5">
                          Мессенджер: {order.messenger}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-slate-500">Получение:</p>
                      <p className="font-semibold text-white flex items-center gap-1">
                        {order.deliveryType === "DELIVERY" ? (
                          <>
                            <Truck className="w-3.5 h-3.5 text-[#0070F3]" />
                            <span>Курьер по Худжанду</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Самовывоз в магазине</span>
                          </>
                        )}
                      </p>
                      {order.address && (
                        <p className="text-slate-400 mt-0.5">
                          {order.city ? `${order.city}, ` : ""}
                          {order.address}
                        </p>
                      )}
                      {order.comment && (
                        <p className="text-amber-400 italic mt-0.5">
                          «{order.comment}»
                        </p>
                      )}
                    </div>

                    <div className="sm:text-right">
                      <p className="text-slate-500">Сумма заказа:</p>
                      <p className="text-xl font-black text-[#00E5FF]">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-slate-500">
                        Оплата: При получении
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="pt-3 border-t border-[#232A3B]/60 text-xs">
                    <span className="text-slate-500 font-medium mb-1.5 block">
                      Товары в заказе ({order.items.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <span
                          key={item.id}
                          className="bg-[#131722] border border-[#232A3B] px-2.5 py-1 rounded-lg text-slate-300"
                        >
                          {item.productName} × {item.quantity} шт. (
                          {formatPrice(item.subtotal)})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Поиск по названию, бренду, артикулу..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[#131722] border border-[#232A3B] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3]"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <span className="text-xs text-slate-400">
              Найдено: {filteredProducts.length} товаров
            </span>
          </div>

          {/* Products Table */}
          {productsLoading ? (
            <div className="p-8 text-center text-slate-400">Загрузка товаров...</div>
          ) : (
            <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#131722] text-slate-400 border-b border-[#232A3B] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Товар</th>
                  <th className="p-3.5">Категория</th>
                  <th className="p-3.5">Бренд</th>
                  <th className="p-3.5">Цена (TJS)</th>
                  <th className="p-3.5">Остаток</th>
                  <th className="p-3.5 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232A3B]/50">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div className="font-semibold text-white max-w-xs">
                        {p.name}
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">
                        {p.sku}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{p.category.name}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-[#131722] border border-[#232A3B] font-bold text-[10px] text-[#00E5FF]">
                        {p.brand}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <input
                        type="number"
                        defaultValue={p.price}
                        onBlur={(e) =>
                          handleUpdateProduct(p.id, {
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-20 bg-[#131722] border border-[#232A3B] rounded-lg px-2 py-1 text-xs text-white font-bold"
                      />
                    </td>
                    <td className="p-3.5">
                      <input
                        type="number"
                        defaultValue={p.stock}
                        onBlur={(e) =>
                          handleUpdateProduct(p.id, {
                            stock: parseInt(e.target.value, 10),
                          })
                        }
                        className={`w-16 bg-[#131722] border rounded-lg px-2 py-1 text-xs font-bold ${
                          p.stock > 0
                            ? "border-[#232A3B] text-emerald-400"
                            : "border-red-500/50 text-red-400"
                        }`}
                      />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Удалить товар"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}
    </div>
  );
}
