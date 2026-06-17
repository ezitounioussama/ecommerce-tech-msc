"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { AnimatedThemeToggler } from "@/components/store/theme-toggler";

const navItems = [
  { name: "Products", link: "/products" },
  { name: "Categories", link: "/categories" },
  { name: "Deals", link: "/deals" },
  { name: "Support", link: "/support" },
];

export function NavbarWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-1">
          <AnimatedThemeToggler />
          <NavbarButton variant="secondary" href="/sign-in">
            Sign In
          </NavbarButton>
          <NavbarButton variant="primary" href="/sign-up">
            Get Started
          </NavbarButton>
        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-md px-4 py-2 text-secondary transition-colors hover:bg-card hover:text-primary"
            >
              {item.name}
            </a>
          ))}
          <div className="mt-4 flex w-full flex-col gap-2">
            <NavbarButton variant="secondary" href="/sign-in" className="w-full text-center">
              Sign In
            </NavbarButton>
            <NavbarButton variant="primary" href="/sign-up" className="w-full text-center">
              Get Started
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
