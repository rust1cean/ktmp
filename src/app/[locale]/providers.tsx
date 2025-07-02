"use client";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "next-themes";

import { $myId, SessionProvider } from "@/entities/auth";
import { ProfileProvider } from "@/entities/profile";

export function Providers({
  children,
  locale,
  timeZone,
}: {
  children: React.ReactNode;
  locale: string;
  timeZone: string;
}) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
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
