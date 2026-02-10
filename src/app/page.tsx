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
    <div className="space-y-12 pb-16">
      {/* Hero Banner Carousel */}
      <section>
        <HeroBanner />
      </section>

      {/* Productos Destacados */}
      <section className="px-4 max-w-7xl mx-auto">
        <ProductCarousel title="Productos Destacados" products={featured} />
      </section>

      {/* 3 Banners Grid */}
      <section className="max-w-7xl mx-auto">
        <BannerGrid />
      </section>

      {/* Productos en Oferta con filtro Perro/Gato */}
      <section className="px-4 max-w-7xl mx-auto">
        <HomeSaleSection />
      </section>

      {/* Banner intermedio */}
      <section className="mx-4 max-w-7xl lg:mx-auto rounded-xl overflow-hidden relative h-64">
        <img
          src="https://picsum.photos/seed/petbanner4/1200/400"
          alt="Promoción especial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-transparent flex items-center">
          <div className="px-8 md:px-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">¡Ofertas Especiales!</h2>
            <p className="text-lg opacity-90">Hasta un 50% de descuento en productos seleccionados</p>
          </div>
        </div>
      </section>

      {/* Más Vendidos */}
      <section className="px-4 max-w-7xl mx-auto">
        <ProductCarousel title="Más Vendidos" products={bestSellers} />
      </section>
    </div>
  );
}
