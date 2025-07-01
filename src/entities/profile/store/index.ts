import { createEvent, createStore } from "effector";

import type { Profile, ProfileRole } from "../types";

export const profileUpdated = createEvent<Profile | null>();
export const roleUpdated = createEvent<ProfileRole>();
export const nameUpdated = createEvent<string>();

export const $myProfile = createStore<Profile | null>(null)
  .on(roleUpdated, (profile, role) => (profile ? { ...profile, role } : null))
  .on(nameUpdated, (profile, name) => (profile ? { ...profile, name } : null))
  .on(profileUpdated, (_, updatedProfile) => updatedProfile);

export const $isAuthor = $myProfile.map(
  (profile) => profile?.role === "author"
);
