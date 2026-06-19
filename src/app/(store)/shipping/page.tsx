import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Shipping — TechSphere",
  description: "Shipping information and delivery timelines for TechSphere orders.",
};

export default function ShippingPage() {
  return (
    <StaticPage title="Shipping" description="How we get your gear to you.">
      <p className="text-muted-foreground">
        We ship to all 50 US states and select international destinations. Orders are processed within
        1 business day and shipped via our trusted carrier partners.
      </p>
      <p className="text-muted-foreground">
        Free standard shipping on all orders over $99. Express and overnight options are available
        at checkout for an additional fee.
      </p>
    </StaticPage>
  );
}
