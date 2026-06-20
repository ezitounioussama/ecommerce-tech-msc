import api from "@/lib/axios";
import type { Product } from "@/types";

export async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<{ url: string }>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}

export type ProductFormData = {
  name: string;
  slug: string;
  description?: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId: string;
  images?: string[];
  specifications?: Record<string, string>;
  status: "draft" | "published";
  featured: boolean;
};

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function createProduct(p: ProductFormData): Promise<Product> {
  const { data } = await api.post<Product>("/products", p);
  return data;
}

export async function updateProduct(id: string, p: ProductFormData): Promise<Product> {
  const { data } = await api.put<Product>(`/products/${id}`, p);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
