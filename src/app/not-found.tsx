import type { Metadata } from "next";
import { NotFoundClient } from "@/components/store/not-found-client";

export const metadata: Metadata = {
  title: "404 — Page Not Found | TechSphere",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return <NotFoundClient />;
}
