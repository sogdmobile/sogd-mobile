// SOGD MOBILE V2 — Phone Brand & Model Discovery Data
// Used for brand → model navigation flow on homepage and catalog

export interface PhoneBrand {
  name: string;
  slug: string;
  /** Icon character or short label rendered on brand buttons */
  initial: string;
  models: string[];
}

export const PHONE_BRANDS: PhoneBrand[] = [
  {
    name: "Apple",
    slug: "Apple",
    initial: "",
    models: [
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16 Plus",
      "iPhone 16",
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15 Plus",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14",
      "iPhone 13",
      "iPhone 12",
      "iPhone SE (3rd gen)",
    ],
  },
  {
    name: "Samsung",
    slug: "Samsung",
    initial: "S",
    models: [
      "Galaxy S24 Ultra",
      "Galaxy S24+",
      "Galaxy S24",
      "Galaxy S23 Ultra",
      "Galaxy S23",
      "Galaxy A55",
      "Galaxy A35",
      "Galaxy A15",
      "Galaxy A25",
      "Galaxy Z Fold6",
      "Galaxy Z Flip6",
    ],
  },
  {
    name: "Xiaomi",
    slug: "Xiaomi",
    initial: "Mi",
    models: [
      "Xiaomi 14 Ultra",
      "Xiaomi 14",
      "Xiaomi 13",
      "Xiaomi 13T Pro",
      "Xiaomi 13T",
      "Xiaomi 12",
    ],
  },
  {
    name: "Redmi",
    slug: "Redmi",
    initial: "R",
    models: [
      "Redmi Note 13 Pro+",
      "Redmi Note 13 Pro",
      "Redmi Note 13",
      "Redmi Note 12",
      "Redmi 13C",
      "Redmi A3",
      "Redmi 13",
    ],
  },
  {
    name: "Honor",
    slug: "Honor",
    initial: "H",
    models: [
      "Honor 200 Pro",
      "Honor 200",
      "Honor 90 Pro",
      "Honor 90",
      "Honor Magic6 Pro",
      "Honor X9b",
      "Honor X8b",
    ],
  },
  {
    name: "Huawei",
    slug: "Huawei",
    initial: "Hw",
    models: [
      "Huawei Pura 70 Pro",
      "Huawei Pura 70",
      "Huawei P60 Pro",
      "Huawei Nova 12",
      "Huawei Nova 11",
      "Huawei Mate 60 Pro",
    ],
  },
  {
    name: "Tecno",
    slug: "Tecno",
    initial: "T",
    models: [
      "Tecno Camon 30 Pro",
      "Tecno Camon 30",
      "Tecno Spark 20 Pro",
      "Tecno Spark 20",
      "Tecno Phantom V Fold",
    ],
  },
  {
    name: "Infinix",
    slug: "Infinix",
    initial: "Ix",
    models: [
      "Infinix Note 40 Pro",
      "Infinix Note 40",
      "Infinix Hot 40 Pro",
      "Infinix Hot 40",
      "Infinix Smart 8",
    ],
  },
  {
    name: "Oppo",
    slug: "Oppo",
    initial: "O",
    models: [
      "Oppo Find X7 Ultra",
      "Oppo Find X7",
      "Oppo Reno12 Pro",
      "Oppo Reno12",
      "Oppo A60",
    ],
  },
  {
    name: "Vivo",
    slug: "Vivo",
    initial: "V",
    models: [
      "Vivo X100 Pro",
      "Vivo X100",
      "Vivo V30 Pro",
      "Vivo V30",
      "Vivo Y200",
    ],
  },
];

/** All unique model names (flattened, sorted) */
export const ALL_MODELS: string[] = [
  ...new Set(PHONE_BRANDS.flatMap((b) => b.models)),
].sort();

/** Get models for a given brand slug */
export function getModelsForBrand(brandSlug: string): string[] {
  return PHONE_BRANDS.find((b) => b.slug === brandSlug)?.models ?? [];
}
