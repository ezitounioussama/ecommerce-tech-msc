import { getCategoriesCollection } from "@/lib/mongodb/collections";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  "use cache";
  const col = await getCategoriesCollection();
  return col.find({}).sort({ name: 1 }).toArray();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  const col = await getCategoriesCollection();
  return col.findOne({ slug });
}
