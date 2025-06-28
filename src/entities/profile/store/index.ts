import { createEvent, createStore, sample } from "effector";

import type { Profile, ProfileRole } from "../types";

export const profileUpdated = createEvent<Profile | null>();
export const roleUpdated = createEvent<ProfileRole>();

export const $myProfile = createStore<Profile | null>(null);
export const $isAuthor = $myProfile.map(
  (profile) => profile?.role === "author"
);

sample({
  clock: profileUpdated,
  target: $myProfile,
});

sample({
  clock: roleUpdated,
  source: $myProfile,
  fn: (source: Profile | null, clock: ProfileRole) =>
    source ? { ...source, role: clock } : null,
  target: $myProfile,
});
