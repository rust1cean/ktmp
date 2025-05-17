import { createEvent } from "effector";

import { createStoreTemplate } from ".";
import type { Tables } from "@/shared/api/supabase";

export const createDraftsStore = () => {
  const {
    $store: $draftsStore,
    create,
    update,
    remove,
  } = createStoreTemplate();

  const createDraft = createEvent<Tables<"post">>();
  const updateDraft = createEvent<Tables<"post">>();
  const deleteDraft = createEvent<Tables<"post">["id"]>();

  $draftsStore.on(createDraft, create);
  $draftsStore.on(updateDraft, update);
  $draftsStore.on(deleteDraft, remove);

  return {
    $draftsStore,
    createDraft,
    updateDraft,
    deleteDraft,
  };
};
