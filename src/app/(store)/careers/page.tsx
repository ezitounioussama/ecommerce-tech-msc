import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Careers — TechSphere",
  description: "Join the TechSphere team and help us shape the future of tech retail.",
};

export default function CareersPage() {
  return (
    <StaticPage title="Careers" description="Come build the future of tech commerce with us.">
      <p className="text-muted-foreground">
        We don&apos;t have any open roles right now, but we&apos;re always looking for talented people
        who share our passion for technology. Reach out and tell us what you&apos;d bring to the team.
      </p>
    </StaticPage>
  );
}
