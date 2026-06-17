import { getFeaturedProducts } from "@/lib/data";
import { HomePageClient } from "./home-page-client";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return <HomePageClient featuredProducts={featuredProducts} />;
}
