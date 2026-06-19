import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Privacy Policy — TechSphere",
  description: "TechSphere privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" description="Your data, your control.">
      <p className="text-muted-foreground">
        TechSphere respects your privacy. We collect only the information necessary to process your
        orders and improve your experience. We never sell your personal data to third parties.
      </p>
      <p className="text-muted-foreground">
        For full details, please contact our privacy team at{" "}
        <a href="mailto:privacy@techsphere.com" className="text-accent-blue underline">privacy@techsphere.com</a>.
      </p>
    </StaticPage>
  );
}
