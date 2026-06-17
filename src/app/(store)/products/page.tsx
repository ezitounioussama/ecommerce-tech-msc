import { MOCK_PRODUCTS } from "@/constants/products";
import { MOCK_CATEGORIES } from "@/constants/categories";
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

export default function ProductsPage() {
  return (
    <ProductsPageClient
      products={MOCK_PRODUCTS}
      categories={MOCK_CATEGORIES}
    />
  );
}
