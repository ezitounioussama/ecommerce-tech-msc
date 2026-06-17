"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { IconSearch, IconLayoutGrid, IconList } from "@tabler/icons-react";
import { ProductsGrid } from "@/components/store/products-grid";
import { CategorySidebar } from "@/components/store/category-sidebar";
import { ProductSort } from "@/components/store/product-sort";
import { Button } from "@/components/ui/button";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import type { Product, Category } from "@/types";

interface ProductsPageClientProps {
  products: Product[];
  categories: Category[];
}

export function ProductsPageClient({ products, categories }: ProductsPageClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState("newest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return result;
  }, [products, selectedCategory, search, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1>
          <DiaTextReveal
            text="Products"
            colors={["#3B82F6", "#818cf8", "#f472b6"]}
            textColor="var(--color-foreground)"
            className="text-3xl font-bold tracking-tight"
          />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
        </p>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IconLayoutGrid className="h-4 w-4" />
            Categories
          </Button>
          <ProductSort value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="flex gap-8">
        <motion.aside
          layout
          className={`
            hidden w-56 shrink-0 flex-col lg:flex
            ${isSidebarOpen ? "fixed inset-0 z-50 flex bg-background/80 backdrop-blur-sm lg:relative lg:inset-auto lg:z-auto lg:flex lg:bg-transparent lg:backdrop-blur-none" : ""}
          `}
        >
          <div className="sticky top-24">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </motion.aside>

        <div className="flex-1">
          <ProductsGrid products={filtered} isEmpty={filtered.length === 0 && (!!selectedCategory || !!search)} />
        </div>
      </div>
    </div>
  );
}
