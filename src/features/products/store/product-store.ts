import { create } from "zustand";
import type { Product } from "@/types";

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
