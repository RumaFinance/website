import LanguageSelector from "@/components/LanguageSelector";
import "../globals.css";
import { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { TranslationsProvider } from "@/context/translations/TranslationsContext";
import { ReactLenis } from "lenis/react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: PageProps<"/[lang]">;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: PageProps<"/[lang]">;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <ReactLenis root>
          <TranslationsProvider dictionary={dictionary}>
            <header className="fixed top-0 z-50 p-6 flex justify-between lg:justify-end left-0 lg:right-0 w-full">
              <Image
                src="/logo-full.svg"
                alt="Logo"
                width={48}
                height={48}
                className="w-auto h-12 lg:hidden"
              />
              <LanguageSelector currentLocale={lang} />
            </header>
            {children}
          </TranslationsProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
