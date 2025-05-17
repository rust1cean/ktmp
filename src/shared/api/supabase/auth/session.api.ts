import type {
  AuthChangeEvent,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

import { supabase } from "@/shared/api/supabase";

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return { error, session };
};

export const signIn = async (credentials: SignInWithPasswordCredentials) => {
  const {
    data: { session, user },
    error,
  } = await supabase.auth.signInWithPassword(credentials);

  return { error, session, user };
};

export type OAuthProvider = "google" | "apple";

export const signInWithOAuth = async (provider: OAuthProvider) => {
  const { error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) return error;
};

export const signUp = async (credentials: SignUpWithPasswordCredentials) => {
  const {
    data: { session, user },
    error,
  } = await supabase.auth.signUp(credentials);

  return { error, session, user };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) return error;
};

export type SubscribedAuthEvents = AuthChangeEvent | AuthChangeEvent[];
export type AuthEventSubscriber = (
  session: Session | null,
  event: AuthChangeEvent
) => void;

export const subscribeToAuthEvents = (
  events: SubscribedAuthEvents,
  subscriber: AuthEventSubscriber
) => {
  const isExpectedEventHappened = Array.isArray(events)
    ? (eventHappened: AuthChangeEvent) => events.includes(eventHappened)
    : (eventHappened: AuthChangeEvent) => eventHappened === events;

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (isExpectedEventHappened(event)) {
      subscriber(session, event);
    }
  });

  return data.subscription.unsubscribe;
};
