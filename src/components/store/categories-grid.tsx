"use client";

import Link from "next/link";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconCpu,
  IconKeyboard,
  IconHeadphones,
  IconDeviceGamepad,
  type Icon,
} from "@tabler/icons-react";
import { CometCard } from "@/components/ui/comet-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { Category } from "@/types";

const categoryIcons: Record<string, Icon> = {
  laptops: IconDeviceLaptop,
  smartphones: IconDeviceMobile,
  components: IconCpu,
  peripherals: IconKeyboard,
  accessories: IconHeadphones,
  gaming: IconDeviceGamepad,
};

interface CategoriesGridProps {
  categories: Category[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
      {categories.map((cat) => {
        const Icon = categoryIcons[cat.slug];
        return (
          <CometCard
            key={cat._id}
            rotateDepth={14}
            translateDepth={12}
          >
            <Link href={`/products?category=${cat.slug}`}>
              <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    {Icon && (
                      <div className="w-fit rounded-lg border border-card-border p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-balance text-foreground">
                        {cat.name}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CometCard>
        );
      })}
    </div>
  );
}
