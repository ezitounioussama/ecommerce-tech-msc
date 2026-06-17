"use client";

import { motion, useReducedMotion } from "motion/react";
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
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useCartStore } from "@/features/cart/store/cart-store";

const categoryIcons: Record<string, typeof IconDeviceLaptop> = {
  "cat-laptops": IconDeviceLaptop,
  "cat-smartphones": IconDeviceMobile,
  "cat-components": IconCpu,
  "cat-peripherals": IconKeyboard,
  "cat-accessories": IconHeadphones,
  "cat-gaming": IconDeviceGamepad,
};

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const addItem = useCartStore((state) => state.addItem);

  const CategoryIcon = categoryIcons[product.categoryId] || IconDeviceLaptop;

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * (index < 20 ? 0.05 : 0.025), ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent-blue/30 hover:shadow-[0_0_30px_-6px] hover:shadow-accent-blue/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface to-card">
        <div className="flex h-full items-center justify-center">
          <CategoryIcon className="h-16 w-16 text-accent-blue/20 transition-all duration-500 group-hover:scale-110 group-hover:text-accent-blue/30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button
            size="icon-xs"
            variant="ghost"
            className="bg-card/80 backdrop-blur-sm"
          >
            <IconHeart className="h-3.5 w-3.5" />
          </Button>
        </div>

        {product.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-accent-blue/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </span>

        <h3 className="line-clamp-1 heading-4 text-foreground transition-colors group-hover:text-accent-blue">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() =>
                addItem({
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] ?? "",
                  quantity: 1,
                })
              }
              className="text-muted-foreground hover:text-accent-blue"
            >
              <IconShoppingCart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
