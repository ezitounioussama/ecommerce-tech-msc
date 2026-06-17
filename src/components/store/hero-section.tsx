"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <MacbookScroll
        title={
          <span>
            Premium Technology, <br />
            <span className="text-accent-blue">Engineered for Tomorrow.</span>
          </span>
        }
        badge={
          <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-sm text-secondary">
            <span className="flex h-2 w-2 rounded-full bg-accent-blue" />
            New arrivals shipping now
          </div>
        }
        showGradient
      />
    </section>
  );
}
