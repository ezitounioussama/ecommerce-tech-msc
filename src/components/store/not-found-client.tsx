"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Scene404 = dynamic(() => import("@/components/store/scene-404"), {
  ssr: false,
});

export function NotFoundClient() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Scene404 />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-8xl font-bold text-white/70">404</p>
          <p className="mt-2 text-sm text-white/40">Page not found</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-16">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12L12 3l9 9" />
            <path d="M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9" />
          </svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}
