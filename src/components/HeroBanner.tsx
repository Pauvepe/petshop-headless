"use client";

import Image from "next/image";
import { Truck } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#ee9d2b]/20 via-[#ee9d2b]/10 to-transparent">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left side - Text */}
          <div className="p-8 md:p-16 space-y-6">
            <span className="inline-block px-4 py-1 bg-[#ee9d2b]/20 text-[#ee9d2b] font-bold rounded-full text-sm uppercase tracking-widest">
              Nueva Temporada
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Todo lo que tu mascota necesita.
            </h1>
            <p className="text-lg text-slate-600 max-w-md">
              Descubre descuentos increíbles de hasta el 40% en las mejores
              marcas para tu mejor amigo.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#ee9d2b] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#ee9d2b]/30">
                Explorar ofertas
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full border-2 border-slate-100 hover:scale-105 transition-transform">
                Nuevos ingresos
              </button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-64 md:h-[500px]">
            <Image
              src="https://picsum.photos/seed/petshop-hero/800/600"
              alt="Mascota feliz"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Floating card */}
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl absolute bottom-4 left-4 right-4 flex items-center gap-4">
              <div className="bg-[#86b049] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Envío Gratis</p>
                <p className="text-sm text-slate-600">
                  En pedidos mayores a 39&euro;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
