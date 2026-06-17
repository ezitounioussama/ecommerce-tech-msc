"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <MacbookScroll
        title={
          <span className="flex flex-col items-center">
            <DiaTextReveal
              text="Premium Technology,"
              colors={["#3B82F6", "#818cf8", "#f472b6"]}
              textColor="var(--color-foreground)"
              className="heading-1"
              once={false}
            />
            <DiaTextReveal
              text="Engineered for Tomorrow."
              colors={["#f472b6", "#818cf8", "#3B82F6"]}
              textColor="var(--color-accent-blue)"
              className="heading-1"
              once={false}
            />
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
