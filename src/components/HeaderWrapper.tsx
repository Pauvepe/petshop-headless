import { getCategories, buildCategoryTree } from "@/lib/woocommerce";
import Header from "./Header";

export default async function HeaderWrapper() {
  const categories = await getCategories();
  const tree = buildCategoryTree(categories);
  return <Header categories={tree} />;
}
