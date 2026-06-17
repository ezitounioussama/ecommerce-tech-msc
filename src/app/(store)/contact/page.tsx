import type { Metadata } from "next";
import { ContactPageClient } from "./_components/contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us — TechSphere",
  description:
    "Get in touch with the TechSphere team. We are here to help with any questions about our products, orders, or services.",
  openGraph: {
    title: "Contact Us — TechSphere",
    description:
      "Get in touch with the TechSphere team. We are here to help with any questions about our products, orders, or services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — TechSphere",
    description:
      "Get in touch with the TechSphere team.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
