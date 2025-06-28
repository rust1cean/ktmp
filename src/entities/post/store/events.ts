import { createEvent } from "effector";

import type { Post } from "../types";

// General posts
export const generalPostsFetched = createEvent<Post[]>();

// Search posts
export const searchPostsFetched = createEvent<Post[]>();
export const searchPostsCleared = createEvent();

// Favorite posts
export const favoritePostsFetched = createEvent<Post[]>();
export const postFavorited = createEvent<Post>();
export const postUnfavorited = createEvent<Post["id"]>();
export const favoritePostsCleared = createEvent();

// User's posts
export const userPostsFetched = createEvent<Post[]>();
export const postCreated = createEvent<Post>();
export const postDeleted = createEvent<Post["id"]>();
export const userPostsCleared = createEvent();

// User's drafts
export const userDraftsFetched = createEvent<Post[]>();
export const draftCreated = createEvent<Post>();
export const draftDeleted = createEvent<Post["id"]>();
export const userDraftsCleared = createEvent();

// User's posts mixed with user's drafts
export const postMarkedAsDraft = createEvent<Post>();
export const postUnmarkedAsDraft = createEvent<Post>();
export const postUpdated = createEvent<{
  postId: Post["id"];
  updatedPost: Partial<Post>;
}>();

const sortByDateDescending = (a: Post, b: Post) =>
  b.updatedAt.getTime() - a.updatedAt.getTime();

export const mergePosts = (currPosts: Post[], fetchedPosts: Post[]) =>
  [...currPosts, ...fetchedPosts].sort(sortByDateDescending);

export const addPost = (currPosts: Post[], post: Post) =>
  [...currPosts, post].sort(sortByDateDescending);

export const updatePost = (
  currPosts: Post[],
  { postId, updatedPost }: { postId: Post["id"]; updatedPost: Partial<Post> }
) =>
  currPosts.map((post) =>
    post.id !== postId ? post : { ...post, ...updatedPost }
  );

export const deletePostById = (currPosts: Post[], deletedPostId: Post["id"]) =>
  currPosts.filter((post) => post.id !== deletedPostId);

export const deletePostByObject = (currPosts: Post[], deletedPost: Post) =>
  currPosts.filter((post) => post.id !== deletedPost.id);

export const markAsFavorite = (currPosts: Post[], post: Post) =>
  currPosts.map((p) => (p.id !== post.id ? p : { ...p, isFavorite: true }));

export const unmarkAsFavorite = (currPosts: Post[], postId: Post["id"]) =>
  currPosts.map((p) => (p.id !== postId ? p : { ...p, isFavorite: false }));

export const purge = () => [];
