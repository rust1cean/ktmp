import { createStore, sample } from "effector";

import {
  mergePosts,
  addPost,
  deletePostById,
  markAsFavorite,
  unmarkAsFavorite,
  purge,
  deletePostByObject,
  postFavorited,
  postMarkedAsDraft,
  postUnfavorited,
  postUnmarkedAsDraft,
  postCreated,
  postDeleted,
  postUpdated,
  userPostsCleared,
  userPostsFetched,
  updatePost,
} from "./events";
import type { Post } from "../types";

export const $userPosts = createStore<Post[]>([]);

// Add fetched posts
sample({
  clock: userPostsFetched,
  source: $userPosts,
  fn: mergePosts,
  target: $userPosts,
});

// Add created post
sample({
  clock: postCreated,
  source: $userPosts,
  fn: addPost,
  target: $userPosts,
});

// Add post unmarked as draft
sample({
  clock: postUnmarkedAsDraft,
  source: $userPosts,
  fn: addPost,
  target: $userPosts,
});

// Update post
sample({
  clock: postUpdated,
  source: $userPosts,
  fn: updatePost,
  target: $userPosts,
});

// Delete post
sample({
  clock: postDeleted,
  source: $userPosts,
  fn: deletePostById,
  target: $userPosts,
});

// Delete post marked as draft
sample({
  clock: postMarkedAsDraft,
  source: $userPosts,
  fn: deletePostByObject,
  target: $userPosts,
});

// Mark post as favorite
sample({
  clock: postFavorited,
  source: $userPosts,
  fn: markAsFavorite,
  target: $userPosts,
});

// Unmark post as favorite
sample({
  clock: postUnfavorited,
  source: $userPosts,
  fn: unmarkAsFavorite,
  target: $userPosts,
});

// Clear all
sample({
  clock: userPostsCleared,
  fn: purge,
  target: $userPosts,
});
