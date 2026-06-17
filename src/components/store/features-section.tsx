"use client";

import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  IconShieldCheck,
  IconSearch,
  IconTruckDelivery,
  IconDeviceLaptop,
} from "@tabler/icons-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export default function FeaturesSection() {
  const features = [
    {
      title: "Explore cutting-edge technology",
      description:
        "Browse thousands of premium laptops, smartphones, components, and gaming gear. Filter by specs, compare side-by-side, and find your perfect match.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-border",
    },
    {
      title: "Find it in seconds",
      description:
        "Our AI-powered search understands what you're looking for. Describe it in your own words and get instant, accurate results.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-border",
    },
    {
      title: "Shop with confidence",
      description:
        "Enterprise-grade security powered by Clerk. Every transaction is encrypted, and your data stays yours. Zero-compromise protection.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-border",
    },
    {
      title: "Delivered worldwide",
      description:
        "From our warehouse to your doorstep. Real-time tracking with global shipping partners. Fast, reliable, and fully insured.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3",
    },
  ];

  return (
    <div className="relative z-20 mx-auto max-w-7xl px-4 py-10 lg:py-40">
      <div className="px-8">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight lg:text-5xl lg:leading-tight">
          <DiaTextReveal
            text="Everything you need."
            colors={["#3B82F6", "#818cf8", "#f472b6"]}
            textColor="var(--color-foreground)"
            className="text-3xl font-medium tracking-tight lg:text-5xl lg:leading-tight"
          />
          <br />
          <DiaTextReveal
            text="Nothing you don't."
            colors={["#f472b6", "#818cf8", "#3B82F6"]}
            textColor="var(--color-accent-blue)"
            className="text-3xl font-medium tracking-tight lg:text-5xl lg:leading-tight"
          />
        </h4>
        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-secondary lg:text-base">
          From browsing to delivery, TechSphere delivers a premium shopping
          experience for every tech enthusiast.
        </p>
      </div>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 rounded-md lg:grid-cols-6 xl:border xl:border-border">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative overflow-hidden p-4 sm:p-8", className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="mx-auto max-w-5xl text-left text-xl tracking-tight text-primary md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-left text-sm md:text-base",
        "text-secondary",
        "mx-0 my-2 max-w-sm text-left md:text-sm",
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full bg-card p-5 shadow-2xl">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "MacBook Pro", price: "$2,499" },
              { name: "iPhone 16 Pro", price: "$1,199" },
              { name: "RTX 5090", price: "$1,999" },
              { name: "AirPods Max", price: "$549" },
            ].map((product, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-lg bg-surface p-3"
              >
                <div className="flex h-16 w-full items-center justify-center rounded-md bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                  <IconDeviceLaptop className="h-8 w-8 text-accent-blue" />
                </div>
                <span className="text-xs font-medium text-primary">
                  {product.name}
                </span>
                <span className="text-xs text-secondary">{product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-background via-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-background via-transparent to-transparent" />
    </div>
  );
};

export const SkeletonTwo = () => {
  const items = [
    { label: "Gaming laptops under $1500", icon: "🎮" },
    { label: "Best wireless earbuds 2026", icon: "🎧" },
    { label: "Mechanical keyboards", icon: "⌨️" },
    { label: "4K monitors for editing", icon: "🖥️" },
  ];

  return (
    <div className="relative flex h-full flex-col items-start gap-4 overflow-hidden p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-surface p-3 text-sm text-primary">
          <IconSearch className="h-4 w-4 text-accent-blue" />
          <span className="text-secondary">Search products...</span>
        </div>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="flex items-center gap-3 rounded-lg bg-card p-3 text-sm text-primary"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-blue/10">
        <IconShieldCheck className="h-10 w-10 text-accent-blue" />
      </div>
      <div className="flex w-full flex-col gap-2">
        {[
          { label: "Clerk Authentication", done: true },
          { label: "End-to-end encryption", done: true },
          { label: "PCI-compliant payments", done: true },
          { label: "GDPR compliant", done: true },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-blue/20">
              <span className="text-xs text-accent-blue">✓</span>
            </div>
            <span className="text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative mt-10 flex h-60 flex-col items-center md:h-60">
      <Globe className="absolute -right-10 -bottom-80 md:-right-10 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 4000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.227, 0.51, 0.965],
      glowColor: [0.227, 0.51, 0.965],
      markers: [
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.08 },
        { location: [35.6762, 139.6503], size: 0.08 },
        { location: [1.3521, 103.8198], size: 0.08 },
        { location: [-33.8688, 151.2093], size: 0.08 },
      ],
    });

    const animate = () => {
      globe.update({ phi: (performance.now() / 10000) % (Math.PI * 2) });
      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
