"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
