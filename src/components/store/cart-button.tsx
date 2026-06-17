"use client";

import { motion, AnimatePresence } from "motion/react";
import { IconShoppingCart } from "@tabler/icons-react";
import { useCartStore } from "@/features/cart/store/cart-store";

export function CartButton() {
  const { items, openCart } = useCartStore();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <button
      onClick={openCart}
      className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
      aria-label={`Cart with ${count} items`}
    >
      <IconShoppingCart className="h-4 w-4" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[14px] items-center justify-center rounded-full bg-accent-blue px-1 text-[9px] font-bold leading-none text-primary-foreground"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
