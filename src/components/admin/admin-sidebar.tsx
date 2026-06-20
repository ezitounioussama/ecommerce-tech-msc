"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconPackage,
  IconShoppingCart,
  IconUsers,
  IconCategory,
  IconPackageExport,
  IconSettings,
  IconArrowLeft,
  IconDeviceLaptop,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

const iconClass = "h-5 w-5 shrink-0 text-muted-foreground";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconLayoutDashboard className={iconClass} />,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: <IconPackage className={iconClass} />,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: <IconShoppingCart className={iconClass} />,
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: <IconCategory className={iconClass} />,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <IconUsers className={iconClass} />,
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: <IconPackageExport className={iconClass} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <IconSettings className={iconClass} />,
  },
];

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row",
        "min-h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r border-card-border bg-card">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-1">
              {adminLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={{
                    ...link,
                    icon: (
                      <div className={cn(pathname === link.href && "text-accent-blue")}>
                        {link.icon}
                      </div>
                    ),
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2 px-2 py-2">
              <AnimatedThemeToggler />
              <motion.span
                animate={{
                  opacity: open ? 1 : 0,
                  display: open ? "inline-block" as const : "none" as const,
                }}
                className="text-sm text-muted-foreground"
              >
                Toggle theme
              </motion.span>
            </div>
            <SidebarLink
              link={{
                label: "Back to Store",
                href: "/",
                icon: <IconArrowLeft className={iconClass} />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex flex-1 bg-background">
        <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

const Logo = () => (
  <Link
    href="/dashboard"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
  >
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-blue">
      <IconDeviceLaptop className="h-4 w-4 text-primary-foreground" />
    </div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-heading text-base font-semibold whitespace-pre text-foreground"
    >
      TechSphere
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link
    href="/dashboard"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
  >
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-blue">
      <IconDeviceLaptop className="h-4 w-4 text-primary-foreground" />
    </div>
  </Link>
);
