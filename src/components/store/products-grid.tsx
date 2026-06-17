"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductCard } from "@/components/store/product-card";
import { IconPackages, IconFilterOff } from "@tabler/icons-react";
import type { Product } from "@/types";

interface ProductsGridProps {
  products: Product[];
  isEmpty?: boolean;
}

export function ProductsGrid({ products, isEmpty }: ProductsGridProps) {
  const prefersReducedMotion = useReducedMotion();

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <IconFilterOff className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground">No products found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </motion.div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <IconPackages className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground">Loading products...</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please wait while we fetch the latest inventory.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}
