import { createEffect } from "effector";

import {
  becomeAuthor,
  getProfile,
  updateName,
} from "@/shared/data/profile/api";
import { profileDtoToProfileModel } from "./mapper";
import { nameUpdated, roleUpdated } from "../store";

export const getProfileFx = createEffect(
  async ({ profileId }: { profileId: string }) => {
    const { data: profile, error } = await getProfile(profileId);

    if (error) {
      throw error;
    }

    if (profile) {
      return profileDtoToProfileModel(profile);
    }

    return null;
  }
);

export const becomeAuthorFx = createEffect(
  async ({ profileId }: { profileId: string }) => {
    const { error } = await becomeAuthor(profileId);

    if (error) {
      throw error;
    }

    roleUpdated("author");
  }
);

export const updateNameFx = createEffect(
  async (data: { profileId: string; name: string }) => {
    const { error } = await updateName(data);

    if (error) {
      throw error;
    }

    nameUpdated(data.name);
  }
);
