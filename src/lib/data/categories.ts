import { MOCK_CATEGORIES } from "@/constants/categories";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  "use cache";
  return MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
}
