/**
 * SOGD MOBILE — Telegram Order Notification Dispatcher
 * Sends instant rich notifications to store management when orders are placed.
 */

export interface OrderItemNotification {
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderNotificationPayload {
  orderNumber: string;
  customerName: string;
  phone: string;
  messenger?: string | null;
  deliveryType: "DELIVERY" | "PICKUP";
  city?: string | null;
  address?: string | null;
  comment?: string | null;
  items: OrderItemNotification[];
  subtotal: number;
  deliveryCost: number;
  total: number;
}

export async function sendOrderTelegramNotification(
  order: OrderNotificationPayload
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log(
      "[Telegram] Notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured."
    );
    return false;
  }

  try {
    const cleanPhone = order.phone.replace(/\D/g, "");
    const waLink = cleanPhone.startsWith("992")
      ? `https://wa.me/${cleanPhone}`
      : `https://wa.me/992${cleanPhone}`;

    const deliveryText =
      order.deliveryType === "DELIVERY"
        ? `🚚 <b>Курьерская доставка по Худжанду</b>\n📍 Адрес: <code>${order.city || "Худжанд"}, ${order.address || "Не указан"}</code>`
        : `🏬 <b>Самовывоз из магазина</b>\n📍 ТЦ «Худжанд Плаза», 1 этаж`;

    const itemsText = order.items
      .map(
        (item, index) =>
          `${index + 1}. <b>${escapeHtml(item.productName)}</b>\n   • ${item.quantity} шт. × ${item.price} с. = <b>${item.subtotal} сомони</b>`
      )
      .join("\n");

    const messageHtml = [
      `⚡ <b>НОВЫЙ ЗАКАЗ — SOGD MOBILE</b> ⚡`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🆔 <b>Номер заказа:</b> <code>#${order.orderNumber}</code>`,
      `👤 <b>Покупатель:</b> ${escapeHtml(order.customerName)}`,
      `📞 <b>Телефон:</b> <a href="tel:${order.phone}">${order.phone}</a>`,
      order.messenger ? `💬 <b>Мессенджер:</b> ${escapeHtml(order.messenger)}` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      deliveryText,
      order.comment ? `📝 <b>Комментарий:</b> <i>${escapeHtml(order.comment)}</i>` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Товары в заказе:</b>\n${itemsText}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      order.deliveryCost > 0
        ? `🚚 Доставка: ${order.deliveryCost} сомони`
        : `🚚 Доставка: Бесплатно`,
      `💰 <b>ИТОГО К ОПЛАТЕ: ${order.total} сомони</b>`,
      `💵 Оплата при получении`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👉 <a href="${waLink}">Написать клиенту в WhatsApp</a>`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageHtml,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[Telegram] Failed to send message (${response.status}):`, errText);
      return false;
    }

    console.log(`[Telegram] Successfully notified for order #${order.orderNumber}`);
    return true;
  } catch (error) {
    console.error("[Telegram] Error sending order notification:", error);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
