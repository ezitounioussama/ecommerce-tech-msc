import { create } from "zustand";
import type { Category } from "@/types";

interface CategoryStore {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: Category | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setLoading: (isLoading) => set({ isLoading }),
}));
