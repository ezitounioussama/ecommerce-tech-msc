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
} from "@/components/ui/resizable-navbar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AuthDialog } from "@/components/store/auth-dialog";
import {
  Show,
  UserButton,
} from "@clerk/nextjs";

const navItems = [
  { name: "Products", link: "/products" },
  { name: "Categories", link: "/categories" },
  { name: "Deals", link: "/deals" },
  { name: "Support", link: "/support" },
];

function AuthButtons() {
  return (
    <>
      <Show when="signed-out">
        <AuthDialog />
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
      </Show>
    </>
  );
}

export function NavbarWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-1">
          <AnimatedThemeToggler />
          <AuthButtons />
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
            <div className="flex w-full justify-center">
              <AuthButtons />
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
