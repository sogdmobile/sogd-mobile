
"use client";

import React, { useState, useEffect } from "react";
import { formatPrice, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import {
  CheckCircle2, Lock, Search, Trash2, RefreshCw, Phone, Truck, MapPin, Save, Plus, X, MessageCircle, Package, AlertCircle, ExternalLink, ShieldAlert,
  Activity, ArrowUpRight, DollarSign, Smartphone, User, History
} from "lucide-react";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // State
  const [orders, setOrders] = useState<any[]>([]);
  const [tradeIns, setTradeIns] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Dialogs
  const [confirmOrderDialog, setConfirmOrderDialog] = useState<any>(null); // { type: 'confirm'|'cancel', order: obj }
  const [cancelReason, setCancelReason] = useState("");

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    const saved = localStorage.getItem("sogd_admin_key");
    if (saved === "sogd_secret_admin_2026") {
      setAdminKey(saved);
      setIsAuthenticated(true);
      fetchAll(saved);
    }
  }, []);

  const fetchAll = async (secret: string) => {
    setLoading(true);
    try {
      const headers = { "x-admin-secret": secret };
      const [resOrders, resProds, resTrade] = await Promise.all([
        fetch("/api/admin/orders", { headers }),
        fetch("/api/admin/products", { headers }),
        fetch("/api/admin/trade-ins", { headers })
      ]);
      const [dOrd, dProd, dTrade] = await Promise.all([
        resOrders.json(), resProds.json(), resTrade.json()
      ]);
      if (dOrd.success) setOrders(dOrd.orders || []);
      if (dProd.success) setProducts(dProd.products || []);
      if (dTrade.success) setTradeIns(dTrade.tradeIns || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (adminKey === "sogd_secret_admin_2026") {
      setIsAuthenticated(true);
      localStorage.setItem("sogd_admin_key", adminKey);
      fetchAll(adminKey);
      showNotification("Успешная авторизация в системе");
    } else {
      alert("Неверный ключ.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey("");
    localStorage.removeItem("sogd_admin_key");
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string, reason: string | null = null) => {
    const secret = adminKey;
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ orderId, status: newStatus, cancelReason: reason }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(prev => prev.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus, cancelReason: reason || o.cancelReason } : o)));
        showNotification(`Статус заказа обновлен: ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
    setConfirmOrderDialog(null);
    setCancelReason("");
  };

  const handleUpdateTradeInStatus = async (tradeId: string, newStatus: string) => {
    const secret = adminKey;
    try {
      const res = await fetch("/api/admin/trade-ins", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ id: tradeId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTradeIns(prev => prev.map(t => (t.id === tradeId ? { ...t, status: newStatus } : t)));
        showNotification(`Статус Trade-In обновлен: ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07090D] px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm glass-card p-8 space-y-6 text-center">
          <div className="w-16 h-16 bg-[#111318] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1c2030] shadow-[0_0_20px_-5px_var(--accent)]">
            <Lock className="w-6 h-6 text-[#f1f3f7]" />
          </div>
          <h1 className="text-2xl font-bold text-[#f1f3f7]">Admin Dashboard</h1>
          <Input
            type="password"
            placeholder="Секретный ключ..."
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="text-center bg-[#0d0f14]"
          />
          <Button type="submit" variant="primary" className="w-full">Войти</Button>
        </form>
      </div>
    );
  }

  // KPIs
  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);
  const ordersToday = orders.filter(o => new Date(o.createdAt) >= todayStart);
  const revenueToday = ordersToday.filter(o => o.status !== "CANCELLED").reduce((acc, o) => acc + o.total, 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const newTradeIns = tradeIns.filter(t => t.status === "NEW").length;

  return (
    <div className="min-h-screen bg-[#07090D] text-[#f1f3f7]">
      {notification && (
        <div className="fixed top-24 right-8 z-50 animate-in slide-in-from-right fade-in bg-[#111318] border border-[#16a34a]/30 text-[#f1f3f7] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
          <p className="text-sm font-semibold">{notification}</p>
        </div>
      )}

      {confirmOrderDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="glass-card w-full max-w-md p-6 space-y-5 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-white">
              {confirmOrderDialog.type === "confirm" ? "Подтвердить заказ" : "Отменить заказ"}
            </h3>
            <p className="text-sm text-[#8a95a8]">
              Заказ #{confirmOrderDialog.order.orderNumber} ({confirmOrderDialog.order.customerName})
            </p>
            {confirmOrderDialog.type === "cancel" && (
              <Input
                placeholder="Причина отмены..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            )}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setConfirmOrderDialog(null)}>Закрыть</Button>
              <Button
                variant={confirmOrderDialog.type === "confirm" ? "primary" : "outline"}
                className={confirmOrderDialog.type === "cancel" ? "border-red-500 text-red-500 hover:bg-red-500/10" : ""}
                onClick={() => handleUpdateOrderStatus(
                  confirmOrderDialog.order.id || confirmOrderDialog.order.orderNumber,
                  confirmOrderDialog.type === "confirm" ? "CONFIRMED" : "CANCELLED",
                  confirmOrderDialog.type === "cancel" ? cancelReason : null
                )}
              >
                {confirmOrderDialog.type === "confirm" ? "Подтвердить" : "Отменить"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#0B0F15]/80 backdrop-blur-xl border-b border-[#1c2030]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShieldAlert className="w-6 h-6 text-[var(--accent)]" />
            <h1 className="text-xl font-bold tracking-widest uppercase">SOGD Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => fetchAll(adminKey)} className="p-2 text-[#8a95a8] hover:text-white transition-colors" title="Обновить">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-[var(--accent)]' : ''}`} />
            </button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs">Выйти</Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1c2030]">
          {[
            { id: "dashboard", label: "Dashboard", icon: Activity },
            { id: "orders", label: "Заказы", icon: Package },
            { id: "trade-in", label: "Trade-In", icon: Smartphone },
            { id: "products", label: "Товары", icon: Package }
          ].map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${active ? "bg-[var(--accent)] text-[#0B0F15] shadow-[0_0_20px_-5px_var(--accent)]" : "text-[#8a95a8] hover:bg-[#111318]"}`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Package className="w-5 h-5"/></div>
                </div>
                <p className="text-[#8a95a8] text-sm font-semibold uppercase tracking-wider mb-1">Заказов сегодня</p>
                <h3 className="text-3xl font-black">{ordersToday.length}</h3>
              </div>
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500"><DollarSign className="w-5 h-5"/></div>
                </div>
                <p className="text-[#8a95a8] text-sm font-semibold uppercase tracking-wider mb-1">Выручка за сегодня</p>
                <h3 className="text-3xl font-black">{formatPrice(revenueToday)}</h3>
              </div>
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><Smartphone className="w-5 h-5"/></div>
                </div>
                <p className="text-[#8a95a8] text-sm font-semibold uppercase tracking-wider mb-1">Новых Trade-In</p>
                <h3 className="text-3xl font-black text-purple-400">{newTradeIns}</h3>
              </div>
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><AlertCircle className="w-5 h-5"/></div>
                </div>
                <p className="text-[#8a95a8] text-sm font-semibold uppercase tracking-wider mb-1">Мало на складе</p>
                <h3 className="text-3xl font-black text-orange-400">{lowStock} <span className="text-sm font-normal text-[#56627a]">товаров</span></h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Управление заказами</h2>
            <div className="space-y-4">
              {orders.length === 0 && <p className="text-[#8a95a8]">Заказов пока нет</p>}
              {orders.map(o => (
                <div key={o.id} className="glass-card p-6">
                  <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-black text-white">#{o.orderNumber}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${o.status==='NEW'?'bg-blue-500/20 text-blue-400':o.status==='CONFIRMED'?'bg-green-500/20 text-green-400':o.status==='CANCELLED'?'bg-red-500/20 text-red-400':'bg-[#1c2030] text-[#8a95a8]'}`}>
                          {o.status}
                        </span>
                        <span className="text-xs text-[#56627a]">{formatDate(o.createdAt)}</span>
                      </div>
                      <div className="text-sm text-[#8a95a8] space-y-1">
                        <p><strong className="text-[#f1f3f7]">{o.customerName}</strong> • {o.phone}</p>
                        {o.deliveryType === 'DELIVERY' ? (
                          <p><Truck className="inline w-3 h-3 mr-1"/> Доставка: {o.city}, {o.address}</p>
                        ) : (
                          <p><MapPin className="inline w-3 h-3 mr-1"/> Самовывоз</p>
                        )}
                        {o.comment && <p className="text-[var(--accent-cyan)] mt-2">Комментарий: {o.comment}</p>}
                        {o.cancelReason && <p className="text-red-400 mt-2">Причина отмены: {o.cancelReason}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[var(--accent)]">{formatPrice(o.total)}</p>
                      <p className="text-xs text-[#56627a]">{o.items?.length || 0} товаров</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#1c2030] flex gap-3">
                    {o.status === "NEW" && (
                      <>
                        <Button variant="primary" size="sm" onClick={() => setConfirmOrderDialog({type:'confirm', order: o})}>Подтвердить</Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10" onClick={() => setConfirmOrderDialog({type:'cancel', order: o})}>Отменить</Button>
                      </>
                    )}
                    {o.status === "CONFIRMED" && (
                      <Button variant="secondary" size="sm" onClick={() => handleUpdateOrderStatus(o.id || o.orderNumber, "COMPLETED")}>Завершить (Выдан)</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "trade-in" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Заявки Trade-In</h2>
            <div className="space-y-4">
              {tradeIns.length === 0 && <p className="text-[#8a95a8]">Заявок пока нет</p>}
              {tradeIns.map(t => (
                <div key={t.id} className="glass-card p-6">
                  <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-black text-white">{t.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${t.status==='NEW'?'bg-purple-500/20 text-purple-400':t.status==='REVIEWING'?'bg-blue-500/20 text-blue-400':t.status==='COMPLETED'?'bg-green-500/20 text-green-400':t.status==='CANCELLED'?'bg-red-500/20 text-red-400':'bg-[#1c2030] text-[#8a95a8]'}`}>
                          {t.status}
                        </span>
                        <span className="text-xs text-[#56627a]">{formatDate(t.createdAt)}</span>
                      </div>
                      <div className="text-sm text-[#8a95a8] space-y-1">
                        <p><strong className="text-[#f1f3f7]">{t.customerName}</strong> • {t.phone}</p>
                        <p className="mt-2 text-[#f1f3f7] font-semibold">{t.brand} {t.model} ({t.memory}) — {t.condition}</p>
                        <p>Батарея: {t.battery || "?"}% • Комплект: {t.accessories?.join(', ') || "Нет"}</p>
                        {t.description && <p className="mt-2 opacity-80">{t.description}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <select 
                        value={t.status}
                        onChange={(e) => handleUpdateTradeInStatus(t.id, e.target.value)}
                        className="bg-[#111318] border border-[#1c2030] rounded-xl px-3 py-2 text-sm text-[#f1f3f7] focus:outline-none focus:border-[var(--accent)]"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="VALUED">VALUED (Оценено)</option>
                        <option value="ACCEPTED">ACCEPTED (Клиент согласен)</option>
                        <option value="REJECTED">REJECTED (Клиент отказался)</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Каталог товаров</h2>
              <span className="text-[#8a95a8] text-sm">Всего: {products.length}</span>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 12).map(p => (
                <div key={p.id} className="glass-card p-4">
                  <p className="text-xs text-[var(--accent-cyan)] font-bold mb-1">{p.brand}</p>
                  <p className="font-bold text-sm text-[#f1f3f7] line-clamp-2 h-10 mb-2">{p.name}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-lg font-black text-[var(--accent)]">{formatPrice(p.price)}</p>
                      <p className="text-xs text-[#56627a]">Склад: {p.stock}</p>
                    </div>
                  </div>
                </div>
              ))}
             </div>
             <p className="text-center text-[#56627a] mt-4">Отображены первые 12 товаров для демо.</p>
          </div>
        )}

      </main>
    </div>
  );
}
