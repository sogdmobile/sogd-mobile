"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PHONE_BRANDS } from "@/data/phone-brands";
import { ChevronRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhoneFinder() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const currentBrand = PHONE_BRANDS.find((b) => b.name === selectedBrand);

  const handleSearch = () => {
    if (selectedModel) {
      router.push(`/catalog?model=${encodeURIComponent(selectedModel)}`);
    } else if (selectedBrand) {
      router.push(`/catalog?brand=${encodeURIComponent(selectedBrand)}`);
    }
  };

  return (
    <section className="py-12 sm:py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card p-6 sm:p-10 text-center sm:text-left flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2 text-center">
          Подходит ли это вашему телефону?
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-8 max-w-xl text-center">
          Укажите модель вашего смартфона, и мы покажем только 100% совместимые чехлы, стекла и зарядные устройства.
        </p>

        <div className="w-full max-w-3xl bg-[var(--bg-base)] border border-[var(--border-glass)] rounded-2xl p-4 sm:p-6 shadow-[var(--shadow-glass)] flex flex-col gap-6 relative z-10">
          
          {/* Step 1: Brand Selection */}
          <div>
            <p className="section-label mb-3">1. Выберите бренд</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {PHONE_BRANDS.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => {
                    setSelectedBrand(brand.name);
                    setSelectedModel(null); // Reset model on brand change
                  }}
                  className={`h-10 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedBrand === brand.name
                      ? "bg-[var(--accent)] text-white shadow-[0_0_15px_rgba(43,127,255,0.4)] border border-[var(--accent)]"
                      : "bg-white/5 text-[var(--text-secondary)] border border-[var(--border-glass)] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Model Selection (Shows only if brand is selected) */}
          <div className={`transition-all duration-500 overflow-hidden ${selectedBrand ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
            <p className="section-label mb-3">2. Модель {selectedBrand}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {currentBrand?.models.map((model) => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`h-9 px-3 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                    selectedModel === model
                      ? "bg-[var(--accent-light)] text-white shadow-[0_0_10px_rgba(92,159,255,0.4)]"
                      : "bg-transparent border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-white hover:border-white/20"
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Search Button */}
          <div className={`pt-4 border-t border-[var(--border-glass)] flex justify-end transition-all duration-300 ${selectedModel ? "opacity-100 translate-y-0" : "opacity-50 pointer-events-none translate-y-2"}`}>
            <Button variant="primary" size="lg" onClick={handleSearch} className="w-full sm:w-auto">
              Показать совместимые товары <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
