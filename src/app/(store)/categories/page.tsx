import type { Metadata } from "next";
import { getCategories } from "@/lib/data/categories";
import { CategoriesGrid } from "@/components/store/categories-grid";

export const metadata: Metadata = {
  title: "Categories — TechSphere",
  description: "Browse products by category at TechSphere.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto mt-24 max-w-7xl px-4 py-16">
      <h1 className="heading-1 text-foreground">Categories</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Explore our curated collection by category.
      </p>
      <div className="mt-10">
        <CategoriesGrid categories={categories} />
      </div>
    </div>
  );
}
