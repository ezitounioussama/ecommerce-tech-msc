"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { CURRENT_YEAR } from "@/constants";
import {
  IconBrandX,
  IconBrandGithub,
  IconBrandYoutube,
  IconArrowRight,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconHeadset,
  IconKeyboard,
  IconDeviceGamepad,
  IconCpu,
} from "@tabler/icons-react";

const productLinks = [
  { name: "Laptops", href: "/products?category=laptops", icon: IconDeviceLaptop },
  { name: "Smartphones", href: "/products?category=smartphones", icon: IconDeviceMobile },
  { name: "Accessories", href: "/products?category=accessories", icon: IconHeadset },
  { name: "Peripherals", href: "/products?category=peripherals", icon: IconKeyboard },
  { name: "Gaming", href: "/products?category=gaming", icon: IconDeviceGamepad },
  { name: "Components", href: "/products?category=components", icon: IconCpu },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Press", href: "/press" },
];

const supportLinks = [
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Shipping", href: "/shipping" },
  { name: "Returns", href: "/returns" },
];

const socialLinks = [
  { name: "X", href: "#", icon: IconBrandX },
  { name: "GitHub", href: "#", icon: IconBrandGithub },
  { name: "YouTube", href: "#", icon: IconBrandYoutube },
];

const footerHeight = 600;

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative"
      style={{ height: `${footerHeight}px`, clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div
        className="fixed bottom-0 w-full"
        style={{ height: `${footerHeight}px` }}
      >
        <div className="flex h-full flex-col bg-card">
          <div className="flex-1 px-6 py-16 sm:px-12 lg:px-20">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px" as const }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                className="mb-12"
              >
                <h2 className="heading-2">
                  <DiaTextReveal
                    text="Ready to level up your setup?"
                    colors={["#3B82F6", "#818cf8", "#f472b6"]}
                    textColor="var(--color-foreground)"
                    once={false}
                  />
                </h2>
                <Link
                  href="/contact"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-blue transition-colors hover:text-accent-purple"
                >
                  Get in touch
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px" as const }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0 }}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    Products
                  </p>
                  <ul className="space-y-3">
                    {productLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="group flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
                          >
                            <Icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent-blue" />
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px" as const }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.05 }}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    Company
                  </p>
                  <ul className="space-y-3">
                    {companyLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-secondary transition-colors hover:text-foreground"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px" as const }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.1 }}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    Support
                  </p>
                  <ul className="space-y-3">
                    {supportLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-secondary transition-colors hover:text-foreground"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px" as const }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.15 }}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    Connect
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-secondary transition-colors hover:bg-accent-blue/10 hover:text-accent-blue"
                          aria-label={link.name}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="border-t border-border px-6 py-5 sm:px-12 lg:px-20"
          >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                &copy; {CURRENT_YEAR} TechSphere. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <Link href="/privacy" className="transition-colors hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-foreground">
                  Terms
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
