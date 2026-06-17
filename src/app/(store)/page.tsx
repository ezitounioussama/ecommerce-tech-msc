import { HeroSection } from "@/components/store/hero-section";
import FeaturesSection from "@/components/store/features-section";
import { FeaturedProductsSection } from "@/components/store/featured-products-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
    </main>
  );
}
