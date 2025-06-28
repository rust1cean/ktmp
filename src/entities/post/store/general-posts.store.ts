import { createStore, sample } from "effector";

import {
  addPost,
  deletePostById,
  deletePostByObject,
  generalPostsFetched,
  markAsFavorite,
  mergePosts,
  postCreated,
  postDeleted,
  postFavorited,
  postMarkedAsDraft,
  postUnfavorited,
  postUnmarkedAsDraft,
  postUpdated,
  unmarkAsFavorite,
  updatePost,
} from "./events";
import type { Post } from "../types";

export const $generalPosts = createStore<Post[]>([]);

// Add fetched posts
sample({
  clock: generalPostsFetched,
  source: $generalPosts,
  fn: mergePosts,
  target: $generalPosts,
});

// Add created post
sample({
  clock: postCreated,
  source: $generalPosts,
  fn: addPost,
  target: $generalPosts,
});

// Add post unmarked as draft
sample({
  clock: postUnmarkedAsDraft,
  source: $generalPosts,
  fn: addPost,
  target: $generalPosts,
});

// Update post
sample({
  clock: postUpdated,
  source: $generalPosts,
  fn: updatePost,
  target: $generalPosts,
});

// Delete post
sample({
  clock: postDeleted,
  source: $generalPosts,
  fn: deletePostById,
  target: $generalPosts,
});

// Delete post marked as draft
sample({
  clock: postMarkedAsDraft,
  source: $generalPosts,
  fn: deletePostByObject,
  target: $generalPosts,
});

// Mark post as favorite
sample({
  clock: postFavorited,
  source: $generalPosts,
  fn: markAsFavorite,
  target: $generalPosts,
});

// Unmark post as favorite
sample({
  clock: postUnfavorited,
  source: $generalPosts,
  fn: unmarkAsFavorite,
  target: $generalPosts,
});
