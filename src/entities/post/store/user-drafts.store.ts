import { createStore, sample } from "effector";

import {
  mergePosts,
  addPost,
  updatePost,
  deletePostById,
  deletePostByObject,
  purge,
  postMarkedAsDraft,
  postUnmarkedAsDraft,
  draftCreated,
  draftDeleted,
  postUpdated,
  userDraftsCleared,
  userDraftsFetched,
} from "./events";
import type { Post } from "../types";

export const $userDrafts = createStore<Post[]>([]);

// Add fetched posts
sample({
  clock: userDraftsFetched,
  source: $userDrafts,
  fn: mergePosts,
  target: $userDrafts,
});

// Add created post
sample({
  clock: draftCreated,
  source: $userDrafts,
  fn: addPost,
  target: $userDrafts,
});

// Add post which was marked as draft
sample({
  clock: postMarkedAsDraft,
  source: $userDrafts,
  fn: addPost,
  target: $userDrafts,
});

// Update post
sample({
  clock: postUpdated,
  source: $userDrafts,
  fn: updatePost,
  target: $userDrafts,
});

// Delete post
sample({
  clock: draftDeleted,
  source: $userDrafts,
  fn: deletePostById,
  target: $userDrafts,
});

// Delete post which was unmarked as draft
sample({
  clock: postUnmarkedAsDraft,
  source: $userDrafts,
  fn: deletePostByObject,
  target: $userDrafts,
});

// Clear all
sample({
  clock: userDraftsCleared,
  fn: purge,
  target: $userDrafts,
});
