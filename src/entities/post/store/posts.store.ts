import type { Tables } from "@/shared/api/supabase";
import { createStore, createEvent } from "effector";

export const postsFetched = createEvent<Tables<"post_view">[]>();

export const $recentlyPosts = createStore<Tables<"post_view">[]>([]).on(
  postsFetched,
  (posts, newPosts) => [...posts, ...newPosts]
);
