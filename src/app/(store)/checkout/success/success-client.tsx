"use client";

import { motion } from "motion/react";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import type { Order } from "@/types";

interface Props {
  order: Order | null;
}

export function CheckoutSuccessClient({ order }: Props) {
  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Order Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t find this order. It may still be processing.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10"
      >
        <IconCircleCheck className="h-8 w-8 text-emerald-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. Your order is being processed.
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-xl border border-border bg-card p-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono text-foreground">{order._id.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="capitalize text-foreground">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium text-foreground">${order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">{order.customerEmail}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
          <Link
            href="/products"
            className="inline-flex rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Browse Products
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          A confirmation email will be sent to {order.customerEmail} once the payment is verified.
        </p>
      </motion.div>
    </main>
  );
}
