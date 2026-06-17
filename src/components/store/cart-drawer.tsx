"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconX, IconShoppingCart, IconTrash, IconMinus, IconPlus } from "@tabler/icons-react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeCart();
  }, [closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <IconShoppingCart className="h-5 w-5 text-foreground" />
                <h2 className="text-sm font-medium text-foreground">
                  Cart ({totalItems()})
                </h2>
              </div>
              <div className="flex items-center gap-1">
                {items.length > 0 && (
                  <Button variant="ghost" size="icon-xs" onClick={clearCart}>
                    <IconTrash className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
                <Button variant="ghost" size="icon-xs" onClick={closeCart}>
                  <IconX className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <IconShoppingCart className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="inline-flex items-center rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.li
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <IconShoppingCart className="h-5 w-5 text-muted-foreground/40" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="truncate text-sm font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toLocaleString()}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeItem(item.productId);
                                } else {
                                  updateQuantity(item.productId, item.quantity - 1);
                                }
                              }}
                              className="flex h-6 w-6 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <IconMinus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-xs tabular-nums text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <IconPlus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="self-start pt-1 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <IconX className="h-3.5 w-3.5" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border px-5 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${totalPrice().toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Shipping and taxes calculated at checkout
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
