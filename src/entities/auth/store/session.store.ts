import { createEvent, createStore } from "effector";
import type { Session } from "@supabase/supabase-js";

export const sessionCreated = createEvent<Session>();
export const sessionDropped = createEvent();

export const $session = createStore<Session | null>(null)
  .on(sessionCreated, (_, newSession) => newSession)
  .on(sessionDropped, () => null);

export const $myId = $session.map((session) => session?.user.id, {
  skipVoid: false,
});
export const $isSignedIn = $session.map((session) => session != null);
export const $isSignedOut = $session.map((session) => session == null);
