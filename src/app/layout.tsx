import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { storeConfig } from "@/config/store";

export const metadata: Metadata = {
  metadataBase: new URL("https://sogdmobile.tj"),
  title: {
    default: `${storeConfig.name} — Магазин мобильных аксессуаров в Худжанде`,
    template: `%s | ${storeConfig.name}`,
  },
  description:
    "Купить чехлы, защитные стекла 9H, быстрые GaN зарядные устройства, повербанки и наушники в Худжанде с быстрой доставкой и оплатой при получении.",
  keywords: [
    "SOGD MOBILE",
    "аксессуары для телефонов Худжанд",
    "чехлы на айфон Худжанд",
    "защитные стекла Худжанд",
    "зарядки GaN",
    "повербанк Худжанд",
    "интернет-магазин Таджикистан",
    "купить чехол iPhone 15 Pro",
    "Samsung чехлы Худжанд",
  ],
  authors: [{ name: storeConfig.name }],
  creator: storeConfig.name,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://sogdmobile.tj",
    title: `${storeConfig.name} — Премиальные мобильные аксессуары в Худжанде`,
    description:
      "Оригинальные чехлы, защитные стекла, зарядки и умные гаджеты с быстрой доставкой по Худжанду.",
    siteName: storeConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: storeConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: storeConfig.name,
    description: storeConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: storeConfig.name,
    description: storeConfig.description,
    telephone: storeConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeConfig.address,
      addressLocality: storeConfig.city,
      addressCountry: "TJ",
    },
    priceRange: "TJS",
    openingHours: "Mo-Su 09:00-20:00",
    url: "https://sogdmobile.tj",
  };

  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B0D12] text-[#F8FAFC]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingContact />
      </body>
    </html>
  );
}
