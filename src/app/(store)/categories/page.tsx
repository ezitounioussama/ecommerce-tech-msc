import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_CATEGORIES } from "@/constants/categories";

export const metadata: Metadata = {
  title: "Categories — TechSphere",
  description: "Browse products by category at TechSphere.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto mt-24 max-w-5xl px-4 py-16">
      <h1 className="heading-1 text-foreground">Categories</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Explore our curated collection by category.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CATEGORIES.map((cat) => (
          <Link
            key={cat._id}
            href={`/products?category=${cat.slug}`}
            className="group rounded-xl border border-card-border bg-card p-6 transition-all hover:border-accent-blue/30 hover:shadow-[0_0_30px_-6px] hover:shadow-accent-blue/10"
          >
            <h2 className="text-sm font-semibold text-foreground group-hover:text-accent-blue">
              {cat.name}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
