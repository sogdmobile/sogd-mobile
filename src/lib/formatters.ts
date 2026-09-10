/**
 * Единый форматтер валюты для всего проекта SOGD MOBILE.
 * Пример: formatPrice(89) => "89 сомони"
 * Пример: formatPrice(1250) => "1 250 сомони"
 */
export function formatPrice(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0 сомони";
  }

  // Округляем до сотых, если есть копейки, или выводим целое число
  const formatted = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s+/g, " ");

  return `${formatted} сомони`;
}

/**
 * Форматирование номера телефона для ссылки tel:+992...
 */
export function formatTelLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * Форматирование даты заказа
 */
export function formatDate(dateStringOrDate: string | Date): string {
  const date = new Date(dateStringOrDate);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
