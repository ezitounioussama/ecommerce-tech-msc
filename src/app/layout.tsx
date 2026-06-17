import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { poppins, pachel } from "@/lib/fonts";
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
        <ClerkProvider appearance={{ theme: shadcn }}>
          <Suspense fallback={null}>
            <SmoothScroll>{children}</SmoothScroll>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}
