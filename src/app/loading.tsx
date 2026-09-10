import React from "react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
      <div className="h-8 w-64 bg-[#131722] rounded-xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-[#131722] rounded-2xl border border-[#232A3B]" />
        ))}
      </div>
    </div>
  );
}
