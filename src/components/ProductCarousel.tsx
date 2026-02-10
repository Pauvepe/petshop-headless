"use client";

import { useEffect, useRef, useState } from "react";
import { Dog, Cat } from "lucide-react";
import type { WCProduct } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

interface ProductCarouselProps {
  title: string;
  products: WCProduct[];
  filterOptions?: { label: string; value: string }[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  loading?: boolean;
}

const FILTER_ICONS: Record<string, React.ReactNode> = {
  perro: <Dog className="h-4 w-4" />,
  perros: <Dog className="h-4 w-4" />,
  dog: <Dog className="h-4 w-4" />,
  gato: <Cat className="h-4 w-4" />,
  gatos: <Cat className="h-4 w-4" />,
  cat: <Cat className="h-4 w-4" />,
};

export default function ProductCarousel({
  title,
  products,
  filterOptions,
  activeFilter,
  onFilterChange,
  loading,
}: ProductCarouselProps) {
  const [selectedFilter, setSelectedFilter] = useState(
    activeFilter ?? filterOptions?.[0]?.value ?? ""
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync selectedFilter with external activeFilter
  useEffect(() => {
    if (activeFilter !== undefined) setSelectedFilter(activeFilter);
  }, [activeFilter]);

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>

      {/* Filter toggle pills */}
      {filterOptions && filterOptions.length > 0 && (
        <div className="mt-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1.5">
            {filterOptions.map((option) => {
              const isSelected = selectedFilter === option.value;
              const icon = FILTER_ICONS[option.value.toLowerCase()];
              return (
                <button
                  key={option.value}
                  onClick={() => handleFilterClick(option.value)}
                  className={`flex items-center gap-2 rounded-full px-6 py-2 font-bold transition-all ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {icon && (
                    <span className={isSelected ? "text-[#ee9d2b]" : ""}>
                      {icon}
                    </span>
                  )}
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="relative mt-6">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ee9d2b] border-t-transparent" />
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            No se encontraron productos
          </div>
        )}

        {!loading && products.length > 0 && (
          <div
            ref={scrollRef}
            className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[280px] flex-shrink-0 md:min-w-[320px]"
              >
                <ProductCard product={product} />
              </div>
            ))}

            {/* Peek card — skeleton placeholder */}
            <div className="min-w-[280px] flex-shrink-0 opacity-40 blur-[1px] md:min-w-[320px]">
              <div className="flex flex-col gap-3 rounded-2xl bg-white p-4">
                <div className="aspect-square w-full rounded-xl bg-slate-200" />
                <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                <div className="h-4 w-1/2 rounded-full bg-slate-200" />
                <div className="h-8 w-1/3 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
