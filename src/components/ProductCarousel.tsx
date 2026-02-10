"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: false,
    breakpoints: {
      "(max-width: 639px)": { slidesToScroll: 1 },
      "(min-width: 640px) and (max-width: 1023px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  // Sync selectedFilter with external activeFilter
  useEffect(() => {
    if (activeFilter !== undefined) setSelectedFilter(activeFilter);
  }, [activeFilter]);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="text-2xl font-bold">{title}</h2>

      {/* Filter tabs */}
      {filterOptions && filterOptions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterClick(option.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedFilter === option.value
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Carousel */}
      <div className="relative mt-4">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        )}
        {!loading && products.length === 0 && (
          <div className="py-16 text-center text-gray-400">No se encontraron productos</div>
        )}
        {!loading && products.length > 0 && (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="-ml-4 flex">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-0 flex-[0_0_66.666%] pl-4 sm:flex-[0_0_33.333%] lg:flex-[0_0_22.222%]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Right fade gradient */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={`absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity ${
            canScrollPrev
              ? "opacity-100 hover:bg-gray-50"
              : "cursor-default opacity-30"
          }`}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={`absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity ${
            canScrollNext
              ? "opacity-100 hover:bg-gray-50"
              : "cursor-default opacity-30"
          }`}
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
