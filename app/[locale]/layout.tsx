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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <header className="fixed top-0 right-0 z-50 p-6">
            <LanguageSelector currentLocale={locale} />
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
