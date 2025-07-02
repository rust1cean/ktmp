import { Inter } from "next/font/google";
import { toast } from "sonner";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";

import "./globals.css";
import { Header } from "@/widgets/header";
import { ClientProviders } from "./providers";
import { Toaster } from "@/shared/shadcn/shadcn-ui/sonner";
import { PostDetailsModal } from "@/widgets/post-details-modal";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kidonia",
  description: "Kidonia Web Application",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${interSans.variable} antialiased`}>
        <ClientProviders
          locale={locale}
          messages={messages}
          timeZone="Europe/Athens"
        >
          <Header onNotifyUser={toast} />
          <main
            id="app"
            className="px-[3vw] lg:px-[10vw] 2xl:px-[25vw] py-[2dvh] md:py-[5dvh]"
          >
            {children}
          </main>
          <Toaster />
          <PostDetailsModal />
        </ClientProviders>
      </body>
    </html>
  );
}
