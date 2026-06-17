import { getProducts, getCategories } from "@/lib/data";
import { ProductsPageClient } from "./_components/products-page-client";

export const metadata = {
  title: "Products - TechSphere",
  description:
    "Browse our curated collection of premium laptops, smartphones, components, peripherals, and accessories.",
  openGraph: {
    title: "Products - TechSphere",
    description:
      "Browse our curated collection of premium laptops, smartphones, components, peripherals, and accessories.",
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <ProductsPageClient
      products={products}
      categories={categories}
    />
  );
}
