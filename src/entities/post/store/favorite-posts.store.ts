import { createStore, sample } from "effector";

import {
  mergePosts,
  addPost,
  updatePost,
  deletePostById,
  purge,
  favoritePostsCleared,
  favoritePostsFetched,
  postFavorited,
  postUnfavorited,
  postDeleted,
  postUpdated,
} from "./events";
import type { Post } from "../types";

export const $favoritePosts = createStore<Post[]>([]);

// Add fetched posts
sample({
  clock: favoritePostsFetched,
  source: $favoritePosts,
  fn: mergePosts,
  target: $favoritePosts,
});

// Add favorited post
sample({
  clock: postFavorited,
  source: $favoritePosts,
  fn: addPost,
  target: $favoritePosts,
});

// Update post
sample({
  clock: postUpdated,
  source: $favoritePosts,
  fn: updatePost,
  target: $favoritePosts,
});

// Delete post
sample({
  clock: [postUnfavorited, postDeleted],
  source: $favoritePosts,
  fn: deletePostById,
  target: $favoritePosts,
});

// Clear all
sample({
  clock: favoritePostsCleared,
  fn: purge,
  target: $favoritePosts,
});
