import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding SOGD MOBILE database...");

  // Clean old data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // 1. Categories
  const categories = [
    {
      name: "Чехлы",
      slug: "cases",
      description: "Противоударные, силиконовые, кожаные и MagSafe чехлы для всех моделей",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Защитные стекла",
      slug: "screen-protectors",
      description: "Ультрапрочные сапфировые стекла 9H с олеофобным покрытием и защитой от подглядывания",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Зарядки",
      slug: "chargers",
      description: "Сетевые адаптеры GaN, беспроводные станции и быстрые блоки питания до 120W",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Кабели",
      slug: "cables",
      description: "Надежные нейлоновые кабели Type-C, Lightning, USB-C to C с поддержкой PD 100W",
      image: "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Power Bank",
      slug: "power-banks",
      description: "Внешние аккумуляторы от 10000 до 30000 mAh с быстрой зарядкой и MagSafe",
      image: "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Наушники",
      slug: "headphones",
      description: "Беспроводные TWS наушники с активным шумоподавлением ANC и чистым басом",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Автоаксессуары",
      slug: "car-accessories",
      description: "Магнитные держатели с беспроводной зарядкой, адаптеры в прикуриватель и FM-трансмиттеры",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Smart Watch",
      slug: "smart-watches",
      description: "Умные часы, фитнес-браслеты, сменные ремешки и зарядные док-станции",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Другие аксессуары",
      slug: "other",
      description: "Стилусы, подставки для стола, переходники, чистящие наборы для гаджетов",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const record = await prisma.category.create({
      data: cat,
    });
    createdCategories[cat.slug] = record.id;
  }

  // 2. Demo Products (32 products across all brands & categories)
  const products = [
    // 1. Cases
    {
      name: "Чехол SOGD Armor MagSafe для iPhone 15 Pro",
      slug: "case-sogd-armor-magsafe-iphone-15-pro",
      description: "Премиальный матовый чехол с титановыми кнопками и усиленным магнитным кольцом MagSafe. Защита от падений по военному стандарту MIL-STD-810G.",
      price: 120,
      oldPrice: 150,
      categoryId: createdCategories["cases"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 15 Pro"]),
      sku: "CASE-AP-15P-BLK",
      stock: 15,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Space Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Материал": "Амортизирующий поликарбонат + ТПУ",
        "Совместимость": "MagSafe, беспроводная зарядка",
        "Бортики": "Выступающие бортики 1.2 мм для экрана и 1.5 мм для камер",
        "Вес": "34 г"
      }),
    },
    {
      name: "Ультратонкий матовый чехол для Samsung Galaxy S24 Ultra",
      slug: "case-slim-matte-samsung-s24-ultra",
      description: "Минималистичный матовый чехол с soft-touch покрытием, не собирающим отпечатки пальцев. Идеальная подгонка под корпус и стилус S-Pen.",
      price: 95,
      oldPrice: 120,
      categoryId: createdCategories["cases"],
      brand: "Samsung",
      compatibleModels: JSON.stringify(["Samsung Galaxy S24 Ultra"]),
      sku: "CASE-SAM-S24U-TIT",
      stock: 20,
      isNew: true,
      isPopular: true,
      isSale: false,
      color: "Titanium Gray",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Толщина": "0.8 мм",
        "Покрытие": "Матовый Soft-touch",
        "Доступ": "Точный вырез под стилус S-Pen"
      }),
    },
    {
      name: "Силиконовый чехол Liquid Silicone для Xiaomi 14 / 14 Pro",
      slug: "case-liquid-silicone-xiaomi-14",
      description: "Оригинальный жидкий силикон с внутренней бархатной подкладкой из микрофибры для деликатной защиты задней панели смартфона.",
      price: 65,
      oldPrice: 85,
      categoryId: createdCategories["cases"],
      brand: "Xiaomi",
      compatibleModels: JSON.stringify(["Xiaomi 14", "Xiaomi 14 Pro"]),
      sku: "CASE-MI-14-BLU",
      stock: 12,
      isNew: false,
      isPopular: true,
      isSale: true,
      color: "Midnight Blue",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Внутренний слой": "Микрофибра",
        "Внешний слой": "Пищевой силикон софт-тач",
        "Очистка": "Легко стирается влажной салфеткой"
      }),
    },
    {
      name: "Карбоновый чехол Carbon Fiber для Honor Magic 6 Pro",
      slug: "case-carbon-honor-magic-6-pro",
      description: "Сверхлегкий чехол с плетением из арамидного волокна 1500D. Максимальная прочность при весе всего 14 грамм.",
      price: 160,
      oldPrice: 190,
      categoryId: createdCategories["cases"],
      brand: "Honor",
      compatibleModels: JSON.stringify(["Honor Magic 6 Pro"]),
      sku: "CASE-HON-M6P-CRB",
      stock: 8,
      isNew: true,
      isPopular: false,
      isSale: false,
      color: "Carbon Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Материал": "100% Арамидное волокно",
        "Вес": "14 г",
        "Толщина": "0.65 мм"
      }),
    },
    {
      name: "Прозрачный противоударный чехол для Redmi Note 13 Pro+",
      slug: "case-clear-shockproof-redmi-note-13-pro-plus",
      description: "Кристально прозрачный чехол с защитой от пожелтения Anti-Yellow и воздушными подушками Air-Cushion по углам.",
      price: 50,
      oldPrice: null,
      categoryId: createdCategories["cases"],
      brand: "Redmi",
      compatibleModels: JSON.stringify(["Redmi Note 13 Pro+", "Redmi Note 13 Pro"]),
      sku: "CASE-RED-N13P-CLR",
      stock: 25,
      isNew: false,
      isPopular: true,
      isSale: false,
      color: "Crystal Clear",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Защита от УФ": "Покрытие против пожелтения 180 дней",
        "Угловые амортизаторы": "Air-Cushion 360"
      }),
    },
    {
      name: "Текстурный чехол Sandstone для Tecno Camon 30 Premier",
      slug: "case-sandstone-tecno-camon-30",
      description: "Чехол с приятной шершавой текстурой песчаника, обеспечивающей цепкий хват в руке при любых условиях.",
      price: 45,
      oldPrice: 60,
      categoryId: createdCategories["cases"],
      brand: "Tecno",
      compatibleModels: JSON.stringify(["Tecno Camon 30 Premier", "Tecno Camon 30 Pro"]),
      sku: "CASE-TEC-C30-GRY",
      stock: 14,
      isNew: false,
      isPopular: false,
      isSale: true,
      color: "Dark Sand",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Текстура": "Песчаник Sandstone Grip",
        "Бренд": "Tecno"
      }),
    },
    {
      name: "Кожаный чехол Vintage Leather для Huawei Mate 60 Pro",
      slug: "case-vintage-leather-huawei-mate-60-pro",
      description: "Чехол из премиальной экокожи с металлической рамкой вокруг объективов и встроенной пластиной под магнитные держатели.",
      price: 110,
      oldPrice: 140,
      categoryId: createdCategories["cases"],
      brand: "Huawei",
      compatibleModels: JSON.stringify(["Huawei Mate 60 Pro"]),
      sku: "CASE-HUA-M60-BRN",
      stock: 9,
      isNew: false,
      isPopular: false,
      isSale: false,
      color: "Cognac Brown",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Материал": "Текстурированная эко-кожа",
        "Рамка камеры": "Анодированный алюминий"
      }),
    },

    // 2. Screen Protectors
    {
      name: "Защитное стекло SOGD Diamond Sapphire 9H для iPhone 15 Pro Max",
      slug: "glass-sogd-diamond-iphone-15-pro-max",
      description: "Алюмосиликатное стекло двойной закалки с японским олеофобным покрытием Shin-Etsu. Не искажает цвета экрана и устойчиво к царапинам ключами и монетами.",
      price: 70,
      oldPrice: 90,
      categoryId: createdCategories["screen-protectors"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 15 Pro Max", "iPhone 15 Plus"]),
      sku: "GLS-AP-15PM-9H",
      stock: 40,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Full Cover Black Border",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Твердость": "9H Diamond Hardness",
        "Толщина": "0.33 мм",
        "Олеофобное покрытие": "Shin-Etsu (до 15 000 касаний)",
        "Рамка аппликатора": "В комплекте для легкой поклейки"
      }),
    },
    {
      name: "Приватное защитное стекло Anti-Spy для iPhone 14 / 15",
      slug: "glass-anti-spy-iphone-14-15",
      description: "Стекло с эффектом антишпион: под углом более 28 градусов экран выглядит абсолютно черным. Защитите ваши переписки в транспорте.",
      price: 85,
      oldPrice: null,
      categoryId: createdCategories["screen-protectors"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 15", "iPhone 14", "iPhone 13"]),
      sku: "GLS-AP-SPY-15",
      stock: 22,
      isNew: false,
      isPopular: true,
      isSale: false,
      color: "Privacy Tint",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Угол блокировки": "28 градусов с обеих сторон",
        "Прозрачность прямо": "92%",
        "Толщина": "0.3 мм"
      }),
    },
    {
      name: "Защитное УФ-стекло UV Liquid Glue для Samsung S24 Ultra",
      slug: "glass-uv-liquid-samsung-s24-ultra",
      description: "Стекло с жидким оптическим клеем и полимеризацией УФ-лампой. Идеально работает ультразвуковой подэкранный сканер отпечатка пальцев.",
      price: 90,
      oldPrice: 110,
      categoryId: createdCategories["screen-protectors"],
      brand: "Samsung",
      compatibleModels: JSON.stringify(["Samsung Galaxy S24 Ultra", "Samsung Galaxy S23 Ultra"]),
      sku: "GLS-SAM-S24U-UV",
      stock: 18,
      isNew: true,
      isPopular: false,
      isSale: false,
      color: "Full Clear",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Тип клея": "Жидкий оптический UV Loca клей",
        "Сканер пальца": "100% отклик подэкранного сканера",
        "УФ-лампа": "В комплекте"
      }),
    },
    {
      name: "Комплект стекол на экран и блок камер для Xiaomi Redmi Note 13",
      slug: "glass-bundle-redmi-note-13",
      description: "Набор 2-в-1: полноразмерное защитное стекло на дисплей + защитное стекло с антибликовыми кольцами на объективы камер.",
      price: 55,
      oldPrice: 75,
      categoryId: createdCategories["screen-protectors"],
      brand: "Redmi",
      compatibleModels: JSON.stringify(["Redmi Note 13 4G", "Redmi Note 13 5G"]),
      sku: "GLS-RED-N13-2IN1",
      stock: 35,
      isNew: false,
      isPopular: true,
      isSale: true,
      color: "Transparent",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Комплектация": "Стекло экрана + стекло модуля камер",
        "Клей": "Сплошной Full Glue по всей плоскости"
      }),
    },

    // 3. Chargers
    {
      name: "Сетевое зарядное устройство SOGD GaN Fast Charger 65W (2x Type-C + USB-A)",
      slug: "charger-sogd-gan-65w-triple-port",
      description: "Компактная зарядка на основе нитрида галлия (GaN). Одновременно заряжает ноутбук, планшет и смартфон. Поддерживает протоколы PD 3.0, QC 4.0, PPS.",
      price: 210,
      oldPrice: 250,
      categoryId: createdCategories["chargers"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 15 Pro", "iPhone 14", "Samsung S24", "MacBook Air", "iPad"]),
      sku: "CHG-SOGD-65W-BLK",
      stock: 25,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Graphite Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Мощность": "65W Max",
        "Порты": "Type-C1 (65W) + Type-C2 (65W) + USB-A (30W)",
        "Технология": "GaN III Pro (холодная работа без перегрева)",
        "Защита": "8 уровней безопасности (от КЗ, перегрузки, скачков)"
      }),
    },
    {
      name: "Быстрый адаптер питания 30W USB-C Power Delivery",
      slug: "charger-adapter-30w-pd-usbc",
      description: "Идеальный блок для iPhone 15/14 и линейки Samsung Galaxy. Заряжает смартфон от 0 до 60% всего за 30 минут.",
      price: 110,
      oldPrice: 135,
      categoryId: createdCategories["chargers"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 15", "iPhone 14", "iPhone 13", "iPad"]),
      sku: "CHG-PD-30W-WHT",
      stock: 45,
      isNew: false,
      isPopular: true,
      isSale: false,
      color: "Pure White",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Мощность": "30W",
        "Протоколы": "Power Delivery 3.0, QC 3.0",
        "Штекер": "Европейская вилка EU"
      }),
    },
    {
      name: "Беспроводная зарядная станция 3-в-1 MagSafe Foldable",
      slug: "charger-wireless-3in1-magsafe-foldable",
      description: "Складная премиальная станция для одновременной зарядки iPhone (15W), Apple Watch (5W) и AirPods (5W). Складывается в компактный кейс для путешествий.",
      price: 290,
      oldPrice: 340,
      categoryId: createdCategories["chargers"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 12-15 Series", "Apple Watch", "AirPods"]),
      sku: "CHG-WIR-3IN1-GRY",
      stock: 14,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Space Gray",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Общая мощность": "25W",
        "Магнитное крепление": "N52 неодимовые магниты",
        "Корпус": "Алюминиевый сплав + закаленное стекло"
      }),
    },
    {
      name: "Быстрое зарядное устройство 120W HyperCharge для Xiaomi",
      slug: "charger-120w-hypercharge-xiaomi",
      description: "Оригинальная супербыстрая зарядка мощностью 120 Ватт. Полный заряд батареи 5000 mAh всего за 19 минут.",
      price: 240,
      oldPrice: null,
      categoryId: createdCategories["chargers"],
      brand: "Xiaomi",
      compatibleModels: JSON.stringify(["Xiaomi 13T Pro", "Xiaomi 14", "Redmi Note 13 Pro+"]),
      sku: "CHG-MI-120W-WHT",
      stock: 16,
      isNew: false,
      isPopular: false,
      isSale: false,
      color: "White",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Мощность": "120W Turbo Charge",
        "Комплект": "Блок питания + кабель 6A Type-C"
      }),
    },

    // 4. Cables
    {
      name: "Кабель SOGD Braided USB-C to USB-C 100W с дисплеем мощности (1.2м)",
      slug: "cable-sogd-usbc-to-usbc-100w-display",
      description: "Флагманский кабель в плотной нейлоновой оплетке со встроенным цифровым LED-дисплеем, отображающим реальную мощность зарядки в Ваттах.",
      price: 85,
      oldPrice: 110,
      categoryId: createdCategories["cables"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 15 Series", "Samsung S24", "MacBook", "iPad Pro"]),
      sku: "CBL-SOGD-100W-DISP",
      stock: 30,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Black Titanium",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Мощность": "100W (20V / 5A) E-Marker Chip",
        "Скорость передачи данных": "480 Мбит/с",
        "Длина": "1.2 метра",
        "Оплетка": "Армированный нейлон 48 нитей"
      }),
    },
    {
      name: "Кабель Type-C to Lightning 20W PD в силиконовой оплетке (1м)",
      slug: "cable-typec-lightning-20w-silicone",
      description: "Невероятно мягкий силиконовый кабель, который никогда не путается. Идеален для быстрой зарядки iPhone от 8 до 14 Pro Max.",
      price: 55,
      oldPrice: 70,
      categoryId: createdCategories["cables"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPad"]),
      sku: "CBL-LGT-20W-SIL",
      stock: 40,
      isNew: false,
      isPopular: true,
      isSale: true,
      color: "Sky Blue",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Стандарт": "Apple MFi certified chip",
        "Ресурс на изгиб": "Более 25 000 сгибаний",
        "Длина": "1 метр"
      }),
    },
    {
      name: "Магнитный кабель 3-в-1 с поворотным коннектором 540°",
      slug: "cable-magnetic-3in1-rotatable",
      description: "Универсальный кабель со сменными магнитными штекерами: Type-C, Lightning и Micro-USB. Поворотный механизм на 540 градусов удобен в играх.",
      price: 60,
      oldPrice: null,
      categoryId: createdCategories["cables"],
      brand: "Samsung",
      compatibleModels: JSON.stringify(["Все современные смартфоны и планшеты"]),
      sku: "CBL-MAG-3IN1-540",
      stock: 25,
      isNew: false,
      isPopular: false,
      isSale: false,
      color: "Red Metallic",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Коннекторы": "Type-C + Lightning + Micro-USB",
        "Подсветка": "Мягкий синий LED индикатор"
      }),
    },

    // 5. Power Bank
    {
      name: "Внешний аккумулятор SOGD MagSafe Power Bank 10000 mAh 20W PD",
      slug: "powerbank-sogd-magsafe-10000mah",
      description: "Тонкий алюминиевый повербанк с беспроводной зарядкой MagSafe и выдвижной ножкой-подставкой для просмотра видео во время подзарядки.",
      price: 240,
      oldPrice: 280,
      categoryId: createdCategories["power-banks"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 12/13/14/15", "Samsung S23/S24", "Любые смартфоны"]),
      sku: "PB-SOGD-10K-MAG",
      stock: 20,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Deep Space Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Емкость": "10 000 mAh (37 Wh)",
        "Беспроводная мощность": "15W MagSafe",
        "Проводная мощность": "20W Type-C Power Delivery",
        "Материал": "Авиационный алюминий"
      }),
    },
    {
      name: "Повербанк Baseus Blade 20000 mAh 65W для ноутбуков и смартфонов",
      slug: "powerbank-baseus-blade-20000mah-65w",
      description: "Ультратонкий корпус толщиной всего 18 мм. Мощности 65 Ватт достаточно для зарядки MacBook, iPad и любых флагманских телефонов.",
      price: 430,
      oldPrice: 490,
      categoryId: createdCategories["power-banks"],
      brand: "Samsung",
      compatibleModels: JSON.stringify(["Ноутбуки Type-C", "iPhone 15", "Galaxy S24", "Xiaomi"]),
      sku: "PB-BAS-20K-65W",
      stock: 10,
      isNew: false,
      isPopular: true,
      isSale: true,
      color: "Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Емкость": "20 000 mAh",
        "Максимальная мощность": "65W двусторонняя",
        "Порты": "2x Type-C + 2x USB-A",
        "Дисплей": "LED экран статуса и времени зарядки"
      }),
    },
    {
      name: "Компактный повербанк 10000 mAh 22.5W с встроенными кабелями",
      slug: "powerbank-mini-10000mah-integrated-cables",
      description: "Не требует носить с собой провода: в корпус аккуратно встроены кабели Type-C и Lightning. Компактный размер помещается в любой карман.",
      price: 150,
      oldPrice: null,
      categoryId: createdCategories["power-banks"],
      brand: "Xiaomi",
      compatibleModels: JSON.stringify(["Все смартфоны iOS и Android"]),
      sku: "PB-MINI-10K-CAB",
      stock: 30,
      isNew: false,
      isPopular: true,
      isSale: false,
      color: "Frost White",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1609592424368-243029cfc5e7?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Встроенные кабели": "Type-C (22.5W) + Lightning (20W)",
        "Емкость": "10 000 mAh"
      }),
    },

    // 6. Headphones
    {
      name: "Беспроводные наушники SOGD Pro Wireless ANC (Bluetooth 5.3)",
      slug: "headphones-sogd-pro-wireless-anc",
      description: "Флагманские TWS наушники с гибридным активным шумоподавлением до 45 дБ, прозрачным режимом и 11-мм титановыми драйверами с насыщенным басом.",
      price: 320,
      oldPrice: 380,
      categoryId: createdCategories["headphones"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iOS", "Android", "Windows", "macOS"]),
      sku: "AUD-SOGD-PRO-ANC",
      stock: 18,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Matte Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Шумоподавление": "Active Noise Cancellation 45 dB",
        "Время работы": "До 8 часов (до 36 часов с кейсом)",
        "Зарядка кейса": "Type-C + Беспроводная Qi",
        "Кодеки": "AAC, SBC, LDAC Hi-Res Audio"
      }),
    },
    {
      name: "Наушники TWS с низкой задержкой для игр и музыки",
      slug: "headphones-tws-low-latency-gaming",
      description: "Стильные геймерские наушники с киберпанк подсветкой кейса и сверхнизкой задержкой звука 40ms для идеальной синхронизации в играх.",
      price: 180,
      oldPrice: 220,
      categoryId: createdCategories["headphones"],
      brand: "Xiaomi",
      compatibleModels: JSON.stringify(["Все смартфоны с Bluetooth"]),
      sku: "AUD-TWS-GAM-40MS",
      stock: 22,
      isNew: false,
      isPopular: false,
      isSale: true,
      color: "Cyber Gray",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Задержка": "40 мс Game Mode",
        "Микрофоны": "4 микрофона с ENC шумоподавлением речи",
        "Влагозащита": "IPX5"
      }),
    },

    // 7. Car Accessories
    {
      name: "Автомобильный держатель SOGD MagSafe с беспроводной зарядкой 15W",
      slug: "car-mount-sogd-magsafe-wireless-15w",
      description: "Премиальный автодержатель в дефлектор воздуховода с мощными магнитами N52. Надежно удерживает даже тяжелый смартфон на неровных дорогах.",
      price: 195,
      oldPrice: 230,
      categoryId: createdCategories["car-accessories"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPhone 12/13/14/15", "Смартфоны с MagSafe-чехлом"]),
      sku: "CAR-SOGD-MAG-15W",
      stock: 25,
      isNew: true,
      isPopular: true,
      isSale: false,
      color: "Obsidian Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Крепление": "Усиленный крюк-зажим в решетку воздуховода",
        "Мощность зарядки": "15W Fast Wireless",
        "Шарнир": "Вращение на 360 градусов"
      }),
    },
    {
      name: "Быстрое автомобильное ЗУ 45W Metal Dual Port (USB-C + QC 3.0)",
      slug: "car-charger-45w-metal-dual-port",
      description: "Миниатюрный металлический адаптер в прикуриватель. Не выступает из гнезда, имеет мягкую кольцевую синюю подсветку.",
      price: 75,
      oldPrice: 95,
      categoryId: createdCategories["car-accessories"],
      brand: "Samsung",
      compatibleModels: JSON.stringify(["Все автомобили 12V-24V"]),
      sku: "CAR-CHG-45W-ALU",
      stock: 35,
      isNew: false,
      isPopular: true,
      isSale: true,
      color: "Gunmetal",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Входное напряжение": "12V - 24V (легковые и грузовые авто)",
        "Выходы": "Type-C 25W + USB-A 20W"
      }),
    },

    // 8. Smart Watch
    {
      name: "Смарт-часы SOGD Titan Watch Ultra с AMOLED экраном 1.96\"",
      slug: "smartwatch-sogd-titan-ultra-amoled",
      description: "Умные часы в прочном корпусе из цинкового сплава. Яркий AMOLED дисплей с функцией Always-On, звонки по Bluetooth, мониторинг пульса, кислорода в крови и 100+ спорт-режимов.",
      price: 490,
      oldPrice: 580,
      categoryId: createdCategories["smart-watches"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iOS 12+", "Android 8+"]),
      sku: "WTC-SOGD-ULTRA-TIT",
      stock: 12,
      isNew: true,
      isPopular: true,
      isSale: true,
      color: "Titanium Orange / Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Дисплей": "1.96 дюйма AMOLED 410x502 px",
        "Автономность": "До 10 дней активного использования",
        "Влагозащита": "IP68 / 3 ATM",
        "Датчики": "Пульс, SpO2, мониторинг сна, давления, шагомер"
      }),
    },
    {
      name: "Миланский сетчатый браслет Milanese Loop для Apple Watch (42/44/45/49mm)",
      slug: "strap-milanese-loop-apple-watch",
      description: "Элегантный ремешок из нержавеющей стали с плавной магнитной регулировкой длины. Идеально сидит на запястье любого размера.",
      price: 110,
      oldPrice: 140,
      categoryId: createdCategories["smart-watches"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["Apple Watch 42/44/45/49mm", "Apple Watch Ultra"]),
      sku: "STP-MIL-APW-BLK",
      stock: 28,
      isNew: false,
      isPopular: true,
      isSale: false,
      color: "Space Black",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Материал": "Нержавеющая сталь 316L",
        "Застежка": "Мощный магнитный фиксатор"
      }),
    },

    // 9. Other Accessories
    {
      name: "Профессиональный многофункциональный набор для чистки гаджетов 7-в-1",
      slug: "cleaning-kit-gadgets-7in1",
      description: "Компактный инструмент для очистки сеточек наушников AirPods, разъемов зарядки Type-C, экранов смартфонов и клавиатур ноутбуков.",
      price: 45,
      oldPrice: null,
      categoryId: createdCategories["other"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["Любые гаджеты, смартфоны, наушники"]),
      sku: "ACC-CLN-7IN1",
      stock: 50,
      isNew: false,
      isPopular: true,
      isSale: false,
      color: "White / Gray",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Инструменты": "Перо для очистки сеток, щетка высокой плотности, спрей, салфетка микрофибра"
      }),
    },
    {
      name: "Регулируемая алюминиевая подставка для телефона и планшета",
      slug: "stand-aluminum-phone-tablet",
      description: "Настольный держатель с двойным шарниром и силиконовыми накладками против скольжения. Складывается до плоского состояния.",
      price: 80,
      oldPrice: 100,
      categoryId: createdCategories["other"],
      brand: "Samsung",
      compatibleModels: JSON.stringify(["Все телефоны и планшеты от 4 до 12.9 дюймов"]),
      sku: "ACC-STND-ALU-SLV",
      stock: 22,
      isNew: false,
      isPopular: false,
      isSale: true,
      color: "Silver",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Материал": "Анодированный авиационный алюминий",
        "Регулировка": "Угол наклона до 270 градусов"
      }),
    },
    {
      name: "Стилус Universal Smart Pen с распознаванием наклона",
      slug: "stylus-universal-smart-pen",
      description: "Высокоточный активный стилус для рисования и заметок на экранах iPad, Samsung Galaxy Tab и других емкостных сенсорных дисплеях.",
      price: 145,
      oldPrice: 180,
      categoryId: createdCategories["other"],
      brand: "Apple",
      compatibleModels: JSON.stringify(["iPad", "Samsung Galaxy Tab", "Xiaomi Pad"]),
      sku: "ACC-STYL-UNIV-WHT",
      stock: 15,
      isNew: true,
      isPopular: false,
      isSale: false,
      color: "White",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Наконечник": "Сменный износостойкий POM 1.5 мм",
        "Зарядка": "Быстрая зарядка Type-C за 30 мин",
        "Время работы": "До 12 часов непрерывного письма"
      }),
    },
    {
      name: "Оригинальный адаптер OTG Type-C на USB 3.0 High-Speed",
      slug: "adapter-otg-typec-to-usb3",
      description: "Мини-переходник в алюминиевом корпусе для подключения флешек, мышек и клавиатур к смартфону с разъемом Type-C.",
      price: 35,
      oldPrice: null,
      categoryId: createdCategories["other"],
      brand: "Xiaomi",
      compatibleModels: JSON.stringify(["Все устройства с портом USB Type-C"]),
      sku: "ACC-OTG-C2A-BLK",
      stock: 60,
      isNew: false,
      isPopular: false,
      isSale: false,
      color: "Space Gray",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80"
      ]),
      specifications: JSON.stringify({
        "Скорость": "USB 3.0 до 5 Гбит/с",
        "Корпус": "Алюминиевый монолит"
      }),
    },
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod,
    });
  }

  console.log(`Successfully seeded ${categories.length} categories and ${products.length} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
