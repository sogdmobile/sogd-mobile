"use client";

import React, { useState } from "react";
import { storeConfig } from "@/config/store";
import { MessageCircle, Send, X, Headphones } from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
      {/* Popover Actions */}
      {isOpen && (
        <div className="bg-[#131722] border border-[#232A3B] rounded-2xl p-3 shadow-2xl space-y-2 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200 min-w-[200px]">
          <p className="text-[11px] font-semibold text-slate-400 px-2 pb-1 border-b border-[#232A3B]">
            Консультация в Худжанде
          </p>

          <a
            href={storeConfig.socials.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors w-full"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Чат в WhatsApp</span>
          </a>

          <a
            href={storeConfig.socials.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-[#0070F3]/20 hover:bg-[#0070F3]/30 text-[#00E5FF] border border-[#0070F3]/30 transition-colors w-full"
          >
            <Send className="w-4 h-4 text-[#00E5FF]" />
            <span>Чат в Telegram</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Связаться с магазином"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-tr from-[#0070F3] to-[#00E5FF] text-white shadow-xl shadow-[#0070F3]/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <Headphones className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0B0D12] animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
}
