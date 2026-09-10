// Automatically generated initial catalog data for bulletproof fallback
export interface InitialCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface InitialProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  currency: string;
  images: string[];
  categoryId: string;
  category: { id: string; name: string; slug: string };
  brand: string;
  compatibleModels: string[];
  sku: string;
  stock: number;
  isNew: boolean;
  isPopular: boolean;
  isSale: boolean;
  color?: string | null;
  specifications?: Record<string, string> | null;
  createdAt: string;
}

export const INITIAL_CATEGORIES: InitialCategory[] = [
  {
    "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "name": "Чехлы",
    "slug": "cases",
    "description": "Противоударные, силиконовые, кожаные и MagSafe чехлы для всех моделей",
    "image": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.480Z",
    "updatedAt": "2026-09-10T03:25:51.480Z"
  },
  {
    "id": "a71d12ce-6451-4479-a9c6-65a831f8b082",
    "name": "Защитные стекла",
    "slug": "screen-protectors",
    "description": "Ультрапрочные сапфировые стекла 9H с олеофобным покрытием и защитой от подглядывания",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.490Z",
    "updatedAt": "2026-09-10T03:25:51.490Z"
  },
  {
    "id": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
    "name": "Зарядки",
    "slug": "chargers",
    "description": "Сетевые адаптеры GaN, беспроводные станции и быстрые блоки питания до 120W",
    "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.497Z",
    "updatedAt": "2026-09-10T03:25:51.497Z"
  },
  {
    "id": "fb14a4ed-80db-48e2-a589-db94bd662a44",
    "name": "Кабели",
    "slug": "cables",
    "description": "Надежные нейлоновые кабели Type-C, Lightning, USB-C to C с поддержкой PD 100W",
    "image": "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.504Z",
    "updatedAt": "2026-09-10T03:25:51.504Z"
  },
  {
    "id": "7f288691-31ca-4ae2-8757-743d9fab3c72",
    "name": "Power Bank",
    "slug": "power-banks",
    "description": "Внешние аккумуляторы от 10000 до 30000 mAh с быстрой зарядкой и MagSafe",
    "image": "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.511Z",
    "updatedAt": "2026-09-10T03:25:51.511Z"
  },
  {
    "id": "e3250e8a-4a2a-4e83-acf1-2394329b0963",
    "name": "Наушники",
    "slug": "headphones",
    "description": "Беспроводные TWS наушники с активным шумоподавлением ANC и чистым басом",
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.520Z",
    "updatedAt": "2026-09-10T03:25:51.520Z"
  },
  {
    "id": "32c36b26-feb9-48b3-943a-b8dcd8568558",
    "name": "Автоаксессуары",
    "slug": "car-accessories",
    "description": "Магнитные держатели с беспроводной зарядкой, адаптеры в прикуриватель и FM-трансмиттеры",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.530Z",
    "updatedAt": "2026-09-10T03:25:51.530Z"
  },
  {
    "id": "da1edf61-06b9-4efb-ad29-3d9bb4095c1c",
    "name": "Smart Watch",
    "slug": "smart-watches",
    "description": "Умные часы, фитнес-браслеты, сменные ремешки и зарядные док-станции",
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.537Z",
    "updatedAt": "2026-09-10T03:25:51.537Z"
  },
  {
    "id": "3c085064-939a-4a30-9827-2cda09bc8c65",
    "name": "Другие аксессуары",
    "slug": "other",
    "description": "Стилусы, подставки для стола, переходники, чистящие наборы для гаджетов",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    "createdAt": "2026-09-10T03:25:51.544Z",
    "updatedAt": "2026-09-10T03:25:51.544Z"
  }
];

