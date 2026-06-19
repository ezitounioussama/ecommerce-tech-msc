import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "Blog — TechSphere",
  description: "Stories, guides, and insights from the TechSphere team.",
};

export default function BlogPage() {
  return (
    <StaticPage title="Blog" description="Coming soon — we're writing something good.">
      <p className="text-muted-foreground">
        Our blog will feature deep dives into the latest tech, buying guides, setup showcases, and
        behind-the-scenes looks at how we curate our catalog. Stay tuned.
      </p>
    </StaticPage>
  );
}
