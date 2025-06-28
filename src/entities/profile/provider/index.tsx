"use client";

import { useEffect } from "react";
import { useUnit } from "effector-react";
import { type Store } from "effector";

import { profileUpdated } from "../store";
import { getProfileFx } from "../model";

export type ProfileProviderProps = {
  children: React.ReactNode;
  $myProfileId: Store<string | null | undefined>;
};

export function ProfileProvider({
  children,
  $myProfileId,
}: ProfileProviderProps) {
  const [profileId, updateProfile] = useUnit([$myProfileId, profileUpdated]);

  useEffect(() => {
    if (profileId) {
      getProfileFx({ profileId }).then(updateProfile);
    }
  }, [profileId, updateProfile]);

  return children;
}
