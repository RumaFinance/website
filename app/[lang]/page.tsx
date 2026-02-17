import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import FeatureSection from "@/components/FeatureSection";

export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  return (
    <main className="overflow-x-hidden overflow-y-visible">
      <Hero lang={lang} />
    </main>
  );
}
