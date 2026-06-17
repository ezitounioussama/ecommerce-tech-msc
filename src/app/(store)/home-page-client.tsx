"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/types";

const HeroSection = dynamic(
  () => import("@/components/store/hero-section").then((m) => ({ default: m.HeroSection })),
  { ssr: false },
);

const FeaturesSection = dynamic(
  () => import("@/components/store/features-section"),
  { ssr: false },
);

const FeaturedProductsSection = dynamic(
  () => import("@/components/store/featured-products-section").then((m) => ({ default: m.FeaturedProductsSection })),
  { ssr: false },
);

export function HomePageClient({ featuredProducts }: { featuredProducts: Product[] }) {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection products={featuredProducts} />
    </main>
  );
}
