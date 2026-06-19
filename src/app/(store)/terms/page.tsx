import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Terms of Service — TechSphere",
  description: "TechSphere terms and conditions.",
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" description="The fine print, made clear.">
      <p className="text-muted-foreground">
        By using TechSphere, you agree to these terms. All products are sold subject to availability
        and we reserve the right to limit quantities. Prices are subject to change without notice.
      </p>
      <p className="text-muted-foreground">
        All content on this website is the property of TechSphere and may not be reproduced without
        permission. For questions about these terms, contact{" "}
        <a href="mailto:legal@techsphere.com" className="text-accent-blue underline">legal@techsphere.com</a>.
      </p>
    </StaticPage>
  );
}
