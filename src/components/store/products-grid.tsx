"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconCpu,
  IconKeyboard,
  IconHeadphones,
  IconDeviceGamepad,
  IconShoppingCart,
  IconHeart,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { IconPackages, IconFilterOff } from "@tabler/icons-react";
import type { Product } from "@/types";
import Link from "next/link";

const categoryIcons: Record<string, typeof IconDeviceLaptop> = {
  "cat-laptops": IconDeviceLaptop,
  "cat-smartphones": IconDeviceMobile,
  "cat-components": IconCpu,
  "cat-peripherals": IconKeyboard,
  "cat-accessories": IconHeadphones,
  "cat-gaming": IconDeviceGamepad,
};

interface ProductsGridProps {
  products: Product[];
  isEmpty?: boolean;
}

export function ProductsGrid({ products, isEmpty }: ProductsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const addItem = useCartStore((state) => state.addItem);

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
        {products.map((product, index) => {
          const Icon = categoryIcons[product.categoryId] || IconDeviceLaptop;
          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * (index < 20 ? 0.05 : 0.025), ease: "easeOut" }}
            >
              <CometCard
                rotateDepth={12}
                translateDepth={10}
                className="rounded-xl border border-card-border bg-card overflow-hidden"
              >
                <Link href={`/products/${product.slug}`}>
                  {product.featured && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-accent-blue/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                      Featured
                    </span>
                  )}
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-surface to-card relative">
                    <Icon className="h-16 w-16 text-accent-blue/20 transition-all duration-500 group-hover:scale-110 group-hover:text-accent-blue/30" />
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {product.brand}
                    </span>
                    <h3 className="mt-1 line-clamp-1 heading-4 text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-foreground">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-3 bottom-3 z-10"
                >
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0] ?? "",
                        quantity: 1,
                      });
                    }}
                    className="text-muted-foreground hover:text-accent-blue bg-card/80 backdrop-blur-sm"
                  >
                    <IconShoppingCart className="h-4 w-4" />
                  </Button>
                </motion.div>

                <div className="absolute right-2 top-2 z-10">
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    className="bg-card/80 backdrop-blur-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconHeart className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CometCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
