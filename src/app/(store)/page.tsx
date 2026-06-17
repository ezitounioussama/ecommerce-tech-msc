import { HeroSection } from "@/components/store/hero-section";
import FeaturesSection from "@/components/store/features-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
