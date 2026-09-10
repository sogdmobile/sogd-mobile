"use client";

import React, { useState, useEffect } from "react";
import { formatPrice, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import {
  CheckCircle2,
  Lock,
  Search,
  Trash2,
  RefreshCw,
  Phone,
  Truck,
  MapPin,
  Save,
  Plus,
  X,
  MessageCircle,
  Package,
  AlertCircle,
  ExternalLink,
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
    id?: string;
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
    slug?: string;
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

  // Add Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    categoryId: "cases",
    brand: "Apple",
    price: "",
    oldPrice: "",
    stock: "15",
    compatibleModels: "iPhone 15 Pro, iPhone 16 Pro",
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Notification / message
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Check saved key on mount and automatically fetch orders & products
  useEffect(() => {
    const saved = localStorage.getItem("sogd_admin_key");
    if (saved === "sogd_secret_admin_2026") {
      setAdminKey(saved);
      setIsAuthenticated(true);
      fetchOrders(saved);
      fetchProducts(saved);
    }
  }, []);

  // Fetch orders
  const fetchOrders = async (key: string = adminKey) => {
    const secret = key || adminKey || localStorage.getItem("sogd_admin_key") || "";
    if (!secret) return;

    setOrdersLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-secret": secret },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error("Error fetching orders:", e);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch products
  const fetchProducts = async (key: string = adminKey) => {
    const secret = key || adminKey || localStorage.getItem("sogd_admin_key") || "";
    if (!secret) return;

    setProductsLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        headers: { "x-admin-secret": secret },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleRefreshAll = async () => {
    const secret = adminKey || localStorage.getItem("sogd_admin_key") || "";
    await Promise.all([fetchOrders(secret), fetchProducts(secret)]);
    showNotification("Данные каталога и заказов обновлены");
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
      alert("Неверный ключ доступа администратора. Используйте: sogd_secret_admin_2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey("");
    localStorage.removeItem("sogd_admin_key");
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const secret = adminKey || localStorage.getItem("sogd_admin_key") || "";
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o))
        );
        showNotification(`Статус заказа обновлен на: ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Quick update product price, stock or toggles
  const handleUpdateProduct = async (
    productId: string,
    updates: { price?: number; stock?: number; isPopular?: boolean; isSale?: boolean }
  ) => {
    const secret = adminKey || localStorage.getItem("sogd_admin_key") || "";
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ productId, ...updates }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
        );
        showNotification("Товар успешно обновлен в базе");
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Create new product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.price) {
      alert("Укажите название и цену товара");
      return;
    }

    setIsAddingProduct(true);
    const secret = adminKey || localStorage.getItem("sogd_admin_key") || "";
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          name: newProductData.name,
          categoryId: newProductData.categoryId,
          brand: newProductData.brand,
          price: parseFloat(newProductData.price),
          oldPrice: newProductData.oldPrice ? parseFloat(newProductData.oldPrice) : null,
          stock: parseInt(newProductData.stock, 10) || 10,
          compatibleModels: newProductData.compatibleModels
            .split(",")
            .map((m) => m.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => [data.product, ...prev]);
        setIsAddModalOpen(false);
        setNewProductData({
          name: "",
          categoryId: "cases",
          brand: "Apple",
          price: "",
          oldPrice: "",
          stock: "15",
          compatibleModels: "iPhone 15 Pro, iPhone 16 Pro",
        });
        showNotification(`Товар «${data.product.name}» успешно добавлен!`);
      } else {
        alert(data.error || "Ошибка при создании товара");
      }
    } catch (err) {
      console.error(err);
      alert("Сетевая ошибка при создании товара");
    } finally {
      setIsAddingProduct(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Вы действительно хотите удалить товар «${productName}» из каталога?`)) return;

    const secret = adminKey || localStorage.getItem("sogd_admin_key") || "";
    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        showNotification("Товар успешно удален из каталога");
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
            <h1 className="text-2xl font-bold text-white">Панель управления</h1>
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
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1a2030]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">
            Администрирование
          </span>
          <h1 className="text-3xl font-black text-white mt-0.5">SOGD MOBILE Admin</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefreshAll}
            variant="secondary"
            size="sm"
            className="text-xs gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${ordersLoading || productsLoading ? "animate-spin text-[#00E5FF]" : ""}`} />
            <span>Обновить данные</span>
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-xs text-slate-400 cursor-pointer"
          >
            Выйти
          </Button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-3 shadow-lg shadow-emerald-500/10 transition-all">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
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
          <span className="text-xs text-slate-400">Товаров в каталоге</span>
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
          Каталог товаров ({products.length})
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {/* Order Status Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "Все заказы", val: "ALL" },
              { label: "🟢 Новые", val: "NEW" },
              { label: "🔵 Подтвержденные", val: "CONFIRMED" },
              { label: "🟡 В сборке", val: "PROCESSING" },
              { label: "🟣 В доставке", val: "DELIVERING" },
              { label: "✅ Выполненные", val: "COMPLETED" },
              { label: "❌ Отмененные", val: "CANCELLED" },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setOrderFilter(f.val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  orderFilter === f.val
                    ? "bg-[#0070F3] text-white shadow-md shadow-[#0070F3]/25"
                    : "bg-[#131722] text-slate-400 hover:text-white border border-[#232A3B]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {ordersLoading ? (
            <div className="p-12 text-center text-slate-400 bg-[#0e121a] rounded-3xl border border-[#1e2536]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00E5FF]" />
              <p className="text-xs">Загрузка заказов...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-[#0e121a] rounded-3xl border border-[#1e2536] space-y-2">
              <Package className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">Заказов пока нет</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Когда покупатели оформляют заказ на сайте, он мгновенно появляется здесь и дублируется в Telegram.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const cleanPhone = order.phone.replace(/\D/g, "");
                const waLink = cleanPhone.startsWith("992")
                  ? `https://wa.me/${cleanPhone}`
                  : `https://wa.me/992${cleanPhone}`;

                return (
                  <div
                    key={order.id}
                    className="bg-[#0e121a] border border-[#1e2536] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-slate-700 transition-all shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#232A3B]">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-base font-black text-white bg-[#131722] px-3 py-1 rounded-lg border border-[#232A3B]">
                          {order.orderNumber}
                        </span>
                        <CopyButton text={order.orderNumber} label="Копировать" />
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
                      <div className="space-y-1">
                        <p className="text-slate-500">Покупатель:</p>
                        <p className="font-bold text-white text-sm">
                          {order.customerName}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`tel:${order.phone}`}
                            className="text-[#00E5FF] hover:underline flex items-center gap-1 font-mono"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#0070F3]" />
                            <span>{order.phone}</span>
                          </a>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors text-[11px]"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                        {order.messenger && (
                          <p className="text-slate-400 text-[11px]">
                            Мессенджер: {order.messenger}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-500">Доставка:</p>
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
                          <p className="text-slate-400">
                            {order.city ? `${order.city}, ` : ""}
                            {order.address}
                          </p>
                        )}
                        {order.comment && (
                          <p className="text-amber-400/90 italic pt-1">
                            «{order.comment}»
                          </p>
                        )}
                      </div>

                      <div className="sm:text-right space-y-1">
                        <p className="text-slate-500">Сумма к получению:</p>
                        <p className="text-xl font-black text-[#00E5FF]">
                          {formatPrice(order.total)}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Оплата наличными / переводом курьеру
                        </p>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="pt-3 border-t border-[#232A3B]/60 text-xs">
                      <span className="text-slate-500 font-medium mb-1.5 block">
                        Товары в заказе ({order.items.length}):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-[#131722] border border-[#232A3B] px-2.5 py-1 rounded-lg text-slate-300"
                          >
                            {item.productName} × {item.quantity} шт. (
                            {formatPrice(item.subtotal)})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                className="w-full bg-[#131722] border border-[#232A3B] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070F3]"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-400">
                Найдено: {filteredProducts.length} товаров
              </span>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="primary"
                size="sm"
                className="text-xs gap-1.5 cursor-pointer shadow-lg shadow-[#0070F3]/25"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить товар</span>
              </Button>
            </div>
          </div>

          {/* Products Table */}
          {productsLoading ? (
            <div className="p-12 text-center text-slate-400 bg-[#0e121a] rounded-3xl border border-[#1e2536]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00E5FF]" />
              <p className="text-xs">Загрузка каталога...</p>
            </div>
          ) : (
            <div className="bg-[#0e121a] border border-[#1e2536] rounded-3xl overflow-hidden overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#131722] text-slate-400 border-b border-[#232A3B] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Товар</th>
                    <th className="p-3.5">Категория</th>
                    <th className="p-3.5">Бренд</th>
                    <th className="p-3.5">Цена (TJS)</th>
                    <th className="p-3.5">Остаток</th>
                    <th className="p-3.5">Статус</th>
                    <th className="p-3.5 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232A3B]/50">
                  {filteredProducts.map((p) => (
                    <ProductRow
                      key={p.id}
                      product={p}
                      onUpdate={handleUpdateProduct}
                      onDelete={() => handleDeleteProduct(p.id, p.name)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e121a] border border-[#232A3B] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#232A3B]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0070F3]/15 text-[#00E5FF] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">Добавить новый товар</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-left">
              <Input
                id="name"
                label="Название товара *"
                placeholder="Например: Чехол SOGD Armor MagSafe"
                value={newProductData.name}
                onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Категория *
                  </label>
                  <select
                    value={newProductData.categoryId}
                    onChange={(e) => setNewProductData({ ...newProductData, categoryId: e.target.value })}
                    className="w-full bg-[#131722] border border-[#232A3B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0070F3] cursor-pointer"
                  >
                    <option value="cases">Чехлы</option>
                    <option value="screen-protectors">Защитные стекла</option>
                    <option value="chargers">Зарядки</option>
                    <option value="cables">Кабели</option>
                    <option value="power-banks">Power Bank</option>
                    <option value="headphones">Наушники</option>
                    <option value="car-accessories">Автоаксессуары</option>
                    <option value="smart-watches">Smart Watch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Бренд *
                  </label>
                  <select
                    value={newProductData.brand}
                    onChange={(e) => setNewProductData({ ...newProductData, brand: e.target.value })}
                    className="w-full bg-[#131722] border border-[#232A3B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0070F3] cursor-pointer"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="SOGD">SOGD</option>
                    <option value="Baseus">Baseus</option>
                    <option value="Anker">Anker</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Input
                  id="price"
                  type="number"
                  label="Цена (TJS) *"
                  placeholder="120"
                  value={newProductData.price}
                  onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                  required
                />
                <Input
                  id="oldPrice"
                  type="number"
                  label="Старая цена"
                  placeholder="150"
                  value={newProductData.oldPrice}
                  onChange={(e) => setNewProductData({ ...newProductData, oldPrice: e.target.value })}
                />
                <Input
                  id="stock"
                  type="number"
                  label="Остаток (шт.)"
                  placeholder="15"
                  value={newProductData.stock}
                  onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
                />
              </div>

              <Input
                id="compatibleModels"
                label="Совместимые модели (через запятую)"
                placeholder="iPhone 16 Pro, iPhone 15 Pro, Galaxy S24"
                value={newProductData.compatibleModels}
                onChange={(e) => setNewProductData({ ...newProductData, compatibleModels: e.target.value })}
              />

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-xs cursor-pointer"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isAddingProduct}
                  className="text-xs cursor-pointer gap-1.5"
                >
                  {isAddingProduct ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>{isAddingProduct ? "Создание..." : "Создать товар"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProductRowProps {
  product: AdminProduct;
  onUpdate: (id: string, updates: { price?: number; stock?: number; isPopular?: boolean; isSale?: boolean }) => Promise<boolean>;
  onDelete: () => void;
}

function ProductRow({ product, onUpdate, onDelete }: ProductRowProps) {
  const [price, setPrice] = useState<string>(String(product.price));
  const [stock, setStock] = useState<string>(String(product.stock));
  const [isPopular, setIsPopular] = useState(product.isPopular);
  const [isSale, setIsSale] = useState(product.isSale);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const hasChanges =
    parseFloat(price) !== product.price ||
    parseInt(stock, 10) !== product.stock ||
    isPopular !== product.isPopular ||
    isSale !== product.isSale;

  const handleSave = async () => {
    const numPrice = parseFloat(price);
    const numStock = parseInt(stock, 10);
    if (isNaN(numPrice) || numPrice < 0) return;

    setSaving(true);
    const success = await onUpdate(product.id, {
      price: numPrice,
      stock: isNaN(numStock) ? 0 : numStock,
      isPopular,
      isSale,
    });
    setSaving(false);

    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="p-3.5">
        <div className="font-semibold text-white max-w-xs leading-tight">
          {product.name}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[10px] text-slate-500">
            {product.sku}
          </span>
          <a
            href={`/product/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-[#00E5FF] transition-colors"
            title="Открыть страницу товара"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </td>

      <td className="p-3.5 text-slate-400">{product.category?.name || "Чехлы"}</td>

      <td className="p-3.5">
        <span className="px-2 py-0.5 rounded bg-[#131722] border border-[#232A3B] font-bold text-[10px] text-[#00E5FF]">
          {product.brand}
        </span>
      </td>

      <td className="p-3.5">
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-20 bg-[#131722] border border-[#232A3B] focus:border-[#0070F3] rounded-lg px-2.5 py-1 text-xs text-white font-bold transition-colors"
          />
          <span className="text-[10px] text-slate-500 font-semibold">с.</span>
        </div>
      </td>

      <td className="p-3.5">
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-16 bg-[#131722] border rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
            parseInt(stock, 10) > 0
              ? "border-[#232A3B] text-emerald-400 focus:border-emerald-500"
              : "border-red-500/50 text-red-400 focus:border-red-500"
          }`}
        />
      </td>

      {/* Status Badges & Quick Toggles */}
      <td className="p-3.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              const next = !isPopular;
              setIsPopular(next);
              onUpdate(product.id, { isPopular: next });
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
              isPopular
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-[#131722] text-slate-500 border border-[#232A3B] opacity-50 hover:opacity-100"
            }`}
            title="Переключить статус 'Хит продаж'"
          >
            🔥 Хит
          </button>
          <button
            type="button"
            onClick={() => {
              const next = !isSale;
              setIsSale(next);
              onUpdate(product.id, { isSale: next });
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
              isSale
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-[#131722] text-slate-500 border border-[#232A3B] opacity-50 hover:opacity-100"
            }`}
            title="Переключить статус 'Акция'"
          >
            🏷 Акция
          </button>
        </div>
      </td>

      <td className="p-3.5 text-right">
        <div className="flex items-center justify-end gap-1.5">
          {savedSuccess ? (
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Сохранено!</span>
            </span>
          ) : hasChanges ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0070F3] hover:bg-[#005bb5] text-white rounded-lg text-xs font-bold shadow-md shadow-[#0070F3]/25 transition-all cursor-pointer active:scale-95"
              title="Сохранить изменения"
            >
              {saving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Сохранить</span>
            </button>
          ) : null}

          <button
            onClick={onDelete}
            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            title="Удалить товар"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
