import { createEffect } from "effector";
import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

import {
  getSession,
  signInWithOAuth,
  signIn,
  signUp,
  signOut,
  subscribeToAuthEvents,
  type OAuthProvider,
  type AuthEventSubscriber,
  type SubscribedAuthEvents,
} from "@/shared/data/auth/api";

export const loadSessionFx = createEffect(async () => {
  const { error } = await getSession();

  if (error) {
    return error;
  }
});

export const signInWithOAuthFx = createEffect(
  async (provider: OAuthProvider) => {
    const error = await signInWithOAuth(provider);

    if (error) {
      return error;
    }
  }
);

export const signInFx = createEffect(
  async (credentials: SignInWithPasswordCredentials) => {
    const res = await signIn(credentials);

    return res;
  }
);

export const signUpFx = createEffect(
  async (credentials: SignUpWithPasswordCredentials) => {
    const res = await signUp(credentials);

    return res;
  }
);

export const signOutFx = createEffect(async () => {
  const error = await signOut();

  if (error) {
    return error;
  }
});

export const subscribeToAuthEventsFx = (
  events: SubscribedAuthEvents,
  subscriber: AuthEventSubscriber
) => {
  return subscribeToAuthEvents(events, subscriber);
};
