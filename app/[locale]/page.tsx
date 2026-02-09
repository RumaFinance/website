import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import FeatureSection from "@/components/FeatureSection";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />

      <ProductDemo />

      <FeatureSection />

      {/* Call to Action Section */}
    </main>
  );
}
