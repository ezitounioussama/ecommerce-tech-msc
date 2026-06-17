"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const updateTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setIsDarkMode(!isLight);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        if (mediaQuery.matches) {
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.add("light");
        }
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    updateTheme();

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    const toggleTheme = () => {
      const isLight = document.documentElement.classList.toggle("light");
      setIsDarkMode(!isLight);
      localStorage.setItem("theme", isLight ? "light" : "dark");
    };

    type StartViewTransition = (callback: () => void) => {
      ready: Promise<void>;
    };
    const doc = document as unknown as {
      startViewTransition?: StartViewTransition;
    };

    if (typeof doc.startViewTransition !== "function") {
      flushSync(toggleTheme);

      try {
        const { top, left, width, height } =
          buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;
        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.98 },
            {
              clipPath: `circle(${maxRad}px at ${x}px ${y}px)`,
              opacity: 1,
            },
          ],
          { duration: 650, easing: "ease-in-out" },
        );
      } catch {}
      return;
    }

    await doc.startViewTransition!(() => {
      flushSync(toggleTheme);
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  if (!mounted) {
    return (
      <Button
        ref={buttonRef}
        onClick={changeTheme}
        className={cn(className)}
        variant="ghost"
        size="icon"
        type="button"
        aria-label="Toggle color theme"
        title="Toggle color theme"
        aria-pressed={isDarkMode}
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(className)}
      variant="ghost"
      size="icon"
      type="button"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
    >
      {isDarkMode ? (
        <IconSun className="h-5 w-5" />
      ) : (
        <IconMoon className="h-5 w-5" />
      )}
    </Button>
  );
};
