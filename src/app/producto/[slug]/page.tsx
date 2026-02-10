import { getProduct, getProducts } from "@/lib/woocommerce";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedProducts = product.categories[0]
    ? await getProducts({ category: String(product.categories[0].id), per_page: "4" })
    : [];

  const mainImage = product.images[0]?.src;
  const thumbnails = product.images.slice(0, 4);
  const discount = product.on_sale && product.regular_price && product.sale_price
    ? Math.round((1 - parseFloat(product.sale_price) / parseFloat(product.regular_price)) * 100)
    : 0;

  const sizeAttr = product.attributes.find((a) => a.slug.includes("tamano"));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm text-slate-500 gap-2 flex-wrap">
        <Link href="/" className="hover:text-[#ee9d2b]">Inicio</Link>
        {product.categories[0] && (
          <>
            <span>/</span>
            <Link href={`/categoria/${product.categories[0].slug}`} className="hover:text-[#ee9d2b]">
              {product.categories[0].name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="font-semibold text-[#ee9d2b] line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {thumbnails.length > 1 && (
            <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
              {thumbnails.map((img, i) => (
                <div key={img.id} className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-[#ee9d2b] ring-2 ring-[#ee9d2b]/20' : 'border-slate-200 hover:border-[#ee9d2b]'} cursor-pointer transition-colors`}>
                  <Image src={img.src} alt={img.alt || product.name} width={80} height={80} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="flex-1 order-1 md:order-2">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 relative">
              {mainImage ? (
                <Image src={mainImage} alt={product.name} fill className="object-contain p-8" sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">Sin imagen</div>
              )}
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          {product.categories[0] && (
            <span className="inline-block w-fit px-3 py-1 bg-[#ee9d2b]/10 text-[#ee9d2b] text-xs font-bold rounded-full tracking-wider uppercase">
              {product.categories[0].name}
            </span>
          )}
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            {product.on_sale ? (
              <>
                <span className="text-4xl font-extrabold text-[#ee9d2b]">{parseFloat(product.sale_price).toFixed(2)}€</span>
                <span className="text-xl text-slate-400 line-through">{parseFloat(product.regular_price).toFixed(2)}€</span>
                {discount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>}
              </>
            ) : (
              <span className="text-4xl font-extrabold text-[#ee9d2b]">{parseFloat(product.price).toFixed(2)}€</span>
            )}
          </div>

          {/* Size attribute */}
          {sizeAttr && sizeAttr.options.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-700">Tamaño:</p>
              <div className="flex flex-wrap gap-2">
                {sizeAttr.options.map((opt, i) => (
                  <button key={opt} className={`px-6 py-2 rounded-full font-medium transition-all ${i === 0 ? 'border-2 border-[#ee9d2b] bg-[#ee9d2b]/5 font-bold text-[#ee9d2b]' : 'border border-slate-200 hover:border-[#ee9d2b] hover:bg-[#ee9d2b]/5'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Shipping badges */}
          <div className="flex items-center justify-center gap-8 py-4 border-t border-slate-100 mt-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#ee9d2b]">🚚</span> Envío gratis +39€
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#ee9d2b]">🔒</span> Pago 100% seguro
            </div>
          </div>

          {/* Description */}
          {product.short_description && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-2">Descripción</h3>
              <div className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.short_description }} />
            </div>
          )}

          {product.description && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-2">Detalles del producto</h3>
              <div className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {relatedProducts.length > 1 && (
        <section className="mt-16 mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">También te puede gustar</h2>
              <p className="text-slate-500">Productos seleccionados para tu mascota</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
