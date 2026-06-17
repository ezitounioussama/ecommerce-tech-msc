"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <aside className="flex flex-col gap-1">
      <h2 className="mb-2 px-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        Categories
      </h2>

      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
          selectedCategory === null
            ? "bg-accent-blue/10 text-accent-blue font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        All Products
      </button>

      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <button
            onClick={() => onSelectCategory(category._id)}
            className={cn(
              "w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
              selectedCategory === category._id
                ? "bg-accent-blue/10 text-accent-blue font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {category.name}
          </button>
        </motion.div>
      ))}
    </aside>
  );
}
