"use client";

import { useClerk } from "@clerk/nextjs";

function getModalAppearance() {
  const isLight = document.documentElement.classList.contains("light");

  return {
    variables: {
      colorBackground: isLight ? "#ffffff" : "#111111",
      colorModalBackdrop: isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.5)",
      colorInput: isLight ? "#f5f5f5" : "#1a1a1a",
    },
    elements: {
      cardBox: {
        boxShadow:
          "0 4px 6px -2px rgba(0,0,0,0.3), 0 10px 30px -4px rgba(0,0,0,0.4)",
      },
      card: {
        border: isLight
          ? "1px solid rgba(0,0,0,0.1)"
          : "1px solid rgba(255,255,255,0.1)",
      },
      footer: {
        background: isLight ? "#ffffff" : "#111111",
      },
    },
  };
}

export function AuthDialog() {
  const clerk = useClerk();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() =>
          clerk.openSignIn({
            fallbackRedirectUrl: "/",
            appearance: getModalAppearance(),
          })
        }
        className="px-4 py-2 rounded-md text-sm font-semibold transition duration-200 bg-transparent text-secondary hover:text-primary"
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => clerk.openSignUp({ appearance: getModalAppearance() })}
        className="px-4 py-2 rounded-md text-sm font-semibold transition duration-200 bg-accent-blue text-primary-foreground hover:bg-accent-blue/80"
      >
        Get Started
      </button>
    </div>
  );
}
