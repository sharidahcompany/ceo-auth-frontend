import "../globals.css";
import React from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const ibmPlex = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CEO App",
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${ibmPlex.variable} ${ibmPlex.variable} h-full antialiased`}
    >
      <body>
        <NextIntlClientProvider>{children} </NextIntlClientProvider>
      </body>
    </html>
  );
}
