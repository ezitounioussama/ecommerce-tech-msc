import api from "@/lib/axios";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}

export async function createCategory(
  cat: Pick<Category, "name" | "slug" | "description">,
): Promise<Category> {
  const { data } = await api.post<Category>("/categories", cat);
  return data;
}

export async function updateCategory(
  id: string,
  cat: Pick<Category, "name" | "slug" | "description">,
): Promise<Category> {
  const { data } = await api.put<Category>(`/categories/${id}`, cat);
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
