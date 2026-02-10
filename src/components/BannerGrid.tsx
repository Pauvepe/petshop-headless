"use client";

import Image from "next/image";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Alimentación Premium",
    subtitle: "Lo mejor para tu mascota",
    image: "https://picsum.photos/seed/banner1/600/600",
    className: "aspect-square",
  },
  {
    id: 2,
    title: "Accesorios Exclusivos",
    subtitle: "Diseño y funcionalidad",
    image: "https://picsum.photos/seed/banner2/600/600",
    className: "aspect-square",
  },
  {
    id: 3,
    title: "Envío gratis en pedidos +39€",
    subtitle: "Recibe en 24-48h",
    image: "https://picsum.photos/seed/banner3/1200/400",
    className: "aspect-[3/1]",
  },
];

export default function BannerGrid() {
  return (
    <section className="mx-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Top row: two square banners */}
        {banners.slice(0, 2).map((banner) => (
          <div
            key={banner.id}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className={`relative ${banner.className}`}>
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  {banner.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 md:text-base">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom row: full-width rectangular banner */}
        <div className="group relative overflow-hidden rounded-xl md:col-span-2">
          <div className={`relative ${banners[2].className}`}>
            <Image
              src={banners[2].image}
              alt={banners[2].title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                {banners[2].title}
              </h3>
              <p className="mt-1 text-sm text-white/80 md:text-base">
                {banners[2].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
