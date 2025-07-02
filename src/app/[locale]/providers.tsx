"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { getMessages } from "next-intl/server";
import { use } from "react";

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
  const messages = use(getMessages());

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
