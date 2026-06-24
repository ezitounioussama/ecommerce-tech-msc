"use client";

import { motion } from "motion/react";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10"
      >
        <IconX className="h-8 w-8 text-destructive" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Payment Cancelled
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your payment was not completed. No charges have been made.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/checkout"
            className="inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Return to Cart
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
