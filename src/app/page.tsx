import HeroBanner from "@/components/HeroBanner";
import ProductCarousel from "@/components/ProductCarousel";
import BannerGrid from "@/components/BannerGrid";
import HomeSaleSection from "@/components/HomeSaleSection";
import { getFeaturedProducts, getBestSellers } from "@/lib/woocommerce";

export default async function HomePage() {
  const [featured, bestSellers] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
  ]);

  return (
    <div className="space-y-4 pb-16">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Productos Destacados */}
      <section className="container mx-auto px-4 py-12">
        <ProductCarousel title="Productos Destacados" products={featured} />
      </section>

      {/* Categorías más buscadas */}
      <BannerGrid />

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-[#ee9d2b]/90 rounded-2xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 opacity-10">
            <svg className="w-48 h-48 -translate-x-1/4 -translate-y-1/4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm15 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-12.5 3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm10 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM12 21c-1.5 0-5-4-5-7.5S9 8 12 8s5 2 5 5.5S13.5 21 12 21z"/>
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold">Únete a nuestra manada</h2>
            <p className="text-lg opacity-90">Recibe consejos de expertos, ofertas exclusivas y novedades antes que nadie.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                className="flex-1 bg-white rounded-full py-4 px-8 text-slate-900 border-none outline-none placeholder:text-slate-400"
                placeholder="Tu correo electrónico"
                type="email"
              />
              <button className="bg-[#0f4c5c] px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                Suscribirme
              </button>
            </div>
            <p className="text-xs opacity-70">Al suscribirte aceptas nuestra política de privacidad.</p>
          </div>
        </div>
      </section>

      {/* Productos en Oferta con filtro Perro/Gato */}
      <section className="container mx-auto px-4 py-12">
        <HomeSaleSection />
      </section>

      {/* Más Vendidos */}
      <section className="container mx-auto px-4 py-12">
        <ProductCarousel title="Más Vendidos" products={bestSellers} />
      </section>
    </div>
  );
}
