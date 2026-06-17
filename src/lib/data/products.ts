import { MOCK_PRODUCTS } from "@/constants/products";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  return MOCK_PRODUCTS;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  return MOCK_PRODUCTS.filter((p) => p.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  "use cache";
  return MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId);
}
