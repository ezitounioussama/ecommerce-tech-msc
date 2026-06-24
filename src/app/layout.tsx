import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { poppins, pachel } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechSphere — Premium Technology Store",
  description:
    "Discover the latest laptops, smartphones, accessories, and gaming devices. Premium technology shopping experience.",
  openGraph: {
    title: "TechSphere",
    description: "Premium technology shopping experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSphere",
    description: "Premium technology shopping experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} ${pachel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-primary">
        <ClerkProvider
          appearance={{
            theme: shadcn,
            variables: {
              colorBackground: "var(--ts-card)",
              colorModalBackdrop: "var(--ts-backdrop)",
              colorInput: "var(--ts-input)",
            },
            elements: {
              cardBox: {
                boxShadow:
                  "0 4px 6px -2px rgba(0,0,0,0.3), 0 10px 30px -4px rgba(0,0,0,0.4)",
              },
              card: {
                background: "var(--ts-card)",
                border: "1px solid var(--ts-card-border)",
              },
              navbar: {
                background: "var(--ts-card)",
              },
              scrollBox: {
                background: "var(--ts-card)",
              },
              footer: {
                background: "var(--ts-card)",
              },
            },
          }}
        >
          <Toaster />
          <Suspense fallback={null}>
            <SmoothScroll>{children}</SmoothScroll>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}
