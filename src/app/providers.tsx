"use client";

import { $myId, SessionProvider } from "@/entities/auth";
import { ProfileProvider } from "@/entities/profile";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
