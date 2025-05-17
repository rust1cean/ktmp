import { createEvent } from "effector";

import { createStoreTemplate } from ".";
import type { Tables } from "@/shared/api/supabase";

export const createActivePostsStore = () => {
  const { $store: $postsStore, create, update, remove } = createStoreTemplate();

  const createPost = createEvent<Tables<"post">>();
  const updatePost = createEvent<Tables<"post">>();
  const deletePost = createEvent<Tables<"post">["id"]>();

  $postsStore.on(createPost, create);
  $postsStore.on(updatePost, update);
  $postsStore.on(deletePost, remove);

  return {
    $postsStore,
    createPost,
    updatePost,
    deletePost,
  };
};
