"use client";

import { motion } from "motion/react";
import { IconShoppingCart, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useCartStore } from "@/features/cart/store/cart-store";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.button
      onClick={handleAdd}
      disabled={product.stock === 0 || product.status !== "published"}
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {added ? (
        <>
          <IconCheck className="h-4 w-4" />
          Added to Cart
        </>
      ) : product.stock === 0 ? (
        "Out of Stock"
      ) : (
        <>
          <IconShoppingCart className="h-4 w-4" />
          Add to Cart — ${product.price.toLocaleString()}
        </>
      )}
    </motion.button>
  );
}
