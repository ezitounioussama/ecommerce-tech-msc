import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Press — TechSphere",
  description: "Press resources and media inquiries for TechSphere.",
};

export default function PressPage() {
  return (
    <StaticPage title="Press" description="Media resources and inquiries.">
      <p className="text-muted-foreground">
        For press inquiries, please reach out to our team at{" "}
        <a href="mailto:press@techsphere.com" className="text-accent-blue underline">press@techsphere.com</a>.
        We&apos;ll get back to you promptly with assets, product samples, and executive interview availability.
      </p>
    </StaticPage>
  );
}
