"use client";

import { useEffect } from "react";
import { useUnit } from "effector-react";
import type { Session } from "@supabase/supabase-js";

import { subscribeToAuthEvents } from "@/shared/api/supabase/auth";
import { sessionCreated, sessionDropped } from "@/entities/auth";
import { openAuthModalTab } from "@/features/auth-modal";

export type SessionProviderProps = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const [onSignedIn, onSignedOut] = useUnit([sessionCreated, sessionDropped]);

  useEffect(() => {
    const unsubscribeFromSessionEvents = subscribeToAuthEvents(
      ["INITIAL_SESSION", "SIGNED_IN", "SIGNED_OUT"],
      (session: Session | null) =>
        session == null ? onSignedOut() : onSignedIn(session)
    );

    const unsubscribeFromPasswordRecoveryEvent = subscribeToAuthEvents(
      "PASSWORD_RECOVERY",
      () => openAuthModalTab("resetPassword")
    );

    return () => {
      unsubscribeFromSessionEvents();
      unsubscribeFromPasswordRecoveryEvent();
    };
  });

  return <>{children}</>;
}
