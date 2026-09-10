export interface StoreConfig {
  name: string;
  tagline: string;
  description: string;
  city: string;
  country: string;
  address: string;
  pickupPoint: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  delivery: {
    inCityTime: string;
    inCityCost: number;
    freeDeliveryThreshold: number;
    regionsNote: string;
  };
  socials: {
    telegramUrl: string;
    whatsappUrl: string;
    instagramUrl: string;
  };
}

export const storeConfig: StoreConfig = {
  name: "SOGD MOBILE",
  tagline: "Современный магазин мобильных аксессуаров",
  description: "Оригинальные чехлы, бронестекла, скоростные зарядные устройства, кабели и умные гаджеты в Худжанде.",
  city: "Худжанд",
  country: "Таджикистан",
  address: "г. Худжанд, проспект Исмоила Сомони, 45 (ТЦ «Худжанд Плаза», 1 этаж)",
  pickupPoint: "г. Худжанд, пр. И. Сомони, 45 — ежедневно с 09:00 до 20:00",
  phone: "+992920000000",
  phoneFormatted: "+992 (92) 000-00-00",
  whatsapp: "+992920000000",
  telegram: "sogdmobile_support",
  instagram: "sogdmobile.tj",
  email: "info@sogdmobile.tj",
  workingHours: {
    weekdays: "Пн-Пт: 09:00 — 20:00",
    weekends: "Сб-Вс: 10:00 — 19:00",
  },
  delivery: {
    inCityTime: "Доставка по Худжанду за 1–3 часа",
    inCityCost: 15, // 15 сомони по городу
    freeDeliveryThreshold: 200, // Бесплатно от 200 сомони
    regionsNote: "Доставка в другие города Согдийской области (Истаравшан, Канибадам, Исфара, Б.Гафуров) курьерской службой за 24 часа.",
  },
  socials: {
    telegramUrl: "https://t.me/sogdmobile_support",
    whatsappUrl: "https://wa.me/992920000000",
    instagramUrl: "https://instagram.com/sogdmobile.tj",
  },
};
