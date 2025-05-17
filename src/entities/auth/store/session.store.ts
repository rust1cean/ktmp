import { createEvent, createStore } from "effector";
import type { Session } from "@supabase/supabase-js";

export const sessionCreated = createEvent<Session>();
export const sessionDropped = createEvent();

export const $session = createStore<Session | null>(null);
export const $isSignedIn = $session.map((session) => session != null);
export const $isSignedOut = $session.map((session) => session == null);

$session.on(sessionCreated, (_, newSession) => newSession);
$session.on(sessionDropped, () => null);
