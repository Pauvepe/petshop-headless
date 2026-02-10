import { getCategories, buildCategoryTree, getProductsByCategory, getCategoryBySlug } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
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

  const tree = buildCategoryTree(allCategories);
  const currentTree = tree.find((t) => t.id === category.id) ||
    tree.flatMap((t) => t.children).find((t) => t.id === category.id);

  // Get subcategories for this category
  const subcategories = allCategories.filter((c) => c.parent === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      {category.description && (
        <div
          className="text-gray-600 mb-8 max-w-3xl line-clamp-3"
          dangerouslySetInnerHTML={{ __html: category.description.replace(/<[^>]*>/g, ' ').slice(0, 200) + '...' }}
        />
      )}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/categoria/${sub.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium"
            >
              {sub.name} ({sub.count})
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl">No se encontraron productos en esta categoría</p>
        </div>
      )}
    </div>
  );
}
