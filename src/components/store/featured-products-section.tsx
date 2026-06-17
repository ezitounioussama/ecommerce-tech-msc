"use client";

import { motion } from "motion/react";
import { IconArrowRight, IconDeviceLaptop, IconCpu, IconDeviceMobile, IconKeyboard } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { CometCard } from "@/components/ui/comet-card";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { MOCK_PRODUCTS } from "@/constants/products";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FeaturedProductsSection() {
  const featured = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4);

  const categoryIcons: Record<string, typeof IconDeviceLaptop> = {
    "cat-laptops": IconDeviceLaptop,
    "cat-smartphones": IconDeviceMobile,
    "cat-components": IconCpu,
    "cat-peripherals": IconKeyboard,
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-accent-blue">
              Featured
            </span>
            <h2 className="mt-2">
              <DiaTextReveal
                text="Our Top Picks"
                colors={["#3B82F6", "#818cf8", "#f472b6", "#34d399"]}
                className="text-3xl font-bold tracking-tight lg:text-4xl"
              />
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-selected premium technology for enthusiasts
            </p>
          </div>
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}
          >
            View All
            <IconArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => {
            const Icon = categoryIcons[product.categoryId] || IconDeviceLaptop;
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CometCard
                  rotateDepth={12}
                  translateDepth={10}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-surface to-card">
                      <Icon className="h-16 w-16 text-accent-blue/20" />
                    </div>

                    <div className="p-4">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {product.brand}
                      </span>
                      <h3 className="mt-1 line-clamp-1 text-sm font-medium text-foreground">
                        {product.name}
                      </h3>
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
                </CometCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            View All Products
            <IconArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
