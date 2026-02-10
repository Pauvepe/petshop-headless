import { getProduct, getProducts } from "@/lib/woocommerce";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

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
  const discount = product.on_sale && product.regular_price && product.sale_price
    ? Math.round((1 - parseFloat(product.sale_price) / parseFloat(product.regular_price)) * 100)
    : 0;

  // Get size/weight attributes
  const sizeAttr = product.attributes.find((a) => a.slug.includes("tamano"));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Inicio</Link>
        {product.categories[0] && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/categoria/${product.categories[0].slug}`} className="hover:text-emerald-600">
              {product.categories[0].name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
          {mainImage ? (
            <Image src={mainImage} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            {product.on_sale ? (
              <>
                <span className="text-3xl font-bold text-red-600">{parseFloat(product.sale_price).toFixed(2)} €</span>
                <span className="text-xl text-gray-400 line-through">{parseFloat(product.regular_price).toFixed(2)} €</span>
              </>
            ) : (
              <span className="text-3xl font-bold">{parseFloat(product.price).toFixed(2)} €</span>
            )}
          </div>

          {/* Size attribute */}
          {sizeAttr && sizeAttr.options.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Tamaño</p>
              <div className="flex flex-wrap gap-2">
                {sizeAttr.options.map((opt) => (
                  <span key={opt} className="px-3 py-1 rounded-full border border-gray-300 text-sm">
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Short description */}
          {product.short_description && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold mb-2">Descripción</h3>
              <div
                className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            </div>
          )}

          {/* Full description */}
          {product.description && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold mb-2">Detalles del producto</h3>
              <div
                className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Categories */}
          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-gray-500">
              Categorías:{" "}
              {product.categories.map((cat, i) => (
                <span key={cat.id}>
                  <Link href={`/categoria/${cat.slug}`} className="text-emerald-600 hover:underline">
                    {cat.name}
                  </Link>
                  {i < product.categories.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 1 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <div key={p.id}>
                  <Link href={`/producto/${p.slug}`} className="block">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                      {p.images[0] ? (
                        <Image src={p.images[0].src} alt={p.name} width={300} height={300} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Sin imagen</div>
                      )}
                    </div>
                    <p className="text-sm font-medium line-clamp-2">{p.name}</p>
                    <p className="text-sm font-bold mt-1">{parseFloat(p.price).toFixed(2)} €</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
