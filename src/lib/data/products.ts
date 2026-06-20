import { getProductsCollection } from "@/lib/mongodb/collections";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  const col = await getProductsCollection();
  return col.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  const col = await getProductsCollection();
  return col.find({ featured: true }).sort({ createdAt: -1 }).toArray();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  const col = await getProductsCollection();
  return col.findOne({ slug });
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  "use cache";
  const col = await getProductsCollection();
  return col.find({ categoryId }).sort({ createdAt: -1 }).toArray();
}
