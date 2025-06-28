import { createStore, sample } from "effector";

import {
  mergePosts,
  postFavorited,
  markAsFavorite,
  postUnfavorited,
  unmarkAsFavorite,
  purge,
  searchPostsCleared,
  searchPostsFetched,
} from "./events";
import type { Post } from "../types";

export const $searchPosts = createStore<Post[]>([]);

// Add fetched posts
sample({
  clock: searchPostsFetched,
  source: $searchPosts,
  fn: mergePosts,
  target: $searchPosts,
});

// Mark post as favorite
sample({
  clock: postFavorited,
  source: $searchPosts,
  fn: markAsFavorite,
  target: $searchPosts,
});

// Unmark post as favorite
sample({
  clock: postUnfavorited,
  source: $searchPosts,
  fn: unmarkAsFavorite,
  target: $searchPosts,
});

// Clear all
sample({
  clock: searchPostsCleared,
  fn: purge,
  target: $searchPosts,
});
