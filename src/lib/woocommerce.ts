import { WCProduct, WCCategory, CategoryTree } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_WC_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

async function wcFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set("consumer_key", CK!);
  url.searchParams.set("consumer_secret", CS!);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WC API error: ${res.status}`);
  return res.json();
}

export async function getProducts(params: Record<string, string> = {}): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("products", { per_page: "100", ...params });
}

export async function getProduct(slug: string): Promise<WCProduct | null> {
  const products = await wcFetch<WCProduct[]>("products", { slug });
  return products[0] || null;
}

export async function getFeaturedProducts(): Promise<WCProduct[]> {
  return getProducts({ featured: "true", per_page: "10" });
}

export async function getOnSaleProducts(category?: string): Promise<WCProduct[]> {
  const params: Record<string, string> = { on_sale: "true", per_page: "10" };
  if (category) params.category = category;
  return getProducts(params);
}

export async function getBestSellers(): Promise<WCProduct[]> {
  return getProducts({ orderby: "popularity", per_page: "10" });
}

export async function getProductsByCategory(categoryId: string, page = "1"): Promise<WCProduct[]> {
  return getProducts({ category: categoryId, page, per_page: "20" });
}

export async function getCategories(): Promise<WCCategory[]> {
  return wcFetch<WCCategory[]>("products/categories", { per_page: "100" });
}

export async function getCategoryBySlug(slug: string): Promise<WCCategory | null> {
  const cats = await wcFetch<WCCategory[]>("products/categories", { slug });
  return cats[0] || null;
}

export function buildCategoryTree(categories: WCCategory[]): CategoryTree[] {
  const map = new Map<number, CategoryTree>();
  categories.forEach((cat) => map.set(cat.id, { ...cat, children: [] }));

  const roots: CategoryTree[] = [];
  map.forEach((cat) => {
    if (cat.parent === 0) {
      roots.push(cat);
    } else {
      const parent = map.get(cat.parent);
      if (parent) parent.children.push(cat);
    }
  });

  // Sort children by menu_order
  const sortChildren = (nodes: CategoryTree[]) => {
    nodes.sort((a, b) => a.menu_order - b.menu_order);
    nodes.forEach((n) => sortChildren(n.children));
  };
  sortChildren(roots);
  roots.sort((a, b) => a.menu_order - b.menu_order);

  return roots.filter((r) => r.slug !== "sin-categoria" && r.slug !== "esquiar");
}
