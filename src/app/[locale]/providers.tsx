"use client";

// import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { type useMessages } from "next-intl";

import { $myId, SessionProvider } from "@/entities/auth";
import { ProfileProvider } from "@/entities/profile";

export function ClientProviders({
  children,
}: // locale,
// messages,
// timeZone,
{
  children: React.ReactNode;
  locale: string;
  messages: ReturnType<typeof useMessages>;
  timeZone: string;
}) {
  return (
    // <NextIntlClientProvider
    //   locale={locale}
    //   messages={messages}
    //   timeZone={timeZone}
    // >
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
    // </NextIntlClientProvider>
  );
}
