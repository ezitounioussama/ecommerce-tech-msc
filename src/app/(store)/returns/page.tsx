import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Returns — TechSphere",
  description: "TechSphere return policy — 30-day returns on unopened products.",
};

export default function ReturnsPage() {
  return (
    <StaticPage title="Returns" description="30-day return policy, no hassle.">
      <p className="text-muted-foreground">
        If you&apos;re not completely satisfied, you can return any unopened product within 30 days
        of delivery for a full refund. Opened items may be subject to a restocking fee.
      </p>
      <p className="text-muted-foreground">
        To start a return, contact our support team with your order number. We&apos;ll provide a
        prepaid return label and process your refund within 5 business days of receiving the item.
      </p>
    </StaticPage>
  );
}
