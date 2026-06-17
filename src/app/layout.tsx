import {ClerkProvider} from "@clerk/nextjs";
import {shadcn} from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { editorial } from "@/lib/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-primary">
        <ClerkProvider appearance={{theme: shadcn}}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
