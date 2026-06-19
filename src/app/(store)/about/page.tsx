import type { Metadata } from "next";
import { StaticPage } from "../static-page";

export const metadata: Metadata = {
  title: "About Us — TechSphere",
  description: "Learn about TechSphere's mission to bring premium technology to enthusiasts worldwide.",
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Us"
      description="We're on a mission to curate the finest technology for enthusiasts who demand more."
    >
      <p className="text-muted-foreground">
        TechSphere was founded with a simple belief: great technology should be accessible, understandable, and enjoyable.
        We hand-select every product in our catalog, from flagship laptops to precision peripherals, ensuring only the best
        makes it to your doorstep.
      </p>
      <p className="text-muted-foreground">
        Our team of tech enthusiasts tests, reviews, and debates every item before it appears on our shelves.
        We don&apos;t just sell products — we recommend solutions tailored to how you create, work, and play.
      </p>
    </StaticPage>
  );
}
