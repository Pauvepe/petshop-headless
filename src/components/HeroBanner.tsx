"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const slides = [
  {
    image: "https://picsum.photos/seed/pet1/1200/500",
    title: "Todo para tu mascota",
    subtitle: "Encuentra los mejores productos para consentir a tu compañero fiel",
  },
  {
    image: "https://picsum.photos/seed/pet2/1200/500",
    title: "Alimentación premium",
    subtitle: "Las mejores marcas de pienso y comida húmeda con envío rápido",
  },
  {
    image: "https://picsum.photos/seed/pet3/1200/500",
    title: "Accesorios y juguetes",
    subtitle: "Haz feliz a tu mascota con nuestra selección de juguetes y accesorios",
  },
];

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="mx-4">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[4/3] md:aspect-[12/5]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Text content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                  <h2 className="mb-2 text-2xl font-bold md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="max-w-xl text-sm md:text-lg lg:text-xl">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="mt-3 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === selectedIndex
                ? "bg-emerald-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
