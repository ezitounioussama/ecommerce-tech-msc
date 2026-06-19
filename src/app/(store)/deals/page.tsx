import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Deals — TechSphere",
  description: "Exclusive deals and limited-time offers on premium technology.",
};

export default function DealsPage() {
  return (
    <StaticPage title="Deals" description="Limited-time offers on premium tech.">
      <p className="text-muted-foreground">
        There are no active deals right now. Check back soon — we regularly rotate exclusive offers
        on our top products.
      </p>
      <p className="text-muted-foreground">
        In the meantime, browse our{" "}
        <a href="/products" className="text-accent-blue underline">full catalog</a> for the latest
        in premium technology.
      </p>
    </StaticPage>
  );
}
