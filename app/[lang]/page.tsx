import Hero from "@/components/Hero";

export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  return (
    <main>
      <Hero lang={lang} />
    </main>
  );
}
