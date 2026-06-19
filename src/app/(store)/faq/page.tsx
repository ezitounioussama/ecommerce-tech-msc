import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "FAQ — TechSphere",
  description: "Frequently asked questions about ordering, shipping, returns, and more.",
};

export default function FaqPage() {
  return (
    <StaticPage title="FAQ" description="Answers to the questions we hear most often.">
      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-foreground">What payment methods do you accept?</h2>
          <p className="mt-1 text-sm text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">How long does shipping take?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Standard shipping takes 3-5 business days. Express shipping is available at checkout.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Can I return a product?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Yes — we offer a 30-day return policy on all unopened products. See our Returns page for details.
          </p>
        </div>
      </div>
    </StaticPage>
  );
}
