"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AnimatedThemeToggler({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const isLight = saved === "light" || (!saved && prefersLight);
    document.documentElement.classList.toggle("light", isLight);
    setIsDark(!isLight);
    setMounted(true);
  }, []);

  const toggle = () => {
    const apply = () => {
      const nowLight = document.documentElement.classList.toggle("light");
      setIsDark(!nowLight);
      localStorage.setItem("theme", nowLight ? "light" : "dark");
    };

    if (typeof document.startViewTransition !== "function") {
      flushSync(apply);
      return;
    }

    const t = document.startViewTransition(() => flushSync(apply));
    t.ready.then(() => {
      const rect = ref.current?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : innerWidth / 2;
      const cy = rect ? rect.top + rect.height / 2 : innerHeight / 2;
      const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
        { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      type="button"
      onClick={toggle}
      className={cn(className)}
      aria-label="Toggle theme"
    >
      {mounted && (isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
    </Button>
  );
}
