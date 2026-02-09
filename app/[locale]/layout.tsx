import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LanguageSelector from "@/components/LanguageSelector";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruma - Easy crypto wallet",
  description: "Self-custody Ethereum wallet",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Header with Language Selector */}
          <header className="fixed top-0 right-0 z-50 p-6">
            <LanguageSelector currentLocale={locale} />
          </header>

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
