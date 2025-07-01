"use client";

import { NextIntlClientProvider, type useMessages } from "next-intl";
import { ThemeProvider } from "next-themes";

import { $myId, SessionProvider } from "@/entities/auth";
import { ProfileProvider } from "@/entities/profile";

export default function ClientProviders({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: ReturnType<typeof useMessages>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <ProfileProvider $myProfileId={$myId}>{children}</ProfileProvider>
        </SessionProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
