import { getCategories, buildCategoryTree, getProductsByCategory, getCategoryBySlug } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, allCategories] = await Promise.all([
    getProductsByCategory(String(category.id)),
    getCategories(),
  ]);

  const subcategories = allCategories.filter((c) => c.parent === category.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm text-slate-500 gap-2">
        <Link href="/" className="hover:text-[#ee9d2b]">Inicio</Link>
        <span>/</span>
        <span className="font-semibold text-[#ee9d2b]">{category.name}</span>
      </nav>

      {/* Category Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-slate-600 max-w-2xl text-lg">
            {category.description.replace(/<[^>]*>/g, " ").slice(0, 200).trim()}...
          </p>
        )}
      </header>

      {/* Subcategory Circles */}
      {subcategories.length > 0 && (
        <section className="mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4">
            {subcategories.map((sub) => (
              <Link key={sub.id} href={`/categoria/${sub.slug}`} className="flex-shrink-0 group cursor-pointer text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#ee9d2b]/50 mb-3 transition-all group-hover:scale-105 bg-slate-100">
                  {sub.image ? (
                    <Image src={sub.image.src} alt={sub.name} width={128} height={128} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">{sub.name.charAt(0)}</div>
                  )}
                </div>
                <span className="font-medium text-slate-600 group-hover:text-[#ee9d2b] transition-colors text-sm">
                  {sub.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <p className="text-sm font-medium">
          <span className="text-[#ee9d2b] font-bold">{products.length}</span> productos encontrados
        </p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <p className="text-xl">No se encontraron productos en esta categoría</p>
        </div>
      )}
    </main>
  );
}