export const INITIAL_PRODUCTS: InitialProduct[] = [
  {
    "id": "3266ce75-6690-4819-99ab-e11bd61e023b",
    "slug": "case-sogd-armor-magsafe-iphone-15-pro",
    "name": "Чехол SOGD Armor MagSafe для iPhone 15 Pro",
    "description": "Премиальный матовый чехол с титановыми кнопками и усиленным магнитным кольцом MagSafe. Защита от падений по военному стандарту MIL-STD-810G.",
    "price": 120,
    "oldPrice": 150,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 15 Pro"
    ],
    "sku": "CASE-AP-15P-BLK",
    "stock": 15,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Space Black",
    "specifications": {
      "Материал": "Амортизирующий поликарбонат + ТПУ",
      "Совместимость": "MagSafe, беспроводная зарядка",
      "Бортики": "Выступающие бортики 1.2 мм для экрана и 1.5 мм для камер",
      "Вес": "34 г"
    },
    "createdAt": "2026-09-10T03:25:51.552Z"
  },
  {
    "id": "5478587b-b627-4076-a1d7-ab00b00b925d",
    "slug": "case-slim-matte-samsung-s24-ultra",
    "name": "Ультратонкий матовый чехол для Samsung Galaxy S24 Ultra",
    "description": "Минималистичный матовый чехол с soft-touch покрытием, не собирающим отпечатки пальцев. Идеальная подгонка под корпус и стилус S-Pen.",
    "price": 95,
    "oldPrice": 120,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Samsung",
    "compatibleModels": [
      "Samsung Galaxy S24 Ultra"
    ],
    "sku": "CASE-SAM-S24U-TIT",
    "stock": 20,
    "isNew": true,
    "isPopular": true,
    "isSale": false,
    "color": "Titanium Gray",
    "specifications": {
      "Толщина": "0.8 мм",
      "Покрытие": "Матовый Soft-touch",
      "Доступ": "Точный вырез под стилус S-Pen"
    },
    "createdAt": "2026-09-10T03:25:51.564Z"
  },
  {
    "id": "a238a905-d170-42df-8248-523812949117",
    "slug": "case-liquid-silicone-xiaomi-14",
    "name": "Силиконовый чехол Liquid Silicone для Xiaomi 14 / 14 Pro",
    "description": "Оригинальный жидкий силикон с внутренней бархатной подкладкой из микрофибры для деликатной защиты задней панели смартфона.",
    "price": 65,
    "oldPrice": 85,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Xiaomi",
    "compatibleModels": [
      "Xiaomi 14",
      "Xiaomi 14 Pro"
    ],
    "sku": "CASE-MI-14-BLU",
    "stock": 12,
    "isNew": false,
    "isPopular": true,
    "isSale": true,
    "color": "Midnight Blue",
    "specifications": {
      "Внутренний слой": "Микрофибра",
      "Внешний слой": "Пищевой силикон софт-тач",
      "Очистка": "Легко стирается влажной салфеткой"
    },
    "createdAt": "2026-09-10T03:25:51.572Z"
  },
  {
    "id": "2daa89a1-3f40-4e15-94bd-cf364d43ab78",
    "slug": "case-carbon-honor-magic-6-pro",
    "name": "Карбоновый чехол Carbon Fiber для Honor Magic 6 Pro",
    "description": "Сверхлегкий чехол с плетением из арамидного волокна 1500D. Максимальная прочность при весе всего 14 грамм.",
    "price": 160,
    "oldPrice": 190,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Honor",
    "compatibleModels": [
      "Honor Magic 6 Pro"
    ],
    "sku": "CASE-HON-M6P-CRB",
    "stock": 8,
    "isNew": true,
    "isPopular": false,
    "isSale": false,
    "color": "Carbon Black",
    "specifications": {
      "Материал": "100% Арамидное волокно",
      "Вес": "14 г",
      "Толщина": "0.65 мм"
    },
    "createdAt": "2026-09-10T03:25:51.580Z"
  },
  {
    "id": "6c6eb7de-4dfe-4ac6-a06e-c4242236148f",
    "slug": "case-clear-shockproof-redmi-note-13-pro-plus",
    "name": "Прозрачный противоударный чехол для Redmi Note 13 Pro+",
    "description": "Кристально прозрачный чехол с защитой от пожелтения Anti-Yellow и воздушными подушками Air-Cushion по углам.",
    "price": 50,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Redmi",
    "compatibleModels": [
      "Redmi Note 13 Pro+",
      "Redmi Note 13 Pro"
    ],
    "sku": "CASE-RED-N13P-CLR",
    "stock": 25,
    "isNew": false,
    "isPopular": true,
    "isSale": false,
    "color": "Crystal Clear",
    "specifications": {
      "Защита от УФ": "Покрытие против пожелтения 180 дней",
      "Угловые амортизаторы": "Air-Cushion 360"
    },
    "createdAt": "2026-09-10T03:25:51.589Z"
  },
  {
    "id": "4807b634-79f2-497f-827d-4d11dc1cb541",
    "slug": "case-sandstone-tecno-camon-30",
    "name": "Текстурный чехол Sandstone для Tecno Camon 30 Premier",
    "description": "Чехол с приятной шершавой текстурой песчаника, обеспечивающей цепкий хват в руке при любых условиях.",
    "price": 45,
    "oldPrice": 60,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Tecno",
    "compatibleModels": [
      "Tecno Camon 30 Premier",
      "Tecno Camon 30 Pro"
    ],
    "sku": "CASE-TEC-C30-GRY",
    "stock": 14,
    "isNew": false,
    "isPopular": false,
    "isSale": true,
    "color": "Dark Sand",
    "specifications": {
      "Текстура": "Песчаник Sandstone Grip",
      "Бренд": "Tecno"
    },
    "createdAt": "2026-09-10T03:25:51.600Z"
  },
  {
    "id": "22a970f9-00a4-4e47-83ee-8413d575d89c",
    "slug": "case-vintage-leather-huawei-mate-60-pro",
    "name": "Кожаный чехол Vintage Leather для Huawei Mate 60 Pro",
    "description": "Чехол из премиальной экокожи с металлической рамкой вокруг объективов и встроенной пластиной под магнитные держатели.",
    "price": 110,
    "oldPrice": 140,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
    "category": {
      "id": "b9dee3c8-8349-460d-8708-275c1cb6cc9a",
      "name": "Чехлы",
      "slug": "cases"
    },
    "brand": "Huawei",
    "compatibleModels": [
      "Huawei Mate 60 Pro"
    ],
    "sku": "CASE-HUA-M60-BRN",
    "stock": 9,
    "isNew": false,
    "isPopular": false,
    "isSale": false,
    "color": "Cognac Brown",
    "specifications": {
      "Материал": "Текстурированная эко-кожа",
      "Рамка камеры": "Анодированный алюминий"
    },
    "createdAt": "2026-09-10T03:25:51.609Z"
  },
  {
    "id": "33697de5-628a-49a3-bb23-6b13578c6773",
    "slug": "glass-sogd-diamond-iphone-15-pro-max",
    "name": "Защитное стекло SOGD Diamond Sapphire 9H для iPhone 15 Pro Max",
    "description": "Алюмосиликатное стекло двойной закалки с японским олеофобным покрытием Shin-Etsu. Не искажает цвета экрана и устойчиво к царапинам ключами и монетами.",
    "price": 70,
    "oldPrice": 90,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "a71d12ce-6451-4479-a9c6-65a831f8b082",
    "category": {
      "id": "a71d12ce-6451-4479-a9c6-65a831f8b082",
      "name": "Защитные стекла",
      "slug": "screen-protectors"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 15 Pro Max",
      "iPhone 15 Plus"
    ],
    "sku": "GLS-AP-15PM-9H",
    "stock": 40,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Full Cover Black Border",
    "specifications": {
      "Твердость": "9H Diamond Hardness",
      "Толщина": "0.33 мм",
      "Олеофобное покрытие": "Shin-Etsu (до 15 000 касаний)",
      "Рамка аппликатора": "В комплекте для легкой поклейки"
    },
    "createdAt": "2026-09-10T03:25:51.618Z"
  },
  {
    "id": "5fee1e7c-062d-4ec7-a929-56c274e7b235",
    "slug": "glass-anti-spy-iphone-14-15",
    "name": "Приватное защитное стекло Anti-Spy для iPhone 14 / 15",
    "description": "Стекло с эффектом антишпион: под углом более 28 градусов экран выглядит абсолютно черным. Защитите ваши переписки в транспорте.",
    "price": 85,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "a71d12ce-6451-4479-a9c6-65a831f8b082",
    "category": {
      "id": "a71d12ce-6451-4479-a9c6-65a831f8b082",
      "name": "Защитные стекла",
      "slug": "screen-protectors"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 15",
      "iPhone 14",
      "iPhone 13"
    ],
    "sku": "GLS-AP-SPY-15",
    "stock": 22,
    "isNew": false,
    "isPopular": true,
    "isSale": false,
    "color": "Privacy Tint",
    "specifications": {
      "Угол блокировки": "28 градусов с обеих сторон",
      "Прозрачность прямо": "92%",
      "Толщина": "0.3 мм"
    },
    "createdAt": "2026-09-10T03:25:51.627Z"
  },
  {
    "id": "d392deec-d764-43cf-b362-535df3dde6e0",
    "slug": "glass-uv-liquid-samsung-s24-ultra",
    "name": "Защитное УФ-стекло UV Liquid Glue для Samsung S24 Ultra",
    "description": "Стекло с жидким оптическим клеем и полимеризацией УФ-лампой. Идеально работает ультразвуковой подэкранный сканер отпечатка пальцев.",
    "price": 90,
    "oldPrice": 110,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "a71d12ce-6451-4479-a9c6-65a831f8b082",
    "category": {
      "id": "a71d12ce-6451-4479-a9c6-65a831f8b082",
      "name": "Защитные стекла",
      "slug": "screen-protectors"
    },
    "brand": "Samsung",
    "compatibleModels": [
      "Samsung Galaxy S24 Ultra",
      "Samsung Galaxy S23 Ultra"
    ],
    "sku": "GLS-SAM-S24U-UV",
    "stock": 18,
    "isNew": true,
    "isPopular": false,
    "isSale": false,
    "color": "Full Clear",
    "specifications": {
      "Тип клея": "Жидкий оптический UV Loca клей",
      "Сканер пальца": "100% отклик подэкранного сканера",
      "УФ-лампа": "В комплекте"
    },
    "createdAt": "2026-09-10T03:25:51.635Z"
  },
  {
    "id": "e3730189-42c8-4113-ae68-e15996a794b9",
    "slug": "glass-bundle-redmi-note-13",
    "name": "Комплект стекол на экран и блок камер для Xiaomi Redmi Note 13",
    "description": "Набор 2-в-1: полноразмерное защитное стекло на дисплей + защитное стекло с антибликовыми кольцами на объективы камер.",
    "price": 55,
    "oldPrice": 75,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "a71d12ce-6451-4479-a9c6-65a831f8b082",
    "category": {
      "id": "a71d12ce-6451-4479-a9c6-65a831f8b082",
      "name": "Защитные стекла",
      "slug": "screen-protectors"
    },
    "brand": "Redmi",
    "compatibleModels": [
      "Redmi Note 13 4G",
      "Redmi Note 13 5G"
    ],
    "sku": "GLS-RED-N13-2IN1",
    "stock": 35,
    "isNew": false,
    "isPopular": true,
    "isSale": true,
    "color": "Transparent",
    "specifications": {
      "Комплектация": "Стекло экрана + стекло модуля камер",
      "Клей": "Сплошной Full Glue по всей плоскости"
    },
    "createdAt": "2026-09-10T03:25:51.648Z"
  },
  {
    "id": "b9c3d066-d279-4179-a209-bcea5b4c0fff",
    "slug": "charger-sogd-gan-65w-triple-port",
    "name": "Сетевое зарядное устройство SOGD GaN Fast Charger 65W (2x Type-C + USB-A)",
    "description": "Компактная зарядка на основе нитрида галлия (GaN). Одновременно заряжает ноутбук, планшет и смартфон. Поддерживает протоколы PD 3.0, QC 4.0, PPS.",
    "price": 210,
    "oldPrice": 250,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
    "category": {
      "id": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
      "name": "Зарядки",
      "slug": "chargers"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 15 Pro",
      "iPhone 14",
      "Samsung S24",
      "MacBook Air",
      "iPad"
    ],
    "sku": "CHG-SOGD-65W-BLK",
    "stock": 25,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Graphite Black",
    "specifications": {
      "Мощность": "65W Max",
      "Порты": "Type-C1 (65W) + Type-C2 (65W) + USB-A (30W)",
      "Технология": "GaN III Pro (холодная работа без перегрева)",
      "Защита": "8 уровней безопасности (от КЗ, перегрузки, скачков)"
    },
    "createdAt": "2026-09-10T03:25:51.657Z"
  },
  {
    "id": "2437c330-0678-4548-8b09-cc1b8b912e69",
    "slug": "charger-adapter-30w-pd-usbc",
    "name": "Быстрый адаптер питания 30W USB-C Power Delivery",
    "description": "Идеальный блок для iPhone 15/14 и линейки Samsung Galaxy. Заряжает смартфон от 0 до 60% всего за 30 минут.",
    "price": 110,
    "oldPrice": 135,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
    "category": {
      "id": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
      "name": "Зарядки",
      "slug": "chargers"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 15",
      "iPhone 14",
      "iPhone 13",
      "iPad"
    ],
    "sku": "CHG-PD-30W-WHT",
    "stock": 45,
    "isNew": false,
    "isPopular": true,
    "isSale": false,
    "color": "Pure White",
    "specifications": {
      "Мощность": "30W",
      "Протоколы": "Power Delivery 3.0, QC 3.0",
      "Штекер": "Европейская вилка EU"
    },
    "createdAt": "2026-09-10T03:25:51.666Z"
  },
  {
    "id": "a3bb17f7-4d0c-40fe-acae-2e31400ac711",
    "slug": "charger-wireless-3in1-magsafe-foldable",
    "name": "Беспроводная зарядная станция 3-в-1 MagSafe Foldable",
    "description": "Складная премиальная станция для одновременной зарядки iPhone (15W), Apple Watch (5W) и AirPods (5W). Складывается в компактный кейс для путешествий.",
    "price": 290,
    "oldPrice": 340,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
    "category": {
      "id": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
      "name": "Зарядки",
      "slug": "chargers"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 12-15 Series",
      "Apple Watch",
      "AirPods"
    ],
    "sku": "CHG-WIR-3IN1-GRY",
    "stock": 14,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Space Gray",
    "specifications": {
      "Общая мощность": "25W",
      "Магнитное крепление": "N52 неодимовые магниты",
      "Корпус": "Алюминиевый сплав + закаленное стекло"
    },
    "createdAt": "2026-09-10T03:25:51.676Z"
  },
  {
    "id": "fb7144e1-946c-488d-8fac-3b8f0838154c",
    "slug": "charger-120w-hypercharge-xiaomi",
    "name": "Быстрое зарядное устройство 120W HyperCharge для Xiaomi",
    "description": "Оригинальная супербыстрая зарядка мощностью 120 Ватт. Полный заряд батареи 5000 mAh всего за 19 минут.",
    "price": 240,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
    "category": {
      "id": "dd5de906-421e-470e-bbdb-30b1c4f12a9b",
      "name": "Зарядки",
      "slug": "chargers"
    },
    "brand": "Xiaomi",
    "compatibleModels": [
      "Xiaomi 13T Pro",
      "Xiaomi 14",
      "Redmi Note 13 Pro+"
    ],
    "sku": "CHG-MI-120W-WHT",
    "stock": 16,
    "isNew": false,
    "isPopular": false,
    "isSale": false,
    "color": "White",
    "specifications": {
      "Мощность": "120W Turbo Charge",
      "Комплект": "Блок питания + кабель 6A Type-C"
    },
    "createdAt": "2026-09-10T03:25:51.686Z"
  },
  {
    "id": "1852cbf7-2b1b-4f6f-8805-bf9d94d18cbe",
    "slug": "cable-sogd-usbc-to-usbc-100w-display",
    "name": "Кабель SOGD Braided USB-C to USB-C 100W с дисплеем мощности (1.2м)",
    "description": "Флагманский кабель в плотной нейлоновой оплетке со встроенным цифровым LED-дисплеем, отображающим реальную мощность зарядки в Ваттах.",
    "price": 85,
    "oldPrice": 110,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fb14a4ed-80db-48e2-a589-db94bd662a44",
    "category": {
      "id": "fb14a4ed-80db-48e2-a589-db94bd662a44",
      "name": "Кабели",
      "slug": "cables"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 15 Series",
      "Samsung S24",
      "MacBook",
      "iPad Pro"
    ],
    "sku": "CBL-SOGD-100W-DISP",
    "stock": 30,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Black Titanium",
    "specifications": {
      "Мощность": "100W (20V / 5A) E-Marker Chip",
      "Скорость передачи данных": "480 Мбит/с",
      "Длина": "1.2 метра",
      "Оплетка": "Армированный нейлон 48 нитей"
    },
    "createdAt": "2026-09-10T03:25:51.702Z"
  },
  {
    "id": "676ff80b-eda7-4c64-a78b-0d3a301ede1c",
    "slug": "cable-typec-lightning-20w-silicone",
    "name": "Кабель Type-C to Lightning 20W PD в силиконовой оплетке (1м)",
    "description": "Невероятно мягкий силиконовый кабель, который никогда не путается. Идеален для быстрой зарядки iPhone от 8 до 14 Pro Max.",
    "price": 55,
    "oldPrice": 70,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fb14a4ed-80db-48e2-a589-db94bd662a44",
    "category": {
      "id": "fb14a4ed-80db-48e2-a589-db94bd662a44",
      "name": "Кабели",
      "slug": "cables"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 14",
      "iPhone 13",
      "iPhone 12",
      "iPhone 11",
      "iPad"
    ],
    "sku": "CBL-LGT-20W-SIL",
    "stock": 40,
    "isNew": false,
    "isPopular": true,
    "isSale": true,
    "color": "Sky Blue",
    "specifications": {
      "Стандарт": "Apple MFi certified chip",
      "Ресурс на изгиб": "Более 25 000 сгибаний",
      "Длина": "1 метр"
    },
    "createdAt": "2026-09-10T03:25:51.711Z"
  },
  {
    "id": "144ef9a0-3d0f-49bf-8c39-066c9265fa47",
    "slug": "cable-magnetic-3in1-rotatable",
    "name": "Магнитный кабель 3-в-1 с поворотным коннектором 540°",
    "description": "Универсальный кабель со сменными магнитными штекерами: Type-C, Lightning и Micro-USB. Поворотный механизм на 540 градусов удобен в играх.",
    "price": 60,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fb14a4ed-80db-48e2-a589-db94bd662a44",
    "category": {
      "id": "fb14a4ed-80db-48e2-a589-db94bd662a44",
      "name": "Кабели",
      "slug": "cables"
    },
    "brand": "Samsung",
    "compatibleModels": [
      "Все современные смартфоны и планшеты"
    ],
    "sku": "CBL-MAG-3IN1-540",
    "stock": 25,
    "isNew": false,
    "isPopular": false,
    "isSale": false,
    "color": "Red Metallic",
    "specifications": {
      "Коннекторы": "Type-C + Lightning + Micro-USB",
      "Подсветка": "Мягкий синий LED индикатор"
    },
    "createdAt": "2026-09-10T03:25:51.720Z"
  },
  {
    "id": "98ca466a-cfe2-4217-bf40-d1d057b317d4",
    "slug": "powerbank-sogd-magsafe-10000mah",
    "name": "Внешний аккумулятор SOGD MagSafe Power Bank 10000 mAh 20W PD",
    "description": "Тонкий алюминиевый повербанк с беспроводной зарядкой MagSafe и выдвижной ножкой-подставкой для просмотра видео во время подзарядки.",
    "price": 240,
    "oldPrice": 280,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "7f288691-31ca-4ae2-8757-743d9fab3c72",
    "category": {
      "id": "7f288691-31ca-4ae2-8757-743d9fab3c72",
      "name": "Power Bank",
      "slug": "power-banks"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 12/13/14/15",
      "Samsung S23/S24",
      "Любые смартфоны"
    ],
    "sku": "PB-SOGD-10K-MAG",
    "stock": 20,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Deep Space Black",
    "specifications": {
      "Емкость": "10 000 mAh (37 Wh)",
      "Беспроводная мощность": "15W MagSafe",
      "Проводная мощность": "20W Type-C Power Delivery",
      "Материал": "Авиационный алюминий"
    },
    "createdAt": "2026-09-10T03:25:51.730Z"
  },
  {
    "id": "41cfe165-edef-4b3e-a69f-9c881ee54def",
    "slug": "powerbank-baseus-blade-20000mah-65w",
    "name": "Повербанк Baseus Blade 20000 mAh 65W для ноутбуков и смартфонов",
    "description": "Ультратонкий корпус толщиной всего 18 мм. Мощности 65 Ватт достаточно для зарядки MacBook, iPad и любых флагманских телефонов.",
    "price": 430,
    "oldPrice": 490,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "7f288691-31ca-4ae2-8757-743d9fab3c72",
    "category": {
      "id": "7f288691-31ca-4ae2-8757-743d9fab3c72",
      "name": "Power Bank",
      "slug": "power-banks"
    },
    "brand": "Samsung",
    "compatibleModels": [
      "Ноутбуки Type-C",
      "iPhone 15",
      "Galaxy S24",
      "Xiaomi"
    ],
    "sku": "PB-BAS-20K-65W",
    "stock": 10,
    "isNew": false,
    "isPopular": true,
    "isSale": true,
    "color": "Black",
    "specifications": {
      "Емкость": "20 000 mAh",
      "Максимальная мощность": "65W двусторонняя",
      "Порты": "2x Type-C + 2x USB-A",
      "Дисплей": "LED экран статуса и времени зарядки"
    },
    "createdAt": "2026-09-10T03:25:51.739Z"
  },
  {
    "id": "117de0ce-b47b-4fa7-9c37-c1e5b6291ed2",
    "slug": "powerbank-mini-10000mah-integrated-cables",
    "name": "Компактный повербанк 10000 mAh 22.5W с встроенными кабелями",
    "description": "Не требует носить с собой провода: в корпус аккуратно встроены кабели Type-C и Lightning. Компактный размер помещается в любой карман.",
    "price": 150,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "7f288691-31ca-4ae2-8757-743d9fab3c72",
    "category": {
      "id": "7f288691-31ca-4ae2-8757-743d9fab3c72",
      "name": "Power Bank",
      "slug": "power-banks"
    },
    "brand": "Xiaomi",
    "compatibleModels": [
      "Все смартфоны iOS и Android"
    ],
    "sku": "PB-MINI-10K-CAB",
    "stock": 30,
    "isNew": false,
    "isPopular": true,
    "isSale": false,
    "color": "Frost White",
    "specifications": {
      "Встроенные кабели": "Type-C (22.5W) + Lightning (20W)",
      "Емкость": "10 000 mAh"
    },
    "createdAt": "2026-09-10T03:25:51.747Z"
  },
  {
    "id": "a3d2e44f-a0c1-4dfe-b0b3-9012e4a9bf30",
    "slug": "headphones-sogd-pro-wireless-anc",
    "name": "Беспроводные наушники SOGD Pro Wireless ANC (Bluetooth 5.3)",
    "description": "Флагманские TWS наушники с гибридным активным шумоподавлением до 45 дБ, прозрачным режимом и 11-мм титановыми драйверами с насыщенным басом.",
    "price": 320,
    "oldPrice": 380,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "e3250e8a-4a2a-4e83-acf1-2394329b0963",
    "category": {
      "id": "e3250e8a-4a2a-4e83-acf1-2394329b0963",
      "name": "Наушники",
      "slug": "headphones"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iOS",
      "Android",
      "Windows",
      "macOS"
    ],
    "sku": "AUD-SOGD-PRO-ANC",
    "stock": 18,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Matte Black",
    "specifications": {
      "Шумоподавление": "Active Noise Cancellation 45 dB",
      "Время работы": "До 8 часов (до 36 часов с кейсом)",
      "Зарядка кейса": "Type-C + Беспроводная Qi",
      "Кодеки": "AAC, SBC, LDAC Hi-Res Audio"
    },
    "createdAt": "2026-09-10T03:25:51.756Z"
  },
  {
    "id": "33804977-92c3-40a5-9728-9ceef0810ed3",
    "slug": "headphones-tws-low-latency-gaming",
    "name": "Наушники TWS с низкой задержкой для игр и музыки",
    "description": "Стильные геймерские наушники с киберпанк подсветкой кейса и сверхнизкой задержкой звука 40ms для идеальной синхронизации в играх.",
    "price": 180,
    "oldPrice": 220,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "e3250e8a-4a2a-4e83-acf1-2394329b0963",
    "category": {
      "id": "e3250e8a-4a2a-4e83-acf1-2394329b0963",
      "name": "Наушники",
      "slug": "headphones"
    },
    "brand": "Xiaomi",
    "compatibleModels": [
      "Все смартфоны с Bluetooth"
    ],
    "sku": "AUD-TWS-GAM-40MS",
    "stock": 22,
    "isNew": false,
    "isPopular": false,
    "isSale": true,
    "color": "Cyber Gray",
    "specifications": {
      "Задержка": "40 мс Game Mode",
      "Микрофоны": "4 микрофона с ENC шумоподавлением речи",
      "Влагозащита": "IPX5"
    },
    "createdAt": "2026-09-10T03:25:51.765Z"
  },
  {
    "id": "eb469bc8-9b7b-4ab5-b480-d062cc9d9dc5",
    "slug": "car-mount-sogd-magsafe-wireless-15w",
    "name": "Автомобильный держатель SOGD MagSafe с беспроводной зарядкой 15W",
    "description": "Премиальный автодержатель в дефлектор воздуховода с мощными магнитами N52. Надежно удерживает даже тяжелый смартфон на неровных дорогах.",
    "price": 195,
    "oldPrice": 230,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "32c36b26-feb9-48b3-943a-b8dcd8568558",
    "category": {
      "id": "32c36b26-feb9-48b3-943a-b8dcd8568558",
      "name": "Автоаксессуары",
      "slug": "car-accessories"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPhone 12/13/14/15",
      "Смартфоны с MagSafe-чехлом"
    ],
    "sku": "CAR-SOGD-MAG-15W",
    "stock": 25,
    "isNew": true,
    "isPopular": true,
    "isSale": false,
    "color": "Obsidian Black",
    "specifications": {
      "Крепление": "Усиленный крюк-зажим в решетку воздуховода",
      "Мощность зарядки": "15W Fast Wireless",
      "Шарнир": "Вращение на 360 градусов"
    },
    "createdAt": "2026-09-10T03:25:51.773Z"
  },
  {
    "id": "74c067f1-d278-4f67-a3fc-26ec7951d1c7",
    "slug": "car-charger-45w-metal-dual-port",
    "name": "Быстрое автомобильное ЗУ 45W Metal Dual Port (USB-C + QC 3.0)",
    "description": "Миниатюрный металлический адаптер в прикуриватель. Не выступает из гнезда, имеет мягкую кольцевую синюю подсветку.",
    "price": 75,
    "oldPrice": 95,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "32c36b26-feb9-48b3-943a-b8dcd8568558",
    "category": {
      "id": "32c36b26-feb9-48b3-943a-b8dcd8568558",
      "name": "Автоаксессуары",
      "slug": "car-accessories"
    },
    "brand": "Samsung",
    "compatibleModels": [
      "Все автомобили 12V-24V"
    ],
    "sku": "CAR-CHG-45W-ALU",
    "stock": 35,
    "isNew": false,
    "isPopular": true,
    "isSale": true,
    "color": "Gunmetal",
    "specifications": {
      "Входное напряжение": "12V - 24V (легковые и грузовые авто)",
      "Выходы": "Type-C 25W + USB-A 20W"
    },
    "createdAt": "2026-09-10T03:25:51.781Z"
  },
  {
    "id": "308a0f26-f0bf-4a02-9777-6d7dbd490c2c",
    "slug": "smartwatch-sogd-titan-ultra-amoled",
    "name": "Смарт-часы SOGD Titan Watch Ultra с AMOLED экраном 1.96\"",
    "description": "Умные часы в прочном корпусе из цинкового сплава. Яркий AMOLED дисплей с функцией Always-On, звонки по Bluetooth, мониторинг пульса, кислорода в крови и 100+ спорт-режимов.",
    "price": 490,
    "oldPrice": 580,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "da1edf61-06b9-4efb-ad29-3d9bb4095c1c",
    "category": {
      "id": "da1edf61-06b9-4efb-ad29-3d9bb4095c1c",
      "name": "Smart Watch",
      "slug": "smart-watches"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iOS 12+",
      "Android 8+"
    ],
    "sku": "WTC-SOGD-ULTRA-TIT",
    "stock": 12,
    "isNew": true,
    "isPopular": true,
    "isSale": true,
    "color": "Titanium Orange / Black",
    "specifications": {
      "Дисплей": "1.96 дюйма AMOLED 410x502 px",
      "Автономность": "До 10 дней активного использования",
      "Влагозащита": "IP68 / 3 ATM",
      "Датчики": "Пульс, SpO2, мониторинг сна, давления, шагомер"
    },
    "createdAt": "2026-09-10T03:25:51.789Z"
  },
  {
    "id": "57e99085-8c77-4e15-82ba-92a5e02766bb",
    "slug": "strap-milanese-loop-apple-watch",
    "name": "Миланский сетчатый браслет Milanese Loop для Apple Watch (42/44/45/49mm)",
    "description": "Элегантный ремешок из нержавеющей стали с плавной магнитной регулировкой длины. Идеально сидит на запястье любого размера.",
    "price": 110,
    "oldPrice": 140,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "da1edf61-06b9-4efb-ad29-3d9bb4095c1c",
    "category": {
      "id": "da1edf61-06b9-4efb-ad29-3d9bb4095c1c",
      "name": "Smart Watch",
      "slug": "smart-watches"
    },
    "brand": "Apple",
    "compatibleModels": [
      "Apple Watch 42/44/45/49mm",
      "Apple Watch Ultra"
    ],
    "sku": "STP-MIL-APW-BLK",
    "stock": 28,
    "isNew": false,
    "isPopular": true,
    "isSale": false,
    "color": "Space Black",
    "specifications": {
      "Материал": "Нержавеющая сталь 316L",
      "Застежка": "Мощный магнитный фиксатор"
    },
    "createdAt": "2026-09-10T03:25:51.796Z"
  },
  {
    "id": "a0027913-c8a2-4f14-8f18-6881409ca731",
    "slug": "cleaning-kit-gadgets-7in1",
    "name": "Профессиональный многофункциональный набор для чистки гаджетов 7-в-1",
    "description": "Компактный инструмент для очистки сеточек наушников AirPods, разъемов зарядки Type-C, экранов смартфонов и клавиатур ноутбуков.",
    "price": 45,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "3c085064-939a-4a30-9827-2cda09bc8c65",
    "category": {
      "id": "3c085064-939a-4a30-9827-2cda09bc8c65",
      "name": "Другие аксессуары",
      "slug": "other"
    },
    "brand": "Apple",
    "compatibleModels": [
      "Любые гаджеты, смартфоны, наушники"
    ],
    "sku": "ACC-CLN-7IN1",
    "stock": 50,
    "isNew": false,
    "isPopular": true,
    "isSale": false,
    "color": "White / Gray",
    "specifications": {
      "Инструменты": "Перо для очистки сеток, щетка высокой плотности, спрей, салфетка микрофибра"
    },
    "createdAt": "2026-09-10T03:25:51.804Z"
  },
  {
    "id": "397f00ac-fd10-49f1-8f30-c9bfd5bf67a7",
    "slug": "stand-aluminum-phone-tablet",
    "name": "Регулируемая алюминиевая подставка для телефона и планшета",
    "description": "Настольный держатель с двойным шарниром и силиконовыми накладками против скольжения. Складывается до плоского состояния.",
    "price": 80,
    "oldPrice": 100,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "3c085064-939a-4a30-9827-2cda09bc8c65",
    "category": {
      "id": "3c085064-939a-4a30-9827-2cda09bc8c65",
      "name": "Другие аксессуары",
      "slug": "other"
    },
    "brand": "Samsung",
    "compatibleModels": [
      "Все телефоны и планшеты от 4 до 12.9 дюймов"
    ],
    "sku": "ACC-STND-ALU-SLV",
    "stock": 22,
    "isNew": false,
    "isPopular": false,
    "isSale": true,
    "color": "Silver",
    "specifications": {
      "Материал": "Анодированный авиационный алюминий",
      "Регулировка": "Угол наклона до 270 градусов"
    },
    "createdAt": "2026-09-10T03:25:51.813Z"
  },
  {
    "id": "d5d81137-8c1d-44ac-bb25-8e65b4551489",
    "slug": "stylus-universal-smart-pen",
    "name": "Стилус Universal Smart Pen с распознаванием наклона",
    "description": "Высокоточный активный стилус для рисования и заметок на экранах iPad, Samsung Galaxy Tab и других емкостных сенсорных дисплеях.",
    "price": 145,
    "oldPrice": 180,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "3c085064-939a-4a30-9827-2cda09bc8c65",
    "category": {
      "id": "3c085064-939a-4a30-9827-2cda09bc8c65",
      "name": "Другие аксессуары",
      "slug": "other"
    },
    "brand": "Apple",
    "compatibleModels": [
      "iPad",
      "Samsung Galaxy Tab",
      "Xiaomi Pad"
    ],
    "sku": "ACC-STYL-UNIV-WHT",
    "stock": 15,
    "isNew": true,
    "isPopular": false,
    "isSale": false,
    "color": "White",
    "specifications": {
      "Наконечник": "Сменный износостойкий POM 1.5 мм",
      "Зарядка": "Быстрая зарядка Type-C за 30 мин",
      "Время работы": "До 12 часов непрерывного письма"
    },
    "createdAt": "2026-09-10T03:25:51.822Z"
  },
  {
    "id": "134352c1-5eba-4cd2-9cf3-a3e2be29f8df",
    "slug": "adapter-otg-typec-to-usb3",
    "name": "Оригинальный адаптер OTG Type-C на USB 3.0 High-Speed",
    "description": "Мини-переходник в алюминиевом корпусе для подключения флешек, мышек и клавиатур к смартфону с разъемом Type-C.",
    "price": 35,
    "oldPrice": null,
    "currency": "TJS",
    "images": [
      "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "3c085064-939a-4a30-9827-2cda09bc8c65",
    "category": {
      "id": "3c085064-939a-4a30-9827-2cda09bc8c65",
      "name": "Другие аксессуары",
      "slug": "other"
    },
    "brand": "Xiaomi",
    "compatibleModels": [
      "Все устройства с портом USB Type-C"
    ],
    "sku": "ACC-OTG-C2A-BLK",
    "stock": 60,
    "isNew": false,
    "isPopular": false,
    "isSale": false,
    "color": "Space Gray",
    "specifications": {
      "Скорость": "USB 3.0 до 5 Гбит/с",
      "Корпус": "Алюминиевый монолит"
    },
    "createdAt": "2026-09-10T03:25:51.830Z"
  }
];
